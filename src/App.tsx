import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import { useRef, useState } from "react";
import { drawHand } from "./utiltes";
import "./App.css";

function App() {
  const camRef = useRef<Webcam>(null);
  const canvaRef = useRef<HTMLCanvasElement>(null);
  const [add3DRing, setAdd3DRing] = useState(false);

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
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      video.width = videoWidth;
      video.height = videoHeight;

      if (canvaRef.current) {
        canvaRef.current.width = videoWidth;
        canvaRef.current.height = videoHeight;
      }

      const hand = await net.estimateHands(video);

      if (canvaRef.current) {
        const ctx = canvaRef.current.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, videoWidth, videoHeight); // Clear previous drawings
          drawHand(
            hand.map((prediction) => ({
              ...prediction,
              landmarks: prediction.landmarks.map(([x, y]) => [x, y]), // Convert 3D landmarks to 2D
            })),
            ctx,
            add3DRing
          ); // Pass add3DRing to drawHand
        }
      }
    }
  };

  handleHandPose();

  return (
    <>
      <h1 className="text-lime-500 text-3xl md:text-5xl font-extrabold mb-6 md:mb-12 mt-6 md:mt-12 text-center drop-shadow-2xl animate-pulse">
        Handpose Detection
      </h1>
      <div className="bg-gradient-to-r from-green-400 via-lime-500 to-green-400 relative mx-auto left-0 right-0 text-center z-10 w-full max-w-[640px] h-auto aspect-video">
        <Webcam
          ref={camRef}
          className="w-full h-full absolute border-4 border-lime-500 rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300"
        />
        <canvas ref={canvaRef} className="absolute w-full h-full" />
      </div>
      <button
        onClick={() => setAdd3DRing(!add3DRing)}
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300 mt-4"
      >
        Toggle 3D Ring
      </button>
    </>
  );
}

export default App;
