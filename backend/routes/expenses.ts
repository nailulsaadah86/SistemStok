import { Router, Request, Response } from 'express';
import { supabase } from '../config/database';
import { verifyToken, isAdmin } from '../middleware/auth';

const router = Router();

// Get all expenses
router.get('/', verifyToken, async (req: Request, res: Response) => {
  const { data, error } = await supabase
    .from('operating_expenses')
    .select('*')
    .order('expense_date', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Add new expense
router.post('/', verifyToken, isAdmin, async (req: Request, res: Response) => {
  const { category, amount, description, expense_date, created_by } = req.body;

  // Check if amount is valid number
  const parsedAmount = parseFloat(amount);
  if (!category || isNaN(parsedAmount)) {
    return res.status(400).json({ error: "Kategori dan jumlah valid wajib diisi." });
  }

  try {
    const { data, error } = await supabase
      .from('operating_expenses')
      .insert([{
        category,
        amount: parsedAmount,
        description,
        expense_date: expense_date || new Date().toISOString().split('T')[0],
        created_by: created_by || 'Admin',
        payment_status: 'UNPAID'
      }])
      .select();

    if (error) {
      console.error("[EXPENSE ERROR]:", error.message);
      return res.status(500).json({ error: "Gagal menyimpan ke database: " + error.message });
    }
    
    if (!data || data.length === 0) {
      return res.status(500).json({ error: "Gagal menyimpan data ke database (Data kosong)." });
    }
    
    res.status(201).json(data[0]);
  } catch (err: any) {
    res.status(500).json({ error: "Terjadi kesalahan sistem: " + err.message });
  }
});

// Mark expense as paid
router.patch('/:id/pay', [verifyToken, isAdmin], async (req: Request, res: Response) => {
  const { error } = await supabase
    .from('operating_expenses')
    .update({ payment_status: 'PAID' })
    .eq('id', req.params.id);

  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: "Pengeluaran berhasil dibayar" });
});

// Delete expense
router.delete('/:id', [verifyToken, isAdmin], async (req: Request, res: Response) => {
  const { error } = await supabase
    .from('operating_expenses')
    .delete()
    .eq('id', req.params.id);

  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: "Pengeluaran berhasil dihapus" });
});

export default router;
