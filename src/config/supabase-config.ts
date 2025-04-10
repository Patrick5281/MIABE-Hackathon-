// src/config/supabase-config.tsx
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error(
    'La variable d\'environnement NEXT_PUBLIC_SUPABASE_URL est manquante. ' +
    'Assurez-vous d\'avoir un fichier .env.local avec NEXT_PUBLIC_SUPABASE_URL défini.'
  );
}

if (!supabaseAnonKey) {
  throw new Error(
    'La variable d\'environnement NEXT_PUBLIC_SUPABASE_ANON_KEY est manquante. ' +
    'Assurez-vous d\'avoir un fichier .env.local avec NEXT_PUBLIC_SUPABASE_ANON_KEY défini.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export const auth = supabase.auth;
export const db = supabase;
