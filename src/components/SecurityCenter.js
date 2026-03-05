import React from 'react';

const SecurityCenter = ({ alerts, activeSessions }) => (
  <div className="p-12 bg-slate-50 min-h-screen">
    <div className="flex justify-between items-center mb-10">
      <h2 className="text-3xl font-black text-slate-900 flex items-center gap-3">
        <span className="text-blue-600">🛡️</span> Security & Compliance
      </h2>
      <button className="bg-red-600 text-white px-8 py-4 rounded-2xl font-black shadow-lg animate-pulse">
        Immediate Lockout
      </button>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      {/* Real-time Threat Alerts */}
      <div className="bg-white p-8 rounded-[3rem] shadow-xl border border-red-100">
        <h3 className="text-xs font-black text-red-500 uppercase mb-6">Threat Monitoring</h3>
        <div className="space-y-4">
          {alerts.map(alert => (
            <div key={alert.id} className="p-4 bg-red-50 rounded-2xl flex justify-between items-center">
              <div>
                <p className="font-bold text-slate-800">{alert.type}</p>
                <p className="text-[10px] text-slate-500">{alert.time}</p>
              </div>
              <span className="bg-red-600 text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase">
                {alert.severity}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Access Audit Trail */}
      <div className="bg-slate-900 p-8 rounded-[3rem] text-white shadow-xl">
        <h3 className="text-xs font-black text-slate-400 uppercase mb-6">Live Access Audit</h3>
        <div className="space-y-4 text-xs font-mono">
          <div className="text-green-400">08:45 PM: Dr. Manish accessed Patient #881 (Success)</div>
          <div className="text-amber-400">08:42 PM: Pharmacist Rahul updated Stock (Batch #X12)</div>
          <div className="text-red-400">08:39 PM: Denied - Unknown IP 192.168.1.1 tried LOGIN</div>
        </div>
      </div>
    </div>
  </div>
);

export default SecurityCenter;
