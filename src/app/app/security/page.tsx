"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function SecurityDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Security Architecture & Governance Status</h1>
          <p className="text-xs text-[#475569]">
            Active multi-tenant security controls, token encryption status, and safety gate integrity.
          </p>
        </div>

        <Link href="/app/audit-log">
          <Button variant="secondary" size="sm" leftIcon={<span className="material-symbols-outlined text-[16px]">receipt_long</span>}>
            View Cryptographic Audit Log
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card accentRailColor="primary">
          <span className="text-[10px] font-bold uppercase text-[#94A3B8]">OAuth Authorization</span>
          <div className="text-lg font-bold text-[#2E936F] mt-1">OAuth 2.0 PKCE Enforced</div>
          <p className="text-xs text-[#475569] mt-1">Zero password storage. Least-privilege Read & Draft scopes.</p>
        </Card>

        <Card accentRailColor="primary">
          <span className="text-[10px] font-bold uppercase text-[#94A3B8]">Data Encryption</span>
          <div className="text-lg font-bold text-[#2E936F] mt-1">AES-256 Tokens & TLS 1.3</div>
          <p className="text-xs text-[#475569] mt-1">Tokens encrypted at rest. TLS in transit across all endpoints.</p>
        </Card>

        <Card accentRailColor="primary">
          <span className="text-[10px] font-bold uppercase text-[#94A3B8]">Safety Gate Barrier</span>
          <div className="text-lg font-bold text-[#2E936F] mt-1">LLM Programmatic Lock</div>
          <p className="text-xs text-[#475569] mt-1">AI cannot execute external API sends without human clearance.</p>
        </Card>
      </div>

      <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-3">
        <h3 className="text-sm font-bold text-[#0F172A]">Tenant Data Isolation</h3>
        <p className="text-xs text-[#475569] leading-relaxed">
          Your executive workspace is bound to Organization ID <code>org_exec_9910</code>. Database queries enforce tenant scoping across all thread ingestions, drafts, rules, and audit records.
        </p>
      </div>
    </div>
  );
}
