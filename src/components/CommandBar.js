import React, { useState, useEffect } from 'react';

const CommandBar = ({ userRole, isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  // Mock filtered results based on role
  const getResults = (q) => {
    const allData = [
      { id: 1, type: 'PATIENT', title: 'Manish Thapa', detail: 'UHID: MQL-1001', roles: ['ADMIN', 'DOCTOR', 'FRONT_DESK'] },
      { id: 2, type: 'MEDICINE', title: 'Amoxicillin 500mg', detail: 'Stock: 450 units', roles: ['ADMIN', 'PHARMACIST', 'DOCTOR'] },
      { id: 3, type: 'FINANCE', title: 'Daily Revenue Report', detail: 'Total: ₹45,000', roles: ['ADMIN'] },
      { id: 4, type: 'LEGAL', title: 'GST Certificate', detail: 'Expires: Dec 2028', roles: ['ADMIN'] }
    ];
    return allData.filter(item => 
      item.roles.includes(userRole) && 
      item.title.toLowerCase().includes(q.toLowerCase())
    );
  };

  useEffect(() => {
    setResults(query.length > 1 ? getResults(query) : []);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-start justify-center pt-20">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
        <div className="p-4 border-b flex items-center gap-4 bg-slate-50">
          <span className="text-2xl">🔍</span>
          <input 
            autoFocus
            className="w-full bg-transparent text-xl font-medium outline-none text-slate-800"
            placeholder="Search patients, medicines, or reports..."
            onChange={(e) => setQuery(e.target.value)}
          />
          <kbd className="bg-slate-200 px-2 py-1 rounded text-[10px] font-bold text-slate-500">ESC</kbd>
        </div>
        
        <div className="max-h-96 overflow-y-auto p-2">
          {results.length > 0 ? results.map(res => (
            <div key={res.id} className="p-4 hover:bg-blue-50 rounded-2xl cursor-pointer flex justify-between items-center group">
              <div>
                <p className="text-[10px] font-black text-blue-600 uppercase mb-1">{res.type}</p>
                <h4 className="font-bold text-slate-800">{res.title}</h4>
                <p className="text-xs text-slate-500">{res.detail}</p>
              </div>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-600 font-bold">Open →</span>
            </div>
          )) : (
            <p className="p-10 text-center text-slate-400 text-sm">Type to search across your authorized modules...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommandBar;
