import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

async function fixPasswords() {
  const adminHash = await bcrypt.hash('admin123', 10);
  const gudangHash = await bcrypt.hash('gudang123', 10);
  
  // Update admin
  await supabase.from('users').update({ password: adminHash }).eq('username', 'admin');
  
  // Update gudang
  await supabase.from('users').update({ password: gudangHash }).eq('username', 'gudang');
  
  console.log("Passwords fixed successfully:");
  console.log("- admin: admin123");
  console.log("- gudang: gudang123");
}

fixPasswords();
