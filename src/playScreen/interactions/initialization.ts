import { isReady as isRecognizerReady } from '../../conversations/theRecognizer';

import { loadFaceFromUrl, CanvasComponent, FaceEventManager, AttentionController, BlinkController } from 'sl-web-face';
import { IDrawCallback, scaleDimensionsToFit } from "sl-react-ui";

export type InitResults = {
  face:CanvasComponent,
  onDraw:IDrawCallback,
}

const FACE_NAME = 'Primary';

let isInitializing = false;
let face:CanvasComponent|null = null;
let eventManager:FaceEventManager|null = null;
let blinkController:BlinkController|null = null;
let attentionController:AttentionController|null = null;
let initResults:InitResults|null = null;

function _onDraw(canvasContext:CanvasRenderingContext2D, face:CanvasComponent|null) {
  const {width, height} = canvasContext.canvas;
  if (!width || !height || !face) return;
  const [faceWidth, faceHeight] = scaleDimensionsToFit(face.width, face.height, width, height);
  face.resize(faceWidth, faceHeight);
  face.x = (width - faceWidth) / 2;
  face.y = (height - faceHeight) / 2;
  canvasContext.clearRect(0, 0, width, height);
  face.render(canvasContext);
}

export async function init():Promise<InitResults|null> {
  if (isInitializing) return null;
  
  let faceId = -1;
  
  if (!initResults) {
    isInitializing = true;
    eventManager = new FaceEventManager();
    face = await loadFaceFromUrl('/project/faces/Grubbo.face');
    faceId = eventManager.bindFace(FACE_NAME, face);
    attentionController = new AttentionController(eventManager, faceId);
    blinkController = new BlinkController(eventManager, faceId);
    console.log(isRecognizerReady());
    isInitializing = false;
  }
  
  if (!blinkController || !attentionController || !face) throw Error('Unexpected');
  blinkController.start();
  attentionController.start();
  const onDraw = (canvasContext:CanvasRenderingContext2D) => _onDraw(canvasContext, face);
  initResults = {
    face, 
    onDraw
  };
  
  return initResults;
}

export function deinit() {
  if (blinkController) blinkController.stop();
  if (attentionController) attentionController.stop();
}