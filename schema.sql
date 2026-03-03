-- Aura Social Club - Extended Schema
-- Premium Social Companionship Marketplace

-- 1. ENUMS (Idempotent)
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
        CREATE TYPE user_role AS ENUM ('client', 'host', 'admin');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'booking_status') THEN
        CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'payment_status') THEN
        CREATE TYPE payment_status AS ENUM ('held_in_escrow', 'released_to_host', 'refunded_to_client');
    END IF;
END $$;

-- 2. TABLES
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    full_name TEXT,
    avatar_url TEXT,
    role user_role DEFAULT 'client',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS regions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    parent_id UUID REFERENCES regions(id),
    type TEXT -- 'country', 'state', 'city'
);

CREATE TABLE IF NOT EXISTS hosts_profiles (
    user_id UUID PRIMARY KEY REFERENCES users(id),
    bio TEXT,
    specialties TEXT[],
    hourly_rate NUMERIC NOT NULL,
    rating NUMERIC DEFAULT 5.0,
    reviews_count INTEGER DEFAULT 0,
    verification_status TEXT DEFAULT 'pending',
    is_featured BOOLEAN DEFAULT false,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID REFERENCES users(id),
    host_id UUID REFERENCES users(id),
    region_id UUID REFERENCES regions(id),
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    total_price NUMERIC NOT NULL,
    status booking_status DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS payments_escrow (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID REFERENCES bookings(id),
    amount NUMERIC NOT NULL,
    status payment_status DEFAULT 'held_in_escrow',
    released_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. STORAGE BUCKETS (Simulated via SQL insert if supported)
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true) ON CONFLICT DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('kyc-documents', 'kyc-documents', false) ON CONFLICT DO NOTHING;

-- Policies for storage
CREATE POLICY "Public Access to Avatars" ON storage.objects FOR SELECT USING (bucket_id = 'avatars');
CREATE POLICY "Users can upload their own avatars" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'avatars' AND auth.role() = 'authenticated');
CREATE POLICY "Only admins can view KYC" ON storage.objects FOR SELECT USING (bucket_id = 'kyc-documents' AND (SELECT role FROM public.users WHERE id = auth.uid()) = 'admin');

-- 4. RLS & SECURITY
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE hosts_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments_escrow ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own data" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Public can view host profiles" ON hosts_profiles FOR SELECT TO public USING (true);
CREATE POLICY "Clients can view their bookings" ON bookings FOR SELECT USING (auth.uid() = client_id);
CREATE POLICY "Hosts can view their bookings" ON bookings FOR SELECT USING (auth.uid() = host_id);

-- 5. SEED REGIONS
INSERT INTO regions (id, name, type) VALUES ('cf744654-7164-4458-97c7-508b982142e4', 'Chile', 'country') ON CONFLICT DO NOTHING;
INSERT INTO regions (name, parent_id, type) VALUES ('RM Santiago', 'cf744654-7164-4458-97c7-508b982142e4', 'state') ON CONFLICT DO NOTHING;
