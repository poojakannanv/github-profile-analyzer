import { Building2, ExternalLink, MapPin, Briefcase } from "lucide-react";
import type { LanguageBreakdown as LanguageBreakdownType } from "@/types/github";
import { matchSponsors } from "@/lib/uk-sponsors";
import { languageColour } from "@/lib/language-colours";

interface VisaSponsorMatchProps {
  /** Language breakdown for the analysed user. */
  languages: LanguageBreakdownType[];
}

/**
 * Day 15 — UK Visa Sponsor Match.
 *
 * Matches the user's top languages against a curated list of UK Skilled
 * Worker visa sponsors and surfaces the strongest matches. This is one of
 * the project's UK Superpowers — a feature no generic GitHub analyzer
 * offers and that directly maps the report to UK hiring reality.
 */
export function VisaSponsorMatch({ languages }: VisaSponsorMatchProps) {
  // Use the top languages from the user's repos as the matching signal
  const userLanguages = languages.map((l) => l.language);
  const matches = matchSponsors(userLanguages, 6);

  if (matches.length === 0) {
    return (
      <section
        className="mt-6 rounded-xl border border-dashed border-border bg-muted/30 p-6 text-center"
        aria-labelledby="sponsor-match-empty-heading"
      >
        <Briefcase
          className="mx-auto h-6 w-6 text-muted-foreground"
          aria-hidden="true"
        />
        <h3
          id="sponsor-match-empty-heading"
          className="mt-2 text-sm font-semibold text-foreground"
        >
          No sponsor matches yet
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">
          We couldn&apos;t map this profile&apos;s tech stack to our curated UK
          sponsor list. Try adding repositories in widely-used languages.
        </p>
      </section>
    );
  }

  // Top match drives the strength bar normalisation
  const topScore = matches[0]?.score ?? 1;

  return (
    <section
      className="mt-6 rounded-xl border border-border bg-card p-6"
      aria-labelledby="sponsor-match-heading"
    >
      <header className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10 text-primary">
            <Building2 className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
          <h3 id="sponsor-match-heading" className="text-base font-semibold">
            UK visa sponsor match
          </h3>
        </div>
        <span className="text-xs text-muted-foreground">
          Skilled Worker sponsors ranked by stack overlap
        </span>
      </header>

      <ul
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        aria-label="Matched UK visa sponsors"
      >
        {matches.map((sponsor) => {
          const strength = Math.round((sponsor.score / topScore) * 100);
          return (
            <li
              key={sponsor.name}
              className="group flex h-full flex-col rounded-xl border border-border bg-background p-4 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
            >
              <header className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h4 className="truncate text-sm font-semibold text-foreground">
                    {sponsor.name}
                  </h4>
                  <p className="mt-0.5 inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                    <MapPin className="h-3 w-3" aria-hidden="true" />
                    {sponsor.city}
                  </p>
                </div>
                <span className="shrink-0 rounded-full border border-border bg-muted/40 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                  {sponsor.sector}
                </span>
              </header>

              <p className="mt-3 line-clamp-2 min-h-[2.25rem] text-xs leading-relaxed text-muted-foreground">
                {sponsor.tagline}
              </p>

              {/* Matched languages */}
              {sponsor.matches.length > 0 && (
                <ul
                  className="mt-3 flex flex-wrap gap-1.5"
                  aria-label="Languages matched with your stack"
                >
                  {sponsor.matches.map((lang) => (
                    <li
                      key={lang}
                      className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary"
                    >
                      <span
                        aria-hidden="true"
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: languageColour(prettifyLang(lang)) }}
                      />
                      {prettifyLang(lang)}
                    </li>
                  ))}
                </ul>
              )}

              {/* Match strength bar */}
              <div className="mt-4">
                <div className="flex items-baseline justify-between text-[10px] uppercase tracking-wide text-muted-foreground">
                  <span>Match strength</span>
                  <span className="font-mono">{strength}%</span>
                </div>
                <div
                  className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-muted"
                  role="progressbar"
                  aria-valuenow={strength}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${sponsor.name} match strength`}
                >
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-purple-500"
                    style={{ width: `${strength}%` }}
                  />
                </div>
              </div>

              <a
                href={sponsor.careersUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
              >
                Careers
                <ExternalLink className="h-3 w-3" aria-hidden="true" />
              </a>
            </li>
          );
        })}
      </ul>

      <p className="mt-5 text-[11px] leading-relaxed text-muted-foreground">
        Companies appear on the UK Home Office&apos;s Register of Licensed
        Sponsors. Tech stacks are inferred from public job posts — actual
        roles and requirements vary. Always confirm sponsorship status on
        each company&apos;s careers page.
      </p>
    </section>
  );
}

/** Convert our lowercase keys back to display form. */
function prettifyLang(lang: string): string {
  const map: Record<string, string> = {
    cpp: "C++",
    csharp: "C#",
    fsharp: "F#",
    objectivec: "Objective-C",
    typescript: "TypeScript",
    javascript: "JavaScript",
    jax: "JAX",
  };
  if (map[lang]) return map[lang];
  return lang.charAt(0).toUpperCase() + lang.slice(1);
}
