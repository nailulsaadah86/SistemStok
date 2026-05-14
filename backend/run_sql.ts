import { Client } from 'pg';
import fs from 'fs';
import path from 'path';

const REF = "lcqszxmscxuyobsvnzpq";
const PASS = "sb_publishable_VgjyLKgdpPiSLBJFN99r3A_2Rz2qXYF";

const client = new Client({
  host: `db.${REF}.supabase.co`,
  port: 5432,
  user: 'postgres',
  password: PASS,
  database: 'postgres',
});

async function runSQL() {
  try {
    await client.connect();
    console.log("Connected to Supabase PostgreSQL.");
    
    const sqlPath = path.join(__dirname, '..', 'setup_supabase.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');
    
    console.log("Executing SQL...");
    await client.query(sql);
    console.log("SQL execution successful.");
    
  } catch (err: any) {
    console.error("Error executing SQL:", err.message);
  } finally {
    await client.end();
  }
}

runSQL();
