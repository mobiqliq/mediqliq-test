import React, { useState, useEffect } from 'react';

const FinanceDashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    window.electron.invoke('finance:get-stats').then(res => {
      if (res.success) setData(res.data);
    });
  }, []);

  const cardStyle = {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '28px',
    border: '1px solid #f1f5f9',
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
  };

  if (!data) return <div style={{ padding: '40px', fontWeight: '900' }}>SECURELY LOADING FINANCIALS...</div>;

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: '900', color: '#0f172a', margin: 0 }}>Finance & Taxation</h1>
          <p style={{ color: '#64748b', fontWeight: 'bold', fontSize: '11px', textTransform: 'uppercase' }}>Bookkeeping-Ready Ledger Status</p>
        </div>
        <button style={{ padding: '12px 24px', backgroundColor: '#0f172a', color: 'white', border: 'none', borderRadius: '12px', fontWeight: '900', fontSize: '11px', cursor: 'pointer' }}>
          EXPORT TAX BUNDLE (.CSV)
        </button>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '25px', marginBottom: '40px' }}>
        <div style={{ ...cardStyle, borderTop: '8px solid #059669' }}>
          <span style={{ fontSize: '10px', fontWeight: '900', color: '#94a3b8' }}>MONTH-TO-DATE REVENUE</span>
          <div style={{ fontSize: '36px', fontWeight: '900', color: '#059669', margin: '10px 0' }}>₹{data.mtd.total || 0}</div>
          <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#64748b' }}>Includes ₹{data.mtd.tax || 0} Tax Liability</span>
        </div>

        <div style={{ ...cardStyle, borderTop: '8px solid #2563eb' }}>
          <span style={{ fontSize: '10px', fontWeight: '900', color: '#94a3b8' }}>DIGITAL ADOPTION</span>
          <div style={{ fontSize: '36px', fontWeight: '900', color: '#2563eb', margin: '10px 0' }}>
            {Math.round((data.paymentSplit.find(p => p.payment_mode !== 'CASH')?.amount / data.mtd.total) * 100) || 0}%
          </div>
          <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#64748b' }}>Non-Cash Transactions</span>
        </div>

        <div style={{ ...cardStyle, borderTop: '8px solid #f59e0b' }}>
          <span style={{ fontSize: '10px', fontWeight: '900', color: '#94a3b8' }}>ACCOUNTS PAYABLE</span>
          <div style={{ fontSize: '36px', fontWeight: '900', color: '#f59e0b', margin: '10px 0' }}>₹0.00</div>
          <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#64748b' }}>Vendor Dues (Plug-in Pending)</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '25px' }}>
        <div style={cardStyle}>
          <h3 style={{ fontSize: '14px', fontWeight: '900', marginBottom: '20px', textTransform: 'uppercase' }}>Revenue by Service Line</h3>
          {data.byCategory.map((cat, i) => (
            <div key={i} style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px', fontWeight: 'bold' }}>
                <span>{cat.category}</span>
                <span>₹{cat.amount}</span>
              </div>
              <div style={{ height: '8px', backgroundColor: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${(cat.amount / data.mtd.total) * 100}%`, height: '100%', backgroundColor: '#2563eb' }}></div>
              </div>
            </div>
          ))}
        </div>

        <div style={cardStyle}>
          <h3 style={{ fontSize: '14px', fontWeight: '900', marginBottom: '20px', textTransform: 'uppercase' }}>Tax Buckets</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
             <div style={{ padding: '15px', borderRadius: '16px', backgroundColor: '#f8fafc' }}>
               <span style={{ fontSize: '10px', fontWeight: '900', color: '#64748b' }}>ESTIMATED GST (CGST+SGST)</span>
               <div style={{ fontSize: '20px', fontWeight: '900', color: '#0f172a' }}>₹{data.mtd.tax || 0}</div>
             </div>
             <p style={{ fontSize: '11px', color: '#94a3b8', lineHeight: '1.4' }}>
               *Calculated based on a 5% average service tax rate. Adjust in settings for global VAT compliance.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceDashboard;
