import * as React from "react";
import { cn } from "@/lib/utils";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: React.ReactNode;
  description?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, id, disabled, ...props }, ref) => {
    const inputId = id || React.useId();

    return (
      <div className="flex items-start gap-2.5 select-none">
        <div className="relative flex items-center pt-0.5">
          <input
            type="checkbox"
            id={inputId}
            ref={ref}
            disabled={disabled}
            className={cn(
              "w-4 h-4 rounded border-[#CBD5E1] text-[#2E936F] focus:ring-[#2E936F] focus:ring-offset-0 cursor-pointer accent-[#2E936F] disabled:opacity-50",
              className
            )}
            {...props}
          />
        </div>
        {(label || description) && (
          <label
            htmlFor={inputId}
            className={cn(
              "cursor-pointer text-sm leading-none",
              disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            {label && <span className="font-medium text-[#0F172A]">{label}</span>}
            {description && (
              <p className="text-xs text-[#475569] mt-1">{description}</p>
            )}
          </label>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
