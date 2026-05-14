import { Router, Request, Response } from 'express';
import { supabase } from '../config/database';
import { verifyToken, isAdmin } from '../middleware/auth';

const router = Router();

router.get('/', verifyToken, async (req: Request, res: Response) => {
  const { data, error } = await supabase
    .from('transactions')
    .select(`
      *,
      products (name),
      users (username)
    `)
    .order('created_at', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  
  // Format to match frontend structure mapping
  const formatted = data.map((t: any) => ({
    ...t,
    product_name: t.products?.name,
    user_name: t.users?.username
  }));

  res.json(formatted);
});

router.post('/', verifyToken, async (req: Request, res: Response) => {
  const { product_id, type, qty, note, payment_method, total_amount: provided_amount } = req.body;
  const user_id = req.userId;

  if (!['IN', 'OUT'].includes(type) || qty <= 0) {
    return res.status(400).json({ error: "Invalid transaction type or quantity." });
  }

  try {
    // 1. Fetch current stock and price
    const { data: prod, error: errProd } = await supabase
      .from('products')
      .select('stock')
      .eq('id', product_id)
      .single();

    if (errProd || !prod) {
      return res.status(404).json({ error: "Product not found." });
    }

    const currentStock = prod.stock;
    const newStock = type === 'IN' ? currentStock + qty : currentStock - qty;
    
    // Total amount set to 0 as prices are no longer used in inventory catalog
    const total_amount = provided_amount !== undefined ? provided_amount : 0;

    if (newStock < 0) {
      return res.status(400).json({ error: "Insufficient stock." });
    }

    // 2. Update stock
    const { error: errUpdate } = await supabase
      .from('products')
      .update({ stock: newStock })
      .eq('id', product_id);

    if (errUpdate) {
      return res.status(500).json({ error: errUpdate.message });
    }

    // 3. Insert transaction log
    const paymentStatus = type === 'OUT' ? 'PAID' : 'PENDING';
    const finalPaymentMethod = payment_method || (type === 'OUT' ? 'CASH' : 'MANUAL');

    const { data: txData, error: errLog } = await supabase
      .from('transactions')
      .insert([{ 
        product_id, 
        type, 
        qty, 
        note, 
        user_id, 
        total_amount, 
        payment_status: paymentStatus,
        payment_method: finalPaymentMethod
      }])
      .select()
      .single();

    if (errLog) {
      // Rollback stock update
      await supabase.from('products').update({stock: currentStock}).eq('id', product_id);
      return res.status(500).json({ error: errLog.message });
    }

    res.status(201).json(txData);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Admin endpoint to verify payment
router.patch('/:id/verify', [verifyToken, isAdmin], async (req: Request, res: Response) => {
  const { status } = req.body; // 'PAID' or 'CANCELLED'
  const { error } = await supabase
    .from('transactions')
    .update({ payment_status: status })
    .eq('id', req.params.id);

  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: "Payment status updated" });
});

export default router;
