/**
 * Requirement: Dynamic Routing for Data Residency Compliance
 */
const { Pool } = require('pg');

const regionalPools = {
    'IN': new Pool({ connectionString: process.env.DB_URL_INDIA }),
    'US': new Pool({ connectionString: process.env.DB_URL_USA }),
    'EU': new Pool({ connectionString: process.env.DB_URL_EUROPE })
};

const getRegionalDb = (orgCountryCode) => {
    const pool = regionalPools[orgCountryCode] || regionalPools['IN'];
    return pool;
};

module.exports = { getRegionalDb };
