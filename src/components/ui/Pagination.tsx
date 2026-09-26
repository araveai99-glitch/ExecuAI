import * as React from "react";
import { cn } from "@/lib/utils";
import { IconButton } from "./IconButton";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}) => {
  return (
    <div className={cn("flex items-center justify-between px-4 py-3 bg-white border-t border-[#E2E8F0] rounded-b-xl text-xs text-[#475569]", className)}>
      <div>
        Showing page <span className="font-bold text-[#0F172A]">{currentPage}</span> of{" "}
        <span className="font-bold text-[#0F172A]">{totalPages}</span>
      </div>
      <div className="flex items-center gap-1">
        <IconButton
          variant="secondary"
          size="sm"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          ariaLabel="Previous Page"
          icon={<span className="material-symbols-outlined text-[16px]">chevron_left</span>}
        />
        <span className="px-2 font-semibold text-[#0F172A]">{currentPage}</span>
        <IconButton
          variant="secondary"
          size="sm"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          ariaLabel="Next Page"
          icon={<span className="material-symbols-outlined text-[16px]">chevron_right</span>}
        />
      </div>
    </div>
  );
};
