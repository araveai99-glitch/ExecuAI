import * as React from "react";
import { cn } from "@/lib/utils";

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  icon: React.ReactNode;
  ariaLabel: string;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      variant = "ghost",
      size = "md",
      icon,
      ariaLabel,
      disabled,
      type = "button",
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E936F] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95 cursor-pointer min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0";

    const variants = {
      primary: "bg-[#2E936F] hover:bg-[#00694b] text-white shadow-sm",
      secondary: "bg-[#F8FAFC] hover:bg-[#EFF4FF] text-[#0F172A] border border-[#E2E8F0]",
      danger: "bg-[#FFF1F2] hover:bg-[#FFE4E6] text-[#E11D48]",
      ghost: "bg-transparent hover:bg-[#EFF4FF] text-[#475569] hover:text-[#0F172A]",
    };

    const sizes = {
      sm: "w-8 h-8 text-[16px]",
      md: "w-9 h-9 text-[18px]",
      lg: "w-11 h-11 text-[22px]",
    };

    return (
      <button
        ref={ref}
        type={type}
        aria-label={ariaLabel}
        title={ariaLabel}
        disabled={disabled}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {icon}
      </button>
    );
  }
);

IconButton.displayName = "IconButton";
