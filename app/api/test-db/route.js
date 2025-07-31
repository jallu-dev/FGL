import { pool } from "@/lib/db";

export async function GET() {
  try {
    const client = await pool.connect();
    const res = await client.query("SELECT NOW()");
    client.release();
    return new Response(`Postgres connected at: ${res.rows[0].now}`, {
      status: 200,
    });
  } catch (error) {
    console.error("Postgres connection error:", error);
    return new Response("Postgres connection failed", { status: 500 });
  }
}
