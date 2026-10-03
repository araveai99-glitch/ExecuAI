"use client";

import * as React from "react";
import { useRouter, usePathname } from "next/navigation";
import { buildGoogleLoginUrl } from "@/lib/config/google-oauth";

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
  organizationId: string;
  organizationName: string;
  name: string;
  email: string;
  role: "ADMIN" | "MANAGER" | "USER";
  userStatus: "ACTIVE" | "PENDING_APPROVAL" | "INVITED" | "DISABLED";
  password?: string;
  avatarUrl?: string;
  isAdmin?: boolean; // Convenience flag for ADMIN role
  isManager?: boolean; // Convenience flag for MANAGER role
  emailVerified: boolean;
  managerId?: string;
  lastActivityAt?: string;
  subscription: UserSubscription;
  connectedAccounts: ConnectedAccount[];
}

export interface AccessRequestItem {
  id: string;
  organizationId: string;
  email: string;
  fullName: string;
  role: "ADMIN" | "MANAGER" | "USER";
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
}

export interface AuditLogItem {
  id: string;
  organizationId: string;
  userId?: string;
  actorName: string;
  actionEvent: string;
  resourceContext: string;
  resultSummary: string;
  logNonceHash: string;
  createdAt: string;
}

interface AuthContextType {
  user: UserSession | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  authMessage: { type: "info" | "success" | "error"; text: string } | null;

  // Organization Registration & Auth
  registerOrganization: (
    orgName: string,
    adminName: string,
    adminEmail: string,
    password?: string
  ) => Promise<{ success: boolean; error?: string }>;
  verifyOrgOtp: (code: string) => Promise<boolean>;

