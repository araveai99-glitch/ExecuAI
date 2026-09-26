"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { RadioGroup } from "@/components/ui/Radio";

export default function WritingStylePage() {
  const [tone, setTone] = React.useState("professional");
  const [length, setLength] = React.useState("medium");
  const [greeting, setGreeting] = React.useState("Hi [Name],");
  const [signOff, setSignOff] = React.useState("Regards,\nAlexander Vance\nChief Executive Officer");

  return (
    <div className="bg-white p-6 sm:p-10 rounded-2xl border border-[#E2E8F0] shadow-md space-y-6">
      <div className="border-b border-[#E2E8F0] pb-4">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#2E936F]">
          Step 7: Executive Communication Profile
        </span>
        <h1 className="text-xl font-bold text-[#0F172A]">Writing Style & Voice Setup</h1>
        <p className="text-xs text-[#475569]">
          Configure your personal tone, response length, and sign-off signature so AI drafts match your authentic executive voice.
        </p>
      </div>

      <div className="space-y-6">
        {/* Tone Selection */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">
            Default Executive Tone
          </label>
          <RadioGroup
            name="tone"
            value={tone}
            onChange={setTone}
            options={[
              {
                value: "professional",
                label: "Professional & Direct (Default)",
                description: "Authoritative, clear, and focused on business execution.",
              },
              {
                value: "concise",
                label: "Concise & Minimal",
                description: "Short multi-line acknowledgements for rapid inbox clearance.",
              },
              {
                value: "friendly",
                label: "Friendly & Collaborative",
                description: "Warm tone suitable for long-term clients and internal team delegation.",
              },
              {
                value: "formal",
                label: "Formal & Legal-Grade",
                description: "Precise legal language suitable for institutional communications.",
              },
            ]}
          />
        </div>

        {/* Length Selection */}
        <div className="space-y-2 pt-2 border-t border-[#E2E8F0]">
          <label className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">
            Default Response Length
          </label>
          <RadioGroup
            name="length"
            value={length}
            onChange={setLength}
            options={[
              { value: "short", label: "Short (1 - 2 Sentences)" },
              { value: "medium", label: "Medium (Paragraph + Next Steps)" },
              { value: "detailed", label: "Detailed (Full Breakdown)" },
            ]}
          />
        </div>

        {/* Greeting & Signature */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#E2E8F0]">
          <Input
            label="Preferred Greeting Format"
            placeholder="Hi [Name],"
            value={greeting}
            onChange={(e) => setGreeting(e.target.value)}
          />
          <div className="space-y-1">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#475569]">
              Default Sign-Off Signature
            </label>
            <textarea
              rows={3}
              value={signOff}
              onChange={(e) => setSignOff(e.target.value)}
              className="w-full p-3 bg-white rounded-xl text-xs font-mono text-[#0F172A] border border-[#CBD5E1] focus:outline-none focus:ring-2 focus:ring-[#2E936F]"
            />
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between">
        <Link href="/onboarding/safety-rules">
          <Button variant="ghost" size="sm">
            ← Back to Safety Rules
          </Button>
        </Link>
        <Link href="/onboarding/complete">
          <Button variant="primary" size="lg">
            Save Style & Finalize Setup
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
