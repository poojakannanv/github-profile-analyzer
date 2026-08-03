import type { LanguageBreakdown as LanguageBreakdownType } from "@/types/github";
import { seriesColour } from "@/lib/chart-palette";
import { formatBytes } from "@/lib/utils";

interface LanguageChartProps {
  languages: LanguageBreakdownType[];
}

/* Geometry, in viewBox units. r is chosen so the ring's outer edge (r +
 * strokeWidth/2 = 48) stays inside the 100x100 box. */
const RADIUS = 40;
const STROKE = 16;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/* The surface gap between neighbouring segments. ~1 unit reads as the 2px
 * gap at the sizes this renders at, and it is what separates adjacent
 * segments — no stroke is drawn around a segment to do that job. */
const GAP = 1;

/**
 * Donut of language share — part-to-whole at a glance. The ranked bars beside
 * it (LanguageBreakdown) carry the precise values, so this never has to be
 * read exactly.
 *
 * Hand-rolled SVG rather than Recharts on purpose. Recharts' ResponsiveContainer
 * has to measure its parent before it draws, and in this layout it rendered a
 * correctly-sized 240x240 surface with zero sectors in it once the section
 * became a flex row at `lg` — a blank chart on every desktop viewport. Plain
 * SVG with a viewBox has no measurement step: it scales to any width, is
 * identical server- and client-side, and needs no client JavaScript at all.
 */
export function LanguageChart({ languages }: LanguageChartProps) {
  const top = languages[0];

  // Running offset so each segment starts where the previous one ended.
  let consumed = 0;
  const segments = languages.map((lang, index) => {
    const arc = (lang.percent / 100) * CIRCUMFERENCE;
    const offset = consumed;
    consumed += arc;
    return {
      lang,
      colour: seriesColour(lang.language, index),
      // Never let the gap eat a thin segment entirely.
      length: Math.max(arc - GAP, 0.4),
      offset,
    };
  });

  return (
    <div className="relative mx-auto w-[180px] max-w-full sm:w-[210px] lg:w-[240px]">
      <svg
        viewBox="0 0 100 100"
        className="h-auto w-full -rotate-90"
        role="img"
        aria-label={
          top
            ? `Donut chart of language share. Largest: ${top.language} at ${top.percent.toFixed(1)} percent. Every value is listed in the ranked breakdown beside this chart.`
            : "Donut chart of language share."
        }
      >
        {segments.map(({ lang, colour, length, offset }) => (
          <circle
            key={lang.language}
            cx={50}
            cy={50}
            r={RADIUS}
            fill="none"
            stroke={colour}
            strokeWidth={STROKE}
            strokeDasharray={`${length} ${CIRCUMFERENCE - length}`}
            strokeDashoffset={-offset}
          >
            <title>{`${lang.language} — ${lang.percent.toFixed(1)}% (${formatBytes(lang.bytes)})`}</title>
          </circle>
        ))}
      </svg>

      {/* Centre figure — the one number the chart leads with. Proportional
          figures, not tabular: tabular-nums looks loose at this size. */}
      {top && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-[24%] text-center">
          <span className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
            Top
          </span>
          <span
            className="mt-0.5 w-full truncate text-sm font-semibold text-foreground"
            title={top.language}
          >
            {top.language}
          </span>
          <span className="text-lg font-semibold leading-tight text-foreground">
            {top.percent.toFixed(0)}%
          </span>
        </div>
      )}
    </div>
  );
}
