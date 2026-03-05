import React from 'react';

const ReorderDashboard = ({ lowStockItems }) => {
  return (
    <div className="p-10 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Supply Chain & Reorder</h1>
            <p className="text-slate-500 font-medium italic">Auto-calculated based on current NLEM inventory levels</p>
          </div>
          <button className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black shadow-lg hover:scale-95 transition-all">
            Generate Bulk Purchase Order
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {lowStockItems.map(item => (
            <div key={item.id} className="bg-white p-6 rounded-[2.5rem] border border-red-100 flex justify-between items-center shadow-sm">
              <div className="flex gap-6 items-center">
                <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center font-black">
                  !
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-lg">{item.name}</h4>
                  <div className="flex gap-2 mt-1">
                    <span className="text-[10px] bg-slate-100 px-2 py-1 rounded font-bold">{item.atcCode}</span>
                    {item.isNlem && <span className="text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded font-bold uppercase">NLEM</span>}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-12">
                <div className="text-center">
                  <p className="text-[10px] font-black text-slate-400 uppercase">Current Stock</p>
                  <p className="text-xl font-black text-red-600">{item.qty} units</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-black text-slate-400 uppercase">Suggested Order</p>
                  <input type="number" className="w-20 p-2 bg-slate-50 border rounded-lg text-center font-bold" defaultValue={item.reorderQty} />
                </div>
                <select className="bg-slate-50 p-2 rounded-xl text-xs font-bold border-none outline-none">
                  <option>Primary Vendor: Apex Pharma</option>
                  <option>Secondary: Global Meds</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReorderDashboard;
