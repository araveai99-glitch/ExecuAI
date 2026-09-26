"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { AuthHeader } from "@/components/auth/AuthHeader";
import { OnboardingProgress } from "@/components/onboarding/OnboardingProgress";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  // Extract step id from route (e.g. /onboarding/welcome -> welcome)
  const currentStepId = pathname.split("/").pop() || "welcome";

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-[#0F172A]">
      <AuthHeader />
      <OnboardingProgress currentStepId={currentStepId} />
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 my-6">
        <div className="w-full max-w-2xl">{children}</div>
      </main>
    </div>
  );
}
