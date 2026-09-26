import * as React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "ai" | "warning" | "danger" | "flat";
  accentRailColor?: "danger" | "warning" | "primary" | "neutral" | "none";
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
      "relative overflow-hidden rounded-xl p-4 sm:p-5 transition-all duration-200 border border-[#E2E8F0]";

    const variants = {
      default: "bg-white text-[#0F172A] shadow-xs",
      ai: "bg-[#FFFDEB] text-[#0F172A] border-l-4 border-l-[#FAB60A] shadow-xs",
      warning: "bg-[#FEF7E6] text-[#795600] border-[#FDE68A] shadow-xs",
      danger: "bg-[#FFF1F2] text-[#E11D48] border-[#FECDD3] shadow-xs",
      flat: "bg-[#F8FAFC] text-[#0F172A] border-[#CBD5E1] shadow-none",
    };

    const railColors = {
      danger: "absolute top-0 left-0 right-0 h-1 bg-[#E11D48]",
      warning: "absolute top-0 left-0 right-0 h-1 bg-[#FAB60A]",
      primary: "absolute top-0 left-0 right-0 h-1 bg-[#2E936F]",
      neutral: "absolute top-0 left-0 right-0 h-1 bg-[#CBD5E1]",
      none: null,
    };

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          hoverable && "hover:shadow-md cursor-pointer hover:border-[#CBD5E1]",
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
