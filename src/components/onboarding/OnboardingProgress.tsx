import * as React from "react";
import { cn } from "@/lib/utils";

export interface OnboardingStep {
  id: string;
  label: string;
  stepNumber: number;
}

export interface OnboardingProgressProps {
  currentStepId: string;
  className?: string;
}

export const onboardingSteps: OnboardingStep[] = [
  { id: "welcome", label: "Welcome", stepNumber: 1 },
  { id: "connect-gmail", label: "Gmail OAuth", stepNumber: 2 },
  { id: "connect-zoho", label: "Zoho OAuth", stepNumber: 3 },
  { id: "accounts", label: "Connected Accounts", stepNumber: 4 },
  { id: "preferences", label: "Preferences", stepNumber: 5 },
  { id: "safety-rules", label: "Safety Rules", stepNumber: 6 },
  { id: "writing-style", label: "Writing Style", stepNumber: 7 },
  { id: "complete", label: "Ready", stepNumber: 8 },
];

export const OnboardingProgress: React.FC<OnboardingProgressProps> = ({
  currentStepId,
  className,
}) => {
  const currentIndex = onboardingSteps.findIndex((s) => s.id === currentStepId);
  const currentStep = onboardingSteps[currentIndex] || onboardingSteps[0];
  const progressPercent = Math.round(((currentIndex + 1) / onboardingSteps.length) * 100);

  return (
    <div className={cn("w-full bg-white border-b border-[#E2E8F0] px-4 py-3 sm:px-8 font-sans", className)}>
      <div className="max-w-4xl mx-auto space-y-2">
        {/* Step Header */}
        <div className="flex items-center justify-between text-xs font-semibold text-[#475569]">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-[#F15E1C] text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
              {currentStep.stepNumber}
            </span>
            <span className="text-[#0F172A] font-bold">
              Step {currentStep.stepNumber} of {onboardingSteps.length}: {currentStep.label}
            </span>
          </div>
          <span className="text-[#F15E1C] font-bold">{progressPercent}% Completed</span>
        </div>

        {/* Progress Rail */}
        <div className="w-full h-1.5 bg-[#FFF2EC] rounded-full overflow-hidden border border-[#FDE8DF]">
          <div
            className="h-full bg-[#F15E1C] transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Horizontal Step Pills (Desktop) */}
        <div className="hidden md:flex items-center justify-between pt-1 text-[11px]">
          {onboardingSteps.map((step, idx) => {
            const isDone = idx < currentIndex;
            const isCurrent = idx === currentIndex;
            return (
              <div
                key={step.id}
                className={cn(
                  "flex items-center gap-1 font-medium transition-colors",
                  isDone
                    ? "text-[#2E936F] font-bold"
                    : isCurrent
                    ? "text-[#F15E1C] font-bold"
                    : "text-[#94A3B8]"
                )}
              >
                {isDone ? (
                  <span className="material-symbols-outlined text-[14px]">check_circle</span>
                ) : (
                  <span>{step.stepNumber}.</span>
                )}
                <span>{step.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

