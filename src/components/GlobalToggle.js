import React, { useState } from 'react';

const GlobalToggle = ({ currentConfig, onUpdate }) => {
  const [config, setConfig] = useState(currentConfig);

  const countries = [
    { code: 'IN', name: 'India', currency: 'INR', tax: 'GST', privacy: 'DPDP' },
    { code: 'US', name: 'United States', currency: 'USD', tax: 'Sales Tax', privacy: 'HIPAA' },
    { code: 'AE', name: 'United Arab Emirates', currency: 'AED', tax: 'VAT', privacy: 'DHA' },
    { code: 'UK', name: 'United Kingdom', currency: 'GBP', tax: 'VAT', privacy: 'GDPR' }
  ];

  return (
    <div className="p-12 bg-slate-900 rounded-[3.5rem] text-white shadow-2xl max-w-4xl mx-auto border border-white/10">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h2 className="text-3xl font-black tracking-tight">System Localization</h2>
          <p className="text-slate-400 font-medium">Configure Legal, Financial, and Data standards</p>
        </div>
        <div className="px-4 py-2 bg-blue-600 rounded-xl text-[10px] font-black uppercase animate-pulse">
          Global Core Active
        </div>
      </div>

      <div className="grid grid-cols-2 gap-10">
        {/* Country Selection */}
        <div className="space-y-6">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Operating Territory</label>
          <div className="grid grid-cols-2 gap-3">
            {countries.map(c => (
              <button 
                key={c.code}
                onClick={() => setConfig(c)}
                className={`p-4 rounded-2xl border-2 transition-all text-sm font-bold ${
                  config.code === c.code ? 'border-blue-500 bg-blue-500/10' : 'border-white/5 bg-white/5'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Rules Preview */}
        <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10">
          <h4 className="text-sm font-bold mb-6 text-blue-400">Localized Engine Status</h4>
          <ul className="space-y-4 text-xs font-medium">
            <li className="flex justify-between">
              <span className="text-slate-500">Currency Symbol:</span>
              <span className="text-white">{config.currency}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-slate-500">Tax Framework:</span>
              <span className="text-white">{config.tax}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-slate-500">Privacy Standard:</span>
              <span className="text-white font-black text-blue-300">{config.privacy}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-slate-500">Interop Protocol:</span>
              <span className="text-white">HL7 FHIR R5 / DICOM</span>
            </li>
          </ul>
        </div>
      </div>

      <button 
        onClick={() => onUpdate(config)}
        className="mt-12 w-full py-6 bg-white text-slate-900 font-black rounded-[2rem] text-xl shadow-xl hover:bg-blue-400 hover:text-white transition-all"
      >
        Apply Global Configuration
      </button>
    </div>
  );
};

export default GlobalToggle;
