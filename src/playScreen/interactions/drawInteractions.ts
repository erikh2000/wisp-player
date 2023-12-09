import {CanvasComponent} from "sl-web-face";
import {scaleDimensionsToFit} from "sl-react-ui";

export function onDrawScene(canvasContext:CanvasRenderingContext2D, face:CanvasComponent|null) {
  const {width, height} = canvasContext.canvas;
  if (!width || !height || !face) return;
  const [faceWidth, faceHeight] = scaleDimensionsToFit(face.width, face.height, width, height);
  face.resize(faceWidth, faceHeight);
  face.x = (width - faceWidth) / 2;
  face.y = (height - faceHeight) / 2;
  canvasContext.clearRect(0, 0, width, height);
  face.render(canvasContext);
}