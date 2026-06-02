import { Skeleton } from "@/components/ui/skeleton";

/**
 * Day 14 — loading state placeholders.
 *
 * Mirrors the eventual ProfileCard / AiSummary / LanguageBreakdown /
 * SkillGap / SalaryBand / VisaSponsorMatch / GradSchemeMatcher /
 * TopReposList layout so the page doesn't reflow when real data arrives.
 */
export function ResultsSkeleton() {
  return (
    <div aria-busy="true" aria-live="polite">
      <ProfileCardSkeleton />
      <AiSummarySkeleton />
      <LanguageBreakdownSkeleton />
      <SkillGapSkeleton />
      <SalaryBandSkeleton />
      <VisaSponsorMatchSkeleton />
      <GradSchemeMatcherSkeleton />
      <TopReposListSkeleton />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
function ProfileCardSkeleton() {
  return (
    <article className="mt-8 overflow-hidden rounded-2xl border border-border bg-card text-left shadow-sm">
      <div className="p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Skeleton className="h-20 w-20 rounded-2xl" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-44" />
              <Skeleton className="h-3.5 w-28" />
            </div>
          </div>
          <Skeleton className="h-6 w-32 rounded-full" />
        </div>
        <div className="mt-5 space-y-2">
          <Skeleton className="h-3.5 w-full max-w-xl" />
          <Skeleton className="h-3.5 w-3/4 max-w-md" />
        </div>
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-32" />
          <Skeleton className="h-3 w-28" />
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-border bg-background p-4">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="mt-2 h-6 w-12" />
            </div>
          ))}
        </div>
        <div className="mt-6">
          <Skeleton className="h-3 w-32" />
          <div className="mt-2 flex flex-wrap gap-2">
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-28 rounded-full" />
          </div>
        </div>
      </div>
    </article>
  );
}