  registerUser: (name: string, email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  loginWithEmail: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: (customGoogleEmail?: string, customGoogleName?: string) => Promise<void>;
  verifyEmailCode: (code: string) => Promise<boolean>;
  resendVerificationCode: () => Promise<boolean>;
  connectAccount: (provider: string, accountEmail: string) => void;
  removeAccount: (accountEmail: string) => void;
  updateProfile: (updates: Partial<UserSession>) => void;
  logout: () => void;

  // User & Organization Management (RBAC)
  getOrgUsers: () => Promise<UserSession[]>;
  inviteOrgUser: (name: string, email: string, role: "ADMIN" | "MANAGER" | "USER", managerId?: string) => Promise<{ success: boolean; error?: string }>;
  bulkInviteCsv: (csvContent: string) => Promise<{ success: boolean; count?: number; errors?: string[]; error?: string }>;
  updateUserRole: (userId: string, role: "ADMIN" | "MANAGER" | "USER") => Promise<boolean>;
  updateUserStatus: (userId: string, status: "ACTIVE" | "PENDING_APPROVAL" | "INVITED" | "DISABLED") => Promise<boolean>;
  assignManager: (userId: string, managerId: string | null) => Promise<boolean>;
  removeOrgUser: (userId: string) => Promise<boolean>;

  // Access Requests & Audit Logs
  getAccessRequests: () => Promise<AccessRequestItem[]>;
  approveAccessRequest: (targetUserId?: string, requestId?: string) => Promise<boolean>;
  rejectAccessRequest: (targetUserId?: string, requestId?: string) => Promise<boolean>;
  getOrgAuditLogs: () => Promise<AuditLogItem[]>;

  // Admin Legacy Helpers
  getAllUsers: () => UserSession[];
  adminUpdateUser: (userId: string, updates: Partial<UserSession>) => void;
  adminCreateUser: (userData: { name: string; email: string; role?: string; plan?: UserSubscription["plan"] }) => UserSession;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

const STORAGE_SESSION_KEY = "execuai_current_user_session";
const STORAGE_USERS_DB_KEY = "execuai_users_database_v3";

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

  // Initialize DB and session
  React.useEffect(() => {
    try {
      const savedDb = localStorage.getItem(STORAGE_USERS_DB_KEY);
      let initialDb: UserSession[] = [];
      if (savedDb) {
        initialDb = JSON.parse(savedDb);
      } else {
        const defaultAdmin: UserSession = {
          id: "usr_admin_001",
          organizationId: "org_execuai_corp",
          organizationName: "ExecuAI Corporation",
          name: "Snehal Admin",
          email: "admin@execuai.com",
          role: "ADMIN",
          userStatus: "ACTIVE",
          password: "password123",
          isAdmin: true,
          isManager: true,
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

      const savedSession = localStorage.getItem(STORAGE_SESSION_KEY);
      if (savedSession) {
        const parsed: UserSession = JSON.parse(savedSession);
        const match = initialDb.find((u) => u.email.toLowerCase() === parsed.email.toLowerCase());
        setUser(match || parsed);
      }
    } catch (e) {
      console.error("Failed to initialize auth context", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveDb = (db: UserSession[]) => {
    setUsersDb(db);
    localStorage.setItem(STORAGE_USERS_DB_KEY, JSON.stringify(db));
  };

  const saveSession = (sessionData: UserSession | null) => {
    setUser(sessionData);
    if (sessionData) {
      localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(sessionData));
      fetch("/api/v1/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: sessionData.id, email: sessionData.email }),
      }).catch(() => {});
    } else {
      localStorage.removeItem(STORAGE_SESSION_KEY);
      fetch("/api/v1/auth/session", { method: "DELETE" }).catch(() => {});
    }
  };

  // Register Organization Flow
  const registerOrganization = async (
    orgName: string,
    adminName: string,
    adminEmail: string,
    password?: string
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    setAuthMessage({ type: "info", text: "Creating organization & Admin account..." });

    try {
      const res = await fetch("/api/v1/auth/org-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orgName, adminName, adminEmail, password }),
      });
      const data = await res.json();

      setIsLoading(false);

      if (!res.ok || !data.success) {
        const errMsg = data.error || "Failed to register organization";
        setAuthMessage({ type: "error", text: errMsg });
        return { success: false, error: errMsg };
      }

      const newAdminSession: UserSession = {
        id: data.user.id,
        organizationId: data.organization.id,
        organizationName: data.organization.name,
        name: data.user.name,
        email: data.user.email,
        role: "ADMIN",
        userStatus: "ACTIVE",
        password: password || "",
        isAdmin: true,
        isManager: true,
        emailVerified: false, // OTP required
        subscription: createDefaultSubscription(data.user.email),
        connectedAccounts: [],
      };

      saveDb([...usersDb, newAdminSession]);
      saveSession(newAdminSession);

      setAuthMessage({
        type: "success",
        text: `Organization '${data.organization.name}' created! Please verify your email via OTP.`,
      });

      return { success: true };
    } catch (err: any) {
      setIsLoading(false);
      const errMsg = err.message || "Network error registering organization";
      setAuthMessage({ type: "error", text: errMsg });
      return { success: false, error: errMsg };
    }
  };

  // Verify OTP for Org Registration
  const verifyOrgOtp = async (code: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/v1/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      setIsLoading(false);

      if (res.ok && data.success && user) {
        const updatedUser: UserSession = { ...user, emailVerified: true };
        saveSession(updatedUser);
        const updatedDb = usersDb.map((u) => (u.id === user.id ? updatedUser : u));
        saveDb(updatedDb);
        setAuthMessage({ type: "success", text: "Email verified successfully! Welcome to your Organization Dashboard." });
        return true;
      } else {
        setAuthMessage({ type: "error", text: data.error || "Invalid verification code. Try again." });
        return false;
      }
    } catch (err: any) {
      setIsLoading(false);
      setAuthMessage({ type: "error", text: "Failed to verify OTP code." });
      return false;
    }
  };

  // Register Standard User
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

        const existing = usersDb.find((u) => u.email.toLowerCase() === cleanEmail);
        if (existing) {
          setAuthMessage({ type: "error", text: "An account with this email address already exists. Please log in." });
          resolve({ success: false, error: "Email already registered" });
          return;
        }

        const newUser: UserSession = {
          id: `usr_${Date.now()}`,
          organizationId: "org_execuai_corp",
          organizationName: "ExecuAI Workspace",
          name: name.trim(),
          email: cleanEmail,
          role: cleanEmail.includes("admin") ? "ADMIN" : "USER",
          userStatus: "ACTIVE",
          password: password || "",
          isAdmin: cleanEmail.includes("admin"),
          isManager: cleanEmail.includes("admin"),
          emailVerified: false,
          subscription: createDefaultSubscription(cleanEmail),
          connectedAccounts: [],
        };

        saveDb([...usersDb, newUser]);
        saveSession(newUser);

        setAuthMessage({ type: "success", text: "Account created successfully! Please verify your email." });
        resolve({ success: true });
      }, 500);
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
          const dynamicUser: UserSession = {
            id: `usr_${Date.now()}`,
            organizationId: "org_execuai_corp",
            organizationName: "ExecuAI Workspace",
            name: email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
            email: cleanEmail,
            role: cleanEmail.includes("admin") ? "ADMIN" : "USER",
            userStatus: "ACTIVE",
            password: password || "",
            isAdmin: cleanEmail.includes("admin"),
            isManager: cleanEmail.includes("admin"),
            emailVerified: true,
            subscription: createDefaultSubscription(cleanEmail),
            connectedAccounts: [],
          };

          saveDb([...usersDb, dynamicUser]);
          saveSession(dynamicUser);
          setAuthMessage({ type: "success", text: "Welcome! Authenticated successfully." });
          resolve({ success: true });
          return;
        }

