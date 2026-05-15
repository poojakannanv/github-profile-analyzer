"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import type { LanguageBreakdown as LanguageBreakdownType } from "@/types/github";
import { languageColour } from "@/lib/language-colours";

interface LanguageChartProps {
  languages: LanguageBreakdownType[];
}

/**
 * Donut chart of language usage by bytes.
 * Day 9 deliverable — replaces the Day 8 CSS stacked bar.
 *
 * Recharts is client-only so this component is marked "use client" and
 * imported into the (server) LanguageBreakdown section.
 */
export function LanguageChart({ languages }: LanguageChartProps) {
  return (
    <div className="relative aspect-square w-full max-w-[220px] sm:max-w-[240px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={languages}
            dataKey="bytes"
            nameKey="language"
            cx="50%"
            cy="50%"
            innerRadius="62%"
            outerRadius="100%"
            paddingAngle={2}
            strokeWidth={0}
            isAnimationActive
          >
            {languages.map((lang) => (
              <Cell
                key={lang.language}
                fill={languageColour(lang.language)}
                aria-label={`${lang.language} ${lang.percent.toFixed(1)}%`}
              />
            ))}
          </Pie>
          <Tooltip
            cursor={false}
            content={<ChartTooltip />}
            wrapperStyle={{ outline: "none" }}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Center label — top language */}
      {languages[0] && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
            Top
          </span>
          <span
            className="mt-0.5 max-w-[60%] truncate text-sm font-semibold text-foreground"
            title={languages[0].language}
          >
            {languages[0].language}
          </span>
          <span className="text-xs text-muted-foreground">
            {languages[0].percent.toFixed(0)}%
          </span>
        </div>
      )}
    </div>
  );
}

/* ----- Custom tooltip ----- */

interface ChartTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: LanguageBreakdownType;
  }>;
}

function ChartTooltip({ active, payload }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;

  const lang = payload[0].payload;

  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2 text-xs shadow-md">
      <div className="flex items-center gap-2 font-medium text-foreground">
        <span
          aria-hidden="true"
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: languageColour(lang.language) }}
        />
        {lang.language}
      </div>
      <div className="mt-1 font-mono text-muted-foreground">
        {lang.percent.toFixed(1)}% · {formatBytes(lang.bytes)}
      </div>
    </div>
  );
}

/* ----- Helpers ----- */

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}
