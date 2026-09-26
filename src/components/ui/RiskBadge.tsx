import * as React from "react";
import { cn } from "@/lib/utils";

export type RiskLevel =
  | "SAFE"
  | "REVIEW_REQUIRED"
  | "HIGH_RISK"
  | "CONFIDENTIAL";

export interface RiskBadgeProps {
  risk: RiskLevel;
  className?: string;
  showIcon?: boolean;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({
  risk,
  className,
  showIcon = true,
}) => {
  const configs: Record<
    RiskLevel,
    { label: string; styles: string; icon: string }
  > = {
    SAFE: {
      label: "Safe to Draft",
      styles: "bg-[#EFF4FF] text-[#2E936F] border border-[#79d9b0]/30 font-semibold",
      icon: "verified",
    },
    REVIEW_REQUIRED: {
      label: "Review Required",
      styles: "bg-[#FEF7E6] text-[#795600] border border-[#FDE68A] font-semibold",
      icon: "gavel",
    },
    HIGH_RISK: {
      label: "High Risk Gate Active",
      styles: "bg-[#FFF1F2] text-[#E11D48] border border-[#FECDD3] font-bold",
      icon: "security",
    },
    CONFIDENTIAL: {
      label: "Confidential",
      styles: "bg-[#E5EEFF] text-[#0F172A] border border-[#CBD5E1] font-semibold",
      icon: "lock",
    },
  };

  const config = configs[risk] || configs.SAFE;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] tracking-wide uppercase transition-colors",
        config.styles,
        className
      )}
    >
      {showIcon && (
        <span className="material-symbols-outlined text-[13px]">
          {config.icon}
        </span>
      )}
      <span>{config.label}</span>
    </span>
  );
};
