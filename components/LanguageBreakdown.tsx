import { Code2 } from "lucide-react";
import type { LanguageBreakdown as LanguageBreakdownType } from "@/types/github";
import { languageColour } from "@/lib/language-colours";

interface LanguageBreakdownProps {
  languages: LanguageBreakdownType[];
}

/**
 * Day 8 — proportional horizontal bar of language usage by bytes.
 * Day 9 will swap this for a Recharts donut chart.
 */
export function LanguageBreakdown({ languages }: LanguageBreakdownProps) {
  if (languages.length === 0) {
    return (
      <section className="mt-6 rounded-xl border border-dashed border-border bg-muted/30 p-6 text-center">
        <Code2
          className="mx-auto h-6 w-6 text-muted-foreground"
          aria-hidden="true"
        />
        <p className="mt-2 text-sm text-muted-foreground">
          No language data available — repositories may be empty or private.
        </p>
      </section>
    );
  }

  return (
    <section
      className="mt-6 rounded-xl border border-border bg-card p-6"
      aria-labelledby="languages-heading"
    >
      <header className="mb-4 flex items-baseline justify-between">
        <h3 id="languages-heading" className="text-base font-semibold">
          Language breakdown
        </h3>
        <span className="text-xs text-muted-foreground">
          By bytes across top repositories
        </span>
      </header>

      {/* Proportional bar */}
      <div
        role="img"
        aria-label={languages
          .map((l) => `${l.language} ${l.percent.toFixed(0)}%`)
          .join(", ")}
        className="flex h-3 w-full overflow-hidden rounded-full bg-muted"
      >
        {languages.map((lang) => (
          <div
            key={lang.language}
            className="h-full transition-all"
            style={{
              width: `${lang.percent}%`,
              backgroundColor: languageColour(lang.language),
            }}
            title={`${lang.language} · ${lang.percent.toFixed(1)}%`}
          />
        ))}
      </div>

      {/* Legend */}
      <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3">
        {languages.map((lang) => (
          <li
            key={lang.language}
            className="flex items-center justify-between gap-3 text-xs"
          >
            <span className="inline-flex min-w-0 items-center gap-2">
              <span
                aria-hidden="true"
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: languageColour(lang.language) }}
              />
              <span className="truncate font-medium text-foreground">
                {lang.language}
              </span>
            </span>
            <span className="shrink-0 font-mono text-muted-foreground">
              {lang.percent.toFixed(1)}%
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
