import { Router, Request, Response } from 'express';
import { supabase } from '../config/database';
import { verifyToken, isAdmin } from '../middleware/auth';

const router = Router();

router.get('/', [verifyToken, isAdmin], async (req: Request, res: Response) => {
  const { data, error } = await supabase.from('suppliers').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.post('/', [verifyToken, isAdmin], async (req: Request, res: Response) => {
  const { name, phone, email, address } = req.body;
  const { data, error } = await supabase.from('suppliers').insert([
    { name, phone, email, address }
  ]).select().single();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.put('/:id', [verifyToken, isAdmin], async (req: Request, res: Response) => {
  const { name, phone, email, address } = req.body;
  const { data, error } = await supabase.from('suppliers')
    .update({ name, phone, email, address })
    .eq('id', req.params.id)
    .select();

  if (error) return res.status(500).json({ error: error.message });
  res.json({ updated: data?.length || 0 });
});

router.delete('/:id', [verifyToken, isAdmin], async (req: Request, res: Response) => {
  const { error } = await supabase.from('suppliers').delete().eq('id', req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ deleted: 1 });
});

export default router;
