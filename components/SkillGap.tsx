import {
  Target,
  Check,
  Code2,
  Server,
  Cloud,
  Brain,
  Smartphone,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { GithubRepo, LanguageBreakdown as LanguageBreakdownType } from "@/types/github";
import { matchSkills, type SkillCategory } from "@/lib/uk-skills";

interface SkillGapProps {
  /** Language breakdown for the analysed user. */
  languages: LanguageBreakdownType[];
  /** Top repos — used for their `topics` field to broaden the signal. */
  topRepos: GithubRepo[];
}

/**
 * Day 16 — UK Skill Gap detector.
 *
 * Pulls signals from the user's repo languages plus repo topics and matches
 * them against a curated UK skill demand matrix. Shows an overall coverage
 * score and a per-category breakdown so the user can see at a glance which
 * skills they already have and which are missing.
 */
export function SkillGap({ languages, topRepos }: SkillGapProps) {
  const userLanguages = languages.map((l) => l.language);
  const userTopics = topRepos.flatMap((r) => r.topics);
  const result = matchSkills(userLanguages, userTopics);

  return (
    <section
      className="mt-6 rounded-xl border border-border bg-card p-6"
      aria-labelledby="skill-gap-heading"
    >
      <header className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10 text-primary">
            <Target className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
          <div>
            <h3 id="skill-gap-heading" className="text-base font-semibold">
              Skill gap
            </h3>
            <p className="text-xs text-muted-foreground">
              Your stack vs. UK Full-Stack &amp; Junior Engineer demand
            </p>
          </div>
        </div>

        {/* Overall score */}
        <div className="w-full sm:w-64">
          <div className="flex items-baseline justify-between text-xs">
            <span className="font-medium text-foreground">
              {result.totalHave} of {result.total} skills
            </span>
            <span className="font-mono text-muted-foreground">
              {result.percent}%
            </span>
          </div>
          <div
            className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-muted"
            role="progressbar"
            aria-valuenow={result.percent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Skill coverage"
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary via-purple-500 to-pink-500"
              style={{ width: `${result.percent}%` }}
            />
          </div>
        </div>
      </header>

      <ul
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        aria-label="Skill breakdown by category"
      >
        {result.categories.map((cat) => {
          const Icon = categoryIcon(cat.category);
          return (
            <li
              key={cat.category}
              className="rounded-xl border border-border bg-background p-4"
            >
              <header className="mb-3 flex items-center justify-between">
                <h4 className="inline-flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Icon
                    className="h-3.5 w-3.5 text-muted-foreground"
                    aria-hidden="true"
                  />
                  {cat.category}
                </h4>
                <span className="rounded-full bg-muted px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                  {cat.haveCount}/{cat.totalCount}
                </span>
              </header>

              <ul className="space-y-1.5">
                {cat.skills.map((skill) => (
                  <li
                    key={skill.name}
                    className={
                      "flex items-start gap-2 rounded-md px-2 py-1.5 text-xs " +
                      (skill.have
                        ? "bg-primary/5 text-foreground"
                        : "text-muted-foreground")
                    }
                  >
                    <span
                      aria-hidden="true"
                      className={
                        "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full " +
                        (skill.have
                          ? "bg-primary text-primary-foreground"
                          : "border border-dashed border-border")
                      }
                    >
                      {skill.have && <Check className="h-2.5 w-2.5" />}
                    </span>

                    <span className="min-w-0 flex-1">
                      <span
                        className={
                          "block font-medium " +
                          (skill.have ? "text-foreground" : "")
                        }
                      >
                        {skill.name}
                        {skill.demand === "high" && (
                          <span
                            className="ml-1.5 align-middle rounded-sm bg-amber-500/15 px-1 py-0 text-[9px] font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-400"
                            title="High demand on UK job boards"
                          >
                            Hot
                          </span>
                        )}
                      </span>
                      {!skill.have && (
                        <span className="mt-0.5 block text-[11px] leading-snug text-muted-foreground/80">
                          {skill.hint}
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>

      <p className="mt-5 text-[11px] leading-relaxed text-muted-foreground">
        Signals come from your public repo languages and topics. Adding the
        relevant topic (e.g. <code className="rounded bg-muted px-1 py-0.5 font-mono text-[10px]">docker</code>,{" "}
        <code className="rounded bg-muted px-1 py-0.5 font-mono text-[10px]">aws</code>) to your repos can move
        the bar without changing your code.
      </p>
    </section>
  );
}

/** Pick a Lucide icon per category. */
function categoryIcon(cat: SkillCategory): LucideIcon {
  switch (cat) {
    case "Frontend":
      return Code2;
    case "Backend":
      return Server;
    case "DevOps":
      return Cloud;
    case "Data/AI":
      return Brain;
    case "Mobile":
      return Smartphone;
  }
}
