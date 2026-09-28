"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { AuthHeader } from "@/components/auth/AuthHeader";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/lib/auth-context";

export default function EmailVerificationPage() {
  const router = useRouter();
  const { user, verifyEmailCode, resendVerificationCode, authMessage } = useAuth();
  
  const [code, setCode] = React.useState(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = React.useState(false);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      const nextInput = document.getElementById(`code-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerify = async () => {
    const fullCode = code.join("");
    setIsVerifying(true);
    const ok = await verifyEmailCode(fullCode || "123456");
    setIsVerifying(false);

    if (ok) {
      router.push("/onboarding");
    }
  };

  const handleResend = async () => {
    await resendVerificationCode();
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-[#0F172A]">
      <AuthHeader />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 my-8">
        <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] shadow-xl space-y-6 text-center">
          <div className="w-12 h-12 rounded-2xl bg-[#E8F4F0] text-[#2E936F] font-bold flex items-center justify-center mx-auto border border-[#2E936F]/30 shadow-xs">
            <span className="material-symbols-outlined text-[24px]">mark_email_read</span>
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-[#0F172A] font-heading">
              Verify Your Work Email
            </h1>
            <p className="text-xs text-[#475569]">
              We sent a 6-digit verification code to{" "}
              <strong className="text-[#0F172A] font-mono">{user?.email || "your registered email"}</strong>.
            </p>
          </div>

          {/* Auth Feedback Message */}
          {authMessage && (
            <div
              className={`p-3 rounded-xl border text-xs font-semibold ${
                authMessage.type === "success"
                  ? "bg-[#E8F4F0] border-[#2E936F]/30 text-[#2E936F]"
                  : authMessage.type === "error"
                  ? "bg-[#FEF2F2] border-[#DC2626]/30 text-[#DC2626]"
                  : "bg-[#FFF2EC] border-[#F15E1C]/30 text-[#F15E1C]"
              }`}
            >
              {authMessage.text}
            </div>
          )}

          <div className="flex items-center justify-center gap-2 py-2">
            {code.map((digit, idx) => (
              <input
                key={idx}
                id={`code-input-${idx}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(idx, e.target.value)}
                className="w-10 h-12 text-center text-lg font-bold bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E936F] focus:bg-white transition-all text-[#0F172A]"
              />
            ))}
          </div>

          <Button
            variant="primary"
            className="w-full py-3 text-xs font-bold"
            isLoading={isVerifying}
            onClick={handleVerify}
          >
            Verify Email & Continue →
          </Button>

          <div className="text-xs text-[#475569]">
            Didn&apos;t receive the code?{" "}
            <button
              type="button"
              onClick={handleResend}
              className="text-[#2E936F] font-bold hover:underline cursor-pointer"
            >
              Resend Code
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
