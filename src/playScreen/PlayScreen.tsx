import { Canvas } from 'sl-react-ui';

function _onDraw(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = '#000';
  const width = ctx.canvas.width;
  const height = ctx.canvas.height;
  ctx.fillRect(0, 0, width, height);
  
  // Draw a red x.
  ctx.strokeStyle = '#f00';
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(width, height);
  ctx.moveTo(0, height);
  ctx.lineTo(width, 0);
  ctx.stroke();
}

function PlayScreen() {
  return (
    <Canvas 
      onDraw={_onDraw}
      isAnimated
    />
  );
}

export default PlayScreen;