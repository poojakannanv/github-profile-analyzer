import { Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <section className="container flex flex-col items-center justify-center px-6 py-20 text-center">
      <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground shadow-sm">
        <span className="h-2 w-2 rounded-full bg-emerald-500" />
        UK Edition · Built for Full-Stack &amp; Graduate roles
      </div>

      <h1 className="max-w-3xl text-balance text-5xl font-bold tracking-tight sm:text-6xl">
        GitHub Profile{" "}
        <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          Analyzer
        </span>
      </h1>

      <p className="mt-6 max-w-2xl text-pretty text-lg text-muted-foreground">
        Paste any GitHub username and get a UK-tailored hiring report — strengths,
        skill gaps, market-match score, and the next projects to build.
      </p>

      {/* TODO Day 4: Replace with the real <SearchForm /> client component */}
      <div className="mt-10 w-full max-w-xl">
        <div className="flex items-center gap-2 rounded-2xl border border-border bg-card p-2 shadow-sm">
          <Search
            className="ml-3 h-4 w-4 shrink-0 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            type="text"
            placeholder="e.g. poojakannanv"
            className="flex-1 bg-transparent px-2 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            disabled
            aria-label="GitHub username"
          />
          <Button size="default" disabled>
            <Sparkles className="h-4 w-4" />
            Analyse
          </Button>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Wiring up to the GitHub API on Day 4.
        </p>
      </div>

      <div
        id="how-it-works"
        className="mt-24 grid w-full max-w-4xl gap-6 text-left sm:grid-cols-3"
      >
        <FeatureCard
          step="01"
          title="Fetch"
          body="We pull your public profile, repos and language stats via the GitHub API."
        />
        <FeatureCard
          step="02"
          title="Analyse"
          body="An LLM compares your profile against current UK Full-Stack and Graduate role expectations."
        />
        <FeatureCard
          step="03"
          title="Improve"
          body="Get a match score, skill-gap list and concrete next-project suggestions."
        />
      </div>
    </section>
  );
}

function FeatureCard({
  step,
  title,
  body,
}: {
  step: string;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="font-mono text-xs text-primary">{step}</div>
      <h3 className="mt-2 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{body}</p>
    </div>
  );
}
