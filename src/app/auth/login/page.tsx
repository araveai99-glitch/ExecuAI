"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthHeader } from "@/components/auth/AuthHeader";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/Checkbox";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = React.useState({
    email: "alexander@company.com",
    password: "••••••••••••",
    rememberMe: true,
  });
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email.trim()) {
      setErrors({ email: "Please enter your registered email" });
      return;
    }
    if (!formData.password) {
      setErrors({ password: "Please enter your password" });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/onboarding/welcome");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-[#0F172A]">
      <AuthHeader />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 my-8">
        <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-2xl border border-[#E2E8F0] shadow-md space-y-6">
          <div className="space-y-1.5 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-[#0F172A]">
              Sign In to ExecuAI
            </h1>
            <p className="text-xs text-[#475569]">
              Access your multi-account executive workspace & decision center.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Work Email Address"
              type="email"
              placeholder="alexander@company.com"
              value={formData.email}
              error={errors.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••••••"
              value={formData.password}
              error={errors.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />

            <div className="flex items-center justify-between text-xs pt-1">
              <Checkbox
                label="Remember this device"
                checked={formData.rememberMe}
                onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
              />
              <Link
                href="/auth/forgot-password"
                className="text-[#2E936F] font-bold hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full mt-2"
              isLoading={isLoading}
            >
              Sign In to Workspace
            </Button>
          </form>

          <div className="p-3 rounded-xl bg-[#EFF4FF] border border-[#79d9b0]/30 text-xs text-[#2E936F] space-y-1 text-center">
            <span className="font-bold">OAuth 2.0 Security Guarantee:</span>
            <p className="text-[#0F172A] text-[11px]">
              ExecuAI never stores your Gmail or Zoho password. Connected accounts use provider OAuth tokens.
            </p>
          </div>

          <div className="text-center text-xs text-[#475569] pt-2 border-t border-[#E2E8F0]">
            Don&apos;t have an ExecuAI account yet?{" "}
            <Link href="/auth/signup" className="text-[#2E936F] font-bold hover:underline">
              Create Account Free
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
