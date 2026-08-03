import { Star, GitFork, ExternalLink, Clock } from "lucide-react";
import type { GithubRepo } from "@/types/github";
import { languageColour } from "@/lib/language-colours";

interface RepoCardProps {
  repo: GithubRepo;
  /** Optional rank shown in the corner — e.g. "01" for the top repo */
  rank?: number;
}

/** Max number of topic chips before we collapse the remainder into "+N". */
const MAX_TOPICS_VISIBLE = 4;

export function RepoCard({ repo, rank }: RepoCardProps) {
  const visibleTopics = repo.topics.slice(0, MAX_TOPICS_VISIBLE);
  const extraTopicCount = repo.topics.length - visibleTopics.length;

  // bg-background, not bg-card: these sit inside a bg-card section, where
  // card-on-card left the tiles indistinguishable from their container.
  return (
    <a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col rounded-xl border border-border bg-background p-4 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md sm:p-5"
      aria-label={`${repo.name} — open on GitHub`}
    >
      {/* Header: name + external icon + optional rank */}
      <header className="flex items-start justify-between gap-2">
        <h4 className="flex min-w-0 items-center gap-1.5 truncate text-sm font-semibold text-foreground">
          <span className="truncate group-hover:text-primary">{repo.name}</span>
          <ExternalLink
            className="h-3 w-3 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
            aria-hidden="true"
          />
        </h4>
        {typeof rank === "number" && (
          <span className="shrink-0 font-mono text-[10px] text-muted-foreground">
            {String(rank).padStart(2, "0")}
          </span>
        )}
      </header>

      {/* Description */}
      <p className="mt-2 line-clamp-2 min-h-[2.5rem] text-xs leading-relaxed text-muted-foreground">
        {repo.description ?? <span className="italic">No description</span>}
      </p>

      {/* Topics */}
      {repo.topics.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {visibleTopics.map((topic) => (
            <li
              key={topic}
              className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary"
            >
              {topic}
            </li>
          ))}
          {extraTopicCount > 0 && (
            <li className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
              +{extraTopicCount}
            </li>
          )}
        </ul>
      )}

      {/* Footer: language + stats. Flat flex-wrap row so chips never collide
          or wrap mid-phrase ("5 days ago" split across lines). */}
      <footer className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-4 text-xs text-muted-foreground">
        {repo.language ? (
          <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: languageColour(repo.language) }}
            />
            {repo.language}
          </span>
        ) : (
          <span className="whitespace-nowrap italic opacity-60">No language</span>
        )}

        <span
          className="inline-flex items-center gap-1 whitespace-nowrap"
          title={`${repo.stars} stars`}
        >
          <Star className="h-3 w-3" aria-hidden="true" />
          {formatCount(repo.stars)}
        </span>

        <span
          className="inline-flex items-center gap-1 whitespace-nowrap"
          title={`${repo.forks} forks`}
        >
          <GitFork className="h-3 w-3" aria-hidden="true" />
          {formatCount(repo.forks)}
        </span>

        <span
          className="ml-auto inline-flex items-center gap-1 whitespace-nowrap"
          title={`Updated ${new Date(repo.updatedAt).toLocaleString("en-GB")}`}
        >
          <Clock className="h-3 w-3" aria-hidden="true" />
          {formatRelativeTimeShort(repo.updatedAt)}
        </span>
      </footer>
    </a>
  );
}

/* ----- Formatting helpers ----- */

/** 1234 -> "1.2k", 1_500_000 -> "1.5M" */
function formatCount(n: number): string {
  if (n < 1000) return n.toString();
  if (n < 1_000_000) {
    const value = n / 1000;
    return value >= 10 ? `${Math.round(value)}k` : `${value.toFixed(1)}k`;
  }
  const value = n / 1_000_000;
  return value >= 10 ? `${Math.round(value)}M` : `${value.toFixed(1)}M`;
}

/** Compact relative time — "5d", "15h", "2mo", "1y". Keeps cards from
 *  wrapping the time onto multiple lines in narrow grids. */
function formatRelativeTimeShort(iso: string): string {
  const then = new Date(iso).getTime();
  const now = Date.now();
  const diffSec = Math.max(0, Math.round((now - then) / 1000));

  const minute = 60;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;
  const year = 365 * day;

  if (diffSec < minute) return "now";
  if (diffSec < hour) return `${Math.floor(diffSec / minute)}m`;
  if (diffSec < day) return `${Math.floor(diffSec / hour)}h`;
  if (diffSec < week) return `${Math.floor(diffSec / day)}d`;
  if (diffSec < month) return `${Math.floor(diffSec / week)}w`;
  if (diffSec < year) return `${Math.floor(diffSec / month)}mo`;
  return `${Math.floor(diffSec / year)}y`;
}
