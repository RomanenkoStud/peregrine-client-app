import * as tf from '@tensorflow/tfjs-node';
import { Product } from '@/models/products';
import { UserData } from '@/models/user';
import { MODEL_PATH, MAX_PRODUCT_FEATURES, MAX_PRODUCT_OUTPUTS } from './settings';
import * as fs from "fs";

export function createDeepAndWideModel(): tf.LayersModel {
  // Wide part of the model (linear part)
  const wideInput = tf.input({ shape: [MAX_PRODUCT_FEATURES], name: 'wide_input' });
  const wideOutput = wideInput;

  // Deep part of the model (DNN part)
  const deepInput = tf.input({ shape: [MAX_PRODUCT_FEATURES], name: 'deep_input' });
  const deepDense1 = tf.layers.dense({ units: 128, activation: 'relu' }).apply(deepInput) as tf.SymbolicTensor;
  const deepDense2 = tf.layers.dense({ units: 64, activation: 'relu' }).apply(deepDense1) as tf.SymbolicTensor;
  const deepOutput = tf.layers.dense({ units: 32, activation: 'relu' }).apply(deepDense2) as tf.SymbolicTensor;

  // Combine wide and deep parts
  const combined = tf.layers.concatenate().apply([wideOutput, deepOutput]);
  const output = tf.layers.dense({ units: MAX_PRODUCT_OUTPUTS, activation: 'sigmoid' }).apply(combined) as tf.SymbolicTensor;

  // Create and compile the model
  const model = tf.model({ inputs: [wideInput, deepInput], outputs: output });
  model.compile({ optimizer: 'adam', loss: 'binaryCrossentropy', metrics: ['accuracy'] });

  return model;
}

export function prepareData(products: Product[], userData: UserData): { wideInput: number[]; deepInput: number[] } {
  const wideInput = Array(MAX_PRODUCT_FEATURES).fill(0);
  const deepInput = Array(MAX_PRODUCT_FEATURES).fill(0);

  userData.viewedProducts.forEach(viewedProduct => {
    const viewedIndex = products.findIndex(p => p.uri === viewedProduct);
    if (viewedIndex !== -1) {
      wideInput[viewedIndex] = 1;
      deepInput[viewedIndex] = 1;
    }
  });

  return { wideInput, deepInput };
}

export async function trainModel(model: tf.LayersModel, users: UserData[], products: Product[]) {
  const trainingData = users.map(user => {
    const { wideInput, deepInput } = prepareData(products, user);
    return { wideInput, deepInput, label: Array(MAX_PRODUCT_OUTPUTS).fill(1) };
  });

  // Reshape data to match model input requirements
  const wideTensor = tf.tensor2d(trainingData.map(d => d.wideInput));
  const deepTensor = tf.tensor2d(trainingData.map(d => d.deepInput), [trainingData.length, MAX_PRODUCT_FEATURES]); 
  const labelsTensor = tf.tensor2d(trainingData.map(d => d.label), [trainingData.length, MAX_PRODUCT_OUTPUTS]);

  await model.fit([wideTensor, deepTensor], labelsTensor, { epochs: 10 });

  await fs.mkdirSync(MODEL_PATH, { recursive: true });

  await model.save(`file://${MODEL_PATH}`);
}

export async function generateRecommendations(model: tf.LayersModel, userData: UserData, products: Product[], number: number = MAX_PRODUCT_OUTPUTS) {
  const { wideInput, deepInput } = prepareData(products, userData);

  const wideInputTensor = tf.tensor2d([wideInput]);
  const deepInputTensor = tf.tensor2d([deepInput]);

  // Predict preference scores for all products
  const predictedPreferences = model.predict([wideInputTensor, deepInputTensor]) as tf.Tensor<tf.Rank>;

  const topNIndices = Array.from(await tf.topk(predictedPreferences, number).indices.dataSync());
  const topProducts = topNIndices.map((productIndex) => products[productIndex]);

  return topProducts;
}
