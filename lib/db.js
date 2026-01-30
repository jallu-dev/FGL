import pkg from "pg";
const { Pool } = pkg;

// Prevent multiple pools in dev / hot reload
let pool;

if (!global._pgPool) {
  global._pgPool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false, // required for Neon
    },

    // --- important for serverless ---
    max: 5,                     // limit connections per instance
    idleTimeoutMillis: 30000,   // close idle clients after 30s
    connectionTimeoutMillis: 2000, // fail fast if Neon is cold
  });
}

pool = global._pgPool;

export { pool };

