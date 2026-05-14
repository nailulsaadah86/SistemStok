-- Script untuk menambahkan tabel Pengeluaran Operasional
CREATE TABLE IF NOT EXISTS public.operating_expenses (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at timestamptz DEFAULT now(),
    category text NOT NULL, -- Contoh: Listrik, Air, Gaji, Sewa, Lain-lain
    amount integer NOT NULL DEFAULT 0,
    description text,
    expense_date date DEFAULT CURRENT_DATE,
    created_by text, -- Nama user yang menginput
    payment_status text DEFAULT 'UNPAID' CHECK (payment_status IN ('UNPAID', 'PAID', 'CANCELLED'))
);

-- Tambahkan RLS (Row Level Security) jika diperlukan, atau pastikan API kita membatasi akses
ALTER TABLE public.operating_expenses ENABLE ROW LEVEL SECURITY;

-- Policy sederhana: ijinkan semua akses untuk service role atau admin
CREATE POLICY "Allow all access to authenticated users" 
ON public.operating_expenses FOR ALL 
USING (true);

-- Tambahkan kolom payment_status ke data yang sudah ada jika migrasi dijalankan ulang
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='operating_expenses' AND column_name='payment_status') THEN
        ALTER TABLE public.operating_expenses ADD COLUMN payment_status text DEFAULT 'UNPAID' CHECK (payment_status IN ('UNPAID', 'PAID', 'CANCELLED'));
    END IF;
END $$;
