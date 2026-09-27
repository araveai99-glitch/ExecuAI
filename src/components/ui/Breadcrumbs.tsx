import * as React from "react";
import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-[#64748B]">
      <Link href="/" className="hover:text-[#0F172A] transition-colors flex items-center gap-1">
        <span className="material-symbols-outlined text-[16px]">home</span>
        <span>Home</span>
      </Link>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <span className="text-[#CBD5E1]">/</span>
          {item.href ? (
            <Link href={item.href} className="hover:text-[#0F172A] transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-[#0F172A] font-bold" aria-current="page">
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
