import React from 'react';

const WardMapper = ({ wards }) => (
  <div className="p-10 bg-slate-50 min-h-screen">
    <h2 className="text-3xl font-black text-slate-900 mb-8">Ward & Bed Occupancy</h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {wards.map(ward => (
        <div key={ward.id} className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-black text-xl text-slate-800">{ward.name}</h3>
            <span className="text-[10px] font-bold bg-blue-100 text-blue-600 px-3 py-1 rounded-full uppercase">
              {ward.occupied}/{ward.total} Beds
            </span>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {ward.beds.map(bed => (
              <div 
                key={bed.id}
                className={`h-16 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105 ${
                  bed.status === 'OCCUPIED' ? 'bg-slate-900 text-white' : 
                  bed.status === 'CLEANING' ? 'bg-amber-100 text-amber-600' : 'bg-green-50 text-green-600 border-2 border-dashed border-green-200'
                }`}
              >
                <span className="text-[10px] font-black">{bed.number}</span>
                <span className="text-[8px] uppercase font-bold">{bed.status}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default WardMapper;
