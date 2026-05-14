import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSchema() {
  const { data, error } = await supabase.rpc('get_table_columns', { table_name: 'products' });
  // If RPC is not defined (likely), try another way
  if (error) {
     console.log("RPC failed, trying a simple insert to see error...");
     const { error: insError } = await supabase.from('products').insert([
        { name: 't', sku: 't'+Date.now(), price: 0 }
     ]);
     if (insError) {
        console.error("Insert failed with error:", insError.message);
     } else {
        console.log("Insert worked, 'price' column exists.");
        // Delete the test row
        await supabase.from('products').delete().eq('name', 't');
     }
  }
}

checkSchema();
