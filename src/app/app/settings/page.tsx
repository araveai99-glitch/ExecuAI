"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function SettingsPage() {
  const [name, setName] = React.useState("Alexander Vance");
  const [role, setRole] = React.useState("Chief Executive Officer");
  const [saved, setSaved] = React.useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-[#E2E8F0] pb-4">
        <h1 className="text-2xl font-bold text-[#0F172A]">Account & Profile Settings</h1>
        <p className="text-xs text-[#475569]">Manage your executive identity and SaaS profile settings.</p>
      </div>

      <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-4 max-w-2xl">
        <Input
          label="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="Executive Role / Title"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <Input
          label="Primary Account Email"
          defaultValue="alexander@company.com"
          disabled
          hint="Account email is managed via OAuth 2.0 provider"
        />

        <div className="pt-2">
          <Button variant="primary" size="sm" onClick={handleSave}>
            {saved ? "Saved ✓" : "Update Profile"}
          </Button>
        </div>
      </div>
    </div>
  );
}
