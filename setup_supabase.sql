-- Buka Supabase Dashboard > SQL Editor > New Query
-- Copy dan Paste script ini, lalu jalankan (Run)

-- 1. Table users
CREATE TABLE IF NOT EXISTS public.users (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  username text UNIQUE NOT NULL,
  password text NOT NULL,
  role text NOT NULL CHECK (role IN ('admin', 'gudang')),
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insert default admin & gudang users
-- Password: admin (admin123), gudang (gudang123)
-- (Sudah di hash menggunakan bcrypt)
INSERT INTO public.users (username, password, role) VALUES 
('admin', '$2b$10$Bv07iFIfZJ1KYbo/iD2H4OP1zz9M2bzkNt88xy3TPYT/DfZTsAuay', 'admin'),
('gudang', '$2b$10$YWqQMUO79HMt1ElV2XbXeuWl1FSTrfgZNG/4XR0HBnDc2E7TetNEi', 'gudang')
ON CONFLICT (username) DO NOTHING;

-- 2. Table products
CREATE TABLE IF NOT EXISTS public.products (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  sku text UNIQUE NOT NULL,
  category text,
  stock integer DEFAULT 0 NOT NULL,
  image_url text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Table suppliers
CREATE TABLE IF NOT EXISTS public.suppliers (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  phone text,
  email text,
  address text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Table transactions (dengan kolom keuangan)
CREATE TABLE IF NOT EXISTS public.transactions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id uuid REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  type text NOT NULL CHECK (type IN ('IN', 'OUT')),
  qty integer NOT NULL,
  note text,
  user_id uuid REFERENCES public.users(id) ON DELETE SET NULL,
  total_amount integer DEFAULT 0,
  payment_status text DEFAULT 'PENDING' CHECK (payment_status IN ('PENDING', 'PAID', 'CANCELLED')),
  payment_method text DEFAULT 'MANUAL',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Table operating_expenses
CREATE TABLE IF NOT EXISTS public.operating_expenses (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz DEFAULT now(),
  category text NOT NULL,
  amount integer NOT NULL DEFAULT 0,
  description text,
  expense_date date DEFAULT CURRENT_DATE,
  created_by text,
  payment_status text DEFAULT 'UNPAID' CHECK (payment_status IN ('UNPAID', 'PAID', 'CANCELLED'))
);

-- 6. Tambahkan kolom va_number ke suppliers
ALTER TABLE public.suppliers
ADD COLUMN IF NOT EXISTS va_number text;

-- Optional: Enable RLS to bypass for service role but block anon if needed
-- (Jika bingung, ini bisa dilewati asalkan menggunakan SUPABASE_KEY service_role di .env)
