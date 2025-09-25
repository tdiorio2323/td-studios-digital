import { DB_ENABLED } from "@/db";
import { createClient } from "@supabase/supabase-js";

// If you later wire Neon behind an API, flip VITE_ENABLE_DB=true and set these:
const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Use real Supabase only when explicitly enabled
export const supabase =
  DB_ENABLED && url && key ? createClient(url, key) : (null as any); // null in no-DB mode
