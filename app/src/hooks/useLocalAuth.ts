import { useState, useEffect, useCallback } from "react";

interface LocalUser {
  id: number;
  email: string;
  name: string | null;
  role: string;
}

// Demo mode: localStorage-based auth (works without backend)
const STORAGE_KEY = "tb_local_user";
const OTP_STORAGE_KEY = "tb_otp_demo";

function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function useLocalAuth() {
  const [user, setUser] = useState<LocalUser | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const [lastOtp, setLastOtp] = useState<string>("");

  const isAuthenticated = !!user;

  const sendOtp = useCallback(
    async (email: string): Promise<{ success: boolean; message: string; otp?: string }> => {
      setIsLoading(true);
      await new Promise((r) => setTimeout(r, 800)); // simulate network

      const code = generateOtp();
      setLastOtp(code);

      // Store OTP in sessionStorage for verification
      sessionStorage.setItem(OTP_STORAGE_KEY, JSON.stringify({ email, code, expires: Date.now() + 10 * 60 * 1000 }));

      setIsLoading(false);
      return { success: true, message: "OTP sent", otp: code };
    },
    []
  );

  const verifyOtp = useCallback(
    async (
      email: string,
      code: string,
      name?: string,
      emailNewsOffers?: boolean
    ): Promise<{ success: boolean; message: string }> => {
      setIsLoading(true);
      await new Promise((r) => setTimeout(r, 600)); // simulate network

      // Get stored OTP
      const storedRaw = sessionStorage.getItem(OTP_STORAGE_KEY);
      if (!storedRaw) {
        setIsLoading(false);
        return { success: false, message: "No OTP found. Please request a new code." };
      }

      const stored = JSON.parse(storedRaw);
      if (stored.email !== email || stored.code !== code) {
        setIsLoading(false);
        return { success: false, message: "Invalid OTP code" };
      }
      if (Date.now() > stored.expires) {
        setIsLoading(false);
        return { success: false, message: "OTP expired" };
      }

      // Check if user exists
      const usersRaw = localStorage.getItem("tb_users_list");
      const users: Array<{ id: number; email: string; name: string | null }> = usersRaw ? JSON.parse(usersRaw) : [];
      const existingUser = users.find((u) => u.email === email);

      let userData: LocalUser;

      if (existingUser) {
        userData = { ...existingUser, role: "user" };
      } else {
        // Create new user
        const newId = users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;
        userData = {
          id: newId,
          email,
          name: name || email.split("@")[0],
          role: "user",
        };
        users.push(userData);
        localStorage.setItem("tb_users_list", JSON.stringify(users));
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
      setUser(userData);
      sessionStorage.removeItem(OTP_STORAGE_KEY);

      setIsLoading(false);
      return { success: true, message: "Authenticated" };
    },
    []
  );

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }, []);

  return {
    user,
    isAuthenticated,
    isLoading,
    lastOtp,
    sendOtp,
    verifyOtp,
    logout,
    sendOtpError: null,
    verifyOtpError: null,
  };
}
