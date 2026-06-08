/**
 * Day 20 — LinkedIn summary generator.
 *
 * Pure, deterministic builder for a LinkedIn headline + About paragraph,
 * assembled from data the page already has. No AI call needed — keeps the
 * feature instant, free, and predictable. The user can edit before posting.
 *
 * UK voice: confident-but-warm, British spelling, avoids US-style
 * superlatives ("rockstar", "ninja"). Lengths are clamped against
 * LinkedIn's real limits.
 */

import type { GithubProfile, GithubRepo } from "@/types/github";
import type { IndustrySpecialismResult } from "@/lib/uk-industries";
import type { SkillMatchResult } from "@/lib/uk-skills";
import type { SalaryEstimate } from "@/lib/uk-salary";

export const LINKEDIN_HEADLINE_MAX = 220;
export const LINKEDIN_ABOUT_MAX = 2600;

export interface LinkedInSummaryInput {
  profile: GithubProfile;
  topRepos: GithubRepo[];
  topLanguages: string[];
  industry: IndustrySpecialismResult;
  skills: SkillMatchResult;
  salary: SalaryEstimate;
}

export interface LinkedInSummary {
  headline: string;
  about: string;
  headlineLength: number;
  aboutLength: number;
  headlineMax: number;
  aboutMax: number;
  /** True when the user supplied no signals — render the empty state instead. */
  empty: boolean;
}

/* -------------------------------------------------------------------------- */
/* Builder                                                                     */
/* -------------------------------------------------------------------------- */

export function buildLinkedInSummary(
  input: LinkedInSummaryInput,
): LinkedInSummary {
  const empty =
    input.topRepos.length === 0 && input.topLanguages.length === 0;
  if (empty) {
    return {
      headline: "",
      about: "",
      headlineLength: 0,
      aboutLength: 0,
      headlineMax: LINKEDIN_HEADLINE_MAX,
      aboutMax: LINKEDIN_ABOUT_MAX,
      empty: true,
    };
  }

  const headline = clip(buildHeadline(input), LINKEDIN_HEADLINE_MAX);
  const about = clip(buildAbout(input), LINKEDIN_ABOUT_MAX);

  return {
    headline,
    about,
    headlineLength: headline.length,
    aboutLength: about.length,
    headlineMax: LINKEDIN_HEADLINE_MAX,
    aboutMax: LINKEDIN_ABOUT_MAX,
    empty: false,
  };
}

/* -------------------------------------------------------------------------- */
/* Headline                                                                    */
/* -------------------------------------------------------------------------- */

function buildHeadline(input: LinkedInSummaryInput): string {
  const tierAdj = tierAdjective(input.salary.tier.tier);
  const industry = industryLabel(input.industry);
  const langs = input.topLanguages.slice(0, 3).join(" · ");
  const location = ukLocationOrFallback(input.profile.location);
  const visaCue = needsVisaCue(input.profile.location) ? " · Open to sponsorship" : "";

  const parts = [
    `${tierAdj} ${industry} engineer`,
    langs && langs,
    `${location}${visaCue}`,
  ].filter(Boolean);

  return parts.join(" · ");
}

/* -------------------------------------------------------------------------- */
/* About                                                                       */
/* -------------------------------------------------------------------------- */

function buildAbout(input: LinkedInSummaryInput): string {
  const name = input.profile.name || `@${input.profile.login}`;
  const tier = input.salary.tier.tier.toLowerCase();
  const industry = industryLabel(input.industry).toLowerCase();
  const years = formatYears(input.profile.createdAt);
  const totalStars = input.topRepos.reduce((sum, r) => sum + r.stars, 0);
  const langs = listEn(input.topLanguages.slice(0, 3));
  const haveSkills = input.skills.categories
    .flatMap((c) => c.skills)
    .filter((s) => s.have)
    .slice(0, 5)
    .map((s) => s.name);
  const recentRepos = input.topRepos
    .filter((r) => r.description && r.description.length > 10)
    .slice(0, 3);

  // Paragraph 1 — positioning
  const opener = openerLine({
    name,
    tier,
    industry,
    years,
    langs,
    location: ukLocationOrFallback(input.profile.location),
  });

  // Paragraph 2 — what I build
  const buildLine = buildSpecialismLine(input.industry, totalStars);

  // Paragraph 3 — recent work (bulleted)
  const recentLine = recentRepos.length > 0
    ? "Recent open-source work:\n" +
      recentRepos
        .map((r) => `• ${r.name} (${formatStars(r.stars)}★) — ${oneLine(r.description!)}`)
        .join("\n")
    : "";

  // Paragraph 4 — skills + growing
  const skillsLine =
    haveSkills.length > 0
      ? `Strongest skills: ${listEn(haveSkills)}.`
      : "";

  // Paragraph 5 — call to action
  const ctaLine = buildCallToAction(input);

  return [opener, buildLine, recentLine, skillsLine, ctaLine]
    .filter(Boolean)
    .join("\n\n");
}

