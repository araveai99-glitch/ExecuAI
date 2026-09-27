import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "brand-green" | "danger" | "warning" | "peach" | "ghost" | "link";
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
      "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f15e1c] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.99] rounded-xl cursor-pointer select-none";

    const variants = {
      primary:
        "bg-[#f15e1c] hover:bg-[#d84c0e] active:bg-[#b93f0b] text-white shadow-xs font-semibold border border-transparent",
      secondary:
        "bg-white hover:bg-[#fdf7f0] active:bg-[#f7d7b0]/30 text-[#0f172a] border border-[#cbd5e1] shadow-xs font-medium",
      "brand-green":
        "bg-[#2e936f] hover:bg-[#24785a] active:bg-[#1d6148] text-white shadow-xs font-semibold border border-transparent",
      danger:
        "bg-[#fef2f2] hover:bg-[#fee2e2] text-[#dc2626] border border-[#fca5a5] font-semibold",
      warning:
        "bg-[#fef6e0] hover:bg-[#ffec69]/40 text-[#795600] border border-[#fab60a] font-semibold",
      peach:
        "bg-[#fdf7f0] hover:bg-[#f7d7b0]/50 text-[#f15e1c] border border-[#f7d7b0] font-semibold",
      ghost:
        "bg-transparent hover:bg-[#fdf7f0] text-[#475569] hover:text-[#0f172a]",
      link: "bg-transparent underline-offset-4 hover:underline text-[#f15e1c] p-0 h-auto min-h-0 font-semibold",
    };

    const sizes = {
      sm: "h-9 px-3.5 text-xs gap-1.5",
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

