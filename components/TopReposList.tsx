import { FolderOpen } from "lucide-react";
import type { GithubRepo } from "@/types/github";
import { RepoCard } from "@/components/RepoCard";

interface TopReposListProps {
  repos: GithubRepo[];
}

/**
 * Day 10 — responsive card grid of the user's top repositories.
 * Up from the Day 6 row list. Each card is a <RepoCard /> with
 * topics, language colour dot, and quality signals.
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
          starting point for the next-projects suggestions on Day 16.
        </p>
      </section>
    );
  }

  return (
    <section
      className="mt-6 rounded-xl border border-border bg-card p-6"
      aria-labelledby="top-repos-heading"
    >
      <header className="mb-5 flex items-baseline justify-between">
        <h3 id="top-repos-heading" className="text-base font-semibold">
          Top repositories
        </h3>
        <span className="text-xs text-muted-foreground">
          Sorted by stars · forks excluded
        </span>
      </header>

      <ul
        role="list"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {repos.map((repo, index) => (
          <li key={repo.url} className="flex">
            <RepoCard repo={repo} rank={index + 1} />
          </li>
        ))}
      </ul>
    </section>
  );
}
