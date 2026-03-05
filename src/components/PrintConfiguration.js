import React, { useState } from 'react';

const PrintConfiguration = ({ onGenerate }) => {
  const [options, setOptions] = useState({
    includeGlobalHeader: true,
    includeDoctorHeader: true,
    includeSignature: true
  });

  const toggle = (key) => setOptions({ ...options, [key]: !options[key] });

  return (
    <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm max-w-sm">
      <h4 className="font-bold text-slate-800 mb-4 text-lg">Print & Compliance</h4>
      <div className="space-y-3">
        <label className="flex items-center p-3 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors border border-transparent hover:border-slate-200">
          <input type="checkbox" className="w-4 h-4 rounded text-blue-600" 
            checked={options.includeGlobalHeader} onChange={() => toggle('includeGlobalHeader')} />
          <span className="ml-3 text-sm font-medium text-slate-600">Hospital Letterhead (Owner)</span>
        </label>
        
        <label className="flex items-center p-3 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors border border-transparent hover:border-slate-200">
          <input type="checkbox" className="w-4 h-4 rounded text-blue-600" 
            checked={options.includeDoctorHeader} onChange={() => toggle('includeDoctorHeader')} />
          <span className="ml-3 text-sm font-medium text-slate-600">Doctor Credentials (NMC/DCI)</span>
        </label>

        <label className="flex items-center p-3 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors border border-transparent hover:border-slate-200">
          <input type="checkbox" className="w-4 h-4 rounded text-blue-600" 
            checked={options.includeSignature} onChange={() => toggle('includeSignature')} />
          <span className="ml-3 text-sm font-medium text-slate-600">Apply Digital Signature</span>
        </label>
      </div>

      <button 
        onClick={() => onGenerate(options)}
        className="mt-6 w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-all shadow-lg active:scale-95"
      >
        Generate Professional PDF
      </button>
      <p className="mt-3 text-[10px] text-center text-slate-400">Verified for Medical Council Compliance</p>
    </div>
  );
};

export default PrintConfiguration;
