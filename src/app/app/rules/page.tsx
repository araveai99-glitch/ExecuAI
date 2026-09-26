"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Toggle } from "@/components/ui/Toggle";
import { Input } from "@/components/ui/Input";

export default function RulesPage() {
  const [financialThreshold, setFinancialThreshold] = React.useState("1000000");
  const [blockContracts, setBlockContracts] = React.useState(true);
  const [blockLegal, setBlockLegal] = React.useState(true);
  const [blockHR, setBlockHR] = React.useState(true);
  const [saved, setSaved] = React.useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Rules, Safety Gates & Governance</h1>
          <p className="text-xs text-[#475569]">
            Enforce application-level policy rules that restrict AI action boundaries.
          </p>
        </div>
        <Button variant="primary" size="sm" onClick={handleSave}>
          {saved ? "Saved Rules ✓" : "Save Changes"}
        </Button>
      </div>

      <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-6">
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider">
            1. Financial & Commercial Risk Thresholds
          </h3>
          <Input
            label="Financial Commitment Threshold (₹ INR)"
            type="number"
            value={financialThreshold}
            onChange={(e) => setFinancialThreshold(e.target.value)}
            hint="Emails mentioning pricing or commitments above this value require explicit CEO signoff."
          />
        </div>

        <div className="space-y-4 pt-4 border-t border-[#E2E8F0]">
          <h3 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider">
            2. Mandatory Safety Gate Blockers
          </h3>
          <Toggle
            label="Quarantine Contracts & NDA Documents"
            description="Block automatic reply on any email containing contractual indemnities or agreements."
            checked={blockContracts}
            onChange={setBlockContracts}
          />
          <Toggle
            label="Quarantine Legal Counsel Notices"
            description="Escalate all legal partner communications to Decision Center."
            checked={blockLegal}
            onChange={setBlockLegal}
          />
          <Toggle
            label="Quarantine HR & Confidential Matters"
            description="Protect salary, employee complaint, and termination inquiries."
            checked={blockHR}
            onChange={setBlockHR}
          />
        </div>
      </div>
    </div>
  );
}
