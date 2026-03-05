import React, { useRef } from 'react';

const PatientRegistration = () => {
  const videoRef = useRef(null);
  
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (err) {
      console.error("Camera access denied:", err);
    }
  };

  const capturePhoto = () => {
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
    const photoData = canvas.toDataURL('image/jpeg');
    console.log("Photo Captured:", photoData);
    // Send photoData to your local API
  };

  return (
    <div className="p-8 bg-white rounded-[3rem] border border-slate-100 shadow-xl max-w-md mx-auto">
      <div className="relative mb-6">
        <video 
          ref={videoRef} 
          autoPlay 
          className="w-64 h-64 rounded-full bg-slate-100 object-cover border-4 border-slate-50 shadow-inner" 
        />
      </div>
      <div className="flex gap-4">
        <button 
          onClick={startCamera} 
          className="flex-1 bg-slate-900 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-colors"
        >
          Open Camera
        </button>
        <button 
          onClick={capturePhoto} 
          className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 shadow-lg shadow-blue-200 transition-all"
        >
          Capture Face
        </button>
      </div>
      <div className="mt-8 border-t border-slate-100 pt-6">
        <label className="text-[10px] font-black text-slate-400 uppercase mb-2 block">Scan ID Card / QR</label>
        <input 
          type="text" 
          placeholder="Awaiting Scanner Input..." 
          autoFocus 
          className="w-full p-4 bg-slate-50 rounded-2xl border-none text-sm focus:ring-2 ring-blue-500 font-mono" 
        />
      </div>
    </div>
  );
};

export default PatientRegistration;
