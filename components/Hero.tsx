import { AnalyzeSection } from "@/components/AnalyzeSection";

/**
 * Landing hero — headline, tagline, search form and a trust strip.
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

      <div className="container flex flex-col items-center justify-center px-6 py-20 text-center sm:py-28">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-1.5 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          UK Edition · Built for Full-Stack &amp; Graduate roles
        </div>

        <h1 className="max-w-3xl text-balance text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
          GitHub Profile{" "}
          <span className="bg-gradient-to-r from-primary via-purple-600 to-pink-500 bg-clip-text text-transparent">
            Analyzer
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
          Paste any GitHub username and get a UK-tailored hiring report —
          strengths, skill gaps, market-match score, and the next projects to
          build.
        </p>

        <div className="mt-10 w-full max-w-xl">
          <AnalyzeSection />
        </div>

        {/* Trust strip — small but adds credibility */}
        <TrustStrip />
      </div>
    </section>
  );
}

function TrustStrip() {
  const stats = [
    { value: "100%", label: "Open source" },
    { value: "UK", label: "Market-tuned" },
    { value: "AI", label: "Powered analysis" },
    { value: "Free", label: "To use" },
  ];

  return (
    <div className="mt-14 grid w-full max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-lg border border-border/60 bg-card/40 px-4 py-3 backdrop-blur-sm"
        >
          <div className="text-xl font-semibold text-foreground">
            {stat.value}
          </div>
          <div className="mt-0.5 text-xs uppercase tracking-wide text-muted-foreground">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
