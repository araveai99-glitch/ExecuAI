"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";

export const BackToTop: React.FC = () => {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          aria-label="Scroll back to top of page"
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-[#0F172A] text-white shadow-lg border border-[#334155] hover:bg-[#F15E1C] transition-colors cursor-pointer flex items-center justify-center"
        >
          <span className="material-symbols-outlined text-[20px]">arrow_upward</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
