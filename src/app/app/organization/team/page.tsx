"use client";

import * as React from "react";
import { useAuth, UserSession, AccessRequestItem } from "@/lib/auth-context";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function TeamUserManagementPage() {
  const {
    user,
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
  } = useAuth();

  const [users, setUsers] = React.useState<UserSession[]>([]);
  const [accessRequests, setAccessRequests] = React.useState<AccessRequestItem[]>([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [roleFilter, setRoleFilter] = React.useState<string>("ALL");
  const [isLoading, setIsLoading] = React.useState(true);

  // Add User Modal State
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [addName, setAddName] = React.useState("");
  const [addEmail, setAddEmail] = React.useState("");
  const [addRole, setAddRole] = React.useState<"ADMIN" | "MANAGER" | "USER">("USER");

  // CSV Bulk Invite Modal State
  const [showCsvModal, setShowCsvModal] = React.useState(false);
  const [csvContent, setCsvContent] = React.useState("");
  const [csvErrors, setCsvErrors] = React.useState<string[]>([]);

  // Change Role Modal State
  const [selectedUser, setSelectedUser] = React.useState<UserSession | null>(null);
  const [showRoleModal, setShowRoleModal] = React.useState(false);
  const [newRole, setNewRole] = React.useState<"ADMIN" | "MANAGER" | "USER">("USER");

  // Toast State
  const [toast, setToast] = React.useState<string | null>(null);

  const showNotification = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };

  const refreshData = React.useCallback(async () => {
    setIsLoading(true);
    const uList = await getOrgUsers();
    setUsers(uList);
    const reqList = await getAccessRequests();
    setAccessRequests(reqList.filter((r) => r.status === "PENDING"));
    setIsLoading(false);
  }, [getOrgUsers, getAccessRequests]);

  React.useEffect(() => {
    refreshData();
  }, [refreshData]);

  const isAdmin = user?.role === "ADMIN";
  const isManager = user?.role === "MANAGER" || isAdmin;

  // Filtered Users
  const filteredUsers = React.useMemo(() => {
    return users.filter((u) => {
      if (roleFilter !== "ALL" && u.role !== roleFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.role.toLowerCase().includes(q);
      }
      return true;
    });
  }, [users, roleFilter, searchQuery]);

  // Handle Add Single User Submit
  const handleAddUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!addName.trim() || !addEmail.trim() || !addEmail.includes("@")) return;

    const res = await inviteOrgUser(addName, addEmail, addRole);
    if (res.success) {
      showNotification(`Invitation sent to ${addEmail} as ${addRole}`);
      setShowAddModal(false);
      setAddName("");
      setAddEmail("");
      refreshData();
    } else {
      showNotification(`Error: ${res.error || "Failed to add user"}`);
    }
  };

  // Handle CSV Bulk Submit
  const handleCsvSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!csvContent.trim()) return;

    const res = await bulkInviteCsv(csvContent);
    if (res.success) {
      showNotification(`Successfully imported ${res.count || 0} user(s) from CSV.`);
      if (res.errors && res.errors.length > 0) {
        setCsvErrors(res.errors);
      } else {
        setShowCsvModal(false);
        setCsvContent("");
        setCsvErrors([]);
      }
      refreshData();
    } else {
      setCsvErrors([res.error || "Failed to parse CSV file"]);
    }
  };

  // Handle Change Role Submit
  const handleRoleChangeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;

    const ok = await updateUserRole(selectedUser.id, newRole);
    if (ok) {
      showNotification(`Updated ${selectedUser.email}'s role to ${newRole}`);
      setShowRoleModal(false);
      refreshData();
    } else {
      showNotification("Failed to update user role");
    }
  };

  // Handle Remove User
  const handleRemoveUser = async (targetUser: UserSession) => {
    if (confirm(`Are you sure you want to remove ${targetUser.email} from the organization?`)) {
      const ok = await removeOrgUser(targetUser.id);
      if (ok) {
        showNotification(`Removed user ${targetUser.email}`);
        refreshData();
      } else {
        showNotification("Failed to remove user");
      }
    }
  };

  // Handle Access Request Approval / Rejection
  const handleAccessRequestAction = async (requestId: string, approve: boolean) => {
    const ok = approve
      ? await approveAccessRequest(undefined, requestId)
      : await rejectAccessRequest(undefined, requestId);

    if (ok) {
      showNotification(approve ? "Access request approved" : "Access request rejected");
      refreshData();
    }
  };

  return (
    <div className="space-y-8 max-w-full pb-12 font-sans text-[#0F172A]">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 p-4 rounded-xl bg-[#2E936F] text-white text-xs font-bold shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
          <span className="material-symbols-outlined text-[20px]">check_circle</span>
          <span>{toast}</span>
          <button onClick={() => setToast(null)} className="text-white hover:opacity-80 ml-2">
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}

      {/* Header Banner */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-bold font-heading text-[#0F172A] tracking-tight">
                User Management & Team Roles
              </h1>
              <span className="bg-[#FFF2EC] text-[#F15E1C] border border-[#FDE8DF] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                RBAC Governance
              </span>
            </div>
            <p className="text-xs text-[#64748B] mt-1">
              Manage organization users, role assignments (ADMIN, MANAGER, USER), access approvals, and bulk CSV invitations.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {isAdmin && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShowCsvModal(true)}
                leftIcon={<span className="material-symbols-outlined text-[16px]">upload_file</span>}
              >
                Bulk CSV Import
              </Button>
            )}
            {isManager && (
              <Button
                variant="primary"
                size="sm"
                onClick={() => setShowAddModal(true)}
                leftIcon={<span className="material-symbols-outlined text-[16px]">person_add</span>}
              >
                Add / Invite User
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Pending Access Requests Section */}
      {accessRequests.length > 0 && isManager && (
        <section className="bg-[#FFF2EC] rounded-2xl border border-[#F15E1C]/30 p-6 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold font-heading text-[#0F172A] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#F15E1C]">how_to_reg</span>
              Pending Access Requests ({accessRequests.length})
            </h2>
            <span className="text-xs text-[#F15E1C] font-semibold">Requires Admin/Manager approval</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {accessRequests.map((req) => (
              <div key={req.id} className="p-4 rounded-xl bg-white border border-[#E2E8F0] shadow-xs flex items-center justify-between gap-3 text-xs">
                <div>
                  <div className="font-bold text-[#0F172A]">{req.fullName}</div>
                  <div className="text-[#F15E1C] font-mono text-[11px]">{req.email}</div>
                  <span className="text-[10px] text-[#64748B]">Requested Role: {req.role}</span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleAccessRequestAction(req.id, true)}
                    className="px-2.5 py-1 rounded bg-[#2E936F] text-white font-bold text-[10px] hover:bg-[#24785a]"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleAccessRequestAction(req.id, false)}
                    className="px-2.5 py-1 rounded bg-[#FEF2F2] text-[#DC2626] border border-[#DC2626]/30 font-bold text-[10px] hover:bg-[#DC2626] hover:text-white"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Main User Registry Section */}
      <section className="bg-white rounded-3xl border border-[#E2E8F0] shadow-xs p-6 space-y-4">
        {/* Controls Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-[#0F172A] font-heading">Team Registry</h3>
            <span className="text-xs text-[#64748B]">({filteredUsers.length} total)</span>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="w-full sm:w-64">
              <Input
                placeholder="Search user name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="p-2.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs font-semibold text-[#0F172A]"
            >
              <option value="ALL">All Roles</option>
              <option value="ADMIN">ADMIN Only</option>
              <option value="MANAGER">MANAGER Only</option>
              <option value="USER">USER Only</option>
            </select>
          </div>
        </div>

        {/* User Table */}
        <div className="overflow-x-auto border border-[#E2E8F0] rounded-2xl">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#475569] font-bold uppercase text-[10px] tracking-wider">
                <th className="p-3.5">User & Email</th>
                <th className="p-3.5">Role</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Joined Date</th>
                <th className="p-3.5">Last Activity</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-[#F8FAFC]/80 transition-colors">
                  {/* User Info */}
                  <td className="p-3.5">
                    <div className="font-bold text-sm text-[#0F172A]">{u.name}</div>
                    <div className="text-[#F15E1C] font-mono text-[11px]">{u.email}</div>
                  </td>

                  {/* Role Badge */}
                  <td className="p-3.5">
                    <span
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider ${
                        u.role === "ADMIN"
                          ? "bg-[#FFF2EC] text-[#F15E1C] border border-[#FDE8DF]"
                          : u.role === "MANAGER"
                          ? "bg-[#EFF6FF] text-[#2563EB] border border-[#93C5FD]"
                          : "bg-[#F1F5F9] text-[#475569] border border-[#CBD5E1]"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>

                  {/* Status Badge */}
                  <td className="p-3.5">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        u.userStatus === "ACTIVE"
                          ? "bg-[#E8F4F0] text-[#2E936F]"
                          : u.userStatus === "DISABLED"
                          ? "bg-[#FEF2F2] text-[#DC2626]"
                          : "bg-[#FEF6E0] text-[#855D00]"
                      }`}
                    >
                      {u.userStatus || "ACTIVE"}
                    </span>
                  </td>

                  {/* Joined Date */}
                  <td className="p-3.5 text-[#64748B]">
                    {new Date(u.lastActivityAt || Date.now()).toLocaleDateString()}
                  </td>

                  {/* Last Activity */}
                  <td className="p-3.5 text-[#64748B]">
                    {u.lastActivityAt ? new Date(u.lastActivityAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Active now"}
                  </td>

                  {/* Actions */}
                  <td className="p-3.5 text-right space-x-1">
                    {isAdmin && (
                      <>
                        <button
                          onClick={() => {
                            setSelectedUser(u);
                            setNewRole(u.role);
                            setShowRoleModal(true);
                          }}
                          className="px-2.5 py-1 rounded bg-[#F1F5F9] text-[#0F172A] hover:bg-[#E2E8F0] font-bold text-[10px] border border-[#CBD5E1] cursor-pointer"
                        >
                          Change Role
                        </button>
                        {u.id !== user?.id && (
                          <button
                            onClick={() => handleRemoveUser(u)}
                            className="px-2 py-1 rounded bg-[#FEF2F2] text-[#DC2626] hover:bg-[#DC2626] hover:text-white font-bold text-[10px] border border-[#DC2626]/30 cursor-pointer"
                          >
                            Remove
                          </button>
                        )}
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ADD / INVITE USER MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <h3 className="text-base font-bold text-[#0F172A] font-heading flex items-center gap-2">
                <span className="material-symbols-outlined text-[#F15E1C]">person_add</span>
                Invite Team Member
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-[#94A3B8] hover:text-[#0F172A]">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleAddUserSubmit} className="space-y-4">
              <Input
                label="Full Name"
                placeholder="e.g. Anurag Sharma"
                value={addName}
                onChange={(e) => setAddName(e.target.value)}
              />

              <Input
                label="Work Email Address"
                type="email"
                placeholder="e.g. anurag@company.com"
                value={addEmail}
                onChange={(e) => setAddEmail(e.target.value)}
              />

              <div className="space-y-1 text-xs">
                <label className="font-bold text-[#0F172A] uppercase text-[10px]">Assigned Role:</label>
                <select
                  value={addRole}
                  onChange={(e) => setAddRole(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs font-semibold text-[#0F172A]"
                >
                  <option value="USER">USER (ExecuAI Email Features Only)</option>
                  <option value="MANAGER">MANAGER (Manage assigned team members)</option>
                  {isAdmin && <option value="ADMIN">ADMIN (Full Organization & User Control)</option>}
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <Button variant="ghost" size="sm" onClick={() => setShowAddModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm">
                  Send Invitation
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CSV BULK INVITE MODAL */}
      {showCsvModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <h3 className="text-base font-bold text-[#0F172A] font-heading flex items-center gap-2">
                <span className="material-symbols-outlined text-[#2563EB]">upload_file</span>
                Bulk CSV User Invitation
              </h3>
              <button onClick={() => setShowCsvModal(false)} className="text-[#94A3B8] hover:text-[#0F172A]">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <p className="text-xs text-[#475569]">
              Paste CSV content below (Format: <code>name, email, role</code>). Example:
            </p>
            <pre className="p-3 bg-[#F8FAFC] rounded-xl text-[11px] font-mono text-[#0F172A] border border-[#E2E8F0]">
              Anurag Sharma, anurag@company.com, USER{"\n"}
              Sarah Jenkins, sarah@company.com, MANAGER
            </pre>

            {csvErrors.length > 0 && (
              <div className="p-3 rounded-xl bg-[#FEF2F2] border border-[#DC2626]/30 text-xs text-[#DC2626] space-y-1">
                <div className="font-bold">Errors encountered:</div>
                <ul className="list-disc pl-4 space-y-0.5">
                  {csvErrors.map((err, idx) => (
                    <li key={idx}>{err}</li>
                  ))}
                </ul>
              </div>
            )}

            <form onSubmit={handleCsvSubmit} className="space-y-4">
              <textarea
                rows={5}
                placeholder="Paste CSV text here..."
                value={csvContent}
                onChange={(e) => setCsvContent(e.target.value)}
                className="w-full p-3 rounded-xl border border-[#E2E8F0] font-mono text-xs text-[#0F172A] focus:ring-2 focus:ring-[#F15E1C]"
              />

              <div className="pt-2 flex justify-end gap-2">
                <Button variant="ghost" size="sm" onClick={() => setShowCsvModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm">
                  Process Bulk Import
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CHANGE ROLE MODAL */}
      {showRoleModal && selectedUser && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <h3 className="text-base font-bold text-[#0F172A] font-heading flex items-center gap-2">
                <span className="material-symbols-outlined text-[#F15E1C]">manage_accounts</span>
                Change User Role
              </h3>
              <button onClick={() => setShowRoleModal(false)} className="text-[#94A3B8] hover:text-[#0F172A]">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <p className="text-xs text-[#475569]">
              Updating role for <strong className="text-[#0F172A]">{selectedUser.name}</strong> ({selectedUser.email}).
            </p>

            <form onSubmit={handleRoleChangeSubmit} className="space-y-4">
              <div className="space-y-1 text-xs">
                <label className="font-bold text-[#0F172A] uppercase text-[10px]">Select New Role:</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs font-semibold text-[#0F172A]"
                >
                  <option value="USER">USER (Standard Email Access)</option>
                  <option value="MANAGER">MANAGER (Scoped User Management)</option>
                  <option value="ADMIN">ADMIN (Full Tenant Management)</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <Button variant="ghost" size="sm" onClick={() => setShowRoleModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm">
                  Save Role Change
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
