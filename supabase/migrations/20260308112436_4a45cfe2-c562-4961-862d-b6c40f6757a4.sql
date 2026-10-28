
-- Drop ALL existing INSERT policies on tickets
DO $$
DECLARE
    pol RECORD;
BEGIN
    FOR pol IN 
        SELECT policyname FROM pg_policies 
        WHERE tablename = 'tickets' AND cmd = 'INSERT'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON public.tickets', pol.policyname);
    END LOOP;
END $$;

-- Create a new permissive INSERT policy
CREATE POLICY "allow_ticket_registration"
ON public.tickets
FOR INSERT
TO anon, authenticated
WITH CHECK (true);
