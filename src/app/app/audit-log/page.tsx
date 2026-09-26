"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Table } from "@/components/ui/Table";
import { Pagination } from "@/components/ui/Pagination";

interface AuditEntry {
  id: string;
  timestamp: string;
  user: string;
  action:
    | "Email received"
    | "Email classified"
    | "Risk detected"
    | "Draft generated"
    | "Draft edited"
    | "Draft approved"
    | "Email sent"
    | "Account connected"
    | "Account disconnected"
    | "Rule changed";
  resource: string;
  result: string;
  hash: string;
  badgeStyle: string;
}

export default function CryptographicAuditLogPage() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [actionFilter, setActionFilter] = React.useState("ALL");

  // Comprehensive Dataset covering ALL 10 MANDATED EVENT TYPES
  const auditEntries: AuditEntry[] = [
    {
      id: "AUD-99105",
      timestamp: "Sep 26, 2026, 10:48:12 AM EST",
      user: "Alexander Vance (CEO)",
      action: "Email sent",
      resource: "Series B Definitive Agreements (EMAIL-1001)",
      result: "SUCCESS: Controlled Send Executed via Provider OAuth API",
      hash: "0x9f89b...912c",
      badgeStyle: "bg-[#EFF4FF] text-[#2E936F] border border-[#79d9b0]/30",
    },
    {
      id: "AUD-99104",
      timestamp: "Sep 26, 2026, 10:47:05 AM EST",
      user: "Alexander Vance (CEO)",
      action: "Draft approved",
      resource: "Draft #DRAFT-1001 (Indemnity Cap Counter-Offer)",
      result: "APPROVED: Advanced to Controlled Send Authorization Gateway",
      hash: "0x4a12c...881e",
      badgeStyle: "bg-[#EFF4FF] text-[#2E936F] border border-[#79d9b0]/30",
    },
    {
      id: "AUD-99103",
      timestamp: "Sep 26, 2026, 10:45:30 AM EST",
      user: "Alexander Vance (CEO)",
      action: "Draft edited",
      resource: "Draft #DRAFT-1001 (Series B Redline)",
      result: "EDITED: Human voice adjustment saved to local buffer",
      hash: "0x77c90...112a",
      badgeStyle: "bg-[#FEF7E6] text-[#795600] border border-[#FDE68A]",
    },
    {
      id: "AUD-99102",
      timestamp: "Sep 26, 2026, 10:44:18 AM EST",
      user: "ExecuAI Response Studio",
      action: "Draft generated",
      resource: "Elena Rostova (Series B Agreement)",
      result: "GENERATED: Synthesized draft [Tone: Professional, Length: Medium]",
      hash: "0x33a09...552b",
      badgeStyle: "bg-[#EFF6FF] text-[#2563EB] border border-[#93C5FD]",
    },
    {
      id: "AUD-99101",
      timestamp: "Sep 26, 2026, 10:42:15 AM EST",
      user: "ExecuAI Policy Engine",
      action: "Risk detected",
      resource: "Section 14.2 Uncapped Liability (EMAIL-1001)",
      result: "HIGH RISK GATE: Autonomous reply programmatically blocked",
      hash: "0x11b40...339a",
      badgeStyle: "bg-[#FFF1F2] text-[#E11D48] border border-[#FDA4AF]",
    },
    {
      id: "AUD-99100",
      timestamp: "Sep 26, 2026, 10:42:01 AM EST",
      user: "ExecuAI Classifier v2.4",
      action: "Email classified",
      resource: "Series B Definitive Agreements (EMAIL-1001)",
      result: "TRIAGED: [Priority: CRITICAL, Intent: LEGAL, Risk: HIGH_RISK]",
      hash: "0x88f11...001c",
      badgeStyle: "bg-[#EFF6FF] text-[#2563EB] border border-[#93C5FD]",
    },
    {
      id: "AUD-99099",
      timestamp: "Sep 26, 2026, 10:41:55 AM EST",
      user: "Gmail Ingestion Connector",
      action: "Email received",
      resource: "ceo@company.com (Gmail #1)",
      result: "SUCCESS: Ingested payload from elena@apexlaw.com",
      hash: "0x00c42...99a1",
      badgeStyle: "bg-[#F8FAFC] text-[#0F172A] border border-[#E2E8F0]",
    },
    {
      id: "AUD-99098",
      timestamp: "Sep 26, 2026, 09:15:00 AM EST",
      user: "Alexander Vance (CEO)",
      action: "Rule changed",
      resource: "Rule #RULE-1 (Legal Domain Review)",
      result: "UPDATED: Enforced mandatory Decision Center review for @apexlaw.com",
      hash: "0x55d12...443e",
      badgeStyle: "bg-[#FEF7E6] text-[#795600] border border-[#FDE68A]",
    },
    {
      id: "AUD-99097",
      timestamp: "Sep 25, 2026, 04:30:00 PM EST",
      user: "Alexander Vance (CEO)",
      action: "Account connected",
      resource: "director@company.com (Zoho #1)",
      result: "SUCCESS: Authorized OAuth 2.0 PKCE token [Read & Draft Scopes]",
      hash: "0x77e99...221b",
      badgeStyle: "bg-[#EFF4FF] text-[#2E936F] border border-[#79d9b0]/30",
    },
    {
      id: "AUD-99096",
      timestamp: "Sep 24, 2026, 02:10:00 PM EST",
      user: "Alexander Vance (CEO)",
      action: "Account disconnected",
      resource: "legacy.test@company.com (Gmail #4)",
      result: "REVOKED: OAuth refresh token revoked and purged from connector",
      hash: "0xcc441...889f",
      badgeStyle: "bg-[#FFF1F2] text-[#E11D48] border border-[#FDA4AF]",
    },
  ];

  // Filtered Entries
  const filteredEntries = React.useMemo(() => {
    return auditEntries.filter((row) => {
      if (actionFilter !== "ALL" && row.action !== actionFilter) {
        return false;
      }
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const matchUser = row.user.toLowerCase().includes(q);
        const matchResource = row.resource.toLowerCase().includes(q);
        const matchResult = row.result.toLowerCase().includes(q);
        const matchAction = row.action.toLowerCase().includes(q);
        if (!matchUser && !matchResource && !matchResult && !matchAction) {
          return false;
        }
      }
      return true;
    });
  }, [actionFilter, searchQuery]);

  return (
    <div className="space-y-6 max-w-full overflow-x-hidden pb-12">
      {/* Header */}
      <section className="bg-white rounded-2xl p-4 sm:p-6 border border-[#E2E8F0] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight">Cryptographic Audit Trail</h1>
              <span className="bg-[#EFF4FF] text-[#2E936F] text-xs px-2.5 py-0.5 rounded-full font-bold border border-[#79d9b0]/30">
                Immutable Ledger Active
              </span>
              <span className="bg-[#E5EEFF] text-[#2563EB] text-xs px-2.5 py-0.5 rounded-full font-bold">
                Zero Token Exposure
              </span>
            </div>
            <p className="text-xs text-[#64748B] mt-1">
              Recorded verification log tracking email ingestion, AI classification, risk detection, draft approvals, and OAuth events.
            </p>
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => alert("Exporting audit log CSV/JSON archive...")}
            leftIcon={<span className="material-symbols-outlined text-[16px]">download</span>}
          >
            Export Audit Ledger
          </Button>
        </div>

        {/* Search & Action Filter Controls */}
        <div className="pt-3 border-t border-[#F8FAFC] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="w-full sm:w-80 relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] text-[18px]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search audit trail by actor, resource, or hash..."
              className="w-full pl-9 pr-8 py-2 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs focus:ring-2 focus:ring-[#2E936F]"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-[#94A3B8] font-bold text-[10px] uppercase">Filter Event:</span>
            <select
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
              className="p-2 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] font-semibold text-xs text-[#0F172A]"
            >
              <option value="ALL">All 10 Recorded Event Types</option>
              <option value="Email received">Email received</option>
              <option value="Email classified">Email classified</option>
              <option value="Risk detected">Risk detected</option>
              <option value="Draft generated">Draft generated</option>
              <option value="Draft edited">Draft edited</option>
              <option value="Draft approved">Draft approved</option>
              <option value="Email sent">Email sent</option>
              <option value="Account connected">Account connected</option>
              <option value="Account disconnected">Account disconnected</option>
              <option value="Rule changed">Rule changed</option>
            </select>
          </div>
        </div>
      </section>

      {/* Desktop Data Table View */}
      <div className="hidden md:block bg-white rounded-2xl border border-[#E2E8F0] shadow-xs overflow-hidden">
        <Table
          data={filteredEntries}
          keyExtractor={(row) => row.id}
          columns={[
            {
              key: "timestamp",
              header: "Timestamp",
              width: "190px",
              render: (row) => <span className="font-mono text-[11px] text-[#0F172A] font-medium">{row.timestamp}</span>,
            },
            {
              key: "user",
              header: "User / Actor",
              width: "180px",
              render: (row) => <span className="font-bold text-xs text-[#0F172A]">{row.user}</span>,
            },
            {
              key: "action",
              header: "Action Event",
              width: "160px",
              render: (row) => (
                <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider ${row.badgeStyle}`}>
                  {row.action}
                </span>
              ),
            },
            {
              key: "resource",
              header: "Resource Context",
              render: (row) => <span className="text-xs font-semibold text-[#0F172A]">{row.resource}</span>,
            },
            {
              key: "result",
              header: "Result & Log Nonce Hash",
              render: (row) => (
                <div className="space-y-0.5">
                  <p className="text-xs text-[#64748B] line-clamp-1">{row.result}</p>
                  <span className="font-mono text-[10px] text-[#94A3B8] font-bold">Hash: {row.hash}</span>
                </div>
              ),
            },
          ]}
        />
      </div>

      {/* Mobile Stacked Card View */}
      <div className="md:hidden space-y-3">
        {filteredEntries.map((row) => (
          <div key={row.id} className="p-4 rounded-xl bg-white border border-[#E2E8F0] shadow-xs space-y-2 text-xs">
            <div className="flex items-center justify-between gap-2 border-b border-[#F8FAFC] pb-2">
              <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase ${row.badgeStyle}`}>
                {row.action}
              </span>
              <span className="font-mono text-[10px] text-[#94A3B8]">{row.timestamp}</span>
            </div>

            <div>
              <span className="text-[10px] font-bold text-[#94A3B8] uppercase block">Actor:</span>
              <span className="font-bold text-[#0F172A]">{row.user}</span>
            </div>

            <div>
              <span className="text-[10px] font-bold text-[#94A3B8] uppercase block">Resource:</span>
              <span className="font-semibold text-[#0F172A]">{row.resource}</span>
            </div>

            <div className="pt-1 border-t border-[#F8FAFC]">
              <p className="text-[#64748B] text-[11px]">{row.result}</p>
              <span className="font-mono text-[10px] text-[#94A3B8] block mt-0.5">Hash: {row.hash}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pt-2">
        <Pagination currentPage={currentPage} totalPages={4} onPageChange={setCurrentPage} />
      </div>
    </div>
  );
}
