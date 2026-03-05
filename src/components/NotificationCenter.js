import React from 'react';

const NotificationCenter = ({ deliveryLogs }) => (
  <div className="p-8 bg-white rounded-[3rem] shadow-2xl border border-slate-100">
    <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
      <span>📲</span> Delivery Status Center
    </h3>

    <div className="space-y-3">
      {deliveryLogs.map((log, i) => (
        <div key={i} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
          <div className="flex items-center gap-4">
            <div className={`w-2 h-2 rounded-full ${log.status === 'DELIVERED' ? 'bg-green-500' : 'bg-amber-500 animate-pulse'}`}></div>
            <div>
              <p className="font-bold text-slate-700">{log.patientName}</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase">{log.docType}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black text-slate-900 uppercase">{log.status}</p>
            <p className="text-[10px] text-slate-400">{log.time}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default NotificationCenter;
