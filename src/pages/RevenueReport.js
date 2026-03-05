import React, { useEffect, useState } from 'react';

function RevenueReport() {
  const [data, setData] = useState([]);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setFromDate(today);
    setToDate(today);
  }, []);

  useEffect(() => {
    if (fromDate && toDate) {
      loadReport();
    }
  }, [fromDate, toDate]);

  const loadReport = async () => {
    const result = await window.electronAPI.query(
      `
      SELECT d.name,
             COUNT(i.id) as total_visits,
             SUM(i.total_amount) as total_revenue,
             SUM(i.gst_amount) as total_gst
      FROM invoices i
      JOIN doctors d ON i.doctor_id = d.id
      WHERE i.payment_status = 'PAID'
      AND DATE(i.invoice_date) BETWEEN DATE(?) AND DATE(?)
      GROUP BY d.name
      `,
      [fromDate, toDate]
    );

    if (result.success) setData(result.data);
  };

  const exportCSV = () => {
    if (!data.length) return;

    const header = ['Doctor', 'Total Visits', 'Total Revenue', 'Total GST'];
    const rows = data.map(row => [
      row.name,
      row.total_visits,
      row.total_revenue || 0,
      row.total_gst || 0
    ]);

    const csvContent =
      [header, ...rows]
        .map(e => e.join(","))
        .join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "doctor_revenue_report.csv";
    link.click();
  };

  return (
    <div className="card">
      <h3>Doctor Revenue Report</h3>

      <div style={{ marginBottom: '20px' }}>
        <label>From: </label>
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />

        <label style={{ marginLeft: '15px' }}>To: </label>
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />

        <button
          className="btn btn-primary"
          style={{ marginLeft: '15px' }}
          onClick={loadReport}
        >
          Filter
        </button>

        <button
          className="btn btn-secondary"
          style={{ marginLeft: '10px' }}
          onClick={exportCSV}
        >
          Export CSV
        </button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Doctor</th>
            <th>Total Visits</th>
            <th>Total Revenue</th>
            <th>Total GST</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.name}</td>
              <td>{row.total_visits}</td>
              <td>₹{row.total_revenue || 0}</td>
              <td>₹{row.total_gst || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RevenueReport;
