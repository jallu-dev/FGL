import pkg from "pg";
const { Pool } = pkg;

let pool;

if (!global._pgPool) {
  global._pgPool = new Pool({
    // IMPORTANT: use the *POOLED* Neon URL here
    connectionString: process.env.DATABASE_URL,

    ssl: {
      rejectUnauthorized: false,
    },

    // serverless-safe settings
    max: 5,                     // small pool
    idleTimeoutMillis: 30000,   // close idle connections
    connectionTimeoutMillis: 2000, // fail fast if Neon is waking up

    // PgBouncer compatibility
    statement_timeout: 5000,
    query_timeout: 5000,
  });
}

pool = global._pgPool;

export { pool };

