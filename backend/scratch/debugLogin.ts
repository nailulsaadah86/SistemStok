import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

async function debugLogin() {
  console.log("Testing Login Logic...");
  const username = 'admin';
  const password = 'admin';

  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('username', username)
    .single();

  if (error) {
    console.error("DB Error:", error.message);
    return;
  }

  if (!user) {
    console.error("User not found in DB");
    return;
  }

  const match = await bcrypt.compare(password, user.password);
  console.log("Password match:", match);
  
  if (match) {
    console.log("Login would be SUCCESSFUL for user:", user.username);
  } else {
    console.log("Login would FAIL: Password mismatch");
  }
}

debugLogin();
