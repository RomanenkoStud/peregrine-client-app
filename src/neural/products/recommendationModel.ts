import * as tf from '@tensorflow/tfjs-node';
import { Product } from '@/models/products';
import { UserData } from '@/models/user';
import { MODEL_PATH, MAX_PRODUCT } from './settings';
import * as fs from "fs";
import natural from 'natural';

const PRODUCT_FEATURES = ["viewed", "purchased"];
const PRODUCT_FEATURES_DEEP: (keyof Product)[] = ["category", "description"];
const FEATURE_VECTOR_LENGTH = 30;
const DEEP_INPUT_LENGTH = PRODUCT_FEATURES_DEEP.length * FEATURE_VECTOR_LENGTH; 
const tokenizer = new natural.WordTokenizer();

export function createDeepAndWideModel(): tf.LayersModel {
  // Wide part of the model (linear part)
  const wideInput = tf.input({ shape: [MAX_PRODUCT, PRODUCT_FEATURES.length], name: 'wide_input' });
  const wideOutput = tf.layers.dense({ units: 1, activation: 'linear' }).apply(tf.layers.flatten().apply(wideInput)) as tf.SymbolicTensor;

  // Deep part of the model (DNN part)
  const deepInput = tf.input({ shape: [MAX_PRODUCT, DEEP_INPUT_LENGTH], name: 'deep_input' });
  const deepDense1 = tf.layers.dense({ units: 128, activation: 'relu' }).apply(tf.layers.flatten().apply(deepInput)) as tf.SymbolicTensor;
  const deepDense2 = tf.layers.dense({ units: 64, activation: 'relu' }).apply(deepDense1) as tf.SymbolicTensor;
  const deepOutput = tf.layers.dense({ units: 32, activation: 'relu' }).apply(deepDense2) as tf.SymbolicTensor;

  // Combine wide and deep parts
  const combined = tf.layers.concatenate().apply([wideOutput, deepOutput]);
  const output = tf.layers.dense({ units: MAX_PRODUCT, activation: 'sigmoid' }).apply(combined) as tf.SymbolicTensor;

  // Create and compile the model
  const model = tf.model({ inputs: [wideInput, deepInput], outputs: output });
  const optimizer = tf.train.adamax(0.001);

  model.compile({
    optimizer: optimizer,
    loss: 'binaryCrossentropy',
    metrics: ['accuracy'],
  });

  return model;
}

function vectorizeText(text: string, length: number): number[] {
  const tokens = tokenizer.tokenize(text.toLowerCase());
  const stemmedTokens = tokens.map(token => natural.PorterStemmer.stem(token));
  const tokenSet = new Set(stemmedTokens);
  const vector = Array(length).fill(0);
  Array.from(tokenSet).slice(0, length).forEach((token, idx) => {
    vector[idx] = 1;
  });
  return vector;
}

export function prepareData(products: Product[], userData: UserData): { wideInput: number[][]; deepInput: number[][] } {
  const wideInput = Array(MAX_PRODUCT).fill(Array(PRODUCT_FEATURES.length).fill(0));
  const deepInput = Array(MAX_PRODUCT).fill(Array(DEEP_INPUT_LENGTH).fill(0));
  const { viewedProducts, purchaseHistory } = userData;
  products.forEach((product, index) => {
    wideInput[index][0] = viewedProducts.includes(product.uri) ? 1 : 0;
    wideInput[index][1] = purchaseHistory.includes(product.uri) ? 1 : 0;
    deepInput[index] = [
      ...vectorizeText(products[index].description, FEATURE_VECTOR_LENGTH),
      ...vectorizeText(products[index].category || "", FEATURE_VECTOR_LENGTH),
    ];   
  });

  return { wideInput, deepInput };
}

function trainTestSplit(data: unknown[], testSize: number) {
  const shuffled = data.slice().sort(() => Math.random() - 0.5);
  const testCount = Math.floor(data.length * testSize);
  const testSet = shuffled.slice(0, testCount);
  const trainSet = shuffled.slice(testCount);
  return [trainSet, testSet];
}

