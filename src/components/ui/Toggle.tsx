import * as React from "react";
import { cn } from "@/lib/utils";

export interface ToggleProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: React.ReactNode;
  description?: string;
  disabled?: boolean;
  className?: string;
}

export const Toggle: React.FC<ToggleProps> = ({
  checked = false,
  onChange,
  label,
  description,
  disabled = false,
  className,
}) => {
  const toggleId = React.useId();

  return (
    <div className={cn("flex items-center justify-between gap-4", className)}>
      {(label || description) && (
        <label
          htmlFor={toggleId}
          className={cn(
            "cursor-pointer select-none",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          {label && (
            <span className="text-sm font-semibold text-[#0F172A]">{label}</span>
          )}
          {description && (
            <p className="text-xs text-[#475569] mt-0.5">{description}</p>
          )}
        </label>
      )}
      <button
        type="button"
        id={toggleId}
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange?.(!checked)}
        className={cn(
          "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#F15E1C] focus:ring-offset-2 disabled:opacity-50",
          checked ? "bg-[#F15E1C]" : "bg-[#CBD5E1]"
        )}
      >
        <span
          className={cn(
            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out",
            checked ? "translate-x-5" : "translate-x-0"
          )}
        />
      </button>
    </div>
  );
};

