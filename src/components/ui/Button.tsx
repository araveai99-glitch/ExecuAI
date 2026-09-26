import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "warning" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      type = "button",
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E936F] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.99] rounded-md min-h-[44px] sm:min-h-0 cursor-pointer";

    const variants = {
      primary:
        "bg-[#2E936F] hover:bg-[#00694b] text-white shadow-sm font-semibold border border-transparent",
      secondary:
        "bg-white hover:bg-[#F8FAFC] text-[#0F172A] border border-[#CBD5E1] shadow-xs",
      danger:
        "bg-[#FFF1F2] hover:bg-[#FFE4E6] text-[#E11D48] border border-[#FECDD3] font-semibold",
      warning:
        "bg-[#FEF7E6] hover:bg-[#FDF3D8] text-[#795600] border border-[#FDE68A] font-semibold",
      ghost:
        "bg-transparent hover:bg-[#EFF4FF] text-[#475569] hover:text-[#0F172A]",
      link: "bg-transparent underline-offset-4 hover:underline text-[#2E936F] p-0 h-auto min-h-0",
    };

    const sizes = {
      sm: "h-8 px-3 text-xs gap-1.5",
      md: "h-10 px-4 text-sm gap-2",
      lg: "h-12 px-6 text-base gap-2.5",
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], fullWidth && "w-full", className)}
        {...props}
      >

        {isLoading ? (
          <span className="material-symbols-outlined animate-spin text-[18px]">
            progress_activity
          </span>
        ) : (
          leftIcon
        )}
        <span>{children}</span>
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = "Button";
