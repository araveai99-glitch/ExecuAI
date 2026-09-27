import type { Metadata } from "next";
import "./globals.css";
import { SkipToContent } from "@/components/ui/SkipToContent";
import { CookieConsent } from "@/components/ui/CookieConsent";
import { BackToTop } from "@/components/ui/BackToTop";
import { FloatingContact } from "@/components/ui/FloatingContact";

export const metadata: Metadata = {
  title: {
    default: "ExecuAI — Human-in-the-Loop AI Executive Assistant",
    template: "%s | ExecuAI Executive Platform",
  },
  description:
    "A secure AI Executive Email Assistant unifying Gmail & Zoho mailboxes into one 3D triage matrix with financial Safety Gate protection and zero model training guarantees.",
  keywords: [
    "Executive Email AI",
    "Gmail AI Assistant",
    "Zoho Mail AI Integration",
    "Human in the loop AI",
    "Safety Gate Protocol",
    "Zero Model Training Email AI",
  ],
  authors: [{ name: "ExecuAI Security & Product Team" }],
  metadataBase: new URL("https://execuai.com"),
  openGraph: {
    title: "ExecuAI — Human-in-the-Loop AI Executive Email Assistant",
    description:
      "Unify Gmail & Zoho mailboxes into one decision dashboard with financial Safety Gate protection.",
    url: "https://execuai.com",
    siteName: "ExecuAI",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ExecuAI — AI Executive Assistant",
    description: "Human-in-the-loop email governance for Gmail and Zoho Mail.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Roboto:wght@400;500;700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#F8FAFC] text-[#0F172A] font-sans antialiased selection:bg-[#FFF2EC] selection:text-[#F15E1C]">
        <SkipToContent />
        {children}
        <CookieConsent />
        <BackToTop />
        <FloatingContact />
      </body>
    </html>
  );
}
