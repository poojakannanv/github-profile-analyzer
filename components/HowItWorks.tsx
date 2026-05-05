import { Github, BrainCircuit, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const steps: {
  step: string;
  icon: LucideIcon;
  title: string;
  body: string;
}[] = [
  {
    step: "01",
    icon: Github,
    title: "Fetch",
    body: "We pull your public profile, repos and language stats via the GitHub API.",
  },
  {
    step: "02",
    icon: BrainCircuit,
    title: "Analyse",
    body: "An LLM compares your profile against current UK Full-Stack and Graduate role expectations.",
  },
  {
    step: "03",
    icon: TrendingUp,
    title: "Improve",
    body: "Get a match score, skill-gap list and concrete next-project suggestions.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="container px-6 py-16 sm:py-24"
      aria-labelledby="how-it-works-heading"
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2
          id="how-it-works-heading"
          className="text-3xl font-bold tracking-tight sm:text-4xl"
        >
          How it works
        </h2>
        <p className="mt-3 text-muted-foreground">
          Three steps, under thirty seconds — from username to actionable
          report.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-3">
        {steps.map(({ step, icon: Icon, title, body }) => (
          <article
            key={step}
            className="group rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/40 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="font-mono text-xs text-muted-foreground">
                {step}
              </span>
            </div>
            <h3 className="mt-4 text-lg font-semibold">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
