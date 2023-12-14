import {deinitFace, initFace, startFaceAnimation} from "./faceInteractions.ts";
import {initConversation, startConversation} from "./conversationInteractions.ts";
import {onDrawScene} from "./drawInteractions.ts";
import {baseUrl, HOME_URL} from "@/common/urlUtil.ts";

import { CanvasComponent } from 'sl-web-face';
import { IDrawCallback } from "sl-react-ui";

export type InitResults = {
  face:CanvasComponent,
  onDraw:IDrawCallback
}

let isInitializing = false;
let initResults:InitResults|null = null;

async function _firstInit():Promise<InitResults> {
  const face = await initFace(baseUrl('/project/faces/Grubbo.face')); // TODO get from project instead
  await initConversation();
  return {
    face,
    onDraw: (canvasContext:CanvasRenderingContext2D) => onDrawScene(canvasContext, face)
  } as InitResults;
}

async function _subsequentInit():Promise<InitResults> {
  if (!initResults) throw Error('Unexpected');
  return initResults;
}

function _bothInit() {
  startFaceAnimation();
  startConversation();
}

export async function init(setLocation:Function):Promise<InitResults|null> {
  if (isInitializing) return null;
  isInitializing = true;
  try {
    initResults = initResults === null ? await _firstInit() : await _subsequentInit();
    _bothInit();
    
  } catch(e) {
    console.error(e);
    setLocation(HOME_URL);
  } finally {
    isInitializing = false;
  }
  
  return initResults;
}

export function deinit() {
  deinitFace();
}