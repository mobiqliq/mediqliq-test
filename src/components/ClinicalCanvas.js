import React, { useRef, useEffect } from 'react';

const ClinicalCanvas = ({ overlayImage }) => {
  const canvasRef = useRef(null);
  
  // Requirement 2: Stylus/S-Pen Input Logic
  const startDrawing = (e) => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.strokeStyle = '#2563eb'; // Mediqliq Blue
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    canvasRef.current.isDrawing = true;
  };

  const draw = (e) => {
    if (!canvasRef.current.isDrawing) return;
    const ctx = canvasRef.current.getContext('2d');
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };

  return (
    <div className="relative border-4 border-slate-100 rounded-[2rem] overflow-hidden bg-white">
      <img src={overlayImage} alt="Reference" className="opacity-30 pointer-events-none" />
      <canvas 
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full cursor-crosshair"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={() => canvasRef.current.isDrawing = false}
      />
      <div className="absolute bottom-4 right-4 bg-slate-900 text-white px-4 py-2 rounded-full text-[10px] font-black uppercase">
        Stylus Active (S-Pen)
      </div>
    </div>
  );
};

export default ClinicalCanvas;
