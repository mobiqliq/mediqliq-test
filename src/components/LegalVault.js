import React, { useState } from 'react';

const LegalVault = () => {
  const [documents, setDocuments] = useState([
    { id: 1, type: 'GST Registration', number: '09AAAAA0000A1Z5', expiry: '2028-12-12', status: 'Active' },
    { id: 2, type: 'Clinical Establishment Act', number: 'CEA/2024/991', expiry: '2025-06-30', status: 'Expiring Soon' }
  ]);

  return (
    <div className="p-8 bg-slate-50 min-h-screen font-sans">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Compliance & Legal Vault</h1>
          <p className="text-slate-500 mt-1">Digital repository for hospital licenses and taxation records</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg transition-all active:scale-95">
          + Upload License / NOC
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {documents.map((doc) => (
          <div key={doc.id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-6">
              <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase ${
                doc.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
              }`}>
                {doc.status}
              </span>
              <p className="text-slate-400 text-xs font-bold tracking-widest uppercase">{doc.type}</p>
            </div>
            
            <h3 className="font-mono text-xl font-bold text-slate-800 mb-2">{doc.number}</h3>
            <p className="text-sm text-slate-500">Validity: <span className="font-bold text-slate-700">{doc.expiry}</span></p>
            
            <div className="mt-6 flex gap-2">
              <button className="flex-1 bg-slate-50 border border-slate-200 py-3 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100">
                View PDF
              </button>
              <button className="flex-1 bg-slate-50 border border-slate-200 py-3 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100">
                Update
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LegalVault;
