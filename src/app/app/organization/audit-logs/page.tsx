"use client";

import * as React from "react";
import { useAuth, AuditLogItem } from "@/lib/auth-context";
import { Button } from "@/components/ui/Button";
import { Table } from "@/components/ui/Table";
import { Pagination } from "@/components/ui/Pagination";

export default function OrganizationAuditLogPage() {
  const { getOrgAuditLogs, user } = useAuth();
  const [logs, setLogs] = React.useState<AuditLogItem[]>([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [actionFilter, setActionFilter] = React.useState("ALL");
  const [isLoading, setIsLoading] = React.useState(true);

  const loadAuditLogs = React.useCallback(async () => {
    setIsLoading(true);
    const liveLogs = await getOrgAuditLogs();
    setLogs(liveLogs);
    setIsLoading(false);
  }, [getOrgAuditLogs]);

  React.useEffect(() => {
    loadAuditLogs();
  }, [loadAuditLogs]);

  const filteredEntries = React.useMemo(() => {
    return logs.filter((row) => {
      if (actionFilter !== "ALL" && row.actionEvent !== actionFilter) {
        return false;
      }
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const matchActor = row.actorName.toLowerCase().includes(q);
        const matchResource = row.resourceContext.toLowerCase().includes(q);
        const matchResult = row.resultSummary.toLowerCase().includes(q);
        const matchAction = row.actionEvent.toLowerCase().includes(q);
        if (!matchActor && !matchResource && !matchResult && !matchAction) {
          return false;
        }
      }
      return true;
    });
  }, [logs, actionFilter, searchQuery]);

  return (
    <div className="space-y-6 max-w-full font-sans text-[#0F172A] pb-12">
      {/* Header */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-bold font-heading text-[#0F172A] tracking-tight">
                Organization Audit Trail & Ledger
              </h1>
              <span className="bg-[#E8F4F0] text-[#2E936F] text-xs px-2.5 py-0.5 rounded-full font-bold border border-[#2E936F]/30">
                Cryptographic Hashing Active
              </span>
            </div>
            <p className="text-xs text-[#64748B] mt-1">
              Immutable activity ledger tracking user invitations, access approvals/rejections, role updates, manager assignments, and organization changes.
            </p>
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={loadAuditLogs}
            leftIcon={<span className="material-symbols-outlined text-[16px]">refresh</span>}
          >
            Refresh Audit Ledger
          </Button>
        </div>

        {/* Filter Bar */}
        <div className="pt-3 border-t border-[#F8FAFC] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="w-full sm:w-80 relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] text-[18px]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search audit trail by actor, action, or hash..."
              className="w-full pl-9 pr-8 py-2 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs focus:ring-2 focus:ring-[#F15E1C]"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-[#94A3B8] font-bold text-[10px] uppercase">Filter Event:</span>
            <select
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
              className="p-2 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] font-semibold text-xs text-[#0F172A]"
            >
              <option value="ALL">All Event Types</option>
              <option value="User invited">User invited</option>
              <option value="User approved">User approved</option>
              <option value="User rejected">User rejected</option>
              <option value="User removed">User removed</option>
              <option value="Role changed">Role changed</option>
              <option value="Manager assigned">Manager assigned</option>
              <option value="Manager removed">Manager removed</option>
              <option value="Organization registered">Organization registered</option>
            </select>
          </div>
        </div>
      </section>

      {/* Table View */}
      <div className="hidden md:block bg-white rounded-3xl border border-[#E2E8F0] shadow-xs overflow-hidden">
        <Table
          data={filteredEntries}
          keyExtractor={(row) => row.id}
          columns={[
            {
              key: "createdAt",
              header: "Timestamp",
              width: "190px",
              render: (row) => (
                <span className="font-mono text-[11px] text-[#0F172A] font-medium">
                  {new Date(row.createdAt).toLocaleString()}
                </span>
              ),
            },
            {
              key: "actorName",
              header: "Actor / User",
              width: "180px",
              render: (row) => <span className="font-bold text-xs text-[#0F172A]">{row.actorName}</span>,
            },
            {
              key: "actionEvent",
              header: "Action Event",
              width: "160px",
              render: (row) => (
                <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider bg-[#FFF2EC] text-[#F15E1C] border border-[#FDE8DF]">
                  {row.actionEvent}
                </span>
              ),
            },
            {
              key: "resourceContext",
              header: "Resource Context",
              render: (row) => <span className="text-xs font-semibold text-[#0F172A]">{row.resourceContext}</span>,
            },
            {
              key: "resultSummary",
              header: "Result Summary & Log Nonce Hash",
              render: (row) => (
                <div className="space-y-0.5">
                  <p className="text-xs text-[#64748B] line-clamp-1">{row.resultSummary}</p>
                  <span className="font-mono text-[10px] text-[#94A3B8] font-bold">Hash: {row.logNonceHash}</span>
                </div>
              ),
            },
          ]}
        />
      </div>

      {/* Pagination */}
      <div className="pt-2">
        <Pagination currentPage={currentPage} totalPages={Math.ceil(filteredEntries.length / 10) || 1} onPageChange={setCurrentPage} />
      </div>
    </div>
  );
}
