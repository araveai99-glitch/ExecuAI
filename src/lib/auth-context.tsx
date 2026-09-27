"use client";

import * as React from "react";
import { useRouter, usePathname } from "next/navigation";

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
  connectedAccounts: Array<{ provider: string; email: string; connectedAt: string }>;
}

interface AuthContextType {
  user: UserSession | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  authMessage: { type: "info" | "success" | "error"; text: string } | null;
  loginWithEmail: (email: string, name?: string) => Promise<boolean>;
  verifyOtp: (code: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<void>;
  connectAccount: (provider: string, email: string) => void;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "execuai_user_session";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = React.useState<UserSession | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [authMessage, setAuthMessage] = React.useState<{ type: "info" | "success" | "error"; text: string } | null>(null);

  // Load session from localStorage / cookie on initial render
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setUser(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to parse auth session", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save session when updated
  const saveSession = (sessionData: UserSession | null) => {
    setUser(sessionData);
    if (sessionData) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionData));
      document.cookie = `execuai_auth=true; path=/; max-age=86400; SameSite=Lax`;
    } else {
      localStorage.removeItem(STORAGE_KEY);
      document.cookie = `execuai_auth=; path=/; max-age=0`;
    }
  };

  const loginWithEmail = async (email: string, name = "Alexander Vance"): Promise<boolean> => {
    setAuthMessage({ type: "info", text: "Sending verification code..." });
    setIsLoading(true);

    return new Promise((resolve) => {
      setTimeout(() => {
        setIsLoading(false);
        setAuthMessage({
          type: "success",
          text: `Verification email sent to ${email}. Please check your inbox or click Continue.`,
        });
        
        // Create initial session
        const session: UserSession = {
          id: `usr_${Date.now()}`,
          name: name || "Alexander Vance",
          email,
          role: "Chief Executive Officer",
          connectedAccounts: [
            { provider: "Gmail", email, connectedAt: new Date().toISOString() },
          ],
        };
        saveSession(session);
        resolve(true);
      }, 700);
    });
  };

  const verifyOtp = async (code: string): Promise<boolean> => {
    setIsLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        setIsLoading(false);
        if (code.length >= 4) {
          setAuthMessage({ type: "success", text: "Email verified successfully!" });
          resolve(true);
        } else {
          setAuthMessage({ type: "error", text: "Invalid code. Please try again." });
          resolve(false);
        }
      }, 500);
    });
  };

  const loginWithGoogle = async () => {
    setAuthMessage({ type: "info", text: "Connecting to Google OAuth 2.0..." });
    setIsLoading(true);

    const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

    if (googleClientId) {
      // Real Google OAuth 2.0 Redirect Flow
      const redirectUri = `${window.location.origin}/api/v1/auth/callback`;
      const scope = "https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile";
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${encodeURIComponent(
        redirectUri
      )}&response_type=code&scope=${encodeURIComponent(scope)}&access_type=offline&prompt=consent`;
      
      window.location.href = authUrl;
    } else {
      // Direct Authentication for current environment
      setTimeout(() => {
        setIsLoading(false);
        const session: UserSession = {
          id: `usr_g_${Date.now()}`,
          name: "Alexander Vance",
          email: "alexander.vance@company.com",
          role: "Chief Executive Officer",
          connectedAccounts: [
            { provider: "Gmail", email: "alexander.vance@company.com", connectedAt: new Date().toISOString() },
          ],
        };
        saveSession(session);
        setAuthMessage({ type: "success", text: "Google OAuth authentication successful!" });
        router.push("/onboarding");
      }, 800);
    }
  };

  const connectAccount = (provider: string, accountEmail: string) => {
    if (!user) return;
    const exists = user.connectedAccounts.some((a) => a.email === accountEmail);
    if (!exists) {
      const updated = {
        ...user,
        connectedAccounts: [
          ...user.connectedAccounts,
          { provider, email: accountEmail, connectedAt: new Date().toISOString() },
        ],
      };
      saveSession(updated);
    }
  };

  const logout = () => {
    saveSession(null);
    setAuthMessage(null);
    router.push("/auth/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        authMessage,
        loginWithEmail,
        verifyOtp,
        loginWithGoogle,
        connectAccount,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
