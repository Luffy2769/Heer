-- ==========================================
-- HEER DAGHA — SUPABASE DATABASE SCHEMA
-- ==========================================

-- 1. REVIEWS TABLE
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'Bride',
  quote TEXT NOT NULL,
  rating SMALLINT NOT NULL DEFAULT 5,
  avatar_url TEXT,
  event_date TEXT,
  location TEXT,
  is_approved BOOLEAN NOT NULL DEFAULT true
);

-- Enable RLS for reviews
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Allow public read access to approved reviews
CREATE POLICY "Allow public read access to reviews"
  ON public.reviews FOR SELECT
  USING (is_approved = true);

-- Allow public insert access so clients can submit reviews
CREATE POLICY "Allow public insert to reviews"
  ON public.reviews FOR INSERT
  WITH CHECK (true);


-- 2. INQUIRIES TABLE
CREATE TABLE IF NOT EXISTS public.inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  name TEXT NOT NULL,
  event_date TEXT NOT NULL,
  city TEXT NOT NULL,
  services TEXT[] NOT NULL DEFAULT '{}',
  notes TEXT,
  submit_type TEXT NOT NULL DEFAULT 'whatsapp',
  status TEXT NOT NULL DEFAULT 'new'
);

-- Enable RLS for inquiries
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Allow public insert access so clients can submit inquiries
CREATE POLICY "Allow public insert to inquiries"
  ON public.inquiries FOR INSERT
  WITH CHECK (true);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON public.reviews(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON public.inquiries(created_at DESC);
