"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthHeader } from "@/components/auth/AuthHeader";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/Checkbox";
import { useAuth } from "@/lib/auth-context";

export default function LoginPage() {
  const router = useRouter();
  const { loginWithEmail, loginWithGoogle, authMessage, isAuthenticated } = useAuth();

  const [email, setEmail] = React.useState("alexander@company.com");
  const [password, setPassword] = React.useState("••••••••••••");
  const [rememberMe, setRememberMe] = React.useState(true);
  const [emailError, setEmailError] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // If already authenticated, redirect to dashboard or onboarding
  React.useEffect(() => {
    if (isAuthenticated) {
      router.push("/app/dashboard");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      setEmailError("Please enter a valid work email address");
      return;
    }
    setEmailError("");
    setIsSubmitting(true);

    const success = await loginWithEmail(email);
    setIsSubmitting(false);

    if (success) {
      router.push("/onboarding");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-[#0F172A]">
      <AuthHeader />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 my-8">
        <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] shadow-xl space-y-6">
          <div className="space-y-1.5 text-center">
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold tracking-tight text-[#0F172A]">
              Sign In to ExecuAI
            </h1>
            <p className="text-xs text-[#475569]">
              Access your multi-account executive inbox & Safety Gate decision center.
            </p>
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

          {/* Google OAuth Button */}
          <button
            type="button"
            onClick={loginWithGoogle}
            className="w-full py-3 px-4 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#F15E1C]/50 text-xs font-bold text-[#0F172A] flex items-center justify-center gap-3 transition-all shadow-xs cursor-pointer hover:bg-[#F8FAFC]"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.15C3.26 21.3 7.31 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.61H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.39l3.99-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.61l3.99 3.15c.95-2.85 3.6-4.96 6.72-4.96z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-[#E2E8F0]" />
            <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">
              Or with Work Email
            </span>
            <div className="flex-1 h-px bg-[#E2E8F0]" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Work Email Address"
              type="email"
              placeholder="alexander@company.com"
              value={email}
              error={emailError}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="flex items-center justify-between text-xs pt-1">
              <Checkbox
                label="Remember this device"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <Link
                href="/auth/forgot-password"
                className="text-[#F15E1C] font-bold hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full mt-2 py-3 text-xs font-bold"
              isLoading={isSubmitting}
            >
              Sign In & Continue →
            </Button>
          </form>

          <div className="p-3 rounded-xl bg-[#E8F4F0] border border-[#2E936F]/30 text-xs text-[#2E936F] text-center space-y-0.5">
            <span className="font-bold block">OAuth 2.0 PKCE Security</span>
            <p className="text-[#0F172A] text-[11px]">
              ExecuAI never stores Gmail or Zoho passwords.
            </p>
          </div>

          <div className="text-center text-xs text-[#475569] pt-2 border-t border-[#E2E8F0]">
            Don&apos;t have an ExecuAI account yet?{" "}
            <Link href="/auth/signup" className="text-[#F15E1C] font-bold hover:underline">
              Create Account Free
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