/* -------------------------------------------------------------------------- */
function AiSummarySkeleton() {
  return (
    <section className="mt-8 overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/5 via-card to-card shadow-sm">
      <header className="flex items-center justify-between border-b border-border/60 px-6 py-3">
        <div className="inline-flex items-center gap-2">
          <Skeleton className="h-6 w-6 rounded-md" />
          <Skeleton className="h-4 w-36" />
        </div>
        <Skeleton className="h-3 w-28" />
      </header>
      <div className="space-y-5 px-6 py-5">
        {Array.from({ length: 3 }).map((_, section) => (
          <div key={section} className="space-y-2">
            <div className="flex items-center gap-2">
              <Skeleton className="h-1 w-3 rounded-full" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-11/12" />
            <Skeleton className="h-3 w-4/5" />
          </div>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
function LanguageBreakdownSkeleton() {
  return (
    <section className="mt-6 rounded-xl border border-border bg-card p-6">
      <header className="mb-6 flex items-baseline justify-between">
        <Skeleton className="h-4 w-44" />
        <Skeleton className="h-3 w-40" />
      </header>
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:gap-8">
        <div className="relative shrink-0" style={{ width: 220, height: 220 }}>
          <Skeleton className="h-full w-full rounded-full" />
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 h-[62%] w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-card"
          />
        </div>
        <ul className="grid w-full flex-1 grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <li key={i} className="flex items-center justify-between gap-3">
              <span className="inline-flex min-w-0 items-center gap-2">
                <Skeleton className="h-2.5 w-2.5 rounded-full" />
                <Skeleton className="h-3 w-24" />
              </span>
              <Skeleton className="h-3 w-10" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
function SkillGapSkeleton() {
  return (
    <section className="mt-6 rounded-xl border border-border bg-card p-6">
      <header className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-6 rounded-md" />
          <div className="space-y-1.5">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-56" />
          </div>
        </div>
        <div className="w-full sm:w-64">
          <div className="flex justify-between">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-8" />
          </div>
          <Skeleton className="mt-1.5 h-2 w-full rounded-full" />
        </div>
      </header>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <li key={i} className="rounded-xl border border-border bg-background p-4">
            <header className="mb-3 flex items-center justify-between">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-10 rounded-full" />
            </header>
            <ul className="space-y-1.5">
              {Array.from({ length: 5 }).map((__, j) => (
                <li key={j} className="flex items-start gap-2 px-2 py-1.5">
                  <Skeleton className="mt-0.5 h-4 w-4 rounded-full" />
                  <div className="flex-1 space-y-1">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-2.5 w-full" />
                  </div>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
function SalaryBandSkeleton() {
  return (
    <section className="mt-6 overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/5 via-card to-card shadow-sm">
      <header className="flex items-center justify-between border-b border-border/60 px-6 py-3">
        <div className="inline-flex items-center gap-2">
          <Skeleton className="h-6 w-6 rounded-md" />
          <Skeleton className="h-4 w-44" />
        </div>
        <Skeleton className="h-3 w-32" />
      </header>
      <div className="px-6 py-5">
        {/* Hero band */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <Skeleton className="h-2.5 w-20" />
            <Skeleton className="h-7 w-48" />
            <Skeleton className="h-3.5 w-40" />
          </div>
          <Skeleton className="h-6 w-32 rounded-full" />
        </div>
        {/* Ladder */}
        <ol className="mt-6 grid grid-cols-5 gap-1.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <li
              key={i}
              className="rounded-lg border border-border bg-background px-2 py-2"
            >
              <Skeleton className="h-2.5 w-12" />
              <Skeleton className="mt-1 h-3 w-10" />
            </li>
          ))}
        </ol>
        {/* Breakdown */}
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-border bg-background p-4">
              <Skeleton className="h-2.5 w-20" />
              <Skeleton className="mt-2 h-4 w-28" />
              <Skeleton className="mt-2 h-2.5 w-full" />
            </div>
          ))}
        </div>
        {/* Signal grid */}
        <dl className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-lg border border-border bg-background px-3 py-2">
              <Skeleton className="h-2.5 w-16" />
              <Skeleton className="mt-1 h-3.5 w-12" />
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
function VisaSponsorMatchSkeleton() {
  return (
    <section className="mt-6 rounded-xl border border-border bg-card p-6">
      <header className="mb-5 flex items-center justify-between">
        <div className="inline-flex items-center gap-2">
          <Skeleton className="h-6 w-6 rounded-md" />
          <Skeleton className="h-4 w-44" />
        </div>
        <Skeleton className="h-3 w-56" />
      </header>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <li key={i} className="flex flex-col gap-3 rounded-xl border border-border bg-background p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-16" />
              </div>
              <Skeleton className="h-4 w-14 rounded-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-4/5" />
            </div>
            <div className="flex flex-wrap gap-1.5">
              <Skeleton className="h-5 w-14 rounded-full" />
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-5 w-12 rounded-full" />
            </div>
            <div className="mt-1">
              <div className="flex justify-between">
                <Skeleton className="h-2.5 w-20" />
                <Skeleton className="h-2.5 w-8" />
              </div>
              <Skeleton className="mt-1 h-1.5 w-full rounded-full" />
            </div>
            <Skeleton className="mt-auto h-3 w-16" />
          </li>
        ))}
      </ul>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
function GradSchemeMatcherSkeleton() {
  return (
    <section className="mt-6 rounded-xl border border-border bg-card p-6">
      <header className="mb-5 flex items-center justify-between">
        <div className="inline-flex items-center gap-2">
          <Skeleton className="h-6 w-6 rounded-md" />
          <Skeleton className="h-4 w-44" />
        </div>
        <Skeleton className="h-3 w-56" />
      </header>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <li key={i} className="flex flex-col gap-3 rounded-xl border border-border bg-background p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-3 w-36" />
              </div>
              <Skeleton className="h-4 w-14 rounded-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-4/5" />
            </div>
            <div className="flex items-center justify-between rounded-md border border-border bg-muted/30 px-2.5 py-1.5">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-3 w-16" />
            </div>
            <div className="flex flex-wrap gap-1.5">
              <Skeleton className="h-5 w-14 rounded-full" />
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-5 w-12 rounded-full" />
            </div>
            <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-3 w-20" />
              <Skeleton className="ml-auto h-3 w-10" />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
function TopReposListSkeleton() {
  return (
    <section className="mt-6">
      <header className="mb-4 flex items-baseline justify-between">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-28" />
      </header>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <li key={i} className="flex flex-col gap-3 rounded-xl border border-border bg-card p-5">
            <div className="flex items-start justify-between gap-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3.5 w-3.5 rounded" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-4/5" />
            </div>
            <div className="flex flex-wrap gap-1.5">
              <Skeleton className="h-5 w-14 rounded-full" />
              <Skeleton className="h-5 w-20 rounded-full" />
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>
            <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1">
              <div className="inline-flex items-center gap-1.5">
                <Skeleton className="h-2 w-2 rounded-full" />
                <Skeleton className="h-3 w-16" />
              </div>
              <Skeleton className="h-3 w-10" />
              <Skeleton className="h-3 w-10" />
              <Skeleton className="ml-auto h-3 w-10" />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
