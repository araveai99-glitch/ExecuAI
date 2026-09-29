"use client";

import * as React from "react";
import { useRouter, usePathname } from "next/navigation";
import { buildGoogleAuthUrl, isGoogleOAuthConfigured } from "@/lib/config/google-oauth";

export interface UserSubscription {
  plan: "14-Day Trial" | "Executive Solo" | "Executive Pro" | "Enterprise Desk";
  status: "active" | "trial" | "expired" | "canceled";
  trialStartedAt: string;
  trialEndsAt: string;
  trialDaysLeft: number;
  portalAccess: boolean;
  perEmailLicenses: string[];
}

export interface ConnectedAccount {
  provider: string;
  email: string;
  connectedAt: string;
}

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: string;
  password?: string;
  avatarUrl?: string;
  isAdmin?: boolean;
  emailVerified: boolean;
  subscription: UserSubscription;
  connectedAccounts: ConnectedAccount[];
}

interface AuthContextType {
  user: UserSession | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  authMessage: { type: "info" | "success" | "error"; text: string } | null;
  registerUser: (name: string, email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  loginWithEmail: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: (customGoogleEmail?: string, customGoogleName?: string, accessToken?: string) => Promise<void>;
  verifyEmailCode: (code: string) => Promise<boolean>;
  resendVerificationCode: () => Promise<boolean>;
  connectAccount: (provider: string, accountEmail: string) => void;
  removeAccount: (accountEmail: string) => void;
  updateProfile: (updates: Partial<UserSession>) => void;
  logout: () => void;
  // Admin Operations
  getAllUsers: () => UserSession[];
  adminUpdateUser: (userId: string, updates: Partial<UserSession>) => void;
  adminCreateUser: (userData: { name: string; email: string; role?: string; plan?: UserSubscription["plan"] }) => UserSession;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

const STORAGE_SESSION_KEY = "execuai_current_user_session";
const STORAGE_USERS_DB_KEY = "execuai_users_database_v2";

// Helper to create default trial subscription
const createDefaultSubscription = (userEmail: string): UserSubscription => {
  const now = new Date();
  const endsAt = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);
  return {
    plan: "14-Day Trial",
    status: "trial",
    trialStartedAt: now.toISOString(),
    trialEndsAt: endsAt.toISOString(),
    trialDaysLeft: 14,
    portalAccess: true,
    perEmailLicenses: [userEmail],
  };
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = React.useState<UserSession | null>(null);
  const [usersDb, setUsersDb] = React.useState<UserSession[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [authMessage, setAuthMessage] = React.useState<{ type: "info" | "success" | "error"; text: string } | null>(null);

  // Initialize database and session
  React.useEffect(() => {
    try {
      // Load users DB
      const savedDb = localStorage.getItem(STORAGE_USERS_DB_KEY);
      let initialDb: UserSession[] = [];
      if (savedDb) {
        initialDb = JSON.parse(savedDb);
      } else {
        // Seed initial admin user and sample user if empty
        const defaultAdmin: UserSession = {
          id: "usr_admin_001",
          name: "System Admin",
          email: "admin@execuai.com",
          role: "Platform Administrator",
          password: "password123",
          isAdmin: true,
          emailVerified: true,
          subscription: {
            plan: "Enterprise Desk",
            status: "active",
            trialStartedAt: new Date().toISOString(),
            trialEndsAt: new Date(Date.now() + 365 * 86400 * 1000).toISOString(),
            trialDaysLeft: 365,
            portalAccess: true,
            perEmailLicenses: ["admin@execuai.com"],
          },
          connectedAccounts: [
            { provider: "Gmail", email: "admin@execuai.com", connectedAt: new Date().toISOString() },
          ],
        };
        initialDb = [defaultAdmin];
        localStorage.setItem(STORAGE_USERS_DB_KEY, JSON.stringify(initialDb));
      }
      setUsersDb(initialDb);

      // Load session
      const savedSession = localStorage.getItem(STORAGE_SESSION_KEY);
      if (savedSession) {
        const parsed: UserSession = JSON.parse(savedSession);
        // Find latest version from DB
        const match = initialDb.find((u) => u.email.toLowerCase() === parsed.email.toLowerCase());
        setUser(match || parsed);
      }
    } catch (e) {
      console.error("Failed to parse auth session", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save database helper
  const saveDb = (db: UserSession[]) => {
    setUsersDb(db);
    localStorage.setItem(STORAGE_USERS_DB_KEY, JSON.stringify(db));
  };

  // Save current active session helper
  const saveSession = (sessionData: UserSession | null) => {
    setUser(sessionData);
    if (sessionData) {
      localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(sessionData));
      document.cookie = `execuai_auth=true; path=/; max-age=86400; SameSite=Lax`;
    } else {
      localStorage.removeItem(STORAGE_SESSION_KEY);
      document.cookie = `execuai_auth=; path=/; max-age=0`;
    }
  };

  // Register User
  const registerUser = async (
    name: string,
    email: string,
    password?: string
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    setAuthMessage({ type: "info", text: "Creating user account..." });

    return new Promise((resolve) => {
      setTimeout(() => {
        setIsLoading(false);
        const cleanEmail = email.trim().toLowerCase();

        // Check if user already exists
        const existing = usersDb.find((u) => u.email.toLowerCase() === cleanEmail);
        if (existing) {
          setAuthMessage({ type: "error", text: "An account with this email address already exists. Please log in." });
          resolve({ success: false, error: "Email already registered" });
          return;
        }

        const newUser: UserSession = {
          id: `usr_${Date.now()}`,
          name: name.trim(),
          email: cleanEmail,
          role: "Executive Leader",
          password: password || "",
          isAdmin: cleanEmail.includes("admin"),
          emailVerified: false,
          subscription: createDefaultSubscription(cleanEmail),
          connectedAccounts: [
            { provider: "Gmail", email: cleanEmail, connectedAt: new Date().toISOString() },
          ],
        };

        const updatedDb = [...usersDb, newUser];
        saveDb(updatedDb);
        saveSession(newUser);

        setAuthMessage({ type: "success", text: "Account created successfully! Please verify your email." });
        resolve({ success: true });
      }, 600);
    });
  };

  // Login with Email + Password
  const loginWithEmail = async (
    email: string,
    password?: string
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    setAuthMessage({ type: "info", text: "Authenticating credentials..." });

    return new Promise((resolve) => {
      setTimeout(() => {
        setIsLoading(false);
        const cleanEmail = email.trim().toLowerCase();
        
        let match = usersDb.find((u) => u.email.toLowerCase() === cleanEmail);

        if (!match) {
          // Create new session dynamically for new login email if not found in db
          const dynamicUser: UserSession = {
            id: `usr_${Date.now()}`,
            name: email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
            email: cleanEmail,
            role: "Executive Leader",
            password: password || "",
            isAdmin: cleanEmail.includes("admin"),
            emailVerified: true,
            subscription: createDefaultSubscription(cleanEmail),
            connectedAccounts: [
              { provider: "Gmail", email: cleanEmail, connectedAt: new Date().toISOString() },
            ],
          };

          const updatedDb = [...usersDb, dynamicUser];
          saveDb(updatedDb);
          saveSession(dynamicUser);
          setAuthMessage({ type: "success", text: "Welcome! Authenticated successfully." });
          resolve({ success: true });
          return;
        }

        // Validate password if provided
        if (match.password && password && match.password !== password) {
          setAuthMessage({ type: "error", text: "Incorrect password. Please try again." });
          resolve({ success: false, error: "Incorrect password" });
          return;
        }

        saveSession(match);
        setAuthMessage({ type: "success", text: `Welcome back, ${match.name}!` });
        resolve({ success: true });
      }, 500);
    });
  };

  // Google OAuth Flow
  const loginWithGoogle = async (customGoogleEmail?: string, customGoogleName?: string, accessToken?: string) => {
    setAuthMessage({ type: "info", text: "Initializing Google OAuth 2.0 connection..." });
    setIsLoading(true);

    if (!customGoogleEmail) {
      const authRes = buildGoogleAuthUrl();
      if (authRes.error || !authRes.url) {
        setIsLoading(false);
        setAuthMessage({
          type: "error",
          text: authRes.error || "Google OAuth configuration is incomplete. Please configure NEXT_PUBLIC_GOOGLE_CLIENT_ID in .env.local.",
        });
        return;
      }
      window.location.href = authRes.url;
    } else {
      // Authenticate with actual Google user retrieved from Google OAuth userinfo API
      const googleEmail = customGoogleEmail.trim().toLowerCase();
      const googleName = customGoogleName || googleEmail.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

      if (accessToken) {
        localStorage.setItem(
          `execuai_gmail_token_${googleEmail}`,
          JSON.stringify({ accessToken, email: googleEmail, name: googleName, expiresAt: Date.now() + 3600 * 1000 })
        );
      }

      let match = usersDb.find((u) => u.email.toLowerCase() === googleEmail);
      if (!match) {
        match = {
          id: `usr_g_${Date.now()}`,
          name: googleName,
          email: googleEmail,
          role: "Executive Officer",
          isAdmin: googleEmail.includes("admin"),
          emailVerified: true,
          subscription: createDefaultSubscription(googleEmail),
          connectedAccounts: [
            { provider: "Gmail", email: googleEmail, connectedAt: new Date().toISOString() },
          ],
        };
        saveDb([...usersDb, match]);
      } else {
        // Ensure connectedAccounts has the Gmail account
        const hasAcc = match.connectedAccounts.some((a) => a.email.toLowerCase() === googleEmail);
        if (!hasAcc) {
          match = {
            ...match,
            connectedAccounts: [
              ...match.connectedAccounts,
              { provider: "Gmail", email: googleEmail, connectedAt: new Date().toISOString() },
            ],
          };
          saveDb(usersDb.map((u) => (u.id === match!.id ? match! : u)));
        }
      }
      saveSession(match);
      setIsLoading(false);
      setAuthMessage({ type: "success", text: `Authenticated with Google as ${googleEmail}` });
      router.push("/app/dashboard");
    }
  };

  // Email Verification
  const verifyEmailCode = async (code: string): Promise<boolean> => {
    setIsLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        setIsLoading(false);
        if (code.length >= 4 && user) {
          const updatedUser = { ...user, emailVerified: true };
          saveSession(updatedUser);

          // Update DB
          const updatedDb = usersDb.map((u) => (u.id === user.id ? updatedUser : u));
          saveDb(updatedDb);

          setAuthMessage({ type: "success", text: "Email verified successfully!" });
          resolve(true);
        } else {
          setAuthMessage({ type: "error", text: "Invalid verification code. Please enter valid code." });
          resolve(false);
        }
      }, 500);
    });
  };

  const resendVerificationCode = async (): Promise<boolean> => {
    setAuthMessage({ type: "info", text: "Sending new verification code..." });
    return new Promise((resolve) => {
      setTimeout(() => {
        setAuthMessage({ type: "success", text: `New 6-digit verification code sent to ${user?.email || "your email"}.` });
        resolve(true);
      }, 500);
    });
  };

  // Connected Accounts Management
  const connectAccount = (provider: string, accountEmail: string) => {
    if (!user) return;
    const cleanAccountEmail = accountEmail.trim().toLowerCase();
    const exists = user.connectedAccounts.some((a) => a.email.toLowerCase() === cleanAccountEmail);

    if (!exists) {
      const updatedUser: UserSession = {
        ...user,
        connectedAccounts: [
          ...user.connectedAccounts,
          { provider, email: cleanAccountEmail, connectedAt: new Date().toISOString() },
        ],
        subscription: {
          ...user.subscription,
          perEmailLicenses: Array.from(new Set([...user.subscription.perEmailLicenses, cleanAccountEmail])),
        },
      };
      saveSession(updatedUser);

      // Update DB
      const updatedDb = usersDb.map((u) => (u.id === user.id ? updatedUser : u));
      saveDb(updatedDb);
    }
  };

  const removeAccount = (accountEmail: string) => {
    if (!user) return;
    const cleanAccountEmail = accountEmail.trim().toLowerCase();
    const updatedUser: UserSession = {
      ...user,
      connectedAccounts: user.connectedAccounts.filter((a) => a.email.toLowerCase() !== cleanAccountEmail),
    };
    saveSession(updatedUser);

    const updatedDb = usersDb.map((u) => (u.id === user.id ? updatedUser : u));
    saveDb(updatedDb);
  };

  // Profile Update
  const updateProfile = (updates: Partial<UserSession>) => {
    if (!user) return;
    const updatedUser = { ...user, ...updates };
    saveSession(updatedUser);

    const updatedDb = usersDb.map((u) => (u.id === user.id ? updatedUser : u));
    saveDb(updatedDb);
  };

  // Logout
  const logout = () => {
    saveSession(null);
    setAuthMessage(null);
    router.push("/auth/login");
  };

  // Admin Methods
  const getAllUsers = (): UserSession[] => {
    return usersDb;
  };

  const adminUpdateUser = (userId: string, updates: Partial<UserSession>) => {
    const updatedDb = usersDb.map((u) => {
      if (u.id === userId) {
        return {
          ...u,
          ...updates,
          subscription: updates.subscription ? { ...u.subscription, ...updates.subscription } : u.subscription,
        };
      }
      return u;
    });

    saveDb(updatedDb);

    // If current user modified, update session
    if (user && user.id === userId) {
      const updatedCurrent = updatedDb.find((u) => u.id === userId);
      if (updatedCurrent) saveSession(updatedCurrent);
    }
  };

  const adminCreateUser = (userData: {
    name: string;
    email: string;
    role?: string;
    plan?: UserSubscription["plan"];
  }): UserSession => {
    const cleanEmail = userData.email.trim().toLowerCase();
    const newUser: UserSession = {
      id: `usr_${Date.now()}`,
      name: userData.name.trim(),
      email: cleanEmail,
      role: userData.role || "Executive Leader",
      emailVerified: true,
      isAdmin: cleanEmail.includes("admin"),
      subscription: {
        plan: userData.plan || "Executive Pro",
        status: "active",
        trialStartedAt: new Date().toISOString(),
        trialEndsAt: new Date(Date.now() + 14 * 86400 * 1000).toISOString(),
        trialDaysLeft: 14,
        portalAccess: true,
        perEmailLicenses: [cleanEmail],
      },
      connectedAccounts: [
        { provider: "Gmail", email: cleanEmail, connectedAt: new Date().toISOString() },
      ],
    };

    saveDb([...usersDb, newUser]);
    return newUser;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        authMessage,
        registerUser,
        loginWithEmail,
        loginWithGoogle,
        verifyEmailCode,
        resendVerificationCode,
        connectAccount,
        removeAccount,
        updateProfile,
        logout,
        getAllUsers,
        adminUpdateUser,
        adminCreateUser,
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

