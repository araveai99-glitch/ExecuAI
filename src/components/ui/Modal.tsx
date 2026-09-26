import * as React from "react";
import { cn } from "@/lib/utils";
import { IconButton } from "./IconButton";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl";
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
  maxWidth = "md",
  className,
}) => {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidths = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0F172A]/40 backdrop-blur-xs transition-opacity animate-in fade-in-50"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div
        className={cn(
          "relative w-full rounded-2xl bg-white p-6 shadow-[0_20px_25px_-5px_rgba(15,23,42,0.08),0_8px_10px_-6px_rgba(15,23,42,0.04)] border border-[#CBD5E1] transition-all animate-in zoom-in-95 duration-200 z-10",
          maxWidths[maxWidth],
          className
        )}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[#E2E8F0]">
          <div>
            {typeof title === "string" ? (
              <h2 className="text-lg font-bold text-[#0F172A] tracking-tight">
                {title}
              </h2>
            ) : (
              title
            )}
            {subtitle && (
              <p className="text-xs text-[#475569] mt-0.5">{subtitle}</p>
            )}
          </div>
          <IconButton
            variant="ghost"
            size="sm"
            ariaLabel="Close Modal"
            onClick={onClose}
            icon={<span className="material-symbols-outlined text-[18px]">close</span>}
          />
        </div>

        {/* Content */}
        <div className="py-4 text-sm text-[#0F172A]">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end gap-2 pt-4 border-t border-[#E2E8F0]">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
