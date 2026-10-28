-- Drop the existing table and recreate with proper schema
DROP TABLE IF EXISTS public."ESUMMIT";

-- Create tickets table with proper structure
CREATE TABLE public.tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  college TEXT NOT NULL,
  year TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'valid' CHECK (status IN ('valid', 'scanned')),
  scanned_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;

-- Allow public insert (for registration without auth)
CREATE POLICY "Anyone can register for tickets"
ON public.tickets FOR INSERT
WITH CHECK (true);

-- Allow public read (for ticket validation)
CREATE POLICY "Anyone can view tickets"
ON public.tickets FOR SELECT
USING (true);

-- Allow updates for scanning (status changes)
CREATE POLICY "Anyone can update ticket status"
ON public.tickets FOR UPDATE
USING (true)
WITH CHECK (true);