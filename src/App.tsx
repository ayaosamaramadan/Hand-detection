import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import { useRef } from "react";

function App() {
  const camRef = useRef<Webcam>(null);

  const handleHandPose = async () => {
    await tf.setBackend("webgl");
    await tf.ready();

    const net: handpose.HandPose = await handpose.load();
    console.log("Handpose model loaded.");

    setInterval(() => {
      detect(net);
    }, 100);
  };

  const detect = async (net: handpose.HandPose) => {
    if (
      camRef.current &&
      camRef.current.video &&
      camRef.current.video.readyState === 4
    ) {
      const video = camRef.current.video;
      const hand = await net.estimateHands(video);
      console.log(hand);
    }
  };

  handleHandPose();

  return (
    <>
      <Webcam ref={camRef} />
    </>
  );
}

export default App;
