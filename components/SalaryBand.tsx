import { PoundSterling, MapPin, Sparkles, TrendingUp } from "lucide-react";
import type { GithubProfile, GithubRepo } from "@/types/github";
import {
  estimateSalary,
  formatGbpK,
  formatGbpRange,
  type SalaryBand as SalaryBandType,
  type SalaryEstimate,
} from "@/lib/uk-salary";

interface SalaryBandProps {
  profile: GithubProfile;
  topRepos: GithubRepo[];
}

/**
 * Day 18 — UK salary band estimate.
 *
 * Headline tier + range on top, a 5-tier ladder with the user's tier
 * highlighted, and a London vs Rest-of-UK + sector-boost breakdown
 * underneath. Numbers are directional, not authoritative.
 */
export function SalaryBand({ profile, topRepos }: SalaryBandProps) {
  const estimate = estimateSalary(profile, topRepos);

  return (
    <section
      className="mt-6 overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/5 via-card to-card shadow-sm"
      aria-labelledby="salary-band-heading"
    >
      <header className="flex flex-col gap-1 border-b border-border/60 px-6 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="inline-flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <PoundSterling className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
          <h3 id="salary-band-heading" className="text-sm font-semibold">
            UK salary band estimate
          </h3>
        </div>
        <span className="text-xs text-muted-foreground">
          Directional · London median
        </span>
      </header>

      <div className="px-6 py-5">
        {/* Hero band */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Estimated tier
            </p>
            <p className="mt-1 text-2xl font-bold tracking-tight">
              {estimate.tier.tier}{" "}
              <span className="text-base font-medium text-muted-foreground">
                · {estimate.tier.note.split(" — ")[0]}
              </span>
            </p>
            <p className="mt-1 text-sm text-foreground/80">
              {formatGbpRange(estimate.londonMin, estimate.londonMax)} ·
              London base
            </p>
          </div>

          {estimate.sectorBoost.kind !== "none" && (
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-700 dark:text-amber-300">
              <Sparkles className="h-3 w-3" aria-hidden="true" />
              {estimate.sectorBoost.label} · +
              {Math.round(estimate.sectorBoost.uplift * 100)} %
            </div>
          )}
        </div>

        {/* 5-tier ladder */}
        <ol className="mt-6 grid grid-cols-5 gap-1.5" aria-label="Salary tiers">
          {estimate.allBands.map((band) => (
            <TierStep
              key={band.tier}
              band={band}
              isCurrent={band.ladder === estimate.tier.ladder}
              isReached={band.ladder <= estimate.tier.ladder}
            />
          ))}
        </ol>

        {/* Breakdown row */}
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <BreakdownCard
            icon={MapPin}
            label="Rest of UK"
            value={formatGbpRange(estimate.restOfUkMin, estimate.restOfUkMax)}
            hint="Manchester, Edinburgh, Bristol typically -15% vs London."
          />
          <BreakdownCard
            icon={TrendingUp}
            label="Stretch (Senior +)"
            value={formatGbpRange(
              estimate.allBands[Math.min(estimate.tier.ladder + 1, 4)].londonMin,
              estimate.allBands[Math.min(estimate.tier.ladder + 1, 4)].londonMax,
            )}
            hint={
              estimate.tier.ladder === 4
                ? "You're at the top tier — uplift comes from total comp."
                : "Where the next promotion / next-tier offers land."
            }
          />
        </div>

        {/* Signal grid */}
        <dl
          className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4"
          aria-label="Profile signals used in the estimate"
        >
          {estimate.signals.map((sig) => (
            <div
              key={sig.label}
              className="rounded-lg border border-border bg-background px-3 py-2"
            >
              <dt className="text-[10px] uppercase tracking-wide text-muted-foreground">
                {sig.label}
              </dt>
              <dd className="mt-0.5 text-sm font-semibold tabular-nums">
                {sig.value}
              </dd>
            </div>
          ))}
        </dl>

        <p className="mt-5 text-[11px] leading-relaxed text-muted-foreground">
          Bands blend public 2026 UK datapoints (Otta, Levels.fyi UK,
          Hired UK). Actual offers depend heavily on company stage and
          interview signal. Sector boost (when shown) reflects observed
          uplift for specialists in that area.
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

interface TierStepProps {
  band: SalaryBandType;
  isCurrent: boolean;
  isReached: boolean;
}

function TierStep({ band, isCurrent, isReached }: TierStepProps) {
  return (
    <li
      className={
        "rounded-lg border px-2 py-2 text-center transition-colors " +
        (isCurrent
          ? "border-primary bg-primary/10"
          : isReached
            ? "border-border bg-background"
            : "border-dashed border-border bg-muted/30")
      }
      aria-current={isCurrent ? "true" : undefined}
    >
      <p
        className={
          "text-[10px] uppercase tracking-wide " +
          (isCurrent ? "text-primary" : "text-muted-foreground")
        }
      >
        {band.tier}
      </p>
      <p
        className={
          "mt-0.5 text-xs font-semibold tabular-nums " +
          (isReached ? "text-foreground" : "text-muted-foreground")
        }
      >
        {formatGbpK(band.londonMin)}
      </p>
    </li>
  );
}

interface BreakdownCardProps {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  label: string;
  value: string;
  hint: string;
}

function BreakdownCard({ icon: Icon, label, value, hint }: BreakdownCardProps) {
  return (
    <div className="rounded-xl border border-border bg-background p-4">
      <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wide text-muted-foreground">
        <Icon className="h-3.5 w-3.5" aria-hidden={true} />
        {label}
      </div>
      <p className="mt-1 text-base font-semibold tabular-nums">{value}</p>
      <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
        {hint}
      </p>
    </div>
  );
}

// Used to satisfy TypeScript when the estimate type appears in the props
// elsewhere; keeping the re-export keeps imports tidy.
export type { SalaryEstimate };
