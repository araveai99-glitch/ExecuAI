"use client";

import * as React from "react";
import { Table } from "@/components/ui/Table";
import { Pagination } from "@/components/ui/Pagination";

export default function AuditLogPage() {
  const [currentPage, setCurrentPage] = React.useState(1);

  const logs = [
    {
      id: "AUD-99102",
      timestamp: "Today, 10:48 AM",
      event: "DISPATCHED_VIA_GMAIL_API",
      actor: "Alexander Vance (User)",
      target: "Elena Rostova (Series B Review)",
      risk: "HIGH_RISK",
      nonce: "0x7F89B...912C",
    },
    {
      id: "AUD-99101",
      timestamp: "Today, 10:47 AM",
      event: "HUMAN_CLEARANCE_GRANTED",
      actor: "Alexander Vance (User)",
      target: "Draft #DRAFT-4091 Edited & Approved",
      risk: "HIGH_RISK",
      nonce: "0x4A12C...881E",
    },
    {
      id: "AUD-99100",
      timestamp: "Today, 10:42 AM",
      event: "SAFETY_GATE_TRIGGERED",
      actor: "ExecuAI Policy Engine",
      target: "Series B Definitive Agreements",
      risk: "HIGH_RISK",
      nonce: "0x11B40...339A",
    },
    {
      id: "AUD-99099",
      timestamp: "Today, 10:42 AM",
      event: "EMAIL_NORMALIZED",
      actor: "Gmail Ingestion Connector",
      target: "ceo@company.com",
      risk: "SAFE",
      nonce: "0x88F11...001C",
    },
    {
      id: "AUD-99098",
      timestamp: "Today, 09:30 AM",
      event: "AI_DRAFT_PREPARED",
      actor: "ExecuAI Response Studio",
      target: "Dr. Aris Thorne (Board Agenda)",
      risk: "SAFE",
      nonce: "0x33A09...552B",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-[#E2E8F0] pb-4">
        <h1 className="text-2xl font-bold text-[#0F172A]">Cryptographic Audit Trail</h1>
        <p className="text-xs text-[#475569]">
          Immutable activity log recording all email ingestion, safety gate triggers, draft approvals, and API dispatch events.
        </p>
      </div>

      <div className="space-y-4">
        <Table
          data={logs}
          keyExtractor={(row) => row.id}
          columns={[
            { key: "id", header: "Audit ID", width: "120px" },
            { key: "timestamp", header: "Timestamp", width: "140px" },
            {
              key: "event",
              header: "Event Protocol",
              render: (row) => (
                <span className="font-mono text-xs font-bold text-[#0F172A] bg-[#F8FAFC] px-2 py-0.5 rounded border border-[#E2E8F0]">
                  {row.event}
                </span>
              ),
            },
            { key: "actor", header: "Actor / Engine" },
            { key: "target", header: "Target Context" },
            {
              key: "risk",
              header: "Risk Level",
              render: (row) => (
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    row.risk === "HIGH_RISK"
                      ? "bg-[#FFF1F2] text-[#E11D48]"
                      : "bg-[#EFF4FF] text-[#2E936F]"
                  }`}
                >
                  {row.risk}
                </span>
              ),
            },
            {
              key: "nonce",
              header: "Hash Nonce",
              align: "right",
              render: (row) => <span className="font-mono text-[11px] text-[#94A3B8]">{row.nonce}</span>,
            },
          ]}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={3}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
