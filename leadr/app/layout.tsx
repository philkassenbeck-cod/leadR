import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LeadR — Coaching strengths-based",
  description: "Plateforme de coaching strengths-based",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
