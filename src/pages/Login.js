import React, { useState } from 'react';

const Login = ({ onLoginSuccess }) => {
  const [creds, setCreds] = useState({ u: '', p: '' });

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Sending Login:", creds.u);
    const res = await window.electron.invoke('auth:login', { u: creds.u, p: creds.p });
    if (res.success) {
      onLoginSuccess(res.user);
    } else {
      alert("Access Denied: " + res.error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-slate-950">
      <form onSubmit={handleLogin} className="bg-white p-12 rounded-[3rem] shadow-2xl w-96 border-b-8 border-blue-600">
        <h2 className="text-3xl font-black text-slate-800 mb-8 uppercase tracking-tighter text-center">Mediqliq Login</h2>
        <input 
          className="w-full border-2 border-slate-100 p-4 rounded-2xl mb-4 font-bold outline-none focus:border-blue-600" 
          placeholder="Username" 
          onChange={e => setCreds({...creds, u: e.target.value})} 
        />
        <input 
          className="w-full border-2 border-slate-100 p-4 rounded-2xl mb-8 font-bold outline-none focus:border-blue-600" 
          type="password" 
          placeholder="Password" 
          onChange={e => setCreds({...creds, p: e.target.value})} 
        />
        <button className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-xl shadow-lg hover:bg-blue-700 active:scale-95 transition-all">
          SIGN IN
        </button>
      </form>
    </div>
  );
};

export default Login;
