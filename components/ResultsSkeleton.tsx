import { Skeleton } from "@/components/ui/skeleton";

/**
 * Day 14 — loading state placeholders.
 *
 * Mirrors the eventual ProfileCard / AiSummary / LanguageBreakdown /
 * TopReposList layout so the page doesn't reflow when real data arrives.
 * Composed of four section skeletons inside one wrapper so AnalyzeSection
 * can swap it in with a single component.
 */
export function ResultsSkeleton() {
  return (
    <div aria-busy="true" aria-live="polite">
      <ProfileCardSkeleton />
      <AiSummarySkeleton />
      <LanguageBreakdownSkeleton />
      <TopReposListSkeleton />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Profile card                                                                */
/* -------------------------------------------------------------------------- */

function ProfileCardSkeleton() {
  return (
    <article className="mt-8 overflow-hidden rounded-2xl border border-border bg-card text-left shadow-sm">
      <div className="p-6 sm:p-8">
        {/* Header: avatar + identity */}
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

        {/* Bio */}
        <div className="mt-5 space-y-2">
          <Skeleton className="h-3.5 w-full max-w-xl" />
          <Skeleton className="h-3.5 w-3/4 max-w-md" />
        </div>

        {/* Meta row */}
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-32" />
          <Skeleton className="h-3 w-28" />
        </div>

        {/* Stats grid */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-border bg-background p-4"
            >
              <Skeleton className="h-3 w-20" />
              <Skeleton className="mt-2 h-6 w-12" />
            </div>
          ))}
        </div>

        {/* Top languages pills */}
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
/* AI summary                                                                  */
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
/* Language breakdown                                                          */
/* -------------------------------------------------------------------------- */

function LanguageBreakdownSkeleton() {
  return (
    <section className="mt-6 rounded-xl border border-border bg-card p-6">
      <header className="mb-6 flex items-baseline justify-between">
        <Skeleton className="h-4 w-44" />
        <Skeleton className="h-3 w-40" />
      </header>

      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:gap-8">
        {/* Donut placeholder */}
        <div
          className="relative shrink-0"
          style={{ width: 220, height: 220 }}
        >
          <Skeleton className="h-full w-full rounded-full" />
          {/* Inner hole to suggest the donut shape */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 h-[62%] w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-card"
          />
        </div>

        {/* Legend */}
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
/* Top repos                                                                   */
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
          <li
            key={i}
            className="flex flex-col gap-3 rounded-xl border border-border bg-card p-5"
          >
            {/* Name + ext link */}
            <div className="flex items-start justify-between gap-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3.5 w-3.5 rounded" />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-4/5" />
            </div>

            {/* Topic chips */}
            <div className="flex flex-wrap gap-1.5">
              <Skeleton className="h-5 w-14 rounded-full" />
              <Skeleton className="h-5 w-20 rounded-full" />
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>

            {/* Footer meta */}
            <div className="mt-auto flex items-center gap-4">
              <div className="inline-flex items-center gap-1.5">
                <Skeleton className="h-2 w-2 rounded-full" />
                <Skeleton className="h-3 w-16" />
              </div>
              <Skeleton className="h-3 w-10" />
              <Skeleton className="h-3 w-10" />
              <Skeleton className="ml-auto h-3 w-20" />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
