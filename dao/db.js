// dao/db.js
const { Pool } = require("pg");
const config = require("../config"); // Adjust the path as necessary

const pool = new Pool({
  connectionString: config.databaseUrl,
});

const executeQuery = async (query, values) => {
  try {
    const client = await pool.connect();
    try {
      const result = await client.query(query, values);
      return result;
    } finally {
      client.release();
    }
  } catch (err) {
    console.error("Database query error", err.stack);
    throw err;
  }
};

module.exports = {
  executeQuery,
};
