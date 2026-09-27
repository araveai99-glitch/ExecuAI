import * as React from "react";
import Link from "next/link";

export const PublicFooter: React.FC = () => {
  return (
    <footer className="bg-[#0F172A] text-white border-t border-[#1E293B]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#F15E1C] text-white font-extrabold flex items-center justify-center text-sm shadow-xs">
                E
              </div>
              <span className="text-xl font-heading font-extrabold tracking-tight text-white">
                ExecuAI
              </span>
            </div>
            <p className="text-xs text-[#94A3B8] max-w-sm leading-relaxed">
              A secure AI Executive Email Assistant bringing multiple Gmail and Zoho mailboxes into one unified workspace with Safety Gate human-in-the-loop protection.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="px-3 py-1 rounded-full bg-[#E8F4F0] text-[#2E936F] text-[10px] font-bold border border-[#2E936F]/40 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2E936F]" />
                Gmail + Zoho Unified Architecture
              </span>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
              Product
            </h4>
            <ul className="space-y-2 text-xs text-[#CBD5E1]">
              <li>
                <Link href="/features" className="hover:text-[#F15E1C] transition-colors">
                  Features & Matrix
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-[#F15E1C] transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/use-cases" className="hover:text-[#F15E1C] transition-colors">
                  Executive Use Cases
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-[#F15E1C] transition-colors">
                  Pricing Plans
                </Link>
              </li>
            </ul>
          </div>

          {/* Security & Protocol */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
              Governance & Security
            </h4>
            <ul className="space-y-2 text-xs text-[#CBD5E1]">
              <li>
                <Link href="/security" className="hover:text-[#2E936F] transition-colors">
                  Safety Gate Protocol
                </Link>
              </li>
              <li>
                <Link href="/security" className="hover:text-[#2E936F] transition-colors">
                  OAuth 2.0 Security
                </Link>
              </li>
              <li>
                <Link href="/security" className="hover:text-[#2E936F] transition-colors">
                  Multi-Tenant Isolation
                </Link>
              </li>
              <li>
                <Link href="/security" className="hover:text-[#2E936F] transition-colors">
                  Audit Logging
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
              Company
            </h4>
            <ul className="space-y-2 text-xs text-[#CBD5E1]">
              <li>
                <Link href="/contact" className="hover:text-[#F15E1C] transition-colors">
                  Request Executive Demo
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#F15E1C] transition-colors">
                  Contact Team
                </Link>
              </li>
              <li>
                <Link href="/auth/login" className="hover:text-[#F15E1C] transition-colors">
                  Executive Login
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#1E293B] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748B]">
          <p>© {new Date().getFullYear()} ExecuAI SaaS. All rights reserved. AI prepares drafts; human remains in control.</p>
          <div className="flex items-center gap-4">
            <Link href="/security" className="hover:text-[#CBD5E1] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/security" className="hover:text-[#CBD5E1] transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

