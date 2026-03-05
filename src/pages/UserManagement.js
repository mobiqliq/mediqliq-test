import React, { useState, useEffect } from 'react';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ username: '', password: '', fullName: '', role: 'DOCTOR' });
  
  // MODAL STATE
  const [resetModal, setResetModal] = useState({ isOpen: false, userId: null, name: '', newPass: '' });

  const loadUsers = async () => {
    const res = await window.electron.invoke('auth:get-all-users');
    if (res && res.success) setUsers(res.data);
  };

  useEffect(() => { loadUsers(); }, []);

  const handleAddUser = async (e) => {
    e.preventDefault();
    const res = await window.electron.invoke('auth:create-staff', { ...formData, canTriage: false });
    if (res.success) {
      setFormData({ username: '', password: '', fullName: '', role: 'DOCTOR' });
      loadUsers();
    }
  };

  const handleToggleTriage = async (userId, status) => {
    await window.electron.invoke('auth:toggle-triage', { userId, status });
    loadUsers();
  };

  const executeReset = async () => {
    if (resetModal.newPass.length < 4) {
      alert("Password too short!");
      return;
    }
    const res = await window.electron.invoke('auth:master-reset', { 
      userId: resetModal.userId, 
      newPassword: resetModal.newPass 
    });
    if (res.success) {
      setResetModal({ isOpen: false, userId: null, name: '', newPass: '' });
      alert("Password Updated!");
    }
  };

  return (
    <div className="p-10 max-w-7xl mx-auto relative">
      <header className="mb-10">
        <h1 className="text-4xl font-black text-slate-900 uppercase">Administration</h1>
      </header>

      {/* RESET MODAL OVERLAY */}
      {resetModal.isOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white p-10 rounded-[3rem] shadow-2xl max-w-md w-full border border-slate-100">
            <h3 className="text-xl font-black uppercase text-slate-800 mb-2">Reset Password</h3>
            <p className="text-slate-500 font-bold text-xs uppercase mb-8 text-blue-600">For: {resetModal.name}</p>
            
            <input 
              type="password"
              className="w-full border-b-4 border-slate-100 p-4 outline-none focus:border-blue-600 font-black text-2xl mb-10"
              placeholder="NEW PASSWORD"
              autoFocus
              value={resetModal.newPass}
              onChange={e => setResetModal({...resetModal, newPass: e.target.value})}
            />

            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setResetModal({ isOpen: false, userId: null, name: '', newPass: '' })}
                className="py-4 rounded-2xl font-black uppercase text-slate-400 bg-slate-50 hover:bg-slate-100 transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={executeReset}
                className="py-4 rounded-2xl font-black uppercase text-white bg-blue-600 shadow-lg hover:bg-blue-700 transition-all"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        <div className="lg:col-span-1">
          <form onSubmit={handleAddUser} className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100">
            <h3 className="text-xl font-black mb-6 uppercase text-blue-600">Add Staff</h3>
            <div className="space-y-4 mb-8">
              <input className="w-full border-b-2 p-2 outline-none font-bold text-lg" placeholder="Full Name" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} required />
              <input className="w-full border-b-2 p-2 outline-none font-bold text-lg" placeholder="Username" value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} required />
              <input className="w-full border-b-2 p-2 outline-none font-bold text-lg" type="password" placeholder="Password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} required />
              <select className="w-full border-b-2 p-2 font-bold text-lg bg-transparent" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}>
                <option value="DOCTOR">DOCTOR</option>
                <option value="NURSE">NURSE</option>
                <option value="RECEPTIONIST">RECEPTIONIST</option>
              </select>
            </div>
            <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black uppercase shadow-lg">Create</button>
          </form>
        </div>

        <div className="lg:col-span-3 bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="p-6 font-black uppercase text-slate-400 text-[10px]">Staff Identity</th>
                <th className="p-6 font-black uppercase text-slate-400 text-[10px] text-center">Triage</th>
                <th className="p-6 font-black uppercase text-slate-400 text-[10px] text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id} className="border-b last:border-0 hover:bg-slate-50 transition-colors">
                  <td className="p-6">
                    <div className="font-black text-slate-800 text-lg uppercase tracking-tight">{u.full_name}</div>
                    <div className="text-[10px] font-black uppercase text-blue-500">{u.role}</div>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center justify-center gap-6">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" checked={u.can_triage === true} onChange={() => handleToggleTriage(u.id, true)} className="w-6 h-6 accent-green-600" />
                        <span className={`text-[10px] font-black ${u.can_triage ? 'text-green-600' : 'text-slate-300'}`}>YES</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" checked={u.can_triage === false} onChange={() => handleToggleTriage(u.id, false)} className="w-6 h-6 accent-red-600" />
                        <span className={`text-[10px] font-black ${!u.can_triage ? 'text-red-600' : 'text-slate-300'}`}>NO</span>
                      </label>
                    </div>
                  </td>
                  <td className="p-6 text-center">
                    <button 
                      onClick={() => setResetModal({ isOpen: true, userId: u.id, name: u.full_name, newPass: '' })}
                      className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase hover:bg-red-600 transition-all active:scale-95 shadow-md"
                    >
                      Reset Pass
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
