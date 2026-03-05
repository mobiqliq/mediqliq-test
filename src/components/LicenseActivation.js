import React, { useState } from 'react';

const LicenseActivation = ({ onActivate }) => {
  const [key, setKey] = useState('');
  const [isValidating, setIsValidating] = useState(false);

  const handleActivate = async () => {
    setIsValidating(true);
    // Simulate IPC call to the 'Brain' for decryption
    setTimeout(() => {
      onActivate(key);
      setIsValidating(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center p-12 bg-white rounded-[3rem] shadow-2xl border border-slate-100 max-w-md mx-auto mt-20">
      <div className="text-5xl mb-6">🛡️</div>
      <h2 className="text-2xl font-black text-slate-900 mb-2 text-center">Activate Mediqliq OS</h2>
      <p className="text-slate-400 text-center text-sm mb-8 px-4">
        Enter your 16-character license key to authorize this workstation.
      </p>

      <input 
        className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-3xl text-center font-mono text-xl tracking-[0.2em] focus:border-blue-500 outline-none transition-all"
        placeholder="XXXX-XXXX-XXXX-XXXX"
        maxLength={19}
        onChange={(e) => setKey(e.target.value.toUpperCase())}
      />

      <button 
        disabled={key.length < 16 || isValidating}
        onClick={handleActivate}
        className={`mt-8 w-full py-5 rounded-3xl font-black text-white shadow-xl transition-all active:scale-95 ${
          isValidating ? 'bg-slate-400 cursor-not-allowed' : 'bg-slate-900 hover:bg-blue-600'
        }`}
      >
        {isValidating ? 'Verifying with Global Server...' : 'Authorize Terminal'}
      </button>

      <p className="mt-6 text-[10px] text-slate-400 uppercase font-bold tracking-widest">
        Hardware ID: {window.process?.platform || 'MBP-MQ-2026'}
      </p>
    </div>
  );
};

export default LicenseActivation;
