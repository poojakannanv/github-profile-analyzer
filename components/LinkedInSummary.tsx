"use client";

import { useMemo, useState } from "react";
import { Linkedin, Copy, Check, Info } from "lucide-react";
import type { GithubProfile, GithubRepo, LanguageBreakdown as LanguageBreakdownType } from "@/types/github";
import { scoreIndustries } from "@/lib/uk-industries";
import { matchSkills } from "@/lib/uk-skills";
import { estimateSalary } from "@/lib/uk-salary";
import { buildLinkedInSummary } from "@/lib/linkedin-summary";

interface LinkedInSummaryProps {
  profile: GithubProfile;
  topRepos: GithubRepo[];
  languages: LanguageBreakdownType[];
}

/**
 * Day 20 — UK-tailored LinkedIn summary.
 *
 * Built entirely client-side from the page's existing data — no AI call,
 * no latency, no extra failure modes. The user gets a polished headline
 * and About paragraph they can copy straight into their LinkedIn profile.
 */
export function LinkedInSummary({ profile, topRepos, languages }: LinkedInSummaryProps) {
  // Recompute the dependent insights so this section can stand alone.
  const summary = useMemo(() => {
    const topLanguages = languages.map((l) => l.language);
    return buildLinkedInSummary({
      profile,
      topRepos,
      topLanguages,
      industry: scoreIndustries(topRepos),
      skills: matchSkills(topLanguages, topRepos.flatMap((r) => r.topics)),
      salary: estimateSalary(profile, topRepos),
    });
  }, [profile, topRepos, languages]);

  if (summary.empty) {
    return (
      <section className="mt-6 rounded-xl border border-dashed border-border bg-muted/30 p-6 text-center">
        <Linkedin className="mx-auto h-6 w-6 text-muted-foreground" aria-hidden="true" />
        <p className="mt-2 text-sm font-semibold text-foreground">
          Not enough profile data
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Add a few public repos to unlock the LinkedIn summary generator.
        </p>
      </section>
    );
  }

  return (
    <section
      className="mt-6 overflow-hidden rounded-2xl border border-[#0a66c2]/30 bg-gradient-to-br from-[#0a66c2]/5 via-card to-card shadow-sm"
      aria-labelledby="linkedin-summary-heading"
    >
      <header className="flex flex-col gap-1 border-b border-border/60 px-6 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="inline-flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#0a66c2] text-white">
            <Linkedin className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
          <h3 id="linkedin-summary-heading" className="text-sm font-semibold">
            LinkedIn summary
          </h3>
        </div>
        <span className="text-xs text-muted-foreground">
          Drop straight into your LinkedIn profile — edit as you like
        </span>
      </header>

      <div className="space-y-5 px-6 py-5">
        <Field
          label="Headline"
          helper="LinkedIn caps this at 220 characters"
          value={summary.headline}
          max={summary.headlineMax}
          length={summary.headlineLength}
          rows={2}
        />

        <Field
          label="About"
          helper="Up to 2,600 characters — keeps line breaks when pasted"
          value={summary.about}
          max={summary.aboutMax}
          length={summary.aboutLength}
          rows={12}
        />

        <div className="flex items-start gap-2 rounded-md border border-border bg-muted/30 px-3 py-2 text-[11px] leading-relaxed text-muted-foreground">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <p>
            Suggested only — tailor the tone before posting. Recruiters in
            the UK respond best to specifics (named projects, scope, the
            stack you actually shipped) rather than buzzwords.
          </p>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

interface FieldProps {
  label: string;
  helper: string;
  value: string;
  max: number;
  length: number;
  rows: number;
}

function Field({ label, helper, value, max, length, rows }: FieldProps) {
  // `value` from upstream is the freshly generated summary. We seed local
  // state once and let the user edit freely — re-running the analysis
  // remounts the parent and gives us a new key, so we don't need a manual
  // prop sync here.
  const [editable, setEditable] = useState(value);
  const [copied, setCopied] = useState(false);
  const remaining = max - editable.length;
  const overLimit = remaining < 0;

  async function copy() {
    try {
      await navigator.clipboard.writeText(editable);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // No permission — leave the icon as-is
    }
  }

  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-foreground">{label}</p>
          <p className="text-[11px] text-muted-foreground">{helper}</p>
        </div>
        <span
          className={
            "font-mono text-[11px] tabular-nums " +
            (overLimit
              ? "text-destructive"
              : remaining < 40
                ? "text-amber-600 dark:text-amber-400"
                : "text-muted-foreground")
          }
        >
          {editable.length} / {max}
        </span>
      </div>

      <div className="relative">
        <textarea
          value={editable}
          onChange={(e) => setEditable(e.target.value)}
          rows={rows}
          spellCheck
          className={
            "w-full resize-y rounded-lg border bg-background px-3 py-2 pr-12 text-sm leading-relaxed text-foreground shadow-sm outline-none transition-colors focus:border-primary " +
            (overLimit ? "border-destructive/60" : "border-border")
          }
          aria-label={label}
        />
        <button
          type="button"
          onClick={copy}
          className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-md border border-border bg-background px-2 py-1 text-[11px] font-medium text-muted-foreground shadow-sm transition-colors hover:border-primary hover:text-primary"
          aria-label={`Copy ${label}`}
        >
          {copied ? (
            <>
              <Check className="h-3 w-3" aria-hidden="true" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" aria-hidden="true" />
              Copy
            </>
          )}
        </button>
      </div>

      <span className="sr-only">
        Generated length {length} characters.
      </span>
    </div>
  );
}
