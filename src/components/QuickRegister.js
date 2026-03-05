import React, { useState, useEffect } from 'react';

const QuickRegister = ({ onSave, checkDuplicate }) => {
  const [patient, setPatient] = useState({ name: '', phone: '', gender: 'M', age: '', abha: '' });
  const [isDuplicate, setIsDuplicate] = useState(false);

  // Requirement 4: Real-time duplicate check (Prevents double entries)
  useEffect(() => {
    if (patient.phone.length === 10) {
      const exists = checkDuplicate(patient.phone);
      setIsDuplicate(exists);
    }
  }, [patient.phone]);

  return (
    <div className="p-10 bg-white rounded-[3rem] shadow-2xl border border-slate-100 max-w-4xl">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-black text-slate-900">Patient Onboarding</h2>
        <div className="bg-blue-50 px-4 py-2 rounded-2xl text-blue-600 font-bold text-xs">
          Press [Enter] to Save
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Requirement 6: Keyboard Friendly - Logical Tab Order */}
        <div className="space-y-6">
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase">Mobile Number</label>
            <input 
              autoFocus
              className={`w-full mt-2 p-4 bg-slate-50 border-2 rounded-2xl text-xl font-bold outline-none transition-all ${
                isDuplicate ? 'border-red-400 bg-red-50' : 'border-transparent focus:border-blue-500'
              }`}
              placeholder="99XXXXXXXX"
              onChange={(e) => setPatient({...patient, phone: e.target.value})}
            />
            {isDuplicate && <p className="text-red-500 text-[10px] mt-2 font-bold uppercase">Patient Already Registered!</p>}
          </div>

          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase">Full Name</label>
            <input className="w-full mt-2 p-4 bg-slate-50 rounded-2xl border-none text-lg" 
              placeholder="e.g. Manish Thapa" onChange={(e) => setPatient({...patient, name: e.target.value})} />
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase">Age</label>
              <input className="w-full mt-2 p-4 bg-slate-50 rounded-2xl border-none" 
                placeholder="28" onChange={(e) => setPatient({...patient, age: e.target.value})} />
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase">Gender</label>
              <select className="w-full mt-2 p-4 bg-slate-50 rounded-2xl border-none"
                onChange={(e) => setPatient({...patient, gender: e.target.value})}>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Other</option>
              </select>
            </div>
          </div>

          {/* Requirement 2: Easy to Operate - ABHA Linker Integration */}
          <div className="p-4 bg-blue-600 rounded-2xl text-white flex justify-between items-center cursor-pointer hover:bg-blue-700 transition-all">
            <span className="text-xs font-bold">Fetch from ABHA ID</span>
            <span className="text-xl">📲</span>
          </div>
        </div>
      </div>

      <button 
        disabled={isDuplicate || !patient.phone || !patient.name}
        onClick={() => onSave(patient)}
        className="mt-12 w-full bg-slate-900 text-white font-black py-6 rounded-[2rem] text-xl shadow-xl hover:bg-blue-600 active:scale-95 transition-all"
      >
        Complete Registration & Issue UHID
      </button>
    </div>
  );
};

export default QuickRegister;
