import { Router, Request, Response } from 'express';
import { supabase } from '../config/database';
import { verifyToken, isAdmin } from '../middleware/auth';

const router = Router();

router.get('/', verifyToken, async (req: Request, res: Response) => {
  const { data, error } = await supabase.from('products').select('*').order('name', { ascending: true });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.post('/', [verifyToken, isAdmin], async (req: Request, res: Response) => {
  const { name, sku, category, stock, image_url } = req.body;
  const { data, error } = await supabase.from('products').insert([
    { name, sku, category, stock: stock || 0, image_url }
  ]).select().single();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.put('/:id', [verifyToken, isAdmin], async (req: Request, res: Response) => {
  const { name, sku, category, image_url, stock } = req.body;
  const updateData: any = { name, sku, category, image_url };
  if (stock !== undefined) updateData.stock = stock;
  const { data, error } = await supabase.from('products')
    .update(updateData)
    .eq('id', req.params.id)
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.delete('/:id', [verifyToken, isAdmin], async (req: Request, res: Response) => {
  const { error } = await supabase.from('products').delete().eq('id', req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ deleted: 1 });
});

export default router;
