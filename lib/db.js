import pkg from "pg";
const { Pool } = pkg;

// export const pool = new Pool({
//   host: process.env.PGHOST,
//   user: process.env.PGUSER,
//   password: process.env.PGPASSWORD,
//   database: process.env.PGDATABASE,
//   port: process.env.PGPORT ? parseInt(process.env.PGPORT) : 5432,
//   ssl:
//     process.env.PGSSLMODE === "require" ? { rejectUnauthorized: false } : false,
// });

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Neon requires this for serverless connections
  },
});
