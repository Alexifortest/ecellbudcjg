ALTER TABLE public.tickets
ADD COLUMN IF NOT EXISTS ticket_type text NOT NULL DEFAULT 'single' CHECK (ticket_type IN ('single', 'group2', 'group5')),
ADD COLUMN IF NOT EXISTS member_count integer NOT NULL DEFAULT 1 CHECK (member_count IN (1, 2, 5)),
ADD COLUMN IF NOT EXISTS amount numeric(10,2) NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS members jsonb NOT NULL DEFAULT '[]'::jsonb;
