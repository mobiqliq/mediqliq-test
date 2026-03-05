import React, { useEffect, useState } from 'react';
import { hasRole } from '../utils/permissions';

function FinanceReport() {

  if (!hasRole(['SUPER_ADMIN'])) {
    return <div className="card">Access Denied</div>;
  }

  const [date, setDate] = useState('');
  const [summary, setSummary] = useState({
    total_revenue: 0,
    cash_total: 0,
    upi_total: 0,
    card_total: 0,
    total_gst: 0,
    total_refunded: 0,
    total_expense: 0
  });

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setDate(today);
  }, []);

  useEffect(() => {
    if (date) loadSummary();
  }, [date]);

  const loadSummary = async () => {

    const revenueResult = await window.electronAPI.query(
      `
      SELECT
        SUM(CASE WHEN payment_status = 'PAID' THEN total_amount ELSE 0 END) as total_revenue,
        SUM(CASE WHEN payment_status = 'PAID' AND payment_mode = 'CASH' THEN total_amount ELSE 0 END) as cash_total,
        SUM(CASE WHEN payment_status = 'PAID' AND payment_mode = 'UPI' THEN total_amount ELSE 0 END) as upi_total,
        SUM(CASE WHEN payment_status = 'PAID' AND payment_mode = 'CARD' THEN total_amount ELSE 0 END) as card_total,
        SUM(CASE WHEN payment_status = 'PAID' THEN gst_amount ELSE 0 END) as total_gst,
        SUM(CASE WHEN payment_status = 'REFUNDED' THEN total_amount ELSE 0 END) as total_refunded
      FROM invoices
      WHERE DATE(invoice_date) = DATE(?)
      `,
      [date]
    );

    const expenseResult = await window.electronAPI.query(
      `
      SELECT SUM(amount) as total_expense
      FROM expenses
      WHERE DATE(expense_date) = DATE(?)
      `,
      [date]
    );

    if (revenueResult.success && revenueResult.data.length > 0) {
      setSummary({
        ...revenueResult.data[0],
        total_expense: expenseResult.data[0]?.total_expense || 0
      });
    }
  };

  const netProfit =
    (summary.total_revenue || 0) -
    (summary.total_expense || 0);

  return (
    <div className="card">
      <h3>Daily Financial Summary</h3>

      <input
        type="date"
        value={date}
        onChange={(e)=>setDate(e.target.value)}
      /><br/><br/>

      <p><strong>Total Revenue:</strong> ₹{summary.total_revenue || 0}</p>
      <p><strong>Cash:</strong> ₹{summary.cash_total || 0}</p>
      <p><strong>UPI:</strong> ₹{summary.upi_total || 0}</p>
      <p><strong>Card:</strong> ₹{summary.card_total || 0}</p>
      <p><strong>Total GST:</strong> ₹{summary.total_gst || 0}</p>
      <p><strong>Total Refunded:</strong> ₹{summary.total_refunded || 0}</p>

      <hr/>

      <p><strong>Total Expense:</strong> ₹{summary.total_expense || 0}</p>

      <hr/>

      <h2>Net Profit: ₹{netProfit}</h2>
    </div>
  );
}

export default FinanceReport;
