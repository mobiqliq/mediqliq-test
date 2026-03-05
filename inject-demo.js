const fs = require('fs-extra');
const path = require('path');
const dayjs = require('dayjs');

const DB_PATH = path.join(__dirname, 'db.json'); 

const generateData = () => {
  const analytics = [];
  for (let i = 30; i >= 0; i--) {
    const date = dayjs().subtract(i, 'day').format('YYYY-MM-DD');
    analytics.push({
      date,
      revenue: Math.floor(Math.random() * (50000 - 15000) + 15000),
      patients: Math.floor(Math.random() * (40 - 5) + 5),
      consultations: Math.floor(Math.random() * 25)
    });
  }
  return analytics;
};

const run = async () => {
  try {
    const data = { 
      version: "1.0",
      lastUpdated: new Date().toISOString(),
      hospitalYield: generateData() 
    };
    await fs.writeJson(DB_PATH, data, { spaces: 2 });
    console.log('✅ Success: 30 days of Demo Data injected into db.json');
  } catch (err) {
    console.error('❌ Error:', err);
  }
};

run();
