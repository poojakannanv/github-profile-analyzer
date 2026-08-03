import Link from "next/link";
import { Github, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between gap-2">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2 font-semibold"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="hidden truncate sm:inline">Profile Analyzer</span>
          <span className="shrink-0 rounded-full border border-border bg-muted px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
            UK
          </span>
        </Link>

        <nav className="flex shrink-0 items-center gap-1 sm:gap-2">
          {/* "How it works" is the least important control on a phone and the
              first to go, so the theme and source buttons keep their space. */}
          <Button asChild variant="ghost" size="sm" className="hidden xs:inline-flex">
            <Link href="#how-it-works">How it works</Link>
          </Button>
          <ThemeToggle />
          <Button asChild variant="outline" size="sm">
            <a
              href="https://github.com/poojakannanv/github-profile-analyzer"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View source on GitHub"
            >
              <Github className="h-4 w-4" />
              <span className="hidden sm:inline">Source</span>
            </a>
          </Button>
        </nav>
      </div>
    </header>
  );
}
