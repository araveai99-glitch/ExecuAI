"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Sidebar } from "@/components/ui/Sidebar";
import { Header } from "@/components/ui/Header";
import { MobileNavigation } from "@/components/ui/MobileNavigation";

export default function AppShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  // Extract current page path id (e.g. /app/dashboard -> dashboard)
  const segments = pathname.split("/").filter(Boolean);
  const currentPathId = segments[segments.length - 1] || "dashboard";

  const handleNavigate = (id: string) => {
    // Map id to route path
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

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans antialiased">
      {/* Persistent Desktop Sidebar */}
      <Sidebar
        currentPath={currentPathId}
        onNavigate={handleNavigate}
        connectedMailboxes={[
          { provider: "GMAIL", email: "ceo@company.com" },
          { provider: "ZOHO", email: "board@vance.io" },
        ]}
        userName="Alexander Vance"
        userRole="Chief Executive Officer"
      />

      {/* Persistent Top Header */}
      <Header
        userName="Alexander Vance"
        syncedCount={3}
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
  );
}
