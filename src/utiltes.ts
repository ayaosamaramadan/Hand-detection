interface prediction {
  landmarks: [number, number][];
  annotations: {
    [key: string]: number[][];
  };
}

type fingertypes = {
  [key: string]: number[];
};


const fingerjoints :fingertypes= {
  thumb :[0,1,2,3,4],indexFinger :[0,5,6,7,8],
  middleFinger :[0,9,10,11,12],
  ringFinger :[0,13,14,15,16],
  pinkyFinger :[0,17,18,19,20],
}

export const drawHand = (
  predictions: prediction[],
  ctx: CanvasRenderingContext2D
) => {

  if (predictions.length === 0) return;

  if (predictions.length > 0) {

    predictions.forEach((prediction) => {

      const landmarks = prediction.landmarks;

      for (let j = 0; j < Object.keys(fingerjoints).length; j++) {
        const finger =Object.keys(fingerjoints)[j];
       
        for (let k = 0; k < fingerjoints[finger].length - 1; k++) {
        
          const firstJoint = fingerjoints[finger][k];
          const secondJoint = fingerjoints[finger][k + 1];

          ctx.beginPath();
          ctx.moveTo(
            landmarks[firstJoint][0],
            landmarks[firstJoint][1]
          );
          ctx.lineTo(
            landmarks[secondJoint][0],
            landmarks[secondJoint][1]
          );
          ctx.strokeStyle = "white";
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
        }
        else if (i === 2 ||i === 5 || i === 9 || i === 13 || i === 17) {
          ctx.fillStyle = "green";
        }
        else if (i === 8 || i === 4 || i === 12 || i === 16 || i === 20) {
          ctx.fillStyle = "blue";
        }
        else {
          ctx.fillStyle = "white";
        }
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fill();
      }

    });

  }

};
