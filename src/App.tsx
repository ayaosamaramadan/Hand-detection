
import Webcam from 'react-webcam';

import {  useRef } from 'react';

function App() {
  const camRef = useRef<Webcam>(null);
  const canvaRef = useRef<HTMLCanvasElement>(null);

  return (
    <>
      <Webcam
      audio={false}
      ref={camRef}
      screenshotFormat="image/jpeg"
      style={{
        width: '60%',
        height: '60%',
        position: 'absolute',
        top: '20%',
        left: '20%',
        borderRadius: '15px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        border: '2px solidrgb(223, 245, 224)',
        zIndex: -1,
      }}
      />
       <canvas
        className="canvas-style"
        ref={canvaRef}
      />
      
    </>
  )
}

export default App
