import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";

export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: string;
  badge?: string | number;
  badgeVariant?: "primary" | "danger" | "neutral";
  section?: string;
}

export interface SidebarProps {
  currentPath?: string;
  connectedMailboxes?: Array<{ provider: string; email: string }>;
  userName?: string;
  userRole?: string;
  className?: string;
  onNavigate?: (path: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPath = "dashboard",
  connectedMailboxes = [
    { provider: "GMAIL", email: "ceo@company.com" },
    { provider: "ZOHO", email: "board@vance.io" },
  ],
  userName = "Alexander Vance",
  userRole = "Chief Executive Officer",
  className,
  onNavigate,
}) => {
  const { logout, user } = useAuth();

  const activeUser = user?.name || userName;
  const activeRole = user?.role || userRole;
  const activeAccounts = user?.connectedAccounts.map((a) => ({
    provider: a.provider.toUpperCase(),
    email: a.email,
  })) || connectedMailboxes;

  const isAdmin = user?.role === "ADMIN";
  const isManager = user?.role === "MANAGER" || isAdmin;

  const baseNavItems: NavItem[] = [
    { id: "dashboard", label: "Dashboard", href: "/app/dashboard", icon: "space_dashboard" },
    { id: "unified-inbox", label: "Unified Inbox", href: "/app/inbox", icon: "move_to_inbox", badge: 14, badgeVariant: "neutral" },
    { id: "decision-center", label: "Decision Center", href: "/app/decisions", icon: "gavel", badge: "5 Gates", badgeVariant: "danger" },
    { id: "drafts", label: "Drafts", href: "/app/drafts", icon: "edit_note", badge: 3, badgeVariant: "neutral" },
    { id: "accounts", label: "Accounts", href: "/app/accounts", icon: "supervisor_account" },
    { id: "analytics", label: "Analytics", href: "/app/analytics", icon: "insights" },
  ];

  const orgNavItems: NavItem[] = [
    { id: "organization", label: "Organization Hub", href: "/app/organization", icon: "corporate_fare", section: "Organization & RBAC" },
    ...(isManager ? [{ id: "organization-team", label: "Team & Roles", href: "/app/organization/team", icon: "group", section: "Organization & RBAC" }] : []),
    { id: "organization-audit", label: "Audit Logs", href: "/app/organization/audit-logs", icon: "receipt_long", section: "Organization & RBAC" },
  ];

  const governanceNavItems: NavItem[] = [
    { id: "rules-and-policies", label: "Rules & Policies", href: "/app/rules", icon: "policy", section: "Governance" },
    { id: "security-and-audit-log", label: "Security & Audit", href: "/app/security", icon: "verified_user", section: "Governance" },
    { id: "settings", label: "Settings", href: "/app/settings", icon: "settings", section: "Governance" },
    ...(isAdmin ? [{ id: "admin", label: "Admin Console", href: "/admin", icon: "admin_panel_settings", section: "Governance" }] : []),
  ];

  const navItems = [...baseNavItems, ...orgNavItems, ...governanceNavItems];

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen w-64 bg-white z-50 flex flex-col justify-between shadow-xs border-r border-[#E2E8F0] transition-all hidden lg:flex font-sans",
        className
      )}
    >
      <div className="flex flex-col flex-1 overflow-y-auto">
        {/* Brand Header */}
        <Link href="/" className="h-16 px-4 flex items-center justify-between border-b border-[#F8FAFC] group">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#F15E1C] text-white font-extrabold flex items-center justify-center text-sm shadow-xs group-hover:scale-105 transition-transform">
              E
            </div>
            <span className="text-xl font-heading font-extrabold tracking-tight text-[#0F172A]">
              ExecuAI
            </span>
          </div>
          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-[#FFF2EC] text-[#F15E1C] border border-[#FDE8DF]">
            v2.4
          </span>
        </Link>

        {/* Connected Mailboxes Box */}
        <div className="px-4 py-3">
          <div className="p-3 rounded-xl bg-[#FDF7F0] border border-[#F7D7B0] flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#475569]">
                Connected Mailboxes
              </span>
              <span className="w-2 h-2 rounded-full bg-[#2E936F]" />
            </div>
            <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
              {activeAccounts.map((mb, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-white shadow-2xs border border-[#E2E8F0] text-[11px]"
                >
                  <span className="font-bold text-[#0F172A]">
                    {mb.provider.toUpperCase().includes("GMAIL") ? "G" : "Z"}
                  </span>
                  <span className="text-[#475569] truncate max-w-[100px]">
                    {mb.email}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="flex-1 px-3 py-2 space-y-0.5">
          {navItems.map((item, index) => {
            const isActive = currentPath === item.id || (currentPath !== "dashboard" && currentPath.endsWith(item.id));
            const showSectionHeader =
              item.section && (index === 0 || navItems[index - 1].section !== item.section);

            return (
              <React.Fragment key={item.id}>
                {showSectionHeader && (
                  <div className="pt-3 pb-1 px-3">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#94A3B8]">
                      {item.section}
                    </span>
                  </div>
                )}
                <Link
                  href={item.href}
                  onClick={() => onNavigate?.(item.id)}
                  className={cn(
                    "flex items-center justify-between px-3 py-2 rounded-xl transition-all text-xs font-semibold group",
                    isActive
                      ? "bg-[#F15E1C] text-white shadow-xs font-bold"
                      : "text-[#475569] hover:bg-[#FFF2EC]/60 hover:text-[#0F172A]"
                  )}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className={cn("material-symbols-outlined text-[18px]", isActive ? "text-white" : "text-[#64748B] group-hover:text-[#F15E1C]")}>
                      {item.icon}
                    </span>
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span
                      className={cn(
                        "px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0",
                        item.badgeVariant === "danger"
                          ? isActive
                            ? "bg-white/25 text-white"
                            : "bg-[#FFF2EC] text-[#F15E1C] border border-[#FDE8DF]"
                          : isActive
                          ? "bg-white/20 text-white"
                          : "bg-[#F1F5F9] text-[#475569]"
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              </React.Fragment>
            );
          })}
        </nav>
      </div>

      {/* User Profile & Logout Footer */}
      <div className="p-3 bg-[#F8FAFC] border-t border-[#E2E8F0]">
        <div className="flex items-center gap-2.5 p-1.5 rounded-xl bg-white border border-[#E2E8F0]/80 shadow-2xs">
          <div className="w-8 h-8 rounded-lg bg-[#2E936F] text-white font-bold flex items-center justify-center shrink-0 text-xs shadow-2xs">
            {activeUser.split(" ").map((n) => n[0]).join("")}
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-xs font-bold text-[#0F172A] truncate leading-tight">
              {activeUser}
            </span>
            <span className="text-[10px] font-semibold text-[#64748B] truncate">
              {activeRole}
            </span>
          </div>
          <button
            type="button"
            onClick={logout}
            aria-label="Logout of workspace"
            className="text-[#94A3B8] hover:text-[#F15E1C] cursor-pointer p-1 rounded-lg hover:bg-[#FFF2EC] transition-colors shrink-0"
            title="Sign Out"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
