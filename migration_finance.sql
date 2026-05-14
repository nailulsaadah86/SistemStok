-- Jalankan Script ini di Supabase SQL Editor untuk menambahkan fitur Keuangan

-- 1. Tambahkan kolom harga ke tabel products
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS price integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS cost_price integer DEFAULT 0;

-- 2. Tambahkan kolom keuangan ke tabel transactions
ALTER TABLE public.transactions
ADD COLUMN IF NOT EXISTS total_amount integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS payment_status text DEFAULT 'PENDING' CHECK (payment_status IN ('PENDING', 'PAID', 'CANCELLED')),
ADD COLUMN IF NOT EXISTS payment_method text DEFAULT 'LINK_BANK';

-- 3. Update data lama jika ada (Opsional)
UPDATE public.transactions SET total_amount = 0 WHERE total_amount IS NULL;
UPDATE public.transactions SET payment_status = 'PENDING' WHERE payment_status IS NULL;
