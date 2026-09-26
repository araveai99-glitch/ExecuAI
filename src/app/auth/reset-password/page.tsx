"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthHeader } from "@/components/auth/AuthHeader";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [formData, setFormData] = React.useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (formData.password.length < 8) errs.password = "Minimum 8 characters required";
    if (formData.password !== formData.confirmPassword) errs.confirmPassword = "Passwords do not match";
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-[#0F172A]">
      <AuthHeader />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 my-8">
        <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-2xl border border-[#E2E8F0] shadow-md space-y-6">
          <div className="space-y-1.5 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-[#0F172A]">
              Set New ExecuAI Password
            </h1>
            <p className="text-xs text-[#475569]">
              Choose a strong password for your executive SaaS account.
            </p>
          </div>

          {submitted ? (
            <div className="p-6 rounded-xl bg-[#EFF4FF] border border-[#79d9b0]/40 text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#2E936F] text-white font-bold flex items-center justify-center mx-auto">
                ✓
              </div>
              <h3 className="text-base font-bold text-[#0F172A]">Password Updated</h3>
              <p className="text-xs text-[#475569]">
                Your ExecuAI password has been reset successfully.
              </p>
              <Button
                variant="primary"
                size="sm"
                className="w-full mt-2"
                onClick={() => router.push("/auth/login")}
              >
                Sign In With New Password
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="New Password"
                type="password"
                placeholder="••••••••••••"
                value={formData.password}
                error={errors.password}
                hint="Minimum 8 characters with letters & numbers"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />

              <Input
                label="Confirm New Password"
                type="password"
                placeholder="••••••••••••"
                value={formData.confirmPassword}
                error={errors.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              />

              <Button type="submit" variant="primary" className="w-full">
                Reset Password
              </Button>
            </form>
          )}

          <div className="text-center text-xs text-[#475569] pt-2 border-t border-[#E2E8F0]">
            <Link href="/auth/login" className="text-[#2E936F] font-bold hover:underline">
              Back to Login
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
