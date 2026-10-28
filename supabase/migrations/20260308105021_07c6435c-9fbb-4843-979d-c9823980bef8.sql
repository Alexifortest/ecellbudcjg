
-- Skip unique constraints due to existing duplicate data
-- Add format validation constraints
ALTER TABLE tickets ADD CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');
ALTER TABLE tickets ADD CONSTRAINT valid_phone CHECK (phone ~ '^[0-9]{10}$');
ALTER TABLE tickets ADD CONSTRAINT valid_name_length CHECK (length(full_name) >= 2 AND length(full_name) <= 100);
ALTER TABLE tickets ADD CONSTRAINT valid_college_length CHECK (length(college) >= 2 AND length(college) <= 200);
ALTER TABLE tickets ADD CONSTRAINT valid_year CHECK (year IN ('1', '2', '3', '4', 'pg'));
ALTER TABLE tickets ADD CONSTRAINT valid_status CHECK (status IN ('pending', 'valid', 'paid', 'failed', 'scanned'));

-- Drop the open UPDATE policy
DROP POLICY IF EXISTS "Anyone can update ticket status" ON public.tickets;

-- Drop the open SELECT policy
DROP POLICY IF EXISTS "Anyone can view tickets" ON public.tickets;

-- Create a secure RPC function for ticket lookup by ID
CREATE OR REPLACE FUNCTION get_ticket_by_id(ticket_uuid UUID)
RETURNS TABLE (
  id UUID,
  full_name TEXT,
  email TEXT,
  phone TEXT,
  college TEXT,
  year TEXT,
  status TEXT,
  created_at TIMESTAMPTZ,
  scanned_at TIMESTAMPTZ
)
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT t.id, t.full_name, t.email, t.phone, t.college, t.year, t.status, t.created_at, t.scanned_at
  FROM tickets t
  WHERE t.id = ticket_uuid;
END;
$$;

GRANT EXECUTE ON FUNCTION get_ticket_by_id(UUID) TO anon;
GRANT EXECUTE ON FUNCTION get_ticket_by_id(UUID) TO authenticated;
