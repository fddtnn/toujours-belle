import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/* Supabase is what makes sign-in possible at all here: the site is served as
   static files from GitHub Pages, so there is no server of ours to generate a
   code, send the email or hold a session. Supabase does all three from the
   browser.

   Both values below are meant to be public - the anon key is the browser key,
   and the database is protected by row-level security, not by hiding it. They
   are read at build time, so a rebuild is needed after changing them. */
const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(url && anonKey);

/* Google appears only once it is actually switched on in the Supabase
   dashboard, so the card never shows a button that cannot work. */
export const isGoogleEnabled =
  isSupabaseConfigured && import.meta.env.VITE_AUTH_GOOGLE === 'on';

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url!, anonKey!, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        /* The app runs under a hash route (/#/...), and Supabase returns from
           an OAuth round trip with its own fragment. Letting it read that
           fragment itself keeps the two from fighting over the hash. */
        detectSessionInUrl: true,
        flowType: 'pkce',
      },
    })
  : null;

/* Where Google should come back to. GitHub Pages serves the app from a
   sub-path, so this has to be the full base URL, and it must be listed in
   Supabase under Authentication → URL Configuration → Redirect URLs. */
export function authRedirectTo(): string {
  const { origin, pathname } = window.location;
  const base = import.meta.env.BASE_URL || '/';
  return `${origin}${base.startsWith('/') ? base : pathname}`.replace(/\/+$/, '/') ;
}