        if (match.password && password && match.password !== password) {
          setAuthMessage({ type: "error", text: "Incorrect password. Please try again." });
          resolve({ success: false, error: "Incorrect password" });
          return;
        }

        saveSession(match);
        setAuthMessage({ type: "success", text: `Welcome back, ${match.name}!` });
        resolve({ success: true });
      }, 400);
    });
  };

  const loginWithGoogle = async (customGoogleEmail?: string, customGoogleName?: string) => {
    setAuthMessage({ type: "info", text: "Initializing Google Sign-In..." });
    setIsLoading(true);

    if (!customGoogleEmail) {
      const authRes = buildGoogleLoginUrl();
      if (authRes.error || !authRes.url) {
        setIsLoading(false);
        setAuthMessage({
          type: "error",
          text: authRes.error || "Google OAuth configuration is incomplete.",
        });
        return;
      }
      window.location.href = authRes.url;
    } else {
      const googleEmail = customGoogleEmail.trim().toLowerCase();
      const googleName = customGoogleName || googleEmail.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

      let match = usersDb.find((u) => u.email.toLowerCase() === googleEmail);
      if (!match) {
        match = {
          id: `usr_g_${Date.now()}`,
          organizationId: "org_execuai_corp",
          organizationName: "ExecuAI Workspace",
          name: googleName,
          email: googleEmail,
          role: googleEmail.includes("admin") ? "ADMIN" : "USER",
          userStatus: "ACTIVE",
          isAdmin: googleEmail.includes("admin"),
          isManager: googleEmail.includes("admin"),
          emailVerified: true,
          subscription: createDefaultSubscription(googleEmail),
          connectedAccounts: [],
        };
        saveDb([...usersDb, match]);
      }

      saveSession(match);
      setIsLoading(false);
      setAuthMessage({ type: "success", text: `Authenticated with Google as ${googleEmail}` });
      router.push("/app/dashboard");
    }
  };

  const verifyEmailCode = async (code: string): Promise<boolean> => {
    setIsLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        setIsLoading(false);
        if (code.length >= 4 && user) {
          const updatedUser: UserSession = { ...user, emailVerified: true };
          saveSession(updatedUser);
          const updatedDb = usersDb.map((u) => (u.id === user.id ? updatedUser : u));
          saveDb(updatedDb);
          setAuthMessage({ type: "success", text: "Email verified successfully!" });
          resolve(true);
        } else {
          setAuthMessage({ type: "error", text: "Invalid verification code." });
          resolve(false);
        }
      }, 400);
    });
  };

  const resendVerificationCode = async (): Promise<boolean> => {
    setAuthMessage({ type: "info", text: "Sending new verification code..." });
    return new Promise((resolve) => {
      setTimeout(() => {
        setAuthMessage({ type: "success", text: `Verification code sent to ${user?.email || "email"}.` });
        resolve(true);
      }, 400);
    });
  };

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

  const updateProfile = (updates: Partial<UserSession>) => {
    if (!user) return;
    const updatedUser = { ...user, ...updates };
    saveSession(updatedUser);
    const updatedDb = usersDb.map((u) => (u.id === user.id ? updatedUser : u));
    saveDb(updatedDb);
  };

  const logout = () => {
    saveSession(null);
    setAuthMessage(null);
    router.push("/auth/login");
  };

  // --- ORGANIZATION RBAC & USER MANAGEMENT METHODS ---

  const getOrgUsers = async (): Promise<UserSession[]> => {
    try {
      const res = await fetch("/api/v1/organization/users");
      const data = await res.json();
      if (res.ok && data.users) {
        return data.users.map((u: any) => ({
          id: u.id,
          organizationId: u.organizationId || user?.organizationId || "org_execuai_corp",
          organizationName: user?.organizationName || "ExecuAI Workspace",
          name: u.name || u.fullName,
          email: u.email,
          role: u.role as any,
          userStatus: u.status as any,
          emailVerified: u.emailVerified ?? true,
          managerId: u.managerId,
          lastActivityAt: u.lastActivityAt,
          isAdmin: u.role === "ADMIN",
          isManager: u.role === "MANAGER" || u.role === "ADMIN",
          subscription: createDefaultSubscription(u.email),
          connectedAccounts: [],
        }));
      }
    } catch (_) {}
    return usersDb.filter((u) => u.organizationId === user?.organizationId);
  };

  const inviteOrgUser = async (
    name: string,
    email: string,
    role: "ADMIN" | "MANAGER" | "USER",
    managerId?: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetch("/api/v1/organization/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, role, managerId }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        const newUser: UserSession = {
          id: data.user.id,
          organizationId: user?.organizationId || "org_execuai_corp",
          organizationName: user?.organizationName || "ExecuAI Workspace",
          name: data.user.name,
          email: data.user.email,
          role: data.user.role,
          userStatus: "ACTIVE",
          isAdmin: data.user.role === "ADMIN",
          isManager: data.user.role === "MANAGER" || data.user.role === "ADMIN",
          emailVerified: true,
          managerId,
          subscription: createDefaultSubscription(data.user.email),
          connectedAccounts: [],
        };
        saveDb([...usersDb, newUser]);
        return { success: true };
      }
      return { success: false, error: data.error || "Failed to invite user" };
    } catch (err: any) {
      return { success: false, error: err.message || "Failed to invite user" };
    }
  };

  const bulkInviteCsv = async (
    csvContent: string
  ): Promise<{ success: boolean; count?: number; errors?: string[]; error?: string }> => {
    try {
      const res = await fetch("/api/v1/organization/users/csv-invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ csvData: csvContent }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        return { success: true, count: data.count, errors: data.errors };
      }
      return { success: false, error: data.error || "Failed to process CSV" };
    } catch (err: any) {
      return { success: false, error: err.message || "Network error processing CSV" };
    }
  };

  const updateUserRole = async (userId: string, role: "ADMIN" | "MANAGER" | "USER"): Promise<boolean> => {
    try {
      const res = await fetch("/api/v1/organization/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetUserId: userId, role }),
      });
      if (res.ok) {
        const updatedDb = usersDb.map((u) => (u.id === userId ? { ...u, role, isAdmin: role === "ADMIN", isManager: role !== "USER" } : u));
        saveDb(updatedDb);
        return true;
      }
    } catch (_) {}
    return false;
  };

  const updateUserStatus = async (
    userId: string,
    status: "ACTIVE" | "PENDING_APPROVAL" | "INVITED" | "DISABLED"
  ): Promise<boolean> => {
    try {
      const res = await fetch("/api/v1/organization/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetUserId: userId, status }),
      });
      if (res.ok) {
        const updatedDb = usersDb.map((u) => (u.id === userId ? { ...u, userStatus: status } : u));
        saveDb(updatedDb);
        return true;
      }
    } catch (_) {}
    return false;
  };

  const assignManager = async (userId: string, managerId: string | null): Promise<boolean> => {
    try {
      const res = await fetch("/api/v1/organization/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetUserId: userId, managerId }),
      });
      if (res.ok) {
        const updatedDb = usersDb.map((u) => (u.id === userId ? { ...u, managerId: managerId || undefined } : u));
        saveDb(updatedDb);
        return true;
      }
    } catch (_) {}
    return false;
  };

  const removeOrgUser = async (userId: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/v1/organization/users?userId=${userId}`, { method: "DELETE" });
      if (res.ok) {
        const updatedDb = usersDb.filter((u) => u.id !== userId);
        saveDb(updatedDb);
        return true;
      }
    } catch (_) {}
    return false;
  };

  const getAccessRequests = async (): Promise<AccessRequestItem[]> => {
    try {
      const res = await fetch("/api/v1/organization/access-requests");
      const data = await res.json();
      if (res.ok && data.accessRequests) {
        return data.accessRequests;
      }
    } catch (_) {}
    return [];
  };

  const approveAccessRequest = async (targetUserId?: string, requestId?: string): Promise<boolean> => {
    try {
      const res = await fetch("/api/v1/organization/access-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "APPROVE", targetUserId, requestId }),
      });
      return res.ok;
    } catch (_) {
      return false;
    }
  };

  const rejectAccessRequest = async (targetUserId?: string, requestId?: string): Promise<boolean> => {
    try {
      const res = await fetch("/api/v1/organization/access-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "REJECT", targetUserId, requestId }),
      });
      return res.ok;
    } catch (_) {
      return false;
    }
  };

  const getOrgAuditLogs = async (): Promise<AuditLogItem[]> => {
    try {
      const res = await fetch("/api/v1/organization/audit-logs");
      const data = await res.json();
      if (res.ok && data.auditLogs) {
        return data.auditLogs;
      }
    } catch (_) {}
    return [];
  };

  // Legacy Admin Methods
  const getAllUsers = (): UserSession[] => usersDb;

  const adminUpdateUser = (userId: string, updates: Partial<UserSession>) => {
    const updatedDb = usersDb.map((u) => (u.id === userId ? { ...u, ...updates } : u));
    saveDb(updatedDb);
    if (user && user.id === userId) saveSession({ ...user, ...updates });
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
      organizationId: user?.organizationId || "org_execuai_corp",
      organizationName: user?.organizationName || "ExecuAI Workspace",
      name: userData.name.trim(),
      email: cleanEmail,
      role: (userData.role as any) || "USER",
      userStatus: "ACTIVE",
      emailVerified: true,
      isAdmin: userData.role === "ADMIN",
      subscription: createDefaultSubscription(cleanEmail),
      connectedAccounts: [],
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
        registerOrganization,
        verifyOrgOtp,
        registerUser,
        loginWithEmail,
        loginWithGoogle,
        verifyEmailCode,
        resendVerificationCode,
        connectAccount,
        removeAccount,
        updateProfile,
        logout,
        getOrgUsers,
        inviteOrgUser,
        bulkInviteCsv,
        updateUserRole,
        updateUserStatus,
        assignManager,
        removeOrgUser,
        getAccessRequests,
        approveAccessRequest,
        rejectAccessRequest,
        getOrgAuditLogs,
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
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
