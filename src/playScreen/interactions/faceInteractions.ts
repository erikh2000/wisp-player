import {AttentionController, BlinkController, CanvasComponent, FaceEventManager, loadFaceFromUrl} from "sl-web-face";

const FACE_NAME = 'Primary';

let eventManager:FaceEventManager|null = null;
let blinkController:BlinkController|null = null;
let attentionController:AttentionController|null = null;

export async function initFace(faceUrl:string):Promise<[faceId:number, face:CanvasComponent]> {
  eventManager = new FaceEventManager();
  const face = await loadFaceFromUrl(faceUrl);
  const faceId = eventManager.bindFace(FACE_NAME, face);
  attentionController = new AttentionController(eventManager, faceId);
  blinkController = new BlinkController(eventManager, faceId);
  return [ faceId, face ];
}

export function startFaceAnimation() {
  if (blinkController) blinkController.start();
  if (attentionController) attentionController.start();
}

export function stopFaceAnimation() {
  if (blinkController) blinkController.stop();
  if (attentionController) attentionController.stop();
}

export function deinitFace() {
  stopFaceAnimation();
  eventManager = null;
  attentionController = null;
  blinkController = null;
}