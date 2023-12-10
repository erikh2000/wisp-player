import {AttentionController, BlinkController, CanvasComponent, FaceEventManager, loadFaceFromUrl, Emotion, ISpeechAudio} from "sl-web-face";

const FACE_NAME = 'Primary';

let eventManager:FaceEventManager|null = null;
let blinkController:BlinkController|null = null;
let attentionController:AttentionController|null = null;
let faceId:number|null = null;

export function setSpeechAudioSpeakingFace(speechAudio:ISpeechAudio) {
  if (!eventManager || faceId === null) throw Error('Unexpected');
  speechAudio.setSpeakingFace(eventManager, faceId);
}

export async function initFace(faceUrl:string):Promise<CanvasComponent> {
  const face = await loadFaceFromUrl(faceUrl);
  eventManager = new FaceEventManager();
  faceId = eventManager.bindFace(FACE_NAME, face);
  attentionController = new AttentionController(eventManager, faceId);
  blinkController = new BlinkController(eventManager, faceId);
  return face;
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
}

export function setEmotion(emotion:Emotion) {
  if (!eventManager || faceId === null) return;
  eventManager.setEmotion(faceId, emotion);
}