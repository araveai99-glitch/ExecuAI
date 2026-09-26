import * as React from "react";
import { cn } from "@/lib/utils";
import { IconButton } from "./IconButton";

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  position?: "left" | "right";
  className?: string;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  children,
  position = "right",
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

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0F172A]/40 transition-opacity animate-in fade-in-50"
        onClick={onClose}
      />

      {/* Drawer Container */}
      <div
        className={cn(
          "fixed inset-y-0 flex max-w-full z-10",
          position === "right" ? "right-0 pl-10" : "left-0 pr-10"
        )}
      >
        <div
          className={cn(
            "w-screen max-w-md bg-white shadow-xl border-l border-[#CBD5E1] p-6 flex flex-col justify-between transition-all animate-in duration-300",
            position === "right"
              ? "slide-in-from-right-full"
              : "slide-in-from-left-full",
            className
          )}
        >
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
              <h2 className="text-base font-bold text-[#0F172A]">{title}</h2>
              <IconButton
                variant="ghost"
                size="sm"
                ariaLabel="Close drawer"
                onClick={onClose}
                icon={<span className="material-symbols-outlined text-[18px]">close</span>}
              />
            </div>
            <div className="py-4">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
