import { useState, useEffect, useCallback } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase, isSupabaseConfigured, authRedirectTo } from "@/lib/supabase";

export type AuthResult = { success: boolean; message: string };

const NOT_CONFIGURED =
  "La connexion n'est pas encore activée sur ce site.";

/* Supabase hands back the raw fetch failure when its host cannot be reached -
   wrong project URL, no connection, a blocked request. "Failed to fetch" in
   the middle of a French card helps nobody. */
function readable(message: string): string {
  if (/failed to fetch|networkerror|load failed/i.test(message)) {
    return "Connexion au serveur impossible. Vérifiez votre connexion et réessayez.";
  }
  return message;
}

/* Email one-time-code sign-in, plus Google, both through Supabase.

   The code is generated and checked by Supabase, never by this page, and the
   session it returns is stored and refreshed by the client library. Nothing
   here decides whether someone is signed in - it only reports what Supabase
   says. */
export function useLocalAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [checking, setChecking] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!supabase) { setChecking(false); return; }
    let alive = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!alive) return;
      setSession(data.session);
      setChecking(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
    });
    return () => { alive = false; sub.subscription.unsubscribe(); };
  }, []);

  const sendOtp = useCallback(async (email: string): Promise<AuthResult> => {
    if (!supabase) return { success: false, message: NOT_CONFIGURED };
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { shouldCreateUser: true, emailRedirectTo: authRedirectTo() },
      });
      if (error) return { success: false, message: readable(error.message) };
      return { success: true, message: "Code envoyé" };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const verifyOtp = useCallback(
    async (
      email: string,
      code: string,
      name?: string,
      emailNewsOffers?: boolean
    ): Promise<AuthResult> => {
      if (!supabase) return { success: false, message: NOT_CONFIGURED };
      setIsLoading(true);
      try {
        const { data, error } = await supabase.auth.verifyOtp({
          email,
          token: code,
          type: "email",
        });
        if (error) return { success: false, message: readable(error.message) };
        if (!data.session) return { success: false, message: "Code invalide ou expiré" };

        /* The name and the newsletter choice are collected on the same screen
           as the code, so they are attached once the session exists rather
           than trusted to the unauthenticated call that asked for the code. */
        const metadata: Record<string, unknown> = {};
        if (name) metadata.full_name = name;
        if (typeof emailNewsOffers === "boolean") metadata.email_news_offers = emailNewsOffers;
        if (Object.keys(metadata).length) {
          await supabase.auth.updateUser({ data: metadata });
        }
        return { success: true, message: "Authenticated" };
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  /* Hands off to Google and comes back to this site. Supabase verifies the
     token on its side; the browser never sees a client secret. */
  const signInWithGoogle = useCallback(async (): Promise<AuthResult> => {
    if (!supabase) return { success: false, message: NOT_CONFIGURED };
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: authRedirectTo() },
      });
      if (error) { setIsLoading(false); return { success: false, message: readable(error.message) }; }
      // the browser is navigating away; leave the spinner up
      return { success: true, message: "Redirection" };
    } catch (err) {
      setIsLoading(false);
      return { success: false, message: err instanceof Error ? err.message : "Erreur" };
    }
  }, []);

  const logout = useCallback(async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
  }, []);

  const user: User | null = session?.user ?? null;

  return {
    user,
    isAuthenticated: !!session,
    isLoading: isLoading || checking,
    isConfigured: isSupabaseConfigured,
    /* Supabase sends the code by email; there is nothing to show in the page. */
    lastOtp: "",
    sendOtp,
    verifyOtp,
    signInWithGoogle,
    logout,
  };
}
