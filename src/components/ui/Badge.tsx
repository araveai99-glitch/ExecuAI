import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "brand-green" | "secondary" | "danger" | "warning" | "yellow" | "peach" | "neutral" | "outline";
  size?: "sm" | "md";
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = "neutral",
  size = "md",
  icon,
  children,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center gap-1 font-semibold rounded-full uppercase tracking-wider transition-colors";

  const variants = {
    primary: "bg-[#FFF2EC] text-[#F15E1C] border border-[#FDE8DF]",
    "brand-green": "bg-[#E8F4F0] text-[#2E936F] border border-[#2E936F]/20",
    secondary: "bg-[#F1F5F9] text-[#0F172A]",
    danger: "bg-[#FEF2F2] text-[#DC2626] border border-[#FCA5A5]",
    warning: "bg-[#FEF6E0] text-[#795600] border border-[#FAB60A]/40",
    yellow: "bg-[#FFFDE6] text-[#795600] border border-[#FFEC69]",
    peach: "bg-[#FDF7F0] text-[#795600] border border-[#F7D7B0]",
    neutral: "bg-[#F1F5F9] text-[#475569]",
    outline: "bg-transparent text-[#475569] border border-[#CBD5E1]",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-[10px] leading-3",
    md: "px-2.5 py-0.5 text-[11px] leading-4",
  };

  return (
    <span
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {icon}
      <span>{children}</span>
    </span>
  );
};

