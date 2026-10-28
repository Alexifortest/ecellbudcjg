DROP POLICY IF EXISTS "Anyone can register for tickets" ON public.tickets;

CREATE POLICY "Anyone can register for tickets"
ON public.tickets
FOR INSERT
TO anon, authenticated
WITH CHECK (true);