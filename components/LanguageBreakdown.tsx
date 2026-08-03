import { Code2 } from "lucide-react";
import type { LanguageBreakdown as LanguageBreakdownType } from "@/types/github";
import { seriesColour } from "@/lib/chart-palette";
import { formatBytes } from "@/lib/utils";
import { LanguageChart } from "@/components/LanguageChart";

interface LanguageBreakdownProps {
  languages: LanguageBreakdownType[];
}

/**
 * Language share, told two ways from one palette:
 *
 *  - a donut for part-to-whole at a glance (LanguageChart, client-side);
 *  - ranked bars for the actual comparison, since a donut cannot be read
 *    precisely when two languages are close in size.
 *
 * The bars also satisfy the palette's contrast relief rule: three of the
 * six series colours sit below 3:1 on a white surface, which is only
 * acceptable when every value is visibly labelled — each row shows its own
 * percentage and byte count, so no value is reachable by colour alone.
 */
export function LanguageBreakdown({ languages }: LanguageBreakdownProps) {
  if (languages.length === 0) {
    return (
      <section className="mt-6 rounded-xl border border-dashed border-border bg-muted/30 p-5 text-center sm:p-6">
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
      className="mt-6 rounded-xl border border-border bg-card p-4 sm:p-6"
      aria-labelledby="languages-heading"
    >
      <header className="mb-5 flex flex-col gap-1 sm:mb-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
        <h3 id="languages-heading" className="text-base font-semibold">
          Language breakdown
        </h3>
        <span className="text-xs text-muted-foreground">
          By bytes across top repositories
        </span>
      </header>

      <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-center lg:gap-10">
        <div className="shrink-0">
          <LanguageChart languages={languages} />
        </div>

        {/* Ranked bars — the precise read. One row per language, each with a
            visible value, so this doubles as the chart's table view. */}
        {/* Two columns past 2xl — a single column there stretches each bar to
            ~1000px, which reads as a stripe rather than a measured length. */}
        <ol
          className="grid w-full min-w-0 flex-1 grid-cols-1 gap-x-10 gap-y-2.5 2xl:grid-cols-2"
          aria-label="Language share, ranked"
        >
          {languages.map((lang, index) => (
            <li key={lang.language}>
              <div className="flex items-baseline justify-between gap-3 text-xs">
                <span className="inline-flex min-w-0 items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="h-2.5 w-2.5 shrink-0 rounded-sm"
                    style={{
                      backgroundColor: seriesColour(lang.language, index),
                    }}
                  />
                  <span className="truncate font-medium text-foreground">
                    {lang.language}
                  </span>
                </span>
                <span className="shrink-0 whitespace-nowrap font-mono tabular-nums text-muted-foreground">
                  {lang.percent.toFixed(1)}%
                  <span className="hidden xs:inline">
                    {" · "}
                    {formatBytes(lang.bytes)}
                  </span>
                </span>
              </div>

              {/* Thin magnitude mark, 4px rounded data-end, growing from a
                  single baseline. Track is a light step of the same scale. */}
              <div
                className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-viz-track"
                role="progressbar"
                aria-valuenow={Math.round(lang.percent)}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${lang.language} share`}
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${Math.max(lang.percent, 0.6)}%`,
                    backgroundColor: seriesColour(lang.language, index),
                  }}
                />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}