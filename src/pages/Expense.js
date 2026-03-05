import React, { useEffect, useState } from 'react';
import { hasRole } from '../utils/permissions';

function Expense() {

  if (!hasRole(['SUPER_ADMIN'])) {
    return <div className="card">Access Denied</div>;
  }

  const [expense, setExpense] = useState({
    expense_date: '',
    category: '',
    description: '',
    amount: '',
    payment_mode: 'CASH'
  });

  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setExpense(prev => ({ ...prev, expense_date: today }));
    loadExpenses(today);
  }, []);

  const loadExpenses = async (date) => {
    const result = await window.electronAPI.query(
      "SELECT * FROM expenses WHERE DATE(expense_date)=DATE(?)",
      [date]
    );
    if (result.success) setExpenses(result.data);
  };

  const addExpense = async () => {

    if (!expense.category || !expense.amount) {
      alert("Category and amount required");
      return;
    }

    const id = await window.electronAPI.generateId();

    const result = await window.electronAPI.run(
      `INSERT INTO expenses
       (id, expense_date, category, description, amount, payment_mode)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        id,
        expense.expense_date,
        expense.category,
        expense.description,
        Number(expense.amount),
        expense.payment_mode
      ]
    );

    if (!result.success) {
      alert("Expense entry failed");
      return;
    }

    alert("Expense added");

    setExpense({
      ...expense,
      category: '',
      description: '',
      amount: ''
    });

    loadExpenses(expense.expense_date);
  };

  return (
    <div className="card">
      <h3>Add Expense</h3>

      <input type="date"
        value={expense.expense_date}
        onChange={(e)=>setExpense({...expense,expense_date:e.target.value})}
      /><br/><br/>

      <input placeholder="Category"
        value={expense.category}
        onChange={(e)=>setExpense({...expense,category:e.target.value})}
      /><br/><br/>

      <input placeholder="Description"
        value={expense.description}
        onChange={(e)=>setExpense({...expense,description:e.target.value})}
      /><br/><br/>

      <input placeholder="Amount"
        value={expense.amount}
        onChange={(e)=>setExpense({...expense,amount:e.target.value})}
      /><br/><br/>

      <select value={expense.payment_mode}
        onChange={(e)=>setExpense({...expense,payment_mode:e.target.value})}>
        <option value="CASH">CASH</option>
        <option value="UPI">UPI</option>
        <option value="CARD">CARD</option>
      </select><br/><br/>

      <button onClick={addExpense}>Add Expense</button>

      <hr/>

      <h3>Today’s Expenses</h3>

      <table className="table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Description</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(e=>(
            <tr key={e.id}>
              <td>{e.category}</td>
              <td>{e.description}</td>
              <td>₹{e.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default Expense;
