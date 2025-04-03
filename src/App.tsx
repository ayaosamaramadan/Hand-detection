import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import { useRef } from "react";
import { drawHand } from "./utiltes";
import "./App.css";

function App() {

  const camRef = useRef<Webcam>(null);
  const canvaRef = useRef<HTMLCanvasElement>(null);

  const handleHandPose = async () => {
    try {
      await tf.setBackend("webgl");
      await tf.ready();

      const net: handpose.HandPose = await handpose.load();
      console.log("Handpose model loaded.");

      setInterval(() => {
        detect(net);
      }, 100);
    } catch (error) {
      console.error("error init handpose:", error);
    }
  };

  const detect = async (net: handpose.HandPose) => {
   
    if (
      typeof camRef.current !== "undefined" &&
      camRef.current !== null &&
      camRef.current.video &&
      camRef.current.video.readyState === 4
    ) {
      const video = camRef.current.video;
      const videoWidth = camRef.current.video?.videoWidth || 0;
      const videoHeight = camRef.current.video?.videoHeight || 0;

      if (camRef.current.video) {
        camRef.current.video.width = videoWidth;
      }
      if (camRef.current.video) {
        camRef.current.video.height = videoHeight;
      }

      if (canvaRef.current) {
        canvaRef.current.width = videoWidth;
        canvaRef.current.height = videoHeight;
      }

      const hand = await net.estimateHands(video);
      console.log(hand);

      if (canvaRef.current) {
        const ctx = canvaRef.current.getContext("2d");
        if (ctx) {
          drawHand(
            hand.map((prediction) => ({
              ...prediction,
              landmarks: prediction.landmarks.map(([x, y]) => [x, y]),
            })),
            ctx
          );
        }
      }
    }
  };

  handleHandPose();

  return (
    <>
      <Webcam ref={camRef} className="webcam" />
      <canvas ref={canvaRef} className="canvas" />
    </>
  );
}

export default App;
