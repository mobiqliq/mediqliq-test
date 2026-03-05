import React, { useState } from 'react';

const SmartBilling = ({ patient, services }) => {
  const [cart, setCart] = useState([]);
  const [paymentMode, setPaymentMode] = useState('UPI');

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="p-8 bg-white rounded-[3rem] shadow-2xl border border-slate-100 max-w-5xl flex gap-8">
      {/* Left: Service Selection */}
      <div className="flex-1">
        <h2 className="text-2xl font-black mb-6">Quick Bill: {patient.name}</h2>
        <div className="grid grid-cols-2 gap-4">
          {['Registration', 'Consultation', 'Blood Test', 'X-Ray'].map(service => (
            <button 
              key={service}
              className="p-4 bg-slate-50 hover:bg-blue-50 border border-transparent hover:border-blue-200 rounded-2xl text-left transition-all"
              onClick={() => setCart([...cart, { name: service, price: 500 }])}
            >
              <p className="text-[10px] font-black text-blue-600 uppercase">Service</p>
              <p className="font-bold text-slate-800">{service}</p>
              <p className="text-sm text-slate-500">₹500.00</p>
            </button>
          ))}
        </div>
      </div>

      {/* Right: Payment Collection (The Indian Reality) */}
      <div className="w-80 bg-slate-900 rounded-[2.5rem] p-8 text-white">
        <h3 className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Amount Due</h3>
        <p className="text-5xl font-black mt-2">₹{total}</p>

        <div className="mt-10 space-y-4">
          <label className="block text-[10px] font-bold text-slate-500 uppercase">Payment Mode</label>
          <div className="grid grid-cols-2 gap-2">
            {['CASH', 'UPI', 'CARD', 'TPA'].map(mode => (
              <button 
                key={mode}
                onClick={() => setPaymentMode(mode)}
                className={`py-3 rounded-xl text-xs font-bold border ${
                  paymentMode === mode ? 'bg-blue-600 border-blue-600' : 'border-slate-700'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
          
          <input 
            className="w-full bg-slate-800 border-none rounded-xl p-4 text-sm mt-4" 
            placeholder="UPI Transaction ID / Ref" 
          />
        </div>

        <button className="w-full bg-white text-slate-900 font-black py-5 rounded-2xl mt-8 shadow-xl hover:bg-green-400 transition-all active:scale-95">
          Collect & Print Receipt
        </button>
      </div>
    </div>
  );
};

export default SmartBilling;
