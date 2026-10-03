"use client";

import * as React from "react";
import Link from "next/link";
import { useAuth, UserSession } from "@/lib/auth-context";
import { Button } from "@/components/ui/Button";

interface OrgDetails {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  owner: { id: string; name: string; email: string } | null;
  totalUsers: number;
  activeUsers: number;
  managersCount: number;
}

export default function OrganizationDashboardPage() {
  const { user } = useAuth();
  const [orgData, setOrgData] = React.useState<OrgDetails | null>(null);
  const [teamMembers, setTeamMembers] = React.useState<UserSession[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function loadOrgInfo() {
      try {
        const res = await fetch("/api/v1/organization");
        const data = await res.json();
        if (res.ok && data.organization) {
          setOrgData(data.organization);
        }

        const usersRes = await fetch("/api/v1/organization/users");
        const usersData = await usersRes.json();
        if (usersRes.ok && usersData.users) {
          setTeamMembers(usersData.users);
        }
      } catch (err) {
        console.error("Failed to fetch organization dashboard details", err);
      } finally {
        setLoading(false);
      }
    }
    loadOrgInfo();
  }, []);

  const isAdmin = user?.role === "ADMIN";
  const isManager = user?.role === "MANAGER" || isAdmin;

  const orgId = orgData?.id || user?.organizationId || "org_execuai_corp";
  const orgName = orgData?.name || user?.organizationName || "ExecuAI Corporation";
  const createdDate = orgData?.createdAt
    ? new Date(orgData.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : "October 3, 2026";
  const ownerName = orgData?.owner?.name || user?.name || "System Admin";
  const ownerEmail = orgData?.owner?.email || user?.email || "admin@company.com";

  return (
    <div className="space-y-8 max-w-full pb-12 font-sans text-[#0F172A]">
      {/* Header Banner */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-[#FFF2EC] text-[#F15E1C] border border-[#FDE8DF] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Multi-Tenant Organization Workspace
              </span>
              <span className="bg-[#E8F4F0] text-[#2E936F] border border-[#2E936F]/30 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                Role: {user?.role || "ADMIN"}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-heading text-[#0F172A] tracking-tight">
              {orgName}
            </h1>
            <p className="text-xs text-[#64748B]">
              Tenant ID: <code className="font-mono text-[#F15E1C] bg-[#FFF2EC] px-2 py-0.5 rounded">{orgId}</code> • Created {createdDate}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {isManager && (
              <Link href="/app/organization/team">
                <Button variant="primary" size="sm" leftIcon={<span className="material-symbols-outlined text-[16px]">group</span>}>
                  Manage Team & Roles
                </Button>
              </Link>
            )}
            <Link href="/app/organization/audit-logs">
              <Button variant="secondary" size="sm" leftIcon={<span className="material-symbols-outlined text-[16px]">receipt_long</span>}>
                View Audit Logs
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Metrics & Architecture Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs space-y-1">
          <div className="flex items-center justify-between text-[#64748B]">
            <span className="text-[10px] font-bold uppercase tracking-wider">Total Organization Users</span>
            <span className="material-symbols-outlined text-[#F15E1C]">badge</span>
          </div>
          <div className="text-3xl font-extrabold text-[#0F172A]">
            {orgData?.totalUsers || teamMembers.length || 1}
          </div>
          <p className="text-[11px] text-[#475569]">Active accounts in tenant</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs space-y-1">
          <div className="flex items-center justify-between text-[#64748B]">
            <span className="text-[10px] font-bold uppercase tracking-wider">Organization Owner / Admin</span>
            <span className="material-symbols-outlined text-[#2E936F]">admin_panel_settings</span>
          </div>
          <div className="text-sm font-bold text-[#0F172A] truncate">
            {ownerName}
          </div>
          <p className="text-[11px] text-[#2E936F] font-mono truncate">{ownerEmail}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs space-y-1">
          <div className="flex items-center justify-between text-[#64748B]">
            <span className="text-[10px] font-bold uppercase tracking-wider">Managers Assigned</span>
            <span className="material-symbols-outlined text-[#2563EB]">manage_accounts</span>
          </div>
          <div className="text-3xl font-extrabold text-[#2563EB]">
            {orgData?.managersCount || teamMembers.filter((u) => u.role === "MANAGER").length || 0}
          </div>
          <p className="text-[11px] text-[#475569]">User management delegates</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs space-y-1">
          <div className="flex items-center justify-between text-[#64748B]">
            <span className="text-[10px] font-bold uppercase tracking-wider">Data Isolation & Security</span>
            <span className="material-symbols-outlined text-[#855D00]">verified_user</span>
          </div>
          <div className="text-sm font-bold text-[#855D00]">
            Multi-Tenant Isolated
          </div>
          <p className="text-[11px] text-[#475569]">Strict Tenant & Privacy Enforced</p>
        </div>
      </div>

      {/* Organization Details & Governance Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Organization Summary & Admin Control */}
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-xs space-y-4">
            <h2 className="text-lg font-bold font-heading text-[#0F172A] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#F15E1C]">corporate_fare</span>
              Organization Profile & Tenant Settings
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
                <span className="text-[10px] font-bold uppercase text-[#94A3B8]">Organization Name</span>
                <p className="font-bold text-[#0F172A] text-sm">{orgName}</p>
              </div>

              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
                <span className="text-[10px] font-bold uppercase text-[#94A3B8]">Unique Tenant Identifier</span>
                <p className="font-mono text-[#F15E1C] font-bold text-xs">{orgId}</p>
              </div>

              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
                <span className="text-[10px] font-bold uppercase text-[#94A3B8]">Primary Administrator</span>
                <p className="font-bold text-[#0F172A]">{ownerName} ({ownerEmail})</p>
              </div>

              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
                <span className="text-[10px] font-bold uppercase text-[#94A3B8]">Email Content Privacy Policy</span>
                <p className="font-semibold text-[#2E936F]">Protected: Email content visible to owner only</p>
              </div>
            </div>
          </section>

          {/* Quick Team Registry Table */}
          <section className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold font-heading text-[#0F172A]">Organization Team Overview</h3>
              {isManager && (
                <Link href="/app/organization/team" className="text-xs font-bold text-[#F15E1C] hover:underline">
                  View Full Team Registry →
                </Link>
              )}
            </div>

            <div className="overflow-x-auto border border-[#E2E8F0] rounded-xl">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#475569] font-bold uppercase text-[10px] tracking-wider">
                    <th className="p-3">User & Email</th>
                    <th className="p-3">Role</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Joined Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]">
                  {teamMembers.slice(0, 5).map((m) => (
                    <tr key={m.id} className="hover:bg-[#F8FAFC]">
                      <td className="p-3">
                        <div className="font-bold text-[#0F172A]">{m.name}</div>
                        <div className="text-[#64748B] text-[11px] font-mono">{m.email}</div>
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          m.role === "ADMIN" ? "bg-[#FFF2EC] text-[#F15E1C] border border-[#FDE8DF]" :
                          m.role === "MANAGER" ? "bg-[#EFF6FF] text-[#2563EB] border border-[#93C5FD]" :
                          "bg-[#F1F5F9] text-[#475569]"
                        }`}>
                          {m.role}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded-full bg-[#E8F4F0] text-[#2E936F] font-bold text-[10px]">
                          {m.userStatus || "ACTIVE"}
                        </span>
                      </td>
                      <td className="p-3 text-[#64748B]">
                        {new Date(m.lastActivityAt || Date.now()).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Right Column: RBAC Permission Matrix & Quick Governance */}
        <div className="space-y-6">
          <section className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-xs space-y-4">
            <h3 className="text-base font-bold font-heading text-[#0F172A] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#2E936F]">shield</span>
              RBAC Role Permissions
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-[#FFF2EC] border border-[#FDE8DF] space-y-1">
                <div className="font-bold text-[#F15E1C] uppercase text-[10px]">ADMIN Role</div>
                <p className="text-[#475569] text-[11px]">
                  Full management of organization settings, users, role updates, access request approvals, bulk CSV invites, and audit logs.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#EFF6FF] border border-[#93C5FD] space-y-1">
                <div className="font-bold text-[#2563EB] uppercase text-[10px]">MANAGER Role</div>
                <p className="text-[#475569] text-[11px]">
                  Manages users within assigned scope, approves access requests within scope, and views team activity.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
                <div className="font-bold text-[#475569] uppercase text-[10px]">USER Role</div>
                <p className="text-[#475569] text-[11px]">
                  Uses ExecuAI email intelligence, connects personal email accounts, and drafts responses. Restricted from administrative views.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
