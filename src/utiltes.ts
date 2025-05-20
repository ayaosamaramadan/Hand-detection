interface prediction {
  landmarks: [number, number][];
  annotations: {
    [key: string]: number[][];
  };
}

type fingertypes = {
  [key: string]: number[];
};

const fingerjoints: fingertypes = {
  thumb: [0, 1, 2, 3, 4],
  indexFinger: [0, 5, 6, 7, 8],
  middleFinger: [0, 9, 10, 11, 12],
  ringFinger: [0, 13, 14, 15, 16],
  pinkyFinger: [0, 17, 18, 19, 20],
};

export const drawHand = (
  predictions: prediction[],
  ctx: CanvasRenderingContext2D,
  add3DRing: boolean
) => {
  if (predictions.length === 0) return;

  if (predictions.length > 0) {
    predictions.forEach((prediction) => {
      const landmarks = prediction.landmarks;

      for (let j = 0; j < Object.keys(fingerjoints).length; j++) {
        const finger = Object.keys(fingerjoints)[j];

        for (let k = 0; k < fingerjoints[finger].length - 1; k++) {
          const firstJoint = fingerjoints[finger][k];
          const secondJoint = fingerjoints[finger][k + 1];

          ctx.beginPath();
          ctx.moveTo(landmarks[firstJoint][0], landmarks[firstJoint][1]);
          ctx.lineTo(landmarks[secondJoint][0], landmarks[secondJoint][1]);
          ctx.strokeStyle = "purple";
          ctx.lineWidth = 4;

          ctx.stroke();
        }
      }

      for (let i = 0; i < landmarks.length; i++) {
        const x = landmarks[i][0];
        const y = landmarks[i][1];
        // ctx.fillStyle = "red";
        if (i === 0) {
          ctx.fillStyle = "red";
        } else if (i === 2 || i === 5 || i === 9 || i === 13 || i === 17) {
          ctx.fillStyle = "green";
        } else if (i === 8 || i === 4 || i === 12 || i === 16 || i === 20) {
          ctx.fillStyle = "blue";
        } else {
          ctx.fillStyle = "orange";
        }
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fill();
      }

      for (let i = 0; i < landmarks.length; i++) {
        const [x, y] = landmarks[i];

        // Draw a 3D ring on the second finger (index finger) if add3DRing is true
        if (add3DRing && i === 6) {
          // Outer ring
          ctx.beginPath();
          ctx.arc(x, y, 12, 0, 2 * Math.PI);
          ctx.strokeStyle = "gold"; // Outer ring color
          ctx.lineWidth = 4;
          ctx.stroke();
          ctx.closePath();

          // Inner ring
          ctx.beginPath();
          ctx.arc(x, y, 8, 0, 2 * Math.PI);
          ctx.strokeStyle = "silver"; // Inner ring color
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.closePath();
        }
        else{
          ctx.beginPath();
          ctx.arc(x, y, 5, 0, Math.PI * 2);
          ctx.fillStyle = "lime"; // Landmark color
          ctx.fill();
          ctx.closePath();
        }

        // Draw the landmark point
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fillStyle = "lime"; // Landmark color
        ctx.fill();
        ctx.closePath();
      }
    });
  }
};
