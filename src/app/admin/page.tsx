"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth, UserSession, UserSubscription } from "@/lib/auth-context";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function AdminPanelPage() {
  const router = useRouter();
  const { user, getAllUsers, adminUpdateUser, adminCreateUser, logout } = useAuth();
  
  const [users, setUsers] = React.useState<UserSession[]>([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedUser, setSelectedUser] = React.useState<UserSession | null>(null);
  
  // Create User Modal State
  const [showCreateModal, setShowCreateModal] = React.useState(false);
  const [newUserName, setNewUserName] = React.useState("");
  const [newUserEmail, setNewUserEmail] = React.useState("");
  const [newUserRole, setNewUserRole] = React.useState("Chief Executive Officer");
  const [newUserPlan, setNewUserPlan] = React.useState<UserSubscription["plan"]>("14-Day Trial");

  // License Modal State
  const [showLicenseModal, setShowLicenseModal] = React.useState(false);
  const [newLicenseEmail, setNewLicenseEmail] = React.useState("");

  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const refreshUsers = React.useCallback(() => {
    setUsers(getAllUsers());
  }, [getAllUsers]);

  React.useEffect(() => {
    refreshUsers();
  }, [refreshUsers]);

  // Filter users
  const filteredUsers = React.useMemo(() => {
    if (!searchQuery.trim()) return users;
    const q = searchQuery.toLowerCase();
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.role.toLowerCase().includes(q) ||
        u.subscription.plan.toLowerCase().includes(q)
    );
  }, [users, searchQuery]);

  // Admin Actions
  const handleTogglePortalAccess = (targetUser: UserSession) => {
    const currentAccess = targetUser.subscription.portalAccess;
    adminUpdateUser(targetUser.id, {
      subscription: {
        ...targetUser.subscription,
        portalAccess: !currentAccess,
      },
    });
    refreshUsers();
    showToast(
      !currentAccess
        ? `Granted portal access to ${targetUser.email}`
        : `Revoked portal access for ${targetUser.email}`
    );
  };

  const handleUpdateSubscriptionStatus = (
    targetUser: UserSession,
    status: UserSubscription["status"],
    plan?: UserSubscription["plan"]
  ) => {
    adminUpdateUser(targetUser.id, {
      subscription: {
        ...targetUser.subscription,
        status,
        plan: plan || targetUser.subscription.plan,
        portalAccess: status !== "expired",
      },
    });
    refreshUsers();
    showToast(`Updated subscription for ${targetUser.email} to ${status.toUpperCase()} (${plan || targetUser.subscription.plan})`);
  };

  const handleStart14DayTrial = (targetUser: UserSession) => {
    const now = new Date();
    const endsAt = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);
    adminUpdateUser(targetUser.id, {
      subscription: {
        ...targetUser.subscription,
        plan: "14-Day Trial",
        status: "trial",
        trialStartedAt: now.toISOString(),
        trialEndsAt: endsAt.toISOString(),
        trialDaysLeft: 14,
        portalAccess: true,
      },
    });
    refreshUsers();
    showToast(`Started new 14-day trial for ${targetUser.email}`);
  };

  const handleAddLicenseEmail = () => {
    if (!selectedUser || !newLicenseEmail.trim() || !newLicenseEmail.includes("@")) return;
    const cleanEmail = newLicenseEmail.trim().toLowerCase();
    const currentLicenses = selectedUser.subscription.perEmailLicenses || [];
    if (!currentLicenses.includes(cleanEmail)) {
      const updatedLicenses = [...currentLicenses, cleanEmail];
      adminUpdateUser(selectedUser.id, {
        subscription: {
          ...selectedUser.subscription,
          perEmailLicenses: updatedLicenses,
        },
      });
      refreshUsers();
      setSelectedUser({
        ...selectedUser,
        subscription: {
          ...selectedUser.subscription,
          perEmailLicenses: updatedLicenses,
        },
      });
      showToast(`Added per-email license (${cleanEmail}) to ${selectedUser.email}`);
    }
    setNewLicenseEmail("");
  };

  const handleRemoveLicenseEmail = (targetUser: UserSession, licenseEmail: string) => {
    const updatedLicenses = (targetUser.subscription.perEmailLicenses || []).filter(
      (e) => e !== licenseEmail
    );
    adminUpdateUser(targetUser.id, {
      subscription: {
        ...targetUser.subscription,
        perEmailLicenses: updatedLicenses,
      },
    });
    refreshUsers();
    if (selectedUser && selectedUser.id === targetUser.id) {
      setSelectedUser({
        ...selectedUser,
        subscription: {
          ...selectedUser.subscription,
          perEmailLicenses: updatedLicenses,
        },
      });
    }
    showToast(`Removed license ${licenseEmail} from ${targetUser.email}`);
  };

  const handleCreateUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim() || !newUserEmail.includes("@")) return;
    const created = adminCreateUser({
      name: newUserName,
      email: newUserEmail,
      role: newUserRole,
      plan: newUserPlan,
    });
    refreshUsers();
    setShowCreateModal(false);
    setNewUserName("");
    setNewUserEmail("");
    showToast(`Created user account for ${created.email} with ${created.subscription.plan}`);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 p-4 rounded-xl bg-[#2E936F] text-white text-xs font-bold shadow-xl flex items-center gap-3">
          <span className="material-symbols-outlined text-[20px]">check_circle</span>
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-white hover:opacity-80 ml-2">
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}

      {/* Admin Top Header */}
      <header className="bg-white border-b border-[#E2E8F0] px-6 py-4 flex items-center justify-between sticky top-0 z-40 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#F15E1C] text-white font-extrabold flex items-center justify-center text-base shadow-xs">
            E
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-[#0F172A] font-heading">ExecuAI Admin Console</h1>
              <span className="bg-[#FFF2EC] text-[#F15E1C] border border-[#FDE8DF] text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                Global Administration
              </span>
            </div>
            <p className="text-xs text-[#64748B]">Manage users, subscriptions, 14-day trials, portal access & per-email licenses</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/app/dashboard">
            <Button variant="secondary" size="sm" leftIcon={<span className="material-symbols-outlined text-[16px]">dashboard</span>}>
              Go to User Portal
            </Button>
          </Link>
          <Button variant="ghost" size="sm" onClick={logout} leftIcon={<span className="material-symbols-outlined text-[16px]">logout</span>}>
            Sign Out
          </Button>
        </div>
      </header>

      {/* Main Admin Workspace */}
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        {/* Architecture & Boss Requirement Matrix Header */}
        <section className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-[#0F172A] font-heading">Platform Architecture Control</h2>
              <p className="text-xs text-[#475569] mt-1">
                Admin Panel → Admin manages users & subscriptions → Subscription determines portal access → Per-email licensing & 14-day trial enforcement
              </p>
            </div>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setShowCreateModal(true)}
              leftIcon={<span className="material-symbols-outlined text-[16px]">person_add</span>}
            >
              Add New Executive User
            </Button>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
              <span className="text-[10px] font-bold uppercase text-[#64748B]">Total Registered Users</span>
              <div className="text-2xl font-extrabold text-[#0F172A]">{users.length}</div>
            </div>
            <div className="p-4 rounded-xl bg-[#E8F4F0] border border-[#2E936F]/30 space-y-1">
              <span className="text-[10px] font-bold uppercase text-[#2E936F]">Active 14-Day Trials</span>
              <div className="text-2xl font-extrabold text-[#2E936F]">
                {users.filter((u) => u.subscription?.status === "trial").length}
              </div>
            </div>
            <div className="p-4 rounded-xl bg-[#FFF2EC] border border-[#F15E1C]/30 space-y-1">
              <span className="text-[10px] font-bold uppercase text-[#F15E1C]">Active Subscriptions</span>
              <div className="text-2xl font-extrabold text-[#F15E1C]">
                {users.filter((u) => u.subscription?.status === "active").length}
              </div>
            </div>
            <div className="p-4 rounded-xl bg-[#FEF6E0] border border-[#FAB60A]/30 space-y-1">
              <span className="text-[10px] font-bold uppercase text-[#855D00]">Per-Email Licenses Granted</span>
              <div className="text-2xl font-extrabold text-[#855D00]">
                {users.reduce((acc, u) => acc + (u.subscription?.perEmailLicenses?.length || 0), 0)}
              </div>
            </div>
          </div>
        </section>

        {/* User Management Section */}
        <section className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xs space-y-4 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-[#0F172A] font-heading">User Accounts & Subscription Registry</h3>
              <span className="text-xs text-[#64748B]">({filteredUsers.length} accounts)</span>
            </div>

            <div className="w-full sm:w-72">
              <Input
                placeholder="Search user name, email, or plan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* User Table */}
          <div className="overflow-x-auto border border-[#E2E8F0] rounded-xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#475569] font-bold uppercase text-[10px] tracking-wider">
                  <th className="p-3">User & Email</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Subscription Plan</th>
                  <th className="p-3">Status & Trial</th>
                  <th className="p-3">Portal Access</th>
                  <th className="p-3">Per-Email Licenses</th>
                  <th className="p-3 text-right">Admin Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                {filteredUsers.map((u) => {
                  const sub = u.subscription || {};
                  const isPortalGranted = sub.portalAccess !== false && sub.status !== "expired";

                  return (
                    <tr key={u.id} className="hover:bg-[#F8FAFC]/80 transition-colors">
                      {/* User Info */}
                      <td className="p-3 font-semibold text-[#0F172A]">
                        <div className="font-bold text-sm text-[#0F172A]">{u.name}</div>
                        <div className="text-[#F15E1C] font-mono text-[11px]">{u.email}</div>
                        {u.isAdmin && (
                          <span className="inline-block mt-0.5 px-2 py-0.2 rounded bg-[#0F172A] text-white text-[9px] font-bold uppercase">
                            Admin
                          </span>
                        )}
                      </td>

                      {/* Role */}
                      <td className="p-3 text-[#475569]">{u.role}</td>

                      {/* Subscription Plan */}
                      <td className="p-3">
                        <span className="px-2.5 py-1 rounded-lg bg-[#F1F5F9] font-bold text-[#0F172A] border border-[#CBD5E1]">
                          {sub.plan || "14-Day Trial"}
                        </span>
                      </td>

                      {/* Status & Trial */}
                      <td className="p-3 space-y-1">
                        {sub.status === "active" && (
                          <span className="px-2.5 py-0.5 rounded-full bg-[#E8F4F0] text-[#2E936F] font-bold text-[10px] border border-[#2E936F]/30">
                            Active Subscription
                          </span>
                        )}
                        {sub.status === "trial" && (
                          <div className="space-y-0.5">
                            <span className="px-2.5 py-0.5 rounded-full bg-[#FFF2EC] text-[#F15E1C] font-bold text-[10px] border border-[#F15E1C]/30">
                              Active 14-Day Trial
                            </span>
                            <div className="text-[10px] text-[#64748B]">Started: {new Date(sub.trialStartedAt || Date.now()).toLocaleDateString()}</div>
                          </div>
                        )}
                        {sub.status === "expired" && (
                          <span className="px-2.5 py-0.5 rounded-full bg-[#FEF2F2] text-[#DC2626] font-bold text-[10px] border border-[#DC2626]/30">
                            Trial / Plan Expired
                          </span>
                        )}
                      </td>

                      {/* Portal Access */}
                      <td className="p-3">
                        <button
                          onClick={() => handleTogglePortalAccess(u)}
                          className={`px-3 py-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                            isPortalGranted
                              ? "bg-[#E8F4F0] text-[#2E936F] border border-[#2E936F]/40"
                              : "bg-[#FEF2F2] text-[#DC2626] border border-[#DC2626]/40"
                          }`}
                        >
                          <span className="material-symbols-outlined text-[14px]">
                            {isPortalGranted ? "check_circle" : "block"}
                          </span>
                          <span>{isPortalGranted ? "Access Granted" : "Restricted"}</span>
                        </button>
                      </td>

                      {/* Per-Email Licenses */}
                      <td className="p-3">
                        <div className="space-y-1">
                          <div className="flex flex-wrap gap-1">
                            {(sub.perEmailLicenses || [u.email]).map((licEmail) => (
                              <span
                                key={licEmail}
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#F1F5F9] text-[#0F172A] border border-[#CBD5E1] text-[10px]"
                              >
                                <span>{licEmail}</span>
                                {(sub.perEmailLicenses || []).length > 1 && (
                                  <button
                                    onClick={() => handleRemoveLicenseEmail(u, licEmail)}
                                    className="text-[#DC2626] hover:text-[#991B1B] font-bold ml-1"
                                    title="Revoke license"
                                  >
                                    ×
                                  </button>
                                )}
                              </span>
                            ))}
                          </div>
                          <button
                            onClick={() => {
                              setSelectedUser(u);
                              setShowLicenseModal(true);
                            }}
                            className="text-[10px] font-bold text-[#F15E1C] hover:underline"
                          >
                            + Add Licensed Email
                          </button>
                        </div>
                      </td>

                      {/* Admin Actions */}
                      <td className="p-3 text-right space-y-1">
                        <div className="flex items-center justify-end gap-1 flex-wrap">
                          <button
                            onClick={() => handleUpdateSubscriptionStatus(u, "active", "Executive Pro")}
                            className="px-2.5 py-1 rounded bg-[#2E936F] text-white font-bold text-[10px] hover:bg-[#24785a] transition-all cursor-pointer"
                          >
                            Grant Pro Plan
                          </button>
                          <button
                            onClick={() => handleStart14DayTrial(u)}
                            className="px-2.5 py-1 rounded bg-[#FFF2EC] text-[#F15E1C] border border-[#F15E1C]/40 font-bold text-[10px] hover:bg-[#F15E1C] hover:text-white transition-all cursor-pointer"
                          >
                            Start 14d Trial
                          </button>
                          <button
                            onClick={() => handleUpdateSubscriptionStatus(u, "expired")}
                            className="px-2 py-1 rounded bg-[#F1F5F9] text-[#DC2626] hover:bg-[#FEF2F2] font-bold text-[10px] border border-[#CBD5E1] cursor-pointer"
                          >
                            Expire Access
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* CREATE NEW USER MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <h3 className="text-base font-bold text-[#0F172A] font-heading flex items-center gap-2">
                <span className="material-symbols-outlined text-[#F15E1C]">person_add</span>
                Create Executive User
              </h3>
              <button onClick={() => setShowCreateModal(false)} className="text-[#94A3B8] hover:text-[#0F172A]">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateUserSubmit} className="space-y-4">
              <Input
                label="Full Name"
                placeholder="e.g. Sarah Jenkins"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
              />

              <Input
                label="Work Email Address"
                type="email"
                placeholder="e.g. sarah@company.com"
                value={newUserEmail}
                onChange={(e) => setNewUserEmail(e.target.value)}
              />

              <Input
                label="Executive Role"
                placeholder="e.g. VP Operations"
                value={newUserRole}
                onChange={(e) => setNewUserRole(e.target.value)}
              />

              <div className="space-y-1 text-xs">
                <label className="font-bold text-[#0F172A] uppercase text-[10px]">Initial Plan / Trial Status:</label>
                <select
                  value={newUserPlan}
                  onChange={(e) => setNewUserPlan(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs font-semibold text-[#0F172A]"
                >
                  <option value="14-Day Trial">14-Day Free Trial</option>
                  <option value="Executive Solo">Executive Solo ($49/mo)</option>
                  <option value="Executive Pro">Executive Pro ($99/mo)</option>
                  <option value="Enterprise Desk">Enterprise Desk ($249/mo)</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <Button variant="ghost" size="sm" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm">
                  Create User & Grant License
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PER-EMAIL LICENSE MODAL */}
      {showLicenseModal && selectedUser && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <h3 className="text-base font-bold text-[#0F172A] font-heading flex items-center gap-2">
                <span className="material-symbols-outlined text-[#2E936F]">verified</span>
                Add Per-Email License
              </h3>
              <button onClick={() => setShowLicenseModal(false)} className="text-[#94A3B8] hover:text-[#0F172A]">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <p className="text-xs text-[#475569]">
              Managing licensed emails for user: <strong className="text-[#0F172A]">{selectedUser.name}</strong> ({selectedUser.email}).
            </p>

            <Input
              label="Licensed Email Address"
              type="email"
              placeholder="e.g. personal.email@gmail.com"
              value={newLicenseEmail}
              onChange={(e) => setNewLicenseEmail(e.target.value)}
            />

            <div className="pt-2 flex justify-end gap-2">
              <Button variant="ghost" size="sm" onClick={() => setShowLicenseModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={handleAddLicenseEmail}>
                Grant Email License
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
