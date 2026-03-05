import React, { useState, useEffect } from 'react';

const Pharmacy = () => {
  const [pendingDispense, setPendingDispense] = useState([]);
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    // Fetch visits that are 'COMPLETED' by doctor but not 'DISPENSED'
    window.electron.invoke('pharmacy:get-pending').then(res => {
      if (res.success) setPendingDispense(res.data);
    });
    window.electron.invoke('pharmacy:get-inventory').then(res => {
      if (res.success) setInventory(res.data);
    });
  }, []);

  const handleDispense = async (visitId, prescription) => {
    const res = await window.electron.invoke('pharmacy:dispense', { visitId, items: JSON.parse(prescription) });
    if (res.success) {
      alert("Stock Deducted & Added to Bill!");
      window.location.reload(); 
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '900', color: '#0f172a' }}>Pharmacy Desk</h1>
        <p style={{ color: '#64748b', fontWeight: 'bold', fontSize: '11px', textTransform: 'uppercase' }}>Auto-Deduct & Dispensing Engine</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '30px' }}>
        {/* DISPENSING QUEUE */}
        <section>
          <h3 style={{ fontSize: '14px', fontWeight: '900', color: '#2563eb', textTransform: 'uppercase', marginBottom: '20px' }}>Pending Prescriptions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {pendingDispense.map(v => (
              <div key={v.id} style={{ backgroundColor: 'white', padding: '25px', borderRadius: '24px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: '900', fontSize: '16px' }}>{v.first_name} {v.last_name}</div>
                  <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 'bold' }}>{JSON.parse(v.prescription).length} Medicines Prescribed</div>
                </div>
                <button 
                  onClick={() => handleDispense(v.id, v.prescription)}
                  style={{ backgroundColor: '#059669', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '12px', fontWeight: '900', cursor: 'pointer', fontSize: '11px' }}
                >
                  DISPENSE & BILL
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* QUICK STOCK VIEW (Resource Lightness) */}
        <aside>
           <h3 style={{ fontSize: '14px', fontWeight: '900', color: '#64748b', textTransform: 'uppercase', marginBottom: '20px' }}>Low Stock Alert</h3>
           <div style={{ backgroundColor: '#fff1f2', padding: '20px', borderRadius: '24px', border: '1px solid #fecdd3' }}>
              {inventory.filter(i => i.stock_quantity < 10).map(i => (
                <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #fecdd3' }}>
                  <span style={{ fontWeight: 'bold', fontSize: '13px' }}>{i.item_name}</span>
                  <span style={{ fontWeight: '900', color: '#be123c' }}>{i.stock_quantity} Left</span>
                </div>
              ))}
           </div>
        </aside>
      </div>
    </div>
  );
};

export default Pharmacy;
