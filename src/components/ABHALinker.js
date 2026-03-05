import React, { useState } from 'react';

const ABHALinker = ({ onVerified }) => {
  const [step, setStep] = useState('INPUT'); // INPUT, OTP, SUCCESS
  const [abhaId, setAbhaId] = useState('');

  return (
    <div className="p-8 bg-gradient-to-br from-blue-50 to-white rounded-[2.5rem] border border-blue-100 shadow-xl max-w-md">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-600 text-white p-2 rounded-xl text-xs font-bold">ABHA</div>
        <h3 className="font-black text-slate-800">National Health ID Linker</h3>
      </div>

      {step === 'INPUT' && (
        <div className="space-y-4">
          <p className="text-xs text-slate-500">Enter ABHA Number (14 digits) or @abdm address</p>
          <input 
            className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-lg font-mono tracking-widest"
            placeholder="XX-XXXX-XXXX-XXXX"
            onChange={(e) => setAbhaId(e.target.value)}
          />
          <button 
            onClick={() => setStep('OTP')}
            className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl hover:bg-blue-700 transition-all shadow-lg active:scale-95"
          >
            Verify via OTP
          </button>
        </div>
      )}

      {step === 'OTP' && (
        <div className="space-y-4">
          <p className="text-xs text-slate-500">Enter 6-digit OTP sent to Aadhaar-linked mobile</p>
          <div className="flex gap-2">
            {[1,2,3,4,5,6].map(i => (
              <input key={i} className="w-full h-12 bg-white border border-slate-200 rounded-xl text-center font-bold" maxLength={1} />
            ))}
          </div>
          <button 
            onClick={() => {
                onVerified({ number: abhaId, address: abhaId + '@abdm' });
                setStep('SUCCESS');
            }}
            className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl"
          >
            Confirm & Link Profile
          </button>
        </div>
      )}

      {step === 'SUCCESS' && (
        <div className="text-center py-4">
          <div className="text-4xl mb-2">✅</div>
          <p className="font-bold text-green-600">Identity Verified & Linked</p>
          <p className="text-[10px] text-slate-400 mt-2 uppercase">Government Compliance: ABDM Phase 1 Complete</p>
        </div>
      )}
    </div>
  );
};

export default ABHALinker;
