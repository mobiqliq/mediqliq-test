import React, { useState } from 'react';

const HospitalRegistration = () => {
  const [formData, setFormData] = useState({
    hospital_name: '', owner_name: '', medical_practitioner_name: '',
    practitioner_license_no: '', hospital_license_no: '',
    address: '', phone: '', email: '', logo_path: ''
  });

  const handleSave = async (e) => {
    e.preventDefault();
    const res = await window.electron.invoke('hospital:save-profile', formData);
    if (res.success) {
      alert("Subscription Activated! Hospital ID: " + res.data[0].hospital_id);
      window.location.reload(); 
    } else {
      alert("Error: " + res.error);
    }
  };

  return (
    <div className="p-10 bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white p-12 rounded-3xl shadow-2xl border-t-8 border-blue-600">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-gray-800 uppercase tracking-tighter">Hospital Registration</h1>
          <p className="text-blue-600 font-bold">Mediqliq v1.0 • Subscription & Compliance Setup</p>
        </div>
        
        <form onSubmit={handleSave} className="grid grid-cols-2 gap-8">
          <div className="col-span-2">
            <label className="block text-xs font-black uppercase text-gray-400 mb-1">Full Hospital/Clinic Name</label>
            <input className="w-full border-b-2 border-gray-200 p-2 outline-none focus:border-blue-600 font-bold text-xl text-gray-800" required 
              onChange={e => setFormData({...formData, hospital_name: e.target.value})}/>
          </div>
          
          <div>
            <label className="block text-xs font-black uppercase text-gray-400 mb-1">Company Owner Name</label>
            <input className="w-full border-b-2 border-gray-200 p-2 outline-none focus:border-blue-600 font-medium" required
              onChange={e => setFormData({...formData, owner_name: e.target.value})}/>
          </div>

          <div>
            <label className="block text-xs font-black uppercase text-gray-400 mb-1">Medical Practitioner Name</label>
            <input className="w-full border-b-2 border-gray-200 p-2 outline-none focus:border-blue-600 font-medium" required
              onChange={e => setFormData({...formData, medical_practitioner_name: e.target.value})}/>
          </div>

          <div>
            <label className="block text-xs font-black uppercase text-gray-400 mb-1">Practitioner Reg/License No.</label>
            <input className="w-full border-b-2 border-gray-200 p-2 outline-none focus:border-blue-600 font-medium" required
              onChange={e => setFormData({...formData, practitioner_license_no: e.target.value})}/>
          </div>

          <div>
            <label className="block text-xs font-black uppercase text-gray-400 mb-1">Hospital License No.</label>
            <input className="w-full border-b-2 border-gray-200 p-2 outline-none focus:border-blue-600 font-medium" required
              onChange={e => setFormData({...formData, hospital_license_no: e.target.value})}/>
          </div>

          <div className="col-span-2">
            <label className="block text-xs font-black uppercase text-gray-400 mb-1">Complete Hospital Address</label>
            <textarea className="w-full border-2 border-gray-100 p-4 rounded-xl outline-none focus:border-blue-600 font-medium" required
              onChange={e => setFormData({...formData, address: e.target.value})}/>
          </div>

          <div className="col-span-2">
            <button type="submit" className="w-full bg-gray-900 hover:bg-blue-700 text-white py-5 rounded-2xl font-black text-xl shadow-xl transition-all active:scale-95">
              ACTIVATE HOSPITAL PROFILE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HospitalRegistration;
