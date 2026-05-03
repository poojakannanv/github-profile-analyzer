import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GitHub Profile Analyzer | UK Edition",
  description:
    "AI-powered GitHub profile analysis tailored for the UK Full-Stack and Graduate Developer market.",
  keywords: [
    "github",
    "profile",
    "analyzer",
    "uk jobs",
    "full-stack developer",
    "graduate developer",
    "ai",
  ],
  authors: [{ name: "Pooja Kannan" }],
  openGraph: {
    title: "GitHub Profile Analyzer | UK Edition",
    description:
      "Analyse any GitHub profile against UK Full-Stack and Graduate Developer roles.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB">
      <body className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
