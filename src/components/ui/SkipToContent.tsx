import * as React from "react";

export const SkipToContent: React.FC = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#F15E1C] focus:text-white focus:font-bold focus:rounded-xl focus:shadow-lg focus:outline-none transition-all"
    >
      Skip to Main Content
    </a>
  );
};
