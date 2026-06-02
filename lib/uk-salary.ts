/**
 * Day 18 — UK Salary Band estimator.
 *
 * Maps a GitHub profile to a likely UK base-salary band (London median) and
 * a Rest-of-UK band, with an optional sector boost when the user's repos
 * signal Fintech, AI, Infra/Dev tools, or Gaming specialism.
 *
 * The numbers come from a blend of public 2025 sources (Otta/Welcome to the
 * Jungle salary data, Levels.fyi UK datapoints, Hired UK State-of-Software-
 * Engineers, and Stack Overflow's UK breakdown). They are reviewed annually
 * and should be treated as directional — actual offers depend heavily on
 * company stage, interview performance, and negotiation.
 */

import type { GithubProfile, GithubRepo } from "@/types/github";

export type SalaryTier = "Graduate" | "Junior" | "Mid" | "Senior" | "Staff";

export interface SalaryBand {
  tier: SalaryTier;
  /** 0–4 ladder position, used for sorting and progress visualisation. */
  ladder: number;
  /** London median, £ per year. */
  londonMin: number;
  londonMax: number;
  /** One-line note for the tier. */
  note: string;
}

/** London median bands (GBP, 2026). Rest of UK applies a -15 % adjustment. */
export const SALARY_BANDS: SalaryBand[] = [
  {
    tier: "Graduate",
    ladder: 0,
    londonMin: 30_000,
    londonMax: 42_000,
    note: "First role out of uni — schemes and junior IC tracks.",
  },
  {
    tier: "Junior",
    ladder: 1,
    londonMin: 42_000,
    londonMax: 58_000,
    note: "1–3 years' shipping — owning small features end-to-end.",
  },
  {
    tier: "Mid",
    ladder: 2,
    londonMin: 58_000,
    londonMax: 85_000,
    note: "3–6 years — leading projects and mentoring juniors.",
  },
  {
    tier: "Senior",
    ladder: 3,
    londonMin: 85_000,
    londonMax: 130_000,
    note: "6–10 years — technical leadership and cross-team scope.",
  },
  {
    tier: "Staff",
    ladder: 4,
    londonMin: 130_000,
    londonMax: 180_000,
    note: "10+ years — multi-team architecture and strategy.",
  },
];

export const REST_OF_UK_ADJUSTMENT = 0.85; // -15 %

export type SectorBoost =
  | { kind: "none" }
  | { kind: "fintech"; uplift: number; label: string }
  | { kind: "ai"; uplift: number; label: string }
  | { kind: "infra"; uplift: number; label: string }
  | { kind: "gaming"; uplift: number; label: string };

/** Topic keywords that map onto a sector boost. */
const SECTOR_KEYWORDS: Record<Exclude<SectorBoost["kind"], "none">, string[]> = {
  fintech: [
    "fintech",
    "banking",
    "payments",
    "trading",
    "stripe",
    "open-banking",
    "blockchain",
    "crypto",
  ],
  ai: [
    "ai",
    "ml",
    "machine-learning",
    "deep-learning",
    "llm",
    "openai",
    "anthropic",
    "langchain",
    "rag",
    "pytorch",
    "tensorflow",
    "huggingface",
    "transformers",
  ],
  infra: [
    "kubernetes",
    "k8s",
    "terraform",
    "devops",
    "sre",
    "observability",
    "platform",
    "infra",
    "istio",
  ],
  gaming: ["game", "gamedev", "unity", "unreal", "godot", "shader"],
};

const SECTOR_UPLIFT: Record<Exclude<SectorBoost["kind"], "none">, number> = {
  fintech: 0.12,
  ai: 0.15,
  infra: 0.10,
  gaming: 0.05,
};

const SECTOR_LABEL: Record<Exclude<SectorBoost["kind"], "none">, string> = {
  fintech: "Fintech specialism",
  ai: "AI / ML specialism",
  infra: "Platform / Infra specialism",
  gaming: "Gaming specialism",
};

/* -------------------------------------------------------------------------- */
/* Estimator                                                                  */
/* -------------------------------------------------------------------------- */

export interface SalarySignal {
  label: string;
  value: string;
}

export interface SalaryEstimate {
  tier: SalaryBand;
  /** GBP — base band for London after sector boost applied. */
  londonMin: number;
  londonMax: number;
  /** GBP — Rest of UK after adjustment + sector boost. */
  restOfUkMin: number;
  restOfUkMax: number;
  /** All five bands so the UI can render the ladder. */
  allBands: SalaryBand[];
  /** Raw score, 0–15. Useful for the progress bar. */
  score: number;
  /** Up to four "why" rows shown under the headline. */
  signals: SalarySignal[];
  /** Detected sector specialism (or `none`). */
  sectorBoost: SectorBoost;
}

