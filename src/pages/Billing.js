import React, { useState, useEffect } from 'react';

const Billing = ({ visitId, patient, onComplete }) => {
  const [items, setItems] = useState([
    { desc: 'Consultation Fee', qty: 1, price: 500, taxRate: 0 }
  ]);
  const [paymentMode, setPaymentMode] = useState('UPI');

  const calculateTotal = () => {
    const net = items.reduce((acc, item) => acc + (item.qty * item.price), 0);
    const tax = items.reduce((acc, item) => acc + (item.qty * item.price * (item.taxRate / 100)), 0);
    return { net, tax, total: net + tax };
  };

  const finalizeBill = async () => {
    const totals = calculateTotal();
    const payload = {
      visitId,
      patientId: patient.id,
      items,
      ...totals,
      paymentMode
    };

    const res = await window.electron.invoke('finance:process-bill', payload);
    if (res.success) {
      alert("Invoice Generated & Ledger Updated!");
      onComplete();
    }
  };

  return (
    <div style={{ padding: '40px', backgroundColor: 'white', borderRadius: '30px', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}>
      <h2 style={{ fontSize: '24px', fontWeight: '900', color: '#0f172a', marginBottom: '30px', textTransform: 'uppercase' }}>Financial Checkout</h2>
      
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px' }}>
        <thead>
          <tr style={{ textAlign: 'left', borderBottom: '2px solid #f1f5f9' }}>
            <th style={{ padding: '15px', fontSize: '10px', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase' }}>Description</th>
            <th style={{ padding: '15px', fontSize: '10px', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase' }}>Price</th>
            <th style={{ padding: '15px', fontSize: '10px', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase' }}>Tax %</th>
            <th style={{ padding: '15px', fontSize: '10px', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase' }}>Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
              <td style={{ padding: '15px', fontWeight: 'bold' }}>{item.desc}</td>
              <td style={{ padding: '15px', fontWeight: 'bold' }}>₹{item.price}</td>
              <td style={{ padding: '15px', fontWeight: 'bold' }}>{item.taxRate}%</td>
              <td style={{ padding: '15px', fontWeight: '900' }}>₹{item.price + (item.price * item.taxRate / 100)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ backgroundColor: '#f8fafc', padding: '30px', borderRadius: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <label style={{ display: 'block', fontSize: '10px', fontWeight: '900', color: '#64748b', marginBottom: '10px' }}>PAYMENT MODE</label>
          <select value={paymentMode} onChange={(e) => setPaymentMode(e.target.value)} style={{ padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', fontWeight: 'bold' }}>
            <option>UPI</option><option>CASH</option><option>CARD</option><option>NET BANKING</option>
          </select>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '14px', color: '#64748b', fontWeight: 'bold' }}>Amount: ₹{calculateTotal().net} + Tax: ₹{calculateTotal().tax}</div>
          <div style={{ fontSize: '32px', fontWeight: '900', color: '#0f172a' }}>Total: ₹{calculateTotal().total}</div>
        </div>
      </div>

      <button onClick={finalizeBill} style={{ width: '100%', marginTop: '30px', padding: '20px', backgroundColor: '#059669', color: 'white', border: 'none', borderRadius: '15px', fontWeight: '900', cursor: 'pointer', textTransform: 'uppercase' }}>
        Finalize & Sync to Ledger
      </button>
    </div>
  );
};

export default Billing;
