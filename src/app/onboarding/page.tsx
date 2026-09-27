"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function SimpleOnboardingPage() {
  const router = useRouter();
  const [step, setStep] = React.useState<1 | 2>(1);

  // Form State
  const [name, setName] = React.useState("Alexander Vance");
  const [email, setEmail] = React.useState("alexander@company.com");
  const [nameError, setNameError] = React.useState("");
  const [emailError, setEmailError] = React.useState("");

  // Connected accounts state
  const [connectedEmails, setConnectedEmails] = React.useState<
    Array<{ provider: string; email: string }>
  >([]);

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    if (!name.trim()) {
      setNameError("Please enter your name");
      valid = false;
    } else {
      setNameError("");
    }
    if (!email.trim() || !email.includes("@")) {
      setEmailError("Please enter a valid email address");
      valid = false;
    } else {
      setEmailError("");
    }

    if (valid) {
      setStep(2);
    }
  };

  const handleAddEmail = (provider: string) => {
    const defaultAccount =
      provider === "Gmail"
        ? `${name.toLowerCase().replace(/\s+/g, ".")}@gmail.com`
        : provider === "Zoho"
        ? `${name.toLowerCase().replace(/\s+/g, ".")}@zoho.com`
        : `${name.toLowerCase().replace(/\s+/g, ".")}@${provider.toLowerCase()}.com`;

    if (!connectedEmails.some((acc) => acc.email === defaultAccount)) {
      setConnectedEmails([...connectedEmails, { provider, email: defaultAccount }]);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4 sm:p-6 font-sans text-[#0F172A]">
      {/* Brand Logo Header */}
      <div className="mb-6 flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-[#F15E1C] text-white font-extrabold flex items-center justify-center text-sm shadow-md">
          E
        </div>
        <span className="text-xl font-heading font-extrabold tracking-tight text-[#0F172A]">
          ExecuAI
        </span>
      </div>

      {/* Main Clean Card */}
      <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] shadow-xl space-y-6">
        {step === 1 ? (
          /* STEP 1: BASIC DETAILS */
          <div className="space-y-6">
            <div className="space-y-1.5 text-center">
              <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#0F172A] tracking-tight">
                Welcome
              </h1>
              <p className="text-sm text-[#475569]">Let&apos;s get you started.</p>
            </div>

            <form onSubmit={handleStep1Submit} className="space-y-4">
              <Input
                label="Full Name"
                placeholder="Enter your name"
                value={name}
                error={nameError}
                onChange={(e) => setName(e.target.value)}
              />

              <Input
                label="Work Email Address"
                type="email"
                placeholder="Enter your email"
                value={email}
                error={emailError}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Button type="submit" variant="primary" className="w-full py-3 mt-2 text-sm font-bold">
                Continue →
              </Button>
            </form>
          </div>
        ) : (
          /* STEP 2: CONNECT EMAIL */
          <div className="space-y-6">
            <div className="space-y-1.5 text-center">
              <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#0F172A] tracking-tight">
                Connect your email
              </h1>
              <p className="text-sm text-[#475569]">
                Connect your email account to get started.
              </p>
            </div>

            {/* List of Connected Accounts if any */}
            {connectedEmails.length > 0 && (
              <div className="space-y-2">
                <div className="text-xs font-bold text-[#2E936F] flex items-center gap-1.5 uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  <span>Email connected ✓</span>
                </div>
                {connectedEmails.map((acc) => (
                  <div
                    key={acc.email}
                    className="p-3 rounded-xl bg-[#E8F4F0] border border-[#2E936F]/30 flex items-center justify-between text-xs"
                  >
                    <div className="font-bold text-[#0F172A]">{acc.email}</div>
                    <span className="px-2 py-0.5 rounded bg-[#2E936F] text-white font-bold text-[10px]">
                      {acc.provider}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* + Add Email Button Card */}
            <button
              type="button"
              onClick={() => handleAddEmail("Gmail")}
              className="w-full p-4 rounded-2xl bg-[#FFF2EC] border border-[#F15E1C]/30 text-left hover:border-[#F15E1C] transition-all cursor-pointer flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#F15E1C] text-white font-bold flex items-center justify-center text-lg group-hover:scale-105 transition-transform">
                +
              </div>
              <div>
                <div className="text-sm font-bold text-[#0F172A]">
                  {connectedEmails.length > 0 ? "+ Add another email" : "+ Add Email"}
                </div>
                <div className="text-xs text-[#64748B]">Connect an email account</div>
              </div>
            </button>

            {/* Other Providers Section */}
            <div className="space-y-3 pt-2">
              <div className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider text-center">
                Other providers
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-bold">
                {["Zoho", "Outlook", "Gmail", "Other"].map((prov) => (
                  <button
                    key={prov}
                    type="button"
                    onClick={() => handleAddEmail(prov)}
                    className="p-2.5 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#2E936F] text-[#0F172A] transition-colors cursor-pointer text-center"
                  >
                    {prov}
                  </button>
                ))}
              </div>
            </div>

            {/* Completion Actions */}
            <div className="pt-4 flex flex-col gap-2">
              <Button
                variant="primary"
                className="w-full py-3 text-sm font-bold"
                onClick={() => router.push("/app/dashboard")}
              >
                Go to Dashboard →
              </Button>
              <button
                type="button"
                onClick={() => router.push("/app/dashboard")}
                className="text-xs font-bold text-[#64748B] hover:text-[#0F172A] text-center pt-1 cursor-pointer"
              >
                Skip for now
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Safety Guarantee Footer Note */}
      <div className="mt-6 text-center text-xs text-[#64748B]">
        OAuth 2.0 PKCE Protected • Zero Password Storage • ISO 42001
      </div>
    </div>
  );
}