/**
 * Build a salary estimate from the GitHub profile, top repos, and the
 * user's location string (if any) for a tiny location nudge.
 *
 * Experience score blends:
 *  - years on GitHub  (× 0.9)
 *  - log10(1 + public repos) × 1.6
 *  - log10(1 + total stars) × 1.4
 *  - log10(1 + followers) × 0.9
 *
 * The log dampening keeps a one-hit-wonder 50k-star repo from catapulting
 * the user to Staff while still rewarding consistent activity.
 */
export function estimateSalary(
  profile: GithubProfile,
  topRepos: GithubRepo[],
  now: Date = new Date(),
): SalaryEstimate {
  const years = yearsBetween(new Date(profile.createdAt), now);
  const totalStars = topRepos.reduce((sum, r) => sum + r.stars, 0);

  const score =
    years * 0.9 +
    Math.log10(1 + profile.publicRepos) * 1.6 +
    Math.log10(1 + totalStars) * 1.4 +
    Math.log10(1 + profile.followers) * 0.9;

  const tier = pickTier(score);
  const sectorBoost = detectSectorBoost(topRepos);

  const uplift = sectorBoost.kind === "none" ? 0 : sectorBoost.uplift;
  const londonMin = Math.round((tier.londonMin * (1 + uplift)) / 500) * 500;
  const londonMax = Math.round((tier.londonMax * (1 + uplift)) / 500) * 500;
  const restOfUkMin = Math.round((londonMin * REST_OF_UK_ADJUSTMENT) / 500) * 500;
  const restOfUkMax = Math.round((londonMax * REST_OF_UK_ADJUSTMENT) / 500) * 500;

  const signals: SalarySignal[] = [
    { label: "Years on GitHub", value: years < 1 ? "<1 yr" : `${Math.round(years)} yrs` },
    { label: "Public repos", value: profile.publicRepos.toLocaleString("en-GB") },
    { label: "Stars (top repos)", value: totalStars.toLocaleString("en-GB") },
    { label: "Followers", value: profile.followers.toLocaleString("en-GB") },
  ];

  return {
    tier,
    londonMin,
    londonMax,
    restOfUkMin,
    restOfUkMax,
    allBands: SALARY_BANDS,
    score,
    signals,
    sectorBoost,
  };
}

function pickTier(score: number): SalaryBand {
  if (score < 3.5) return SALARY_BANDS[0]; // Graduate
  if (score < 5.5) return SALARY_BANDS[1]; // Junior
  if (score < 8) return SALARY_BANDS[2]; // Mid
  if (score < 11) return SALARY_BANDS[3]; // Senior
  return SALARY_BANDS[4]; // Staff
}

function detectSectorBoost(topRepos: GithubRepo[]): SectorBoost {
  const topicSet = new Set(
    topRepos.flatMap((r) => r.topics).map((t) => t.toLowerCase().trim()),
  );
  const descBlob = topRepos
    .map((r) => (r.description ?? "").toLowerCase())
    .join(" ");

  const counts: Record<Exclude<SectorBoost["kind"], "none">, number> = {
    fintech: 0,
    ai: 0,
    infra: 0,
    gaming: 0,
  };

  (Object.entries(SECTOR_KEYWORDS) as Array<
    [Exclude<SectorBoost["kind"], "none">, string[]]
  >).forEach(([sector, keywords]) => {
    for (const kw of keywords) {
      if (topicSet.has(kw)) counts[sector] += 2; // topics weigh more
      if (descBlob.includes(kw)) counts[sector] += 1;
    }
  });

  // Pick the strongest sector with at least 2 points of signal
  const winner = (Object.entries(counts) as Array<
    [Exclude<SectorBoost["kind"], "none">, number]
  >)
    .filter(([, c]) => c >= 2)
    .sort((a, b) => b[1] - a[1])[0];

  if (!winner) return { kind: "none" };
  const [kind] = winner;
  return {
    kind,
    uplift: SECTOR_UPLIFT[kind],
    label: SECTOR_LABEL[kind],
  };
}

/* -------------------------------------------------------------------------- */
/* Formatting                                                                  */
/* -------------------------------------------------------------------------- */

/** £42k, £130k — compact GBP shown on the ladder. */
export function formatGbpK(amount: number): string {
  const k = amount / 1000;
  return `£${k % 1 === 0 ? k.toString() : k.toFixed(1)}k`;
}

/** "£58k – £85k" — used in the hero band line. */
export function formatGbpRange(min: number, max: number): string {
  return `${formatGbpK(min)} – ${formatGbpK(max)}`;
}

function yearsBetween(then: Date, now: Date): number {
  const ms = now.getTime() - then.getTime();
  return ms / (365.25 * 24 * 60 * 60 * 1000);
}
