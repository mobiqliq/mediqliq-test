import React from 'react';

const NursingWorkbench = ({ activePatient }) => (
  <div className="p-8 bg-white rounded-[3rem] shadow-2xl border border-slate-100">
    <div className="flex justify-between items-center mb-10">
      <div className="flex gap-4 items-center">
        <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black">
          {activePatient.bedNumber}
        </div>
        <div>
          <h3 className="text-xl font-black">{activePatient.name}</h3>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter">
            {activePatient.diagnosis} • Day {activePatient.daysAdmitted}
          </p>
        </div>
      </div>
      <button className="bg-red-500 text-white px-6 py-2 rounded-xl text-[10px] font-black uppercase">Stat Alert</button>
    </div>

    {/* Medication Administration Schedule */}
    <div className="space-y-4">
      <h4 className="text-xs font-black text-slate-400 uppercase">Medication Schedule (MAR)</h4>
      {activePatient.schedule.map((task, i) => (
        <div key={i} className={`p-4 rounded-2xl border flex justify-between items-center ${task.isOverdue ? 'bg-red-50 border-red-100' : 'bg-slate-50 border-slate-100'}`}>
          <div className="flex gap-4">
            <span className="text-lg">{task.type === 'INJECTION' ? '💉' : '💊'}</span>
            <div>
              <p className="font-bold text-slate-800">{task.medicineName}</p>
              <p className="text-[10px] text-slate-500">{task.instruction}</p>
            </div>
          </div>
          <button className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase ${task.isOverdue ? 'bg-red-600 text-white' : 'bg-slate-900 text-white'}`}>
            Log Administration
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default NursingWorkbench;
