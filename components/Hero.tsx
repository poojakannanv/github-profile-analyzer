import { AnalyzeSection } from "@/components/AnalyzeSection";

/**
 * Landing hero — headline, tagline, and the analyse experience.
 * The trust strip and results live inside AnalyzeSection so they can swap
 * with state (no awkward strip sitting below the report cards).
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Decorative gradient blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute left-1/2 top-[-10%] h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl animate-blob" />
        <div className="absolute left-[10%] top-[20%] h-[300px] w-[300px] rounded-full bg-purple-500/15 blur-3xl animate-blob [animation-delay:2s]" />
        <div className="absolute right-[10%] top-[10%] h-[300px] w-[300px] rounded-full bg-emerald-400/15 blur-3xl animate-blob [animation-delay:4s]" />
      </div>

      <div className="container flex flex-col items-center justify-center py-12 sm:py-20 lg:py-28">
        <div className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-1.5 text-center text-[11px] font-medium text-muted-foreground shadow-sm backdrop-blur sm:px-4 sm:text-xs">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          UK Edition · Built for Full-Stack &amp; Graduate roles
        </div>

        <h1 className="text-fluid-hero max-w-3xl text-balance text-center font-bold">
          GitHub Profile{" "}
          <span className="bg-gradient-to-r from-primary via-purple-600 to-pink-500 bg-clip-text text-transparent">
            Analyzer
          </span>
        </h1>

        <p className="text-fluid-lead mt-5 max-w-2xl text-pretty text-center text-muted-foreground sm:mt-6">
          Paste any GitHub username and get a UK-tailored hiring report —
          strengths, skill gaps, market-match score, and the next projects to
          build.
        </p>

        {/* Full width on purpose: AnalyzeSection keeps the search form narrow
            but lets the report expand to fill a desktop monitor. */}
        <div className="mt-8 w-full sm:mt-10">
          <AnalyzeSection />
        </div>
      </div>
    </section>
  );
}
