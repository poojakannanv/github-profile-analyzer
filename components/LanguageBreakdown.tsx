import { Code2 } from "lucide-react";
import type { LanguageBreakdown as LanguageBreakdownType } from "@/types/github";
import { languageColour } from "@/lib/language-colours";
import { LanguageChart } from "@/components/LanguageChart";

interface LanguageBreakdownProps {
  languages: LanguageBreakdownType[];
}

/**
 * Day 9 — donut chart (Recharts) + side legend.
 * The chart lives in its own "use client" component (LanguageChart) so
 * this wrapper can stay server-rendered.
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
      <header className="mb-6 flex items-baseline justify-between">
        <h3 id="languages-heading" className="text-base font-semibold">
          Language breakdown
        </h3>
        <span className="text-xs text-muted-foreground">
          By bytes across top repositories
        </span>
      </header>

      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:gap-8">
        {/* Chart */}
        <div className="shrink-0">
          <LanguageChart languages={languages} />
        </div>

        {/* Legend */}
        <ul
          className="grid w-full flex-1 grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2"
          aria-label="Language breakdown legend"
        >
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
      </div>
    </section>
  );
}
