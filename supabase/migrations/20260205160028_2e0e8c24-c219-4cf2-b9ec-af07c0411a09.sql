-- Drop the existing check constraint
ALTER TABLE public.tickets DROP CONSTRAINT IF EXISTS tickets_status_check;

-- Add updated check constraint with payment statuses
ALTER TABLE public.tickets ADD CONSTRAINT tickets_status_check 
CHECK (status IN ('pending', 'valid', 'paid', 'scanned'));