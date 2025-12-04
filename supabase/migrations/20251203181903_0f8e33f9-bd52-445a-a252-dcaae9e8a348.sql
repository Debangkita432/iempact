-- Create registrations table for event sign-ups
CREATE TABLE public.registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_name TEXT NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  college_name TEXT NOT NULL,
  team_name TEXT,
  team_size INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert registrations (public event registration)
CREATE POLICY "Anyone can register for events"
ON public.registrations
FOR INSERT
WITH CHECK (true);

-- Allow anyone to view their own registration by email
CREATE POLICY "Anyone can view registrations"
ON public.registrations
FOR SELECT
USING (true);

-- Create contact_messages table for contact form
CREATE TABLE public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow anyone to send contact messages
CREATE POLICY "Anyone can send contact messages"
ON public.contact_messages
FOR INSERT
WITH CHECK (true);