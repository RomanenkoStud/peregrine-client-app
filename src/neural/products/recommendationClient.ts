import * as tfClient from '@tensorflow/tfjs';
import { MODEL_PATH } from './modelPath';

export async function loadModel(): Promise<tfClient.LayersModel> {
  return await tfClient.loadLayersModel(`http://localhost:3000/${MODEL_PATH}/model.json`);
}
