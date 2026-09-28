"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Sidebar } from "@/components/ui/Sidebar";
import { Header } from "@/components/ui/Header";
import { MobileNavigation } from "@/components/ui/MobileNavigation";
import { useAuth } from "@/lib/auth-context";

import { UserDataProvider } from "@/lib/user-data-context";

export default function AppShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();

  // Route Guard Effect
  React.useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push("/auth/login");
        return;
      }

      // Check subscription / portal access
      const isSubscriptionExpiredPage = pathname === "/app/subscription-expired";
      const isAccessRestricted =
        user?.subscription?.portalAccess === false || user?.subscription?.status === "expired";

      if (isAccessRestricted && !isSubscriptionExpiredPage) {
        router.push("/app/subscription-expired");
      }
    }
  }, [isAuthenticated, isLoading, pathname, router, user]);

  // Extract current page path id (e.g. /app/dashboard -> dashboard)
  const segments = pathname.split("/").filter(Boolean);
  const currentPathId = segments[segments.length - 1] || "dashboard";

  const handleNavigate = (id: string) => {
    const routeMap: Record<string, string> = {
      dashboard: "/app/dashboard",
      "unified-inbox": "/app/inbox",
      inbox: "/app/inbox",
      "decision-center": "/app/decisions",
      decisions: "/app/decisions",
      drafts: "/app/drafts",
      accounts: "/app/accounts",
      analytics: "/app/analytics",
      "rules-and-policies": "/app/rules",
      rules: "/app/rules",
      "security-and-audit-log": "/app/security",
      security: "/app/security",
      "audit-log": "/app/audit-log",
      settings: "/app/settings",
    };

    const targetRoute = routeMap[id] || `/app/${id}`;
    router.push(targetRoute);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 text-center font-sans">
        <div className="w-12 h-12 rounded-2xl bg-[#F15E1C] text-white font-extrabold flex items-center justify-center text-xl shadow-lg animate-pulse mb-3">
          E
        </div>
        <p className="text-xs font-bold text-[#475569]">Loading ExecuAI Session...</p>
      </div>
    );
  }

  const activeUserName = user?.name || "Authenticated Executive";
  const activeUserRole = user?.role || "Executive Leader";
  const connectedMailboxes = user?.connectedAccounts?.map((a) => ({
    provider: a.provider.toUpperCase(),
    email: a.email,
  })) || [];

  return (
    <UserDataProvider>
      <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans antialiased">
        {/* Persistent Desktop Sidebar */}
        <Sidebar
          currentPath={currentPathId}
          onNavigate={handleNavigate}
          connectedMailboxes={connectedMailboxes}
          userName={activeUserName}
          userRole={activeUserRole}
        />

        {/* Persistent Top Header */}
        <Header
          userName={activeUserName}
          syncedCount={connectedMailboxes.length || 1}
          onSearch={(q) => console.log("Global search:", q)}
        />

        {/* Main Content Area */}
        <main className="pl-0 lg:pl-64 pt-16 pb-20 lg:pb-8 min-h-screen bg-[#F8FAFC]">
          <div className="w-full max-w-[1720px] mx-auto p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>

        {/* Mobile Sticky Bottom Navigation (<1024px) */}
        <MobileNavigation
          currentPath={currentPathId}
          onNavigate={handleNavigate}
        />
      </div>
    </UserDataProvider>
  );
}

