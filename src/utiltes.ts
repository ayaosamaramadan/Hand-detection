
interface prediction {
  landmarks: [number, number][];
  annotations: {
    [key: string]: number[][];
  };
}

export const drawHand = (predictions: prediction[], ctx: CanvasRenderingContext2D) => {
  if(predictions.length === 0) return;
  if (predictions.length > 0) {
  predictions.forEach(prediction => {
    const landmarks = prediction.landmarks;

    for (let i = 0; i < landmarks.length; i++) {
      const x = landmarks[i][0];
      const y = landmarks[i][1];
      ctx.fillStyle = "red";
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fill();
    }
  });
}
};