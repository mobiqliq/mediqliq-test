const { Pool } = require("pg");

class MediqliqDB {

  constructor() {

    this.pool = new Pool({
      user: "manishthapa",
      host: "localhost",
      database: "mediqliq",
      port: 5432
    });

  }

  async connect() {

    try {

      const client = await this.pool.connect();
      console.log("✅ PostgreSQL connected");
      client.release();

    } catch (err) {

      console.error("❌ Database connection failed");
      console.error(err);
      throw err;

    }

  }

  async query(sql, params = []) {

    try {

      const result = await this.pool.query(sql, params);

      return {
        success: true,
        data: result.rows
      };

    } catch (err) {

      console.error("Query failed:", err);

      return {
        success: false,
        error: err.message
      };

    }

  }

  async run(sql, params = []) {

    try {

      await this.pool.query(sql, params);

      return { success: true };

    } catch (err) {

      console.error("Run failed:", err);

      return {
        success: false,
        error: err.message
      };

    }

  }

}

module.exports = new MediqliqDB();
