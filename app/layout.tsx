import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
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
    <html lang="en-GB" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