function prepareLabeledData(products: Product[], userData: UserData[]) {
  return userData.map(user => {
    const { wideInput, deepInput } = prepareData(products, user);
    const userProducts = [...user.purchaseHistory, ...user.viewedProducts];

    const label = products.map(product1 => {
      let score = 0;

      userProducts.forEach(uri2 => {
        const product2 = products.find(p => p.uri === uri2);
        if (!product2) {
          return;
        }

        // Jaccard similarity based on description keywords
        const keywords1 = tokenizer.tokenize(product1.description.toLowerCase());
        const keywords2 = tokenizer.tokenize(product2.description.toLowerCase());
        const intersection = new Set([...keywords1].filter(x => keywords2.includes(x)));
        const union = new Set([...keywords1, ...keywords2]);
        const jaccardSimilarity = intersection.size / union.size;

        // Category match bonus
        const categoryMatchBonus = product1.category === product2.category ? 1 : 0;

        // Combine scores (weighted average)
        score += (jaccardSimilarity * 0.8) + (categoryMatchBonus * 0.2);
      });

      // Normalize score by the number of user products
      score /= userProducts.length;
      return score;
    });

    return { wideInput, deepInput, label };
  });
}

export async function trainModel(model: tf.LayersModel, users: UserData[], products: Product[]) {
  // Split users into training and testing sets
  const [trainUsers, testUsers] = trainTestSplit(users, 0.2) as [UserData[], UserData[]];

  // Prepare training data
  const trainingData = prepareLabeledData(products, trainUsers);

  // Reshape and normalize training data
  const wideTensor = tf.tensor3d(trainingData.map(d => d.wideInput), [trainingData.length, MAX_PRODUCT, PRODUCT_FEATURES.length]);
  const deepTensor = tf.tensor3d(trainingData.map(d => d.deepInput), [trainingData.length, MAX_PRODUCT, DEEP_INPUT_LENGTH]);
  const labelsTensor = tf.tensor2d(trainingData.map(d => d.label), [trainingData.length, MAX_PRODUCT]);

  // Train the model
  await model.fit([wideTensor, deepTensor], labelsTensor, { batchSize: 50, epochs: 30 });

  // Prepare testing data
  const testingData = prepareLabeledData(products, testUsers);

  // Reshape and normalize testing data
  const testWideTensor = tf.tensor3d(testingData.map(d => d.wideInput), [testingData.length, MAX_PRODUCT, PRODUCT_FEATURES.length]);
  const testDeepTensor = tf.tensor3d(testingData.map(d => d.deepInput), [testingData.length, MAX_PRODUCT, DEEP_INPUT_LENGTH]);
  const testLabelsTensor = tf.tensor2d(testingData.map(d => d.label), [testingData.length, MAX_PRODUCT]);

  // Evaluate on test data
  await model.evaluate([testWideTensor, testDeepTensor], testLabelsTensor);

  // Save model
  await fs.promises.mkdir(MODEL_PATH, { recursive: true });
  await model.save(`file://${MODEL_PATH}`);
}

export async function generateRecommendations(model: tf.LayersModel, userData: UserData, products: Product[], number: number = 10) {
  const { wideInput, deepInput } = prepareData(products, userData);

  const wideInputTensor = tf.tensor3d([wideInput]);
  const deepInputTensor = tf.tensor3d([deepInput]);

  // Predict preference scores for all products
  const predictedPreferences = model.predict([wideInputTensor, deepInputTensor]) as tf.Tensor<tf.Rank>;

  const topNIndices = Array.from(await tf.topk(predictedPreferences, number).indices.dataSync());

  // Map the indices to the actual products
  const topProducts = topNIndices.map((productIndex) => products[productIndex % products.length]);

  wideInputTensor.dispose();
  deepInputTensor.dispose();

  return topProducts;
}
