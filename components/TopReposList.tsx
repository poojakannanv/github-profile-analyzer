import { Star, GitFork, ExternalLink, FolderOpen } from "lucide-react";
import type { GithubRepo } from "@/types/github";

interface TopReposListProps {
  repos: GithubRepo[];
}

/**
 * Day 6 — simple sorted list of top repos.
 * Day 10 will polish into a richer card grid with topics and language colour dots.
 */
export function TopReposList({ repos }: TopReposListProps) {
  if (repos.length === 0) {
    return (
      <section className="mt-6 rounded-xl border border-dashed border-border bg-muted/30 p-6 text-center">
        <FolderOpen
          className="mx-auto h-6 w-6 text-muted-foreground"
          aria-hidden="true"
        />
        <p className="mt-2 text-sm text-muted-foreground">
          No public, non-fork repositories yet — that's actually a great
          starting point for the next-projects suggestions on Day 18.
        </p>
      </section>
    );
  }

  return (
    <section
      className="mt-6 rounded-xl border border-border bg-card p-6"
      aria-labelledby="top-repos-heading"
    >
      <header className="mb-4 flex items-baseline justify-between">
        <h3 id="top-repos-heading" className="text-base font-semibold">
          Top repositories
        </h3>
        <span className="text-xs text-muted-foreground">
          Sorted by stars · forks excluded
        </span>
      </header>

      <ol className="divide-y divide-border">
        {repos.map((repo, index) => (
          <li key={repo.url} className="py-3 first:pt-0 last:pb-0">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 w-5 shrink-0 text-right font-mono text-xs text-muted-foreground">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="min-w-0 flex-1">
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary hover:underline"
                >
                  {repo.name}
                  <ExternalLink className="h-3 w-3" aria-hidden="true" />
                </a>
                {repo.description && (
                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                    {repo.description}
                  </p>
                )}
              </div>

              <div className="flex shrink-0 items-center gap-3 text-xs text-muted-foreground">
                {repo.language && (
                  <span className="rounded-full border border-border bg-background px-2 py-0.5">
                    {repo.language}
                  </span>
                )}
                <span className="inline-flex items-center gap-1">
                  <Star className="h-3 w-3" aria-hidden="true" />
                  {repo.stars}
                </span>
                <span className="hidden items-center gap-1 sm:inline-flex">
                  <GitFork className="h-3 w-3" aria-hidden="true" />
                  {repo.forks}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
