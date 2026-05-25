/**
 * Day 15 — curated list of well-known UK Skilled Worker visa sponsors.
 *
 * These are companies publicly listed on the UK Home Office's Register of
 * Licensed Sponsors with engineering presence in the UK (most are
 * London-based). Tech stacks are inferred from public job posts and
 * engineering blogs — treat them as directional rather than exhaustive.
 *
 * Languages are stored as lowercase strings to make the matcher case-insensitive.
 */

export interface UkSponsor {
  /** Company name as it appears publicly. */
  name: string;
  /** Single-line description of what they do. */
  tagline: string;
  /** Primary UK office city. */
  city: string;
  /** Sector tag — used for the chip on the card. */
  sector:
    | "Fintech"
    | "Consumer"
    | "Infra/Dev"
    | "Gaming"
    | "AI/Data"
    | "Health"
    | "Enterprise";
  /** Public careers page. */
  careersUrl: string;
  /** Primary languages used in production, lowercased. */
  languages: string[];
}

export const UK_SPONSORS: UkSponsor[] = [
  {
    name: "Monzo",
    tagline: "Mobile-first challenger bank with millions of UK customers.",
    city: "London",
    sector: "Fintech",
    careersUrl: "https://monzo.com/careers/",
    languages: ["go", "typescript", "javascript", "python", "swift", "kotlin"],
  },
  {
    name: "Revolut",
    tagline: "Global financial super-app, headquartered in London.",
    city: "London",
    sector: "Fintech",
    careersUrl: "https://www.revolut.com/careers",
    languages: ["python", "java", "kotlin", "typescript", "go"],
  },
  {
    name: "Wise",
    tagline: "International money transfer, FX, and multi-currency accounts.",
    city: "London",
    sector: "Fintech",
    careersUrl: "https://wise.jobs/",
    languages: ["java", "kotlin", "typescript", "python", "go"],
  },
  {
    name: "Starling Bank",
    tagline: "UK digital bank for consumers and small businesses.",
    city: "London",
    sector: "Fintech",
    careersUrl: "https://www.starlingbank.com/careers/",
    languages: ["java", "kotlin", "typescript", "swift"],
  },
  {
    name: "GoCardless",
    tagline: "Bank-to-bank recurring payments infrastructure.",
    city: "London",
    sector: "Fintech",
    careersUrl: "https://gocardless.com/careers/",
    languages: ["ruby", "typescript", "go", "elixir"],
  },
  {
    name: "Cleo",
    tagline: "AI-powered personal finance assistant.",
    city: "London",
    sector: "Fintech",
    careersUrl: "https://web.meetcleo.com/careers",
    languages: ["python", "typescript", "ruby"],
  },
  {
    name: "Deliveroo",
    tagline: "On-demand food and grocery delivery across Europe.",
    city: "London",
    sector: "Consumer",
    careersUrl: "https://careers.deliveroo.co.uk/",
    languages: ["ruby", "python", "go", "typescript", "scala"],
  },
  {
    name: "Octopus Energy",
    tagline: "Renewable-first UK energy retailer and tech platform.",
    city: "London",
    sector: "Consumer",
    careersUrl: "https://octopus.energy/careers/",
    languages: ["python", "typescript", "javascript"],
  },
  {
    name: "Skyscanner",
    tagline: "Travel search engine for flights, hotels, and car hire.",
    city: "Edinburgh",
    sector: "Consumer",
    careersUrl: "https://www.skyscanner.net/jobs",
    languages: ["python", "go", "typescript", "kotlin", "swift"],
  },
  {
    name: "Trustpilot",
    tagline: "Open review platform for businesses and consumers.",
    city: "London",
    sector: "Consumer",
    careersUrl: "https://careers.trustpilot.com/",
    languages: ["typescript", "go", "javascript", "csharp"],
  },
  {
    name: "ASOS",
    tagline: "Global online fashion and beauty retailer.",
    city: "London",
    sector: "Consumer",
    careersUrl: "https://www.asoscareers.com/",
    languages: ["csharp", "typescript", "python"],
  },
  {
    name: "Just Eat Takeaway",
    tagline: "European food delivery marketplace.",
    city: "London",
    sector: "Consumer",
    careersUrl: "https://careers.justeattakeaway.com/",
    languages: ["scala", "java", "kotlin", "typescript"],
  },
  {
    name: "Cloudflare",
    tagline: "Edge network, DNS, and developer platform.",
    city: "London",
    sector: "Infra/Dev",
    careersUrl: "https://www.cloudflare.com/careers/",
    languages: ["go", "rust", "typescript", "javascript", "c", "lua"],
  },
  {
    name: "Snyk",
    tagline: "Developer-first security platform for code and cloud.",
    city: "London",
    sector: "Infra/Dev",
    careersUrl: "https://snyk.io/careers/",
    languages: ["typescript", "go", "python", "java"],
  },
  {
    name: "GitHub",
    tagline: "Code hosting, CI, and developer collaboration.",
    city: "London",
    sector: "Infra/Dev",
    careersUrl: "https://github.com/about/careers",
    languages: ["ruby", "typescript", "go", "javascript"],
  },
  {
    name: "Improbable",
    tagline: "Distributed simulation tech for games and defence.",
    city: "London",
    sector: "Gaming",
    careersUrl: "https://www.improbable.io/careers",
    languages: ["cpp", "csharp", "go", "typescript"],
  },
  {
    name: "Sumo Digital",
    tagline: "AAA games studio with UK offices across multiple cities.",
    city: "Sheffield",
    sector: "Gaming",
    careersUrl: "https://www.sumo-digital.com/careers/",
    languages: ["cpp", "csharp", "python"],
  },
  {
    name: "DeepMind",
    tagline: "AI research lab (Google subsidiary) headquartered in London.",
    city: "London",
    sector: "AI/Data",
    careersUrl: "https://deepmind.google/about/careers/",
    languages: ["python", "cpp", "jax"],
  },
  {
    name: "Palantir",
    tagline: "Data-integration platforms for enterprise and government.",
    city: "London",
    sector: "Enterprise",
    careersUrl: "https://www.palantir.com/careers/",
    languages: ["java", "typescript", "python", "rust"],
  },
  {
    name: "Bloomberg",
    tagline: "Financial data, news, and analytics terminal.",
    city: "London",
    sector: "Enterprise",
    careersUrl: "https://www.bloomberg.com/careers",
    languages: ["cpp", "python", "javascript", "typescript"],
  },
];

