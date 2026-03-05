import React, { useState } from 'react';

const StaffOnboarding = ({ departments, onSave }) => {
  const [formData, setFormData] = useState({
    name: '', role: 'DOCTOR', deptId: '', reg_number: '', qualifications: ''
  });

  return (
    <div className="p-10 bg-white rounded-[2rem] shadow-2xl border border-slate-100 max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-black text-slate-900">Add New Practitioner</h2>
        <p className="text-slate-500">Onboard doctors, nurses, or administrative staff to the Mediqliq OS.</p>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Full Name</label>
            <input className="w-full mt-2 p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 ring-blue-500" 
              placeholder="Dr. Manish Thapa" onChange={(e) => setFormData({...formData, name: e.target.value})} />
          </div>
          
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">System Role</label>
            <select className="w-full mt-2 p-4 bg-slate-50 border-none rounded-2xl"
              onChange={(e) => setFormData({...formData, role: e.target.value})}>
              <option value="DOCTOR">Consulting Doctor</option>
              <option value="FRONT_DESK">Front Desk / Reception</option>
              <option value="PHARMACIST">Pharmacist</option>
              <option value="ADMIN">Hospital Admin</option>
            </select>
          </div>
        </div>

        <div className="space-y-6">
          {formData.role === 'DOCTOR' && (
            <>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Medical Reg No (DCI/NMC)</label>
                <input className="w-full mt-2 p-4 bg-slate-50 border-none rounded-2xl" 
                  placeholder="Reg-12345-A" onChange={(e) => setFormData({...formData, reg_number: e.target.value})} />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Qualifications</label>
                <input className="w-full mt-2 p-4 bg-slate-50 border-none rounded-2xl" 
                  placeholder="BDS, MDS (Endodontics)" onChange={(e) => setFormData({...formData, qualifications: e.target.value})} />
              </div>
            </>
          )}
        </div>
      </div>

      <button onClick={() => onSave(formData)} 
        className="mt-10 w-full bg-slate-900 text-white font-black py-5 rounded-3xl shadow-xl hover:bg-blue-600 transition-all active:scale-95">
        Activate Practitioner Access
      </button>
    </div>
  );
};

export default StaffOnboarding;
