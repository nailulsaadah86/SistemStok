import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';

config();

const supabase = createClient(process.env.SUPABASE_URL as string, process.env.SUPABASE_KEY as string);

async function run() {
  const { data, error } = await supabase
    .from('transactions')
    .update({ payment_status: 'PAID' })
    .eq('type', 'OUT');

  if (error) {
    console.error(error);
  } else {
    console.log('Successfully updated existing OUT transactions to PAID');
  }
  process.exit(0);
}

run();
