-- Tambahkan kolom va_number ke tabel suppliers
ALTER TABLE public.suppliers 
ADD COLUMN IF NOT EXISTS va_number text;

-- Update data lama jika perlu (Opsional)
UPDATE public.suppliers SET va_number = '' WHERE va_number IS NULL;
