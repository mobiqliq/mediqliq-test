import React, { useState, useEffect } from 'react';

const PatientTimeline = ({ patientId }) => {
  const [events, setEvents] = useState([
    { type: 'VISIT', title: 'General Checkup', description: 'Assigned to Dr. Thapa (Gen Med)', created_at: '2026-03-05 10:00' },
    { type: 'DENTAL', title: 'Root Canal', description: 'Tooth #16 - Proposed', created_at: '2026-03-05 11:30' },
    { type: 'PHARMACY', title: 'Amoxicillin 500mg', description: 'Dispensed - 10 tabs', created_at: '2026-03-05 12:00' }
  ]);

  const getIcon = (type) => {
    if (type === 'DENTAL') return '🦷';
    if (type === 'PHARMACY') return '💊';
    if (type === 'VISIT') return '🩺';
    return '📋';
  };

  return (
    <div className="p-8 bg-white rounded-3xl shadow-sm border border-slate-100 max-w-2xl">
      <h2 className="text-2xl font-black text-slate-800 mb-8">Patient Life-Cycle</h2>
      <div className="relative border-l-2 border-slate-100 ml-4 space-y-8">
        {events.map((event, index) => (
          <div key={index} className="relative pl-8">
            <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white border-2 border-blue-500 shadow-sm"></div>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{event.created_at}</p>
                <h4 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <span>{getIcon(event.type)}</span> {event.title}
                </h4>
                <p className="text-sm text-slate-500 mt-1">{event.description}</p>
              </div>
              <span className="text-[10px] font-black bg-slate-100 px-2 py-1 rounded text-slate-500 uppercase">
                {event.type}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientTimeline;
