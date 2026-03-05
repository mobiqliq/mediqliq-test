import React from 'react';

const ClinicalTimeline = ({ episodes }) => (
  <div className="p-10 bg-white rounded-[3rem] shadow-2xl border border-slate-100 max-w-2xl">
    <h3 className="text-xl font-black text-slate-900 mb-10 flex items-center gap-2">
      <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
      The Patient Journey
    </h3>

    <div className="relative border-l-2 border-slate-100 ml-4 space-y-12">
      {episodes.map((ev, i) => (
        <div key={i} className="relative pl-10 group">
          {/* Timeline Node */}
          <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-4 border-white shadow-sm 
            ${ev.type === 'SURGERY' ? 'bg-amber-500' : 'bg-blue-600'}`}></div>
          
          <div className="transition-transform group-hover:translate-x-2">
            <p className="text-[10px] font-black text-slate-400 uppercase">{ev.date} • {ev.doctor}</p>
            <h4 className="text-md font-bold text-slate-800 mt-1">{ev.diagnosis}</h4>
            <div className="mt-3 flex gap-2">
              {ev.meds.map((m, j) => (
                <span key={j} className="px-3 py-1 bg-slate-50 rounded-lg text-[9px] font-mono font-bold text-slate-500 border border-slate-100">
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
    
    <div className="mt-12 pt-6 border-t border-slate-50 text-center">
      <p className="text-[10px] font-black text-slate-300 uppercase italic tracking-widest">
        End of Journey • Powered by Mediqliq
      </p>
    </div>
  </div>
);

export default ClinicalTimeline;
