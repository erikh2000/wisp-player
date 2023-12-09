import {deinitFace, initFace, startFaceAnimation} from "./faceInteractions.ts";
import {initConversation} from "./conversationInteractions.ts";
import {onDrawScene} from "./drawInteractions.ts";

import { CanvasComponent } from 'sl-web-face';
import { IDrawCallback } from "sl-react-ui";

export type InitResults = {
  face:CanvasComponent,
  faceId:number,
  onDraw:IDrawCallback,
}

let isInitializing = false;
let initResults:InitResults|null = null;

export async function init():Promise<InitResults|null> {
  if (isInitializing) return null;
  
  let face:CanvasComponent|null = null;
  let faceId:number|null = null;
  if (!initResults) {
    isInitializing = true;
    [ faceId, face ] = await initFace('/project/faces/Grubbo.face');
    await initConversation();
    isInitializing = false;
  }
  
  if (!face || !faceId) throw Error('Unexpected');
  startFaceAnimation();
  const onDraw = (canvasContext:CanvasRenderingContext2D) => onDrawScene(canvasContext, face);
  initResults = {
    face,
    faceId,
    onDraw
  };
  
  return initResults;
}

export function deinit() {
  deinitFace();
}