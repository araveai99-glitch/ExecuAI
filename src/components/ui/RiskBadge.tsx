import * as React from "react";
import { cn } from "@/lib/utils";

export type RiskLevel =
  | "SAFE"
  | "REVIEW"
  | "REVIEW_REQUIRED"
  | "HIGH_RISK"
  | "CONFIDENTIAL";

export interface RiskBadgeProps {
  risk: RiskLevel;
  className?: string;
  showIcon?: boolean;
  size?: "sm" | "md";
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({
  risk,
  className,
  showIcon = true,
  size = "md",
}) => {
  const configs: Record<
    RiskLevel,
    { label: string; styles: string; icon: string }
  > = {
    SAFE: {
      label: "Safe to Draft",
      styles: "bg-[#E8F4F0] text-[#2E936F] border border-[#2E936F]/30 font-semibold",
      icon: "verified",
    },
    REVIEW: {
      label: "Review Required",
      styles: "bg-[#FEF6E0] text-[#795600] border border-[#FAB60A]/50 font-semibold",
      icon: "gavel",
    },
    REVIEW_REQUIRED: {
      label: "Review Required",
      styles: "bg-[#FEF6E0] text-[#795600] border border-[#FAB60A]/50 font-semibold",
      icon: "gavel",
    },
    HIGH_RISK: {
      label: "High Risk Gate Active",
      styles: "bg-[#FFF2EC] text-[#F15E1C] border border-[#FDE8DF] font-bold",
      icon: "security",
    },
    CONFIDENTIAL: {
      label: "Confidential",
      styles: "bg-[#FDF7F0] text-[#795600] border border-[#F7D7B0] font-semibold",
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

