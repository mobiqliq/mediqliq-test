import React from 'react';

const TeleHealthModule = ({ patientName, streamUrl }) => (
  <div className="grid grid-cols-4 gap-6 p-10 bg-slate-900 rounded-[3.5rem] h-[80vh]">
    {/* Video Feed */}
    <div className="col-span-3 bg-black rounded-[2.5rem] relative overflow-hidden">
      <video src={streamUrl} className="w-full h-full object-cover" autoPlay />
      <div className="absolute bottom-6 left-6 flex gap-4">
        <button className="p-4 bg-red-600 rounded-2xl">🔇</button>
        <button className="p-4 bg-white/10 backdrop-blur-md rounded-2xl">📸 Capture Frame</button>
      </div>
    </div>

    {/* Live Clinical Note-taking */}
    <div className="col-span-1 flex flex-col gap-4">
      <div className="bg-white/5 p-6 rounded-[2rem] border border-white/10">
        <h4 className="text-[10px] font-black text-blue-400 uppercase mb-4">Live Patient Info</h4>
        <p className="text-white font-bold">{patientName}</p>
        <p className="text-[10px] text-slate-500 font-mono mt-2">ID: MDQ-GLOBAL-881</p>
      </div>
      <textarea 
        className="flex-1 bg-white/5 rounded-[2rem] p-6 text-white text-sm border-none focus:ring-1 ring-blue-500"
        placeholder="Add Clinical Observation during call..."
      />
      <button className="py-4 bg-blue-600 text-white font-black rounded-2xl">Sign & End Call</button>
    </div>
  </div>
);

export default TeleHealthModule;
