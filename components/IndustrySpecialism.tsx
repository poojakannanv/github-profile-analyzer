import { Compass, ExternalLink, Star } from "lucide-react";
import type { GithubRepo } from "@/types/github";
import {
  scoreIndustries,
  type IndustryScore,
  type IndustrySpecialismResult,
} from "@/lib/uk-industries";

interface IndustrySpecialismProps {
  topRepos: GithubRepo[];
}

/**
 * Day 19 — UK Industry Specialism detector.
 *
 * Picks the user's primary specialism with a confidence label, plus a
 * ranked affinity chart of all eight industries. The top two industries
 * surface their strongest contributing repos so the user can see exactly
 * why they ranked that high.
 */
export function IndustrySpecialism({ topRepos }: IndustrySpecialismProps) {
  const result = scoreIndustries(topRepos);

  if (!result.primary) {
    return (
      <section className="mt-6 rounded-xl border border-dashed border-border bg-muted/30 p-6 text-center">
        <Compass
          className="mx-auto h-6 w-6 text-muted-foreground"
          aria-hidden="true"
        />
        <p className="mt-2 text-sm font-semibold text-foreground">
          No clear industry signal yet
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Your top repos don&apos;t carry enough topics, descriptions, or
          tech-specific languages to detect a specialism. Tag your repos with
          a few relevant topics to surface this.
        </p>
      </section>
    );
  }

  return (
    <section
      className="mt-6 rounded-xl border border-border bg-card p-6"
      aria-labelledby="industry-specialism-heading"
    >
      <header className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10 text-primary">
            <Compass className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
          <h3 id="industry-specialism-heading" className="text-base font-semibold">
            Industry specialism
          </h3>
        </div>
        <span className="text-xs text-muted-foreground">
          Inferred from your repo topics, languages, and descriptions
        </span>
      </header>

      {/* Hero: primary specialism */}
      <PrimaryHero result={result} />

      {/* Ranked affinity bars */}
      <ol className="mt-6 space-y-2" aria-label="Industry affinities ranked">
        {result.ranked.map((score) => (
          <AffinityRow
            key={score.key}
            score={score}
            isPrimary={result.primary?.key === score.key}
            isSecondary={result.secondary?.key === score.key}
          />
        ))}
      </ol>

      {/* Explain-why: top contributing repos for the primary + secondary */}
      {(result.primary || result.secondary) && (
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {result.primary && (
            <EvidenceCard score={result.primary} accent="primary" />
          )}
          {result.secondary && (
            <EvidenceCard score={result.secondary} accent="secondary" />
          )}
        </div>
      )}

      <p className="mt-5 text-[11px] leading-relaxed text-muted-foreground">
        Signal weight: topic match (×3) &gt; primary language (×2) &gt;
        description mention (×1), each multiplied by log(stars + forks).
        That keeps niche-but-active repos visible without letting one
        viral repo dominate.
      </p>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

function PrimaryHero({ result }: { result: IndustrySpecialismResult }) {
  const primary = result.primary!;
  const confTone = confidenceTone(result.primaryConfidence);

  return (
    <div className="rounded-xl border border-primary/30 bg-gradient-to-br from-primary/5 via-card to-card p-5">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">
        Primary specialism
      </p>
      <div className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h4 className="text-2xl font-bold tracking-tight">{primary.name}</h4>
        <span
          className={
            "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium " +
            confTone
          }
          title={`Affinity score ${primary.affinity}%`}
        >
          {result.primaryConfidence} signal
        </span>
      </div>
      <p className="mt-1.5 text-sm text-muted-foreground">{primary.blurb}</p>

      {result.secondary && (
        <p className="mt-3 text-xs text-muted-foreground">
          Secondary lean ·{" "}
          <span className="font-medium text-foreground">
            {result.secondary.name}
          </span>{" "}
          ({result.secondary.affinity}% affinity)
        </p>
      )}
    </div>
  );
}

function confidenceTone(
  c: IndustrySpecialismResult["primaryConfidence"],
): string {
  switch (c) {
    case "Strong":
      return "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300";
    case "Moderate":
      return "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300";
    case "Light":
      return "border-border bg-muted/40 text-muted-foreground";
    case "Inconclusive":
      return "border-border bg-muted/40 text-muted-foreground";
  }
}

/* -------------------------------------------------------------------------- */

interface AffinityRowProps {
  score: IndustryScore;
  isPrimary: boolean;
  isSecondary: boolean;
}

function AffinityRow({ score, isPrimary, isSecondary }: AffinityRowProps) {
  return (
    <li>
      <div className="flex items-baseline justify-between text-xs">
        <span
          className={
            "font-medium " +
            (isPrimary ? "text-foreground" : "text-foreground/80")
          }
        >
          {score.name}
        </span>
        <span className="font-mono text-[11px] text-muted-foreground">
          {score.affinity}%
        </span>
      </div>
      <div
        className="mt-1 h-2 w-full overflow-hidden rounded-full bg-muted"
        role="progressbar"
        aria-valuenow={score.affinity}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${score.name} affinity ${score.affinity} percent`}
      >
        <div
          className={
            "h-full rounded-full transition-all " +
            (isPrimary
              ? "bg-gradient-to-r from-primary via-purple-500 to-pink-500"
              : isSecondary
                ? "bg-primary/70"
                : "bg-primary/30")
          }
          style={{ width: `${score.affinity}%` }}
        />
      </div>
    </li>
  );
}

/* -------------------------------------------------------------------------- */

function EvidenceCard({
  score,
  accent,
}: {
  score: IndustryScore;
  accent: "primary" | "secondary";
}) {
  if (score.topRepos.length === 0) return null;
  return (
    <div
      className={
        "rounded-xl border bg-background p-4 " +
        (accent === "primary"
          ? "border-primary/30"
          : "border-border")
      }
    >
      <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
        {accent === "primary" ? "Why primary" : "Why secondary"}
      </p>
      <p className="mt-0.5 text-sm font-semibold">{score.name}</p>
      <ul className="mt-3 space-y-2">
        {score.topRepos.map((repo) => (
          <li key={repo.name} className="text-xs">
            <a
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium text-foreground hover:text-primary hover:underline"
            >
              {repo.name}
              <ExternalLink className="h-3 w-3" aria-hidden="true" />
            </a>
            <span className="ml-2 inline-flex items-center gap-1 text-muted-foreground">
              <Star className="h-3 w-3" aria-hidden="true" />
              {repo.stars.toLocaleString("en-GB")}
            </span>
            {repo.matchedOn.length > 0 && (
              <p className="mt-1 line-clamp-1 text-[11px] text-muted-foreground">
                Matched: {repo.matchedOn.slice(0, 4).join(", ")}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
