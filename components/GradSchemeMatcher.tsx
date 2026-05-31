import {
  GraduationCap,
  ExternalLink,
  MapPin,
  Calendar,
  Globe2,
  CircleDot,
} from "lucide-react";
import type { GithubRepo, LanguageBreakdown as LanguageBreakdownType } from "@/types/github";
import {
  matchGradSchemes,
  monthName,
  type MatchedGradScheme,
  type WindowState,
} from "@/lib/uk-grad-schemes";

interface GradSchemeMatcherProps {
  languages: LanguageBreakdownType[];
  topRepos: GithubRepo[];
}

/**
 * Day 17 — UK Graduate Scheme matcher.
 *
 * Ranks well-known UK grad / early-careers technology schemes against the
 * user's stack and timing. Currently-open schemes float to the top so the
 * user sees actionable opportunities first.
 */
export function GradSchemeMatcher({ languages, topRepos }: GradSchemeMatcherProps) {
  const userLanguages = languages.map((l) => l.language);
  const userTopics = topRepos.flatMap((r) => r.topics);
  const matches = matchGradSchemes(userLanguages, userTopics, 6);

  if (matches.length === 0) {
    return (
      <section className="mt-6 rounded-xl border border-dashed border-border bg-muted/30 p-6 text-center">
        <GraduationCap
          className="mx-auto h-6 w-6 text-muted-foreground"
          aria-hidden="true"
        />
        <p className="mt-2 text-sm font-semibold text-foreground">
          No grad scheme matches yet
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Add more public repos in common languages to surface matches.
        </p>
      </section>
    );
  }

  return (
    <section
      className="mt-6 rounded-xl border border-border bg-card p-6"
      aria-labelledby="grad-scheme-heading"
    >
      <header className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10 text-primary">
            <GraduationCap className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
          <h3 id="grad-scheme-heading" className="text-base font-semibold">
            UK graduate schemes
          </h3>
        </div>
        <span className="text-xs text-muted-foreground">
          Open programmes ranked by stack overlap
        </span>
      </header>

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {matches.map((scheme) => (
          <li
            key={`${scheme.employer}-${scheme.name}`}
            className="flex h-full flex-col rounded-xl border border-border bg-background p-4 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
          >
            <header className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h4 className="truncate text-sm font-semibold text-foreground">
                  {scheme.employer}
                </h4>
                <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
                  {scheme.name}
                </p>
              </div>
              <span className="shrink-0 rounded-full border border-border bg-muted/40 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                {scheme.sector}
              </span>
            </header>

            <p className="mt-3 line-clamp-2 min-h-[2.25rem] text-xs leading-relaxed text-muted-foreground">
              {scheme.summary}
            </p>

            {/* Window status */}
            <WindowChip scheme={scheme} />

            {/* Matched languages */}
            {scheme.matches.length > 0 && (
              <ul
                className="mt-3 flex flex-wrap gap-1.5"
                aria-label="Tech stack matched with your profile"
              >
                {scheme.matches.map((tech) => (
                  <li
                    key={tech}
                    className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary"
                  >
                    {prettifyTech(tech)}
                  </li>
                ))}
              </ul>
            )}

            {/* Footer meta */}
            <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
              <span className="inline-flex items-center gap-1 whitespace-nowrap">
                <MapPin className="h-3 w-3" aria-hidden="true" />
                {scheme.city}
              </span>
              <span
                className={
                  "inline-flex items-center gap-1 whitespace-nowrap " +
                  (scheme.sponsorsVisa
                    ? "text-foreground/80"
                    : "text-muted-foreground/60")
                }
                title={
                  scheme.sponsorsVisa
                    ? "Typically sponsors Skilled Worker visas"
                    : "Usually requires UK eligibility"
                }
              >
                <Globe2 className="h-3 w-3" aria-hidden="true" />
                {scheme.sponsorsVisa ? "Visa sponsor" : "UK eligible"}
              </span>
              <a
                href={scheme.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto inline-flex items-center gap-1 whitespace-nowrap font-medium text-primary hover:underline"
              >
                Apply
                <ExternalLink className="h-3 w-3" aria-hidden="true" />
              </a>
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-5 text-[11px] leading-relaxed text-muted-foreground">
        Application windows are typical — exact dates vary by year. Always
        confirm on each employer&apos;s careers page before applying.
      </p>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

function WindowChip({ scheme }: { scheme: MatchedGradScheme }) {
  const { state } = scheme;
  const label = windowLabel(state);
  const tone = windowTone(state);

  return (
    <div className="mt-3 flex items-center justify-between rounded-md border border-border bg-muted/30 px-2.5 py-1.5 text-[11px]">
      <span className="inline-flex items-center gap-1.5 font-medium text-foreground/80">
        <Calendar className="h-3 w-3" aria-hidden="true" />
        {monthName(scheme.windowOpenMonth)} – {monthName(scheme.windowCloseMonth)}
      </span>
      <span
        className={"inline-flex items-center gap-1 whitespace-nowrap font-medium " + tone}
      >
        <CircleDot className="h-3 w-3" aria-hidden="true" />
        {label}
      </span>
    </div>
  );
}

function windowLabel(state: WindowState): string {
  switch (state.kind) {
    case "open":
      return state.closesInMonths <= 1
        ? "Closing soon"
        : `Open · ${state.closesInMonths}mo left`;
    case "closing":
      return "Closing this month";
    case "closed":
      if (state.opensInMonths === 0) return "Opens this month";
      return `Opens in ${state.opensInMonths}mo`;
  }
}

function windowTone(state: WindowState): string {
  switch (state.kind) {
    case "open":
      return state.closesInMonths <= 1
        ? "text-amber-600 dark:text-amber-400"
        : "text-emerald-600 dark:text-emerald-400";
    case "closing":
      return "text-amber-600 dark:text-amber-400";
    case "closed":
      return state.opensInMonths <= 2
        ? "text-foreground/70"
        : "text-muted-foreground";
  }
}

function prettifyTech(tech: string): string {
  const map: Record<string, string> = {
    cpp: "C++",
    "c++": "C++",
    csharp: "C#",
    "c#": "C#",
    typescript: "TypeScript",
    javascript: "JavaScript",
  };
  if (map[tech]) return map[tech];
  return tech.charAt(0).toUpperCase() + tech.slice(1);
}
