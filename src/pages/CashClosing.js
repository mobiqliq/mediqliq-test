import React, { useEffect, useState } from 'react';

function CashClosing() {

  const user = JSON.parse(localStorage.getItem('user'));

  const [date, setDate] = useState('');
  const [summary, setSummary] = useState({
    cash: 0,
    upi: 0,
    card: 0,
    revenue: 0,
    expense: 0
  });
  const [physicalCash, setPhysicalCash] = useState('');
  const [alreadyClosed, setAlreadyClosed] = useState(false);
  const [monthlyMode, setMonthlyMode] = useState(false);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setDate(today);
  }, []);

  useEffect(() => {
    if (date) loadSummary();
  }, [date, monthlyMode]);

  const loadSummary = async () => {

    const invoiceFilter = monthlyMode
      ? "strftime('%Y-%m', invoice_date)=strftime('%Y-%m', ?)"
      : "DATE(invoice_date)=DATE(?)";

    const expenseFilter = monthlyMode
      ? "strftime('%Y-%m', expense_date)=strftime('%Y-%m', ?)"
      : "DATE(expense_date)=DATE(?)";

    const revenueResult = await window.electronAPI.query(
      `
      SELECT
        SUM(CASE WHEN payment_mode='CASH' AND payment_status='PAID' THEN total_amount ELSE 0 END) as cash,
        SUM(CASE WHEN payment_mode='UPI' AND payment_status='PAID' THEN total_amount ELSE 0 END) as upi,
        SUM(CASE WHEN payment_mode='CARD' AND payment_status='PAID' THEN total_amount ELSE 0 END) as card,
        SUM(CASE WHEN payment_status='PAID' THEN total_amount ELSE 0 END) as revenue
      FROM invoices
      WHERE ${invoiceFilter}
      `,
      [date]
    );

    const expenseResult = await window.electronAPI.query(
      `
      SELECT SUM(amount) as total
      FROM expenses
      WHERE ${expenseFilter}
      `,
      [date]
    );

    const closingCheck = await window.electronAPI.query(
      `
      SELECT * FROM daily_closing
      WHERE closing_date=? AND user_id=? AND is_monthly=?
      `,
      [date, user.id, monthlyMode ? 1 : 0]
    );

    setAlreadyClosed(closingCheck.data.length > 0);

    setSummary({
      cash: revenueResult.data[0]?.cash || 0,
      upi: revenueResult.data[0]?.upi || 0,
      card: revenueResult.data[0]?.card || 0,
      revenue: revenueResult.data[0]?.revenue || 0,
      expense: expenseResult.data[0]?.total || 0
    });
  };

  const closePeriod = async () => {

    if (!physicalCash) {
      alert("Enter physical cash amount");
      return;
    }

    const id = await window.electronAPI.generateId();
    const variance = physicalCash - summary.cash;

    await window.electronAPI.run(
      `
      INSERT INTO daily_closing
      (id, closing_date, user_id, system_cash, system_upi,
       system_card, total_revenue, total_expense,
       physical_cash, variance, is_monthly)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        id,
        date,
        user.id,
        summary.cash,
        summary.upi,
        summary.card,
        summary.revenue,
        summary.expense,
        Number(physicalCash),
        variance,
        monthlyMode ? 1 : 0
      ]
    );

    alert("Closed Successfully");
    setAlreadyClosed(true);
  };

  const printSummary = () => {
    window.print();
  };

  return (
    <div style={{ padding: 20 }}>

      <h2>{monthlyMode ? "Monthly Closing" : "Daily Cash Closing"}</h2>

      <label>
        <input
          type="checkbox"
          checked={monthlyMode}
          onChange={(e)=>setMonthlyMode(e.target.checked)}
        />
        Monthly Mode
      </label>

      <br/><br/>

      <input
        type="date"
        value={date}
        onChange={(e)=>setDate(e.target.value)}
      /><br/><br/>

      <p>System Cash: ₹{summary.cash}</p>
      <p>System UPI: ₹{summary.upi}</p>
      <p>System Card: ₹{summary.card}</p>
      <p>Total Revenue: ₹{summary.revenue}</p>
      <p>Total Expense: ₹{summary.expense}</p>
      <h3>Net: ₹{summary.revenue - summary.expense}</h3>

      <hr/>

      {alreadyClosed ? (
        <h3 style={{ color: "green" }}>
          Already Closed For This Period
        </h3>
      ) : (
        <>
          <input
            placeholder="Physical Cash Counted"
            value={physicalCash}
            onChange={(e)=>setPhysicalCash(e.target.value)}
          /><br/><br/>

          <button onClick={closePeriod}>
            Close {monthlyMode ? "Month" : "Day"}
          </button>
        </>
      )}

      <br/><br/>

      <button onClick={printSummary}>
        Print Summary
      </button>

    </div>
  );
}

export default CashClosing;
