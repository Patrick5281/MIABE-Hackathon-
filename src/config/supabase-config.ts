// src/config/supabase-config.tsx
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Vérifiez que les valeurs ne sont pas vides
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Erreur: Les variables d\'environnement Supabase ne sont pas définies.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export const auth = supabase.auth;
export const db = supabase;
