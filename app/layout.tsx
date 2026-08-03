import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

/**
 * tailwind.config.ts maps `font-sans` / `font-mono` onto these two CSS
 * variables. Nothing was defining them, so every `font-sans` was silently
 * falling through to system-ui and every `font-mono` to the browser default.
 */
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
});

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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Lets the layout use the full width of a notched phone in landscape.
  viewportFit: "cover",
};

/**
 * Applies the stored theme (or the OS preference) before first paint, so the
 * page never flashes light before switching to dark. Has to be inline and
 * blocking for that reason — a deferred script would run after paint.
 */
const themeScript = `
(function(){try{
var s=localStorage.getItem("theme");
var d=s==="dark"||(!s&&window.matchMedia("(prefers-color-scheme: dark)").matches);
document.documentElement.classList.toggle("dark",d);
document.documentElement.style.colorScheme=d?"dark":"light";
}catch(e){}})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-GB"
      className={`${inter.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <div className="relative flex min-h-dvh flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}