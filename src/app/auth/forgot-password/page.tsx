"use client";

import * as React from "react";
import Link from "next/link";
import { AuthHeader } from "@/components/auth/AuthHeader";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function ForgotPasswordPage() {
  const [email, setEmail] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid work email address");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-[#0F172A]">
      <AuthHeader />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 my-8">
        <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-2xl border border-[#E2E8F0] shadow-md space-y-6">
          <div className="space-y-1.5 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-[#0F172A] font-heading">
              Reset Your ExecuAI Password
            </h1>
            <p className="text-xs text-[#475569]">
              Enter your work email address and we&apos;ll send you a password reset link.
            </p>
          </div>

          {submitted ? (
            <div className="p-6 rounded-xl bg-[#2e936f]/10 border border-[#2e936f]/20 text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#2e936f] text-white font-bold flex items-center justify-center mx-auto">
                ✓
              </div>
              <h3 className="text-base font-bold text-[#0F172A] font-heading">Reset Link Sent</h3>
              <p className="text-xs text-[#475569]">
                We sent a password reset link to <strong className="text-[#0F172A]">{email}</strong>. Please check your inbox.
              </p>
              <div className="pt-2">
                <Link href="/auth/reset-password">
                  <Button variant="secondary" size="sm" className="w-full">
                    Demo: Proceed to Reset Password
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Work Email Address"
                type="email"
                placeholder="alexander@company.com"
                value={email}
                error={error}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Button type="submit" variant="primary" className="w-full">
                Send Reset Link
              </Button>
            </form>
          )}

          <div className="text-center text-xs text-[#475569] pt-2 border-t border-[#E2E8F0]">
            Remembered your password?{" "}
            <Link href="/auth/login" className="text-[#f15e1c] font-bold hover:underline">
              Back to Login
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
