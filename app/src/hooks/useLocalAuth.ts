import { useState, useCallback } from "react";
import { trpc } from "@/providers/trpc";

/* Email one-time-code sign-in, backed by the server.
   The code is generated and checked server-side and the session lives in a
   signed httpOnly cookie, so nothing here is trusted to the browser. */
export function useLocalAuth() {
  const utils = trpc.useUtils();
  const [isLoading, setIsLoading] = useState(false);

  const meQuery = trpc.otp.me.useQuery();
  const user = meQuery.data ?? null;

  const sendOtpMutation = trpc.otp.sendOtp.useMutation();
  const verifyOtpMutation = trpc.otp.verifyOtp.useMutation();
  const logoutMutation = trpc.otp.logout.useMutation();

  const sendOtp = useCallback(
    async (email: string): Promise<{ success: boolean; message: string }> => {
      setIsLoading(true);
      try {
        const res = await sendOtpMutation.mutateAsync({ email });
        return { success: res.success, message: res.message };
      } catch (err) {
        return {
          success: false,
          message: err instanceof Error ? err.message : "Impossible d'envoyer le code",
        };
      } finally {
        setIsLoading(false);
      }
    },
    [sendOtpMutation]
  );

  const verifyOtp = useCallback(
    async (
      email: string,
      code: string,
      name?: string,
      emailNewsOffers?: boolean
    ): Promise<{ success: boolean; message: string }> => {
      setIsLoading(true);
      try {
        const res = await verifyOtpMutation.mutateAsync({
          email,
          code,
          name,
          emailNewsOffers: emailNewsOffers ?? false,
        });
        if (!res.success) {
          return {
            success: false,
            message:
              ("message" in res ? res.message : undefined) ?? "Code invalide ou expiré",
          };
        }
        await utils.otp.me.invalidate();
        return { success: true, message: "Authenticated" };
      } catch (err) {
        return {
          success: false,
          message: err instanceof Error ? err.message : "Vérification impossible",
        };
      } finally {
        setIsLoading(false);
      }
    },
    [verifyOtpMutation, utils]
  );

  const logout = useCallback(async () => {
    await logoutMutation.mutateAsync();
    await utils.otp.me.invalidate();
  }, [logoutMutation, utils]);

  return {
    user,
    isAuthenticated: !!user,
    isLoading: isLoading || meQuery.isLoading,
    // The code is only ever delivered by email now; nothing to surface here.
    lastOtp: "",
    sendOtp,
    verifyOtp,
    logout,
    sendOtpError: sendOtpMutation.error,
    verifyOtpError: verifyOtpMutation.error,
  };
}