/**
 * Score how well a sponsor matches the user's top languages.
 *
 * Each shared language adds 1 point, weighted by the sponsor's stack size
 * (so a 3-language stack with 2 matches scores higher than a 6-language
 * stack with the same 2 matches). Returns 0 when there's no overlap.
 */
export function scoreSponsor(
  sponsor: UkSponsor,
  userLanguages: string[],
): { score: number; matches: string[] } {
  const userSet = new Set(
    userLanguages.map((l) => normaliseLanguage(l)).filter(Boolean),
  );
  const matches = sponsor.languages.filter((lang) => userSet.has(lang));
  if (matches.length === 0) return { score: 0, matches: [] };

  // Coverage = fraction of sponsor stack the user covers
  const coverage = matches.length / sponsor.languages.length;
  // Raw match count carries weight too, so absolute strength shows up
  const score = matches.length + coverage * 2;
  return { score, matches };
}

/** Normalise GitHub language names ("C#", "C++") to our lowercase keys. */
export function normaliseLanguage(lang: string): string {
  const lower = lang.toLowerCase().trim();
  if (lower === "c#" || lower === "csharp") return "csharp";
  if (lower === "c++" || lower === "cpp") return "cpp";
  if (lower === "objective-c") return "objectivec";
  if (lower === "f#") return "fsharp";
  return lower;
}

/** Top N sponsors by match score against the user's languages. */
export function matchSponsors(
  userLanguages: string[],
  limit: number = 6,
): Array<UkSponsor & { score: number; matches: string[] }> {
  const scored = UK_SPONSORS.map((sponsor) => ({
    sponsor,
    ...scoreSponsor(sponsor, userLanguages),
  }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return scored.map(({ sponsor, score, matches }) => ({
    ...sponsor,
    score,
    matches,
  }));
}
