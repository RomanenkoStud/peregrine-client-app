import * as tfClient from '@tensorflow/tfjs';
import * as tfServer from '@tensorflow/tfjs-node';
import { MODEL_PATH } from './settings';

export async function loadModel(): Promise<tfClient.LayersModel> {
  const handler = tfServer.io.fileSystem(`./${MODEL_PATH}/model.json`);
  const model = await tfServer.loadLayersModel(handler);

  model.summary();
  return model;
}
