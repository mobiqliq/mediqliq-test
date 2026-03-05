const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const bcrypt = require('bcrypt');
const db = require('../database/db');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  mainWindow.loadURL('http://127.0.0.1:3000');
}

async function safeQuery(sql, params = []) {
  try {
    return await db.query(sql, params);
  } catch (err) {
    console.log("Safe query ignored:", err.message);
    return { success: false, data: [] };
  }
}

async function safeRun(sql, params = []) {
  try {
    return await db.run(sql, params);
  } catch (err) {
    console.log("Safe run ignored:", err.message);
    return { success: false };
  }
}

// ---------- SAFE STARTUP ----------

async function startup() {

  await db.connect();

  console.log("Checking for unclosed past days...");

  const today = new Date().toISOString().split('T')[0];

  const invoiceDates = await safeQuery(
    `
    SELECT DISTINCT DATE(invoice_date) as date
    FROM invoices
    WHERE DATE(invoice_date) < DATE($1)
    `,
    [today]
  );

  for (const row of invoiceDates.data || []) {

    const date = row.date;

    const closed = await safeQuery(
      `
      SELECT *
      FROM daily_closing
      WHERE closing_date=$1 AND is_monthly=false
      `,
      [date]
    );

    if (!closed.data || closed.data.length === 0) {

      const revenue = await safeQuery(
        `
        SELECT
          SUM(CASE WHEN payment_mode='CASH' AND payment_status='PAID' THEN total_amount ELSE 0 END) as cash,
          SUM(CASE WHEN payment_mode='UPI' AND payment_status='PAID' THEN total_amount ELSE 0 END) as upi,
          SUM(CASE WHEN payment_mode='CARD' AND payment_status='PAID' THEN total_amount ELSE 0 END) as card,
          SUM(CASE WHEN payment_status='PAID' THEN total_amount ELSE 0 END) as total
        FROM invoices
        WHERE DATE(invoice_date)=DATE($1)
        `,
        [date]
      );

      const expense = await safeQuery(
        `
        SELECT SUM(amount) as total
        FROM expenses
        WHERE DATE(expense_date)=DATE($1)
        `,
        [date]
      );

      await safeRun(
        `
        INSERT INTO daily_closing
        (id, closing_date, user_id,
         system_cash, system_upi, system_card,
         total_revenue, total_expense,
         physical_cash, variance, is_monthly)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,false)
        `,
        [
          'auto-' + Date.now(),
          date,
          'SYSTEM',
          revenue.data?.[0]?.cash || 0,
          revenue.data?.[0]?.upi || 0,
          revenue.data?.[0]?.card || 0,
          revenue.data?.[0]?.total || 0,
          expense.data?.[0]?.total || 0,
          revenue.data?.[0]?.cash || 0,
          0
        ]
      );

      console.log("Auto-closed:", date);
    }
  }

  createWindow();
}

app.whenReady().then(startup);

// ---------- GENERIC DB IPC ----------

ipcMain.handle('query', async (event, sql, params) => {
  return await db.query(sql, params);
});

ipcMain.handle('run', async (event, sql, params) => {
  return await db.run(sql, params);
});

// ---------- LOGIN ----------

ipcMain.handle('loginUser', async (event, username, password) => {

  const result = await safeQuery(
    `SELECT * FROM users WHERE username=$1`,
    [username]
  );

  if (!result.data || result.data.length === 0) {
    return { success: false };
  }

  const user = result.data[0];

  const match = await bcrypt.compare(password, user.password_hash);

  if (!match) return { success: false };

  return {
    success: true,
    user: {
      id: user.id,
      username: user.username,
      role: user.role,
      full_name: user.full_name
    }
  };
});

// ---------- ID GENERATORS ----------

ipcMain.handle('generateId', async () => {
  return 'id-' + Date.now();
});

ipcMain.handle('generateInvoice', async () => {
  return 'INV-' + Date.now();
});

// ---------- HOSPITAL INFO ----------

ipcMain.handle("getHospital", async () => {

  const result = await safeQuery(
    `
    SELECT *
    FROM hospital
    LIMIT 1
    `
  );

  if (!result.data || result.data.length === 0) {
    return null;
  }

  return result.data[0];
});
