const { createClient } = require('@supabase/supabase-js');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') }); 

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("SUPABASE_URL or SUPABASE_KEY not found in .env");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSchema() {
  console.log("Checking columns in 'transactions' table...");
  // Try to insert a dummy row (will fail if columns missing)
  const { error } = await supabase
    .from('transactions')
    .insert([{
        product_id: '00000000-0000-0000-0000-000000000000', // invalid but will trigger schema check
        payment_method: 'test'
    }]);

  if (error) {
    console.log("Response message:", error.message);
    if (error.message.includes("column") && error.message.includes("does not exist")) {
        console.log(">>> CONFIRMED: Column 'payment_method' is MISSING in Supabase.");
    } else if (error.message.includes("violates foreign key")) {
        console.log(">>> SUCCESS: Column 'payment_method' EXISTS (but foreign key failed as expected).");
    }
  } else {
    console.log(">>> SUCCESS: Column 'payment_method' EXISTS.");
  }
}

checkSchema();
