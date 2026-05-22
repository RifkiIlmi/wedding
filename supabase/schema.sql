-- Database Schema for Luxury Wedding Invitation

-- 1. Create Wishes Table
CREATE TABLE IF NOT EXISTS wishes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create Guests Table (Optional but recommended)
CREATE TABLE IF NOT EXISTS guests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    attendance_status TEXT CHECK (attendance_status IN ('attending', 'not_attending', 'pending')),
    total_guests INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Enable Realtime for Wishes
ALTER PUBLICATION supabase_realtime ADD TABLE wishes;

-- 4. Set up Row Level Security (RLS)
-- For demo purposes, we'll allow public inserts and reads
ALTER TABLE wishes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read wishes" ON wishes
    FOR SELECT USING (true);

CREATE POLICY "Allow public insert wishes" ON wishes
    FOR INSERT WITH CHECK (true);

-- 5. Create Storage Bucket for Gallery (Manual step in Supabase UI)
-- Bucket name: 'wedding-gallery'
