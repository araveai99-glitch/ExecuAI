import * as React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "ai" | "warning" | "danger" | "peach" | "green" | "flat";
  accentRailColor?: "danger" | "warning" | "primary" | "green" | "neutral" | "none";
  hoverable?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = "default",
      accentRailColor = "none",
      hoverable = false,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "relative overflow-hidden rounded-2xl p-4 sm:p-6 transition-all duration-200 border border-[#E2E8F0]";

    const variants = {
      default: "bg-white text-[#0F172A] shadow-xs",
      ai: "bg-[#FFFDE6] text-[#0F172A] border-l-4 border-l-[#FAB60A] border-[#FDE68A] shadow-xs",
      warning: "bg-[#FEF6E0] text-[#795600] border-[#FAB60A]/40 shadow-xs",
      danger: "bg-[#FEF2F2] text-[#DC2626] border-[#FCA5A5] shadow-xs",
      peach: "bg-[#FDF7F0] text-[#0F172A] border-[#F7D7B0] shadow-xs",
      green: "bg-[#E8F4F0] text-[#0F172A] border-[#2E936F]/30 shadow-xs",
      flat: "bg-[#F8FAFC] text-[#0F172A] border-[#CBD5E1] shadow-none",
    };

    const railColors = {
      danger: "absolute top-0 left-0 right-0 h-1 bg-[#DC2626]",
      warning: "absolute top-0 left-0 right-0 h-1 bg-[#FAB60A]",
      primary: "absolute top-0 left-0 right-0 h-1 bg-[#F15E1C]",
      green: "absolute top-0 left-0 right-0 h-1 bg-[#2E936F]",
      neutral: "absolute top-0 left-0 right-0 h-1 bg-[#CBD5E1]",
      none: null,
    };

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          hoverable && "hover:shadow-md cursor-pointer hover:border-[#CBD5E1] hover:-translate-y-0.5",
          className
        )}
        {...props}
      >
        {accentRailColor !== "none" && (
          <div className={railColors[accentRailColor]} />
        )}
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