function openerLine(parts: {
  name: string;
  tier: string;
  industry: string;
  years: string;
  langs: string;
  location: string;
}): string {
  // Avoid "Graduate engineer" sounding like a degree title — soften it.
  const tierWord =
    parts.tier === "graduate" ? "early-careers" : parts.tier;
  return `${parts.name} — ${tierWord} ${parts.industry} engineer based in ${parts.location}. I've been shipping on GitHub for ${parts.years}${parts.langs ? `, mostly in ${parts.langs}` : ""}.`;
}

function buildSpecialismLine(
  industry: IndustrySpecialismResult,
  totalStars: number,
): string {
  if (!industry.primary) {
    return totalStars > 0
      ? `My open-source work has earned ${formatStars(totalStars)} stars across a mix of projects.`
      : "I focus on shipping clean, well-tested code on small, fast-moving teams.";
  }
  const blurb = industry.primary.blurb.replace(/\.$/, "");
  const secondary = industry.secondary
    ? ` I also lean into ${industry.secondary.name.toLowerCase()} when the work calls for it.`
    : "";
  const stars =
    totalStars > 0
      ? ` My open-source work has gathered ${formatStars(totalStars)} stars to date.`
      : "";
  return `Day to day I work on ${blurb}.${secondary}${stars}`.trim();
}

function buildCallToAction(input: LinkedInSummaryInput): string {
  const tier = input.salary.tier.tier;
  const wantVisa = needsVisaCue(input.profile.location);
  const isGrad = tier === "Graduate" || tier === "Junior";

  const want = isGrad
    ? "graduate or junior engineering roles in the UK"
    : `${tier.toLowerCase()}+ engineering roles in London or remote-UK`;

  const visaLine = wantVisa
    ? " Open to Skilled Worker sponsorship from companies on the UK register."
    : "";

  return `Currently open to ${want}.${visaLine} If you're hiring, drop me a message — happy to chat.`;
}

/* -------------------------------------------------------------------------- */
/* Helpers                                                                     */
/* -------------------------------------------------------------------------- */

function tierAdjective(tier: SalaryEstimate["tier"]["tier"]): string {
  switch (tier) {
    case "Graduate":
      return "Early-careers";
    case "Junior":
      return "Junior";
    case "Mid":
      return "Mid-level";
    case "Senior":
      return "Senior";
    case "Staff":
      return "Staff-level";
  }
}

function industryLabel(industry: IndustrySpecialismResult): string {
  return industry.primary?.name ?? "Full-stack";
}

function ukLocationOrFallback(location: string | null): string {
  if (!location) return "the UK";
  const trimmed = location.trim();
  if (!trimmed) return "the UK";
  if (/uk|united kingdom|england|scotland|wales|northern ireland|london|manchester|edinburgh|bristol|leeds|cambridge|oxford|glasgow|birmingham|sheffield/i.test(trimmed)) {
    return trimmed;
  }
  // Non-UK location — still surface "Open to UK" framing
  return `${trimmed} · Open to UK roles`;
}

function needsVisaCue(location: string | null): boolean {
  if (!location) return false;
  return !/uk|united kingdom|england|scotland|wales|northern ireland|london|manchester|edinburgh|bristol|leeds|cambridge|oxford|glasgow|birmingham|sheffield/i.test(location);
}

function formatYears(createdAt: string): string {
  const ms = Date.now() - new Date(createdAt).getTime();
  const years = ms / (365.25 * 24 * 60 * 60 * 1000);
  if (years < 1) return "under a year";
  const rounded = Math.round(years);
  return `${rounded} year${rounded === 1 ? "" : "s"}`;
}

function formatStars(n: number): string {
  if (n < 1000) return n.toLocaleString("en-GB");
  if (n < 1_000_000) {
    const k = n / 1000;
    return k >= 10 ? `${Math.round(k)}k` : `${k.toFixed(1)}k`;
  }
  return `${(n / 1_000_000).toFixed(1)}M`;
}

/** "a, b and c" — Oxford-free, UK-style list joiner. */
function listEn(items: string[]): string {
  const cleaned = items.filter(Boolean);
  if (cleaned.length === 0) return "";
  if (cleaned.length === 1) return cleaned[0];
  if (cleaned.length === 2) return `${cleaned[0]} and ${cleaned[1]}`;
  return `${cleaned.slice(0, -1).join(", ")}, and ${cleaned[cleaned.length - 1]}`;
}

/** Collapse multi-line descriptions and trim trailing punctuation. */
function oneLine(text: string): string {
  return text.replace(/\s+/g, " ").trim().replace(/[.!?]+$/, "");
}

function clip(text: string, max: number): string {
  if (text.length <= max) return text;
  return text.slice(0, Math.max(0, max - 1)).trimEnd() + "…";
}
