"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthHeader } from "@/components/auth/AuthHeader";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/Checkbox";
import { useAuth } from "@/lib/auth-context";

export default function SignUpPage() {
  const router = useRouter();
  const { registerUser, authMessage } = useAuth();

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = React.useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "Full name is required";
    if (!formData.email.trim() || !formData.email.includes("@"))
      errs.email = "Please enter a valid work email address";
    if (formData.password.length < 8)
      errs.password = "Password must be at least 8 characters";
    if (formData.password !== formData.confirmPassword)
      errs.confirmPassword = "Passwords do not match";
    if (!formData.termsAccepted)
      errs.termsAccepted = "You must accept the terms & privacy policy";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);

    const res = await registerUser(formData.name, formData.email, formData.password);
    setIsLoading(false);

    if (res.success) {
      router.push("/auth/email-verification");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-[#0F172A]">
      <AuthHeader />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 my-8">
        <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] shadow-xl space-y-6">
          <div className="space-y-1.5 text-center">
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold tracking-tight text-[#0F172A]">
              Create Account
            </h1>
            <p className="text-xs text-[#475569]">
              Start your 14-day free trial. Connect, triage, and draft across multiple Gmail & Zoho accounts.
            </p>
            <div className="pt-2">
              <Link
                href="/auth/register-org"
                className="w-full py-2.5 px-3 rounded-xl bg-[#FFF2EC] border border-[#F15E1C]/30 text-[#F15E1C] font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#F15E1C] hover:text-white transition-all shadow-xs"
              >
                <span className="material-symbols-outlined text-[18px]">corporate_fare</span>
                <span>Need an Enterprise Tenant? Register as Organization →</span>
              </Link>
            </div>
          </div>

          {/* Feedback Message */}
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

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              placeholder="Enter your name"
              value={formData.name}
              error={errors.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />

            <Input
              label="Work Email Address"
              type="email"
              placeholder="e.g. name@company.com"
              value={formData.email}
              error={errors.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />

            <Input
              label="Password"
              type="password"
              placeholder="Minimum 8 characters"
              value={formData.password}
              error={errors.password}
              hint="Minimum 8 characters with letters & numbers"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />

            <Input
              label="Confirm Password"
              type="password"
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              error={errors.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            />

            <div className="pt-1">
              <Checkbox
                label={
                  <span className="text-xs text-[#475569]">
                    I agree to ExecuAI&apos;s{" "}
                    <Link href="/security" className="text-[#F15E1C] font-bold underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/security" className="text-[#F15E1C] font-bold underline">
                      Privacy Policy
                    </Link>
                  </span>
                }
                checked={formData.termsAccepted}
                onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
              />
              {errors.termsAccepted && (
                <p className="text-xs text-[#DC2626] mt-1 font-medium">{errors.termsAccepted}</p>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full mt-2 py-3 text-xs font-bold"
              isLoading={isLoading}
            >
              Create Account →
            </Button>
          </form>

          <div className="text-center text-xs text-[#475569] pt-2 border-t border-[#E2E8F0]">
            Already have an ExecuAI account?{" "}
            <Link href="/auth/login" className="text-[#F15E1C] font-bold hover:underline">
              Sign In Here
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
