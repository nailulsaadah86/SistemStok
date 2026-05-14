const { Client } = require('pg');

const REF = "lcqszxmscxuyobsvnzpq";
const PASS = "sb_publishable_VgjyLKgdpPiSLBJFN99r3A_2Rz2qXYF";

const client = new Client({
  host: `db.${REF}.supabase.co`,
  port: 5432,
  user: 'postgres',
  password: PASS,
  database: 'postgres',
});

async function fixSchema() {
  try {
    await client.connect();
    console.log("Connected to Supabase PostgreSQL.");
    
    const sql = `
      ALTER TABLE public.transactions 
      ADD COLUMN IF NOT EXISTS payment_method text,
      ADD COLUMN IF NOT EXISTS payment_status text DEFAULT 'PENDING',
      ADD COLUMN IF NOT EXISTS total_amount bigint DEFAULT 0;
    `;
    
    console.log("Adding columns to transactions table...");
    await client.query(sql);
    console.log("Schema update successful.");
    
  } catch (err) {
    console.error("Error updating schema:", err.message);
  } finally {
    await client.end();
  }
}

fixSchema();
