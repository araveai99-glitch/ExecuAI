import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "danger" | "warning" | "beige" | "neutral" | "outline";
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
    primary: "bg-[#EFF4FF] text-[#2E936F]",
    secondary: "bg-[#E5EEFF] text-[#0F172A]",
    danger: "bg-[#FFF1F2] text-[#E11D48]",
    warning: "bg-[#FEF7E6] text-[#795600]",
    beige: "bg-[#FDF8F3] text-[#795600] border border-[#F7D7B0]",
    neutral: "bg-[#E5EEFF] text-[#475569]",
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
