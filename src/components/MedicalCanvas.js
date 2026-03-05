import React, { useRef, useState } from 'react';

const MedicalCanvas = ({ mapType = 'DENTAL' }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Background map based on specialty
  const bgMap = mapType === 'DENTAL' ? '/maps/teeth_layout.png' : '/maps/body_human.png';

  const draw = (e) => {
    if (!isDrawing) return;
    const ctx = canvasRef.current.getContext('2d');
    const rect = canvasRef.current.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  return (
    <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-xs font-black uppercase text-slate-400">Visual Annotation Layer</h4>
        <button onClick={() => {
          const ctx = canvasRef.current.getContext('2d');
          ctx.clearRect(0, 0, 800, 600);
        }} className="text-[10px] font-bold text-red-500">CLEAR</button>
      </div>
      
      <div className="relative">
        <img src={bgMap} className="w-full opacity-20 pointer-events-none" alt="Map" />
        <canvas 
          ref={canvasRef}
          width={600} height={400}
          className="absolute top-0 left-0 w-full h-full cursor-crosshair"
          onMouseDown={(e) => {
            setIsDrawing(true);
            const ctx = canvasRef.current.getContext('2d');
            ctx.beginPath();
            ctx.strokeStyle = '#2563eb';
            ctx.lineWidth = 3;
          }}
          onMouseMove={draw}
          onMouseUp={() => setIsDrawing(false)}
        />
      </div>
    </div>
  );
};

export default MedicalCanvas;
