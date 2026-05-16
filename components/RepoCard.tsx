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

  return (
    <a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
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

      {/* Footer: language + stats */}
      <footer className="mt-auto flex items-center justify-between gap-3 pt-4 text-xs text-muted-foreground">
        {repo.language ? (
          <span className="inline-flex items-center gap-1.5">
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: languageColour(repo.language) }}
            />
            {repo.language}
          </span>
        ) : (
          <span className="italic opacity-60">No language</span>
        )}

        <span className="inline-flex items-center gap-3">
          <span className="inline-flex items-center gap-1" title={`${repo.stars} stars`}>
            <Star className="h-3 w-3" aria-hidden="true" />
            {formatCount(repo.stars)}
          </span>
          <span className="hidden items-center gap-1 sm:inline-flex" title={`${repo.forks} forks`}>
            <GitFork className="h-3 w-3" aria-hidden="true" />
            {formatCount(repo.forks)}
          </span>
          <span
            className="hidden items-center gap-1 lg:inline-flex"
            title={`Updated ${new Date(repo.updatedAt).toLocaleString("en-GB")}`}
          >
            <Clock className="h-3 w-3" aria-hidden="true" />
            {formatRelativeTime(repo.updatedAt)}
          </span>
        </span>
      </footer>
    </a>
  );
}

/* ----- Formatting helpers ----- */

/** 1234 → "1.2k", 1_500_000 → "1.5M" */
function formatCount(n: number): string {
  if (n < 1000) return n.toString();
  if (n < 1_000_000) {
    const value = n / 1000;
    return value >= 10 ? `${Math.round(value)}k` : `${value.toFixed(1)}k`;
  }
  const value = n / 1_000_000;
  return value >= 10 ? `${Math.round(value)}M` : `${value.toFixed(1)}M`;
}

/** "2 days ago", "3 months ago" — UK English, terse. */
function formatRelativeTime(iso: string): string {
  const then = new Date(iso).getTime();
  const now = Date.now();
  const diffSec = Math.max(0, Math.round((now - then) / 1000));

  const units: { unit: Intl.RelativeTimeFormatUnit; seconds: number }[] = [
    { unit: "year", seconds: 60 * 60 * 24 * 365 },
    { unit: "month", seconds: 60 * 60 * 24 * 30 },
    { unit: "week", seconds: 60 * 60 * 24 * 7 },
    { unit: "day", seconds: 60 * 60 * 24 },
    { unit: "hour", seconds: 60 * 60 },
    { unit: "minute", seconds: 60 },
  ];

  const rtf = new Intl.RelativeTimeFormat("en-GB", { numeric: "auto" });

  for (const { unit, seconds } of units) {
    if (diffSec >= seconds) {
      return rtf.format(-Math.floor(diffSec / seconds), unit);
    }
  }
  return "just now";
}
