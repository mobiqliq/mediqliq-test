import React, { useState } from 'react';

const OPD = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;
    setLoading(true);
    const res = await window.electron.invoke('patient:search', query);
    if (res.success) setResults(res.data);
    setLoading(false);
  };

  const handleCheckIn = async (patientId) => {
    const res = await window.electron.invoke('opd:create-visit', patientId);
    if (res.success) {
      alert(`Check-in Successful! Token Number: ${res.data[0].token_number}`);
      setResults([]);
      setQuery('');
    } else {
      alert("Error: " + res.error);
    }
  };

  return (
    <div className="p-10 max-w-5xl mx-auto">
      <header className="mb-10">
        <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">OPD Check-in</h1>
        <p className="text-slate-500 font-bold uppercase text-xs tracking-widest mt-1">Search & Send to Doctor Queue</p>
      </header>

      <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-slate-100 mb-10">
        <form onSubmit={handleSearch} className="flex gap-4">
          <input 
            className="flex-1 bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white p-4 rounded-2xl outline-none font-bold text-lg transition-all"
            placeholder="Search by Patient Name or UHID..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black uppercase shadow-lg hover:bg-blue-700">
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>
      </div>

      {results.length > 0 && (
        <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="p-6 text-xs font-black uppercase text-slate-400">UHID</th>
                <th className="p-6 text-xs font-black uppercase text-slate-400">Patient Name</th>
                <th className="p-6 text-xs font-black uppercase text-slate-400">Action</th>
              </tr>
            </thead>
            <tbody>
              {results.map(p => (
                <tr key={p.id} className="border-b last:border-0 hover:bg-blue-50/30 transition-colors">
                  <td className="p-6 font-mono text-blue-600 font-bold">{p.uhid}</td>
                  <td className="p-6">
                    <div className="font-black text-slate-800 uppercase">{p.first_name} {p.last_name}</div>
                    <div className="text-[10px] text-slate-400 font-bold">{p.phone}</div>
                  </td>
                  <td className="p-6">
                    <button 
                      onClick={() => handleCheckIn(p.id)}
                      className="bg-green-600 text-white px-6 py-2 rounded-xl font-black text-xs uppercase hover:bg-green-700 shadow-md"
                    >
                      Check-in Now
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OPD;
