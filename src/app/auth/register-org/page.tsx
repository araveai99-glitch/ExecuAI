"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthHeader } from "@/components/auth/AuthHeader";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/Checkbox";
import { useAuth } from "@/lib/auth-context";

export default function RegisterOrganizationPage() {
  const router = useRouter();
  const { registerOrganization, verifyOrgOtp, authMessage } = useAuth();

  const [step, setStep] = React.useState<"REGISTER" | "OTP">("REGISTER");
  const [formData, setFormData] = React.useState({
    orgName: "",
    adminName: "",
    adminEmail: "",
    password: "",
    termsAccepted: false,
  });
  const [otpCode, setOtpCode] = React.useState("");
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = React.useState(false);

  const validateForm = () => {
    const errs: Record<string, string> = {};
    if (!formData.orgName.trim()) errs.orgName = "Organization Name is required";
    if (!formData.adminName.trim()) errs.adminName = "Administrator Full Name is required";
    if (!formData.adminEmail.trim() || !formData.adminEmail.includes("@"))
      errs.adminEmail = "Valid corporate work email address is required";
    if (formData.password.length < 8)
      errs.password = "Password must be at least 8 characters";
    if (!formData.termsAccepted)
      errs.termsAccepted = "You must agree to the Terms of Service & Multi-Tenant Security Policy";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);

    const res = await registerOrganization(
      formData.orgName,
      formData.adminName,
      formData.adminEmail,
      formData.password
    );
    setIsLoading(false);

    if (res.success) {
      setStep("OTP");
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.trim().length < 4) {
      setErrors({ otp: "Please enter a valid 6-digit OTP code" });
      return;
    }

    setIsLoading(true);
    const verified = await verifyOrgOtp(otpCode);
    setIsLoading(false);

    if (verified) {
      router.push("/app/organization");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-[#0F172A]">
      <AuthHeader />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 my-8">
        <div className="w-full max-w-lg bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] shadow-xl space-y-6">
          {step === "REGISTER" ? (
            <>
              <div className="space-y-1.5 text-center">
                <span className="inline-block px-3 py-1 rounded-full bg-[#FFF2EC] text-[#F15E1C] border border-[#FDE8DF] text-[10px] font-extrabold uppercase tracking-wider">
                  Multi-Tenant Enterprise Setup
                </span>
                <h1 className="text-2xl sm:text-3xl font-heading font-extrabold tracking-tight text-[#0F172A]">
                  Register as Organization
                </h1>
                <p className="text-xs text-[#475569]">
                  Establish an isolated tenant workspace with full RBAC governance, audit logging, and team email intelligence.
                </p>
              </div>

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

              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <Input
                  label="Organization / Company Name"
                  placeholder="e.g. Acme Corporation"
                  value={formData.orgName}
                  error={errors.orgName}
                  onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
                />

                <Input
                  label="Primary Administrator Name"
                  placeholder="e.g. Snehal Vance (CEO / IT Admin)"
                  value={formData.adminName}
                  error={errors.adminName}
                  onChange={(e) => setFormData({ ...formData, adminName: e.target.value })}
                />

                <Input
                  label="Administrator Corporate Email"
                  type="email"
                  placeholder="e.g. admin@acme.com"
                  value={formData.adminEmail}
                  error={errors.adminEmail}
                  onChange={(e) => setFormData({ ...formData, adminEmail: e.target.value })}
                />

                <Input
                  label="Account Password"
                  type="password"
                  placeholder="Minimum 8 characters"
                  value={formData.password}
                  error={errors.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />

                <div className="pt-1">
                  <Checkbox
                    label={
                      <span className="text-xs text-[#475569]">
                        I confirm that I am authorized to register this organization and accept ExecuAI&apos;s{" "}
                        <Link href="/terms" className="text-[#F15E1C] font-bold underline">
                          Terms & Isolation Architecture Policy
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
                  className="w-full py-3 text-xs font-bold mt-2"
                  isLoading={isLoading}
                >
                  Create Organization & Proceed to Verification →
                </Button>
              </form>
            </>
          ) : (
            <>
              {/* OTP Verification Step */}
              <div className="space-y-1.5 text-center">
                <div className="w-12 h-12 rounded-2xl bg-[#E8F4F0] text-[#2E936F] flex items-center justify-center mx-auto text-xl font-bold border border-[#2E936F]/30 mb-2">
                  <span className="material-symbols-outlined">mark_email_read</span>
                </div>
                <h2 className="text-2xl font-heading font-extrabold text-[#0F172A]">
                  Email Verification & OTP MFA
                </h2>
                <p className="text-xs text-[#475569]">
                  We sent a 6-digit security code to <strong className="text-[#0F172A]">{formData.adminEmail}</strong>. Enter it below to initialize your organization dashboard.
                </p>
              </div>

              {authMessage && (
                <div
                  className={`p-3 rounded-xl border text-xs font-semibold ${
                    authMessage.type === "success"
                      ? "bg-[#E8F4F0] border-[#2E936F]/30 text-[#2E936F]"
                      : "bg-[#FEF2F2] border-[#DC2626]/30 text-[#DC2626]"
                  }`}
                >
                  {authMessage.text}
                </div>
              )}

              <form onSubmit={handleOtpSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#0F172A] mb-1.5 uppercase">
                    Enter Verification Code (OTP):
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="e.g. 849201"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    className="w-full text-center text-2xl font-mono tracking-widest p-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] focus:ring-2 focus:ring-[#F15E1C] focus:bg-white text-[#0F172A]"
                  />
                  {errors.otp && <p className="text-xs text-[#DC2626] mt-1">{errors.otp}</p>}
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full py-3 text-xs font-bold"
                  isLoading={isLoading}
                >
                  Verify OTP & Access Organization Dashboard →
                </Button>
              </form>
            </>
          )}

          <div className="text-center text-xs text-[#475569] pt-2 border-t border-[#E2E8F0]">
            Already have an organization workspace?{" "}
            <Link href="/auth/login" className="text-[#F15E1C] font-bold hover:underline">
              Sign In Here
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
