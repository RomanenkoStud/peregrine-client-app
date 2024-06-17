import * as tf from '@tensorflow/tfjs-node';
import { Product } from '@/models/products';
import { UserData } from '@/models/user';
import { MODEL_PATH } from './modelPath';
import * as fs from "fs";

export function createDeepAndWideModel(numProducts: number): tf.LayersModel {
  // Wide part of the model (linear part)
  const wideInput = tf.input({ shape: [numProducts], name: 'wide_input' });
  const wideOutput = wideInput;

  // Deep part of the model (DNN part)
  const deepInput = tf.input({ shape: [numProducts], name: 'deep_input' });
  const deepDense1 = tf.layers.dense({ units: 128, activation: 'relu' }).apply(deepInput) as tf.SymbolicTensor;
  const deepDense2 = tf.layers.dense({ units: 64, activation: 'relu' }).apply(deepDense1) as tf.SymbolicTensor;
  const deepOutput = tf.layers.dense({ units: 32, activation: 'relu' }).apply(deepDense2) as tf.SymbolicTensor;

  // Combine wide and deep parts
  const combined = tf.layers.concatenate().apply([wideOutput, deepOutput]);
  const output = tf.layers.dense({ units: 1, activation: 'sigmoid' }).apply(combined) as tf.SymbolicTensor;

  // Create and compile the model
  const model = tf.model({ inputs: [wideInput, deepInput], outputs: output });
  model.compile({ optimizer: 'adam', loss: 'binaryCrossentropy', metrics: ['accuracy'] });

  return model;
}

export async function trainModel(model: tf.LayersModel, users: UserData[], products: Product[]) {
  const trainingData = {
    wideInput: [] as number[][],
    deepInput: [] as number[][],
    labels: [] as number[]
  };

  users.forEach(user => {
    user.purchaseHistory.forEach(product => {
      const productIndex = products.findIndex(p => p.uri === product);
      if (productIndex !== -1) {
        const wideInput: number[] = Array(products.length).fill(0);
        wideInput[productIndex] = 1;

        const deepInput: number[] = Array(products.length).fill(0);
        user.viewedProducts.forEach(viewedProduct => {
          const viewedIndex = products.findIndex(p => p.uri === viewedProduct);
          if (viewedIndex !== -1) deepInput[viewedIndex] = 1;
        });

        trainingData.wideInput.push(wideInput);
        trainingData.deepInput.push(deepInput);
        trainingData.labels.push(1);
      }
    });
  });

  const wideTensor = tf.tensor2d(trainingData.wideInput);
  const deepTensor = tf.tensor2d(trainingData.deepInput);
  const labelsTensor = tf.tensor2d(trainingData.labels, [trainingData.labels.length, 1]);

  await model.fit([wideTensor, deepTensor], labelsTensor, { epochs: 10 });

  await fs.mkdirSync(MODEL_PATH, { recursive: true });

  await model.save(`file://${MODEL_PATH}`);
}
