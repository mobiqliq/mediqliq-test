import React, { useState, useEffect } from 'react';

const DoctorQueue = () => {
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchQueue = async () => {
    setLoading(true);
    const res = await window.electron.invoke('opd:queue');
    if (res.success) {
      setQueue(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchQueue();
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchQueue, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleStartConsultation = async (visitId) => {
    alert(`Starting Consultation for Visit ID: ${visitId}. Opening EMR...`);
    // Future: redirect to ConsultationRoom.js
  };

  return (
    <div className="p-10 max-w-6xl mx-auto">
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">Live Doctor Queue</h1>
          <p className="text-slate-500 font-bold uppercase text-xs tracking-widest mt-1">Real-time Patient Flow</p>
        </div>
        <button 
          onClick={fetchQueue}
          className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-2 rounded-xl font-black text-xs uppercase transition-all"
        >
          {loading ? 'Refreshing...' : 'Manual Refresh'}
        </button>
      </header>

      {queue.length === 0 ? (
        <div className="bg-white rounded-[3rem] p-20 text-center border-2 border-dashed border-slate-200">
          <div className="text-5xl mb-4">☕</div>
          <h2 className="text-xl font-black text-slate-400 uppercase">No Patients in Queue</h2>
          <p className="text-slate-400">Reception hasn't checked anyone in yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {queue.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-[2rem] shadow-xl border border-slate-100 flex items-center justify-between hover:border-blue-500 transition-all">
              <div className="flex items-center space-x-6">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex flex-col items-center justify-center shadow-lg">
                  <span className="text-[10px] font-black uppercase opacity-70">Token</span>
                  <span className="text-2xl font-black leading-none">{item.token_number}</span>
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-800 uppercase leading-none mb-1">
                    {item.first_name} {item.last_name}
                  </h3>
                  <div className="flex space-x-3 items-center">
                    <span className="text-xs font-mono font-bold text-blue-600">{item.uhid}</span>
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase ${
                      item.status === 'WAITING' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => handleStartConsultation(item.id)}
                className="bg-slate-900 hover:bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase shadow-xl transition-all active:scale-95"
              >
                Start Check-up
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorQueue;
