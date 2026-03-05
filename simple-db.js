// Simple database using SQLite3 (easier to install)
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const DB_PATH = path.join(__dirname, 'mediqliq.db');

class SimpleDatabase {
  constructor() {
    this.db = null;
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.db = new sqlite3.Database(DB_PATH, (err) => {
        if (err) {
          console.error('Database connection failed:', err);
          reject(err);
        } else {
          console.log('✅ Database connected');
          this.initialize();
          resolve(this.db);
        }
      });
    });
  }

  initialize() {
    try {
      const schemaPath = path.join(__dirname, 'schema.sql');
      if (fs.existsSync(schemaPath)) {
        const schema = fs.readFileSync(schemaPath, 'utf8');
        
        // Run schema
        this.db.exec(schema, (err) => {
          if (err) {
            console.log('Schema may already exist, continuing...');
          } else {
            console.log('✅ Database schema ready');
          }
        });
      }
    } catch (error) {
      console.error('Schema error:', error);
    }
  }

  query(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) reject(err);
        else resolve({ success: true, data: rows });
      });
    });
  }

  queryOne(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, row) => {
        if (err) reject(err);
        else resolve({ success: true, data: row });
      });
    });
  }

  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function(err) {
        if (err) reject(err);
        else resolve({ success: true, data: { lastID: this.lastID, changes: this.changes } });
      });
    });
  }

  generateId() {
    return 'id-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  }

  generateUHID() {
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
    return `MEDIQ-${year}-${random}`;
  }

  generateInvoiceNumber() {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const random = Math.floor(Math.random() * 999).toString().padStart(3, '0');
    return `INV-${year}${month}${day}-${random}`;
  }

  close() {
    if (this.db) {
      this.db.close();
      console.log('Database closed');
    }
  }
}

module.exports = new SimpleDatabase();
