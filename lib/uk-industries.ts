/**
 * Day 19 — UK Industry Specialism detector.
 *
 * Scores eight UK-relevant industry niches against the user's repos and
 * returns a ranked affinity list. Goes beyond the simple sector boost in
 * SalaryBand by considering ALL industries, picking a primary + secondary
 * specialism, and explaining WHICH repos drove each signal.
 *
 * Scoring per repo:
 *   raw = topic_hits * 3
 *       + description_hits * 1
 *       + language_affinity * 2
 *   weighted = raw * log10(1 + stars + forks)   // popularity matters but
 *                                                // doesn't dominate
 *
 * Summed per industry, then normalised so the strongest one is 100.
 */

import type { GithubRepo } from "@/types/github";

export type IndustryKey =
  | "fintech"
  | "ai"
  | "devops"
  | "frontend"
  | "backend"
  | "data"
  | "mobile"
  | "security";

export interface IndustryDefinition {
  key: IndustryKey;
  name: string;
  /** One-line description shown in the hero card. */
  blurb: string;
  /** Lowercase keywords matched against topics AND repo descriptions. */
  keywords: string[];
  /** Languages that count as "1 affinity hit" for this industry. */
  languages: string[];
}

export const UK_INDUSTRIES: IndustryDefinition[] = [
  {
    key: "fintech",
    name: "Fintech",
    blurb: "Payments, banking, trading, and challenger-bank infrastructure.",
    keywords: [
      "fintech",
      "banking",
      "payments",
      "trading",
      "stripe",
      "open-banking",
      "blockchain",
      "crypto",
      "ethereum",
      "defi",
      "ledger",
      "kyc",
      "card",
    ],
    languages: ["kotlin", "java", "scala", "go"],
  },
  {
    key: "ai",
    name: "AI / ML",
    blurb: "Models, agents, LLM tooling, and applied ML pipelines.",
    keywords: [
      "ai",
      "ml",
      "machine-learning",
      "deep-learning",
      "llm",
      "openai",
      "anthropic",
      "langchain",
      "rag",
      "embeddings",
      "vector-db",
      "pinecone",
      "chromadb",
      "pytorch",
      "tensorflow",
      "huggingface",
      "transformers",
      "agent",
      "chatbot",
      "stable-diffusion",
    ],
    languages: ["python", "jupyter notebook"],
  },
  {
    key: "devops",
    name: "DevOps / Platform",
    blurb: "Infra, SRE, build pipelines, and developer platforms.",
    keywords: [
      "devops",
      "sre",
      "kubernetes",
      "k8s",
      "helm",
      "terraform",
      "ansible",
      "docker",
      "aws",
      "gcp",
      "azure",
      "infra",
      "platform",
      "observability",
      "prometheus",
      "grafana",
      "istio",
      "pulumi",
      "ci-cd",
      "github-actions",
    ],
    languages: ["go", "rust", "hcl", "shell", "yaml"],
  },
  {
    key: "frontend",
    name: "Frontend",
    blurb: "Product UI, design systems, and web-app architecture.",
    keywords: [
      "frontend",
      "react",
      "nextjs",
      "vue",
      "nuxt",
      "svelte",
      "sveltekit",
      "angular",
      "tailwind",
      "tailwindcss",
      "shadcn",
      "design-system",
      "ui",
      "components",
      "storybook",
      "remix",
      "astro",
    ],
    languages: ["typescript", "javascript", "css", "scss", "vue"],
  },
  {
    key: "backend",
    name: "Backend",
    blurb: "APIs, microservices, and server-side business logic.",
    keywords: [
      "backend",
      "api",
      "rest",
      "graphql",
      "microservice",
      "microservices",
      "grpc",
      "express",
      "fastapi",
      "django",
      "flask",
      "spring",
      "spring-boot",
      "nestjs",
      "rails",
      "phoenix",
    ],
    languages: ["python", "go", "java", "kotlin", "csharp", "ruby", "elixir", "node", "nodejs"],
  },
  {
    key: "data",
    name: "Data Engineering",
    blurb: "Pipelines, warehousing, analytics, and data-platform tooling.",
    keywords: [
      "data",
      "data-engineering",
      "etl",
      "elt",
      "pipeline",
      "spark",
      "pyspark",
      "airflow",
      "dbt",
      "snowflake",
      "databricks",
      "kafka",
      "warehouse",
      "lakehouse",
      "analytics",
      "pandas",
      "numpy",
      "duckdb",
    ],
    languages: ["python", "sql", "scala"],
  },
  {
    key: "mobile",
    name: "Mobile",
    blurb: "Native iOS / Android and cross-platform mobile apps.",
    keywords: [
      "ios",
      "android",
      "mobile",
      "swift",
      "swiftui",
      "kotlin-android",
      "react-native",
      "flutter",
      "dart",
      "jetpack",
      "compose-android",
      "xcode",
      "expo",
    ],
    languages: ["swift", "kotlin", "objective-c", "dart", "java"],
  },
  {
    key: "security",
    name: "Security",
    blurb: "AppSec, cryptography, red-team tooling, and SecOps.",
    keywords: [
      "security",
      "infosec",
      "appsec",
      "cryptography",
      "crypto",
      "tls",
      "ssl",
      "oauth",
      "auth",
      "ctf",
      "pentest",
      "vulnerability",
      "exploit",
      "owasp",
      "encryption",
      "zero-trust",
      "siem",
    ],
    languages: ["rust", "c", "cpp", "go"],
  },
];

/* -------------------------------------------------------------------------- */

export interface IndustryRepoContribution {
  name: string;
  url: string;
  stars: number;
  contribution: number;
  matchedOn: string[];
}

export interface IndustryScore {
  key: IndustryKey;
  name: string;
  blurb: string;
  /** Raw score, before normalisation — useful for ordering ties. */
  raw: number;
  /** 0–100, relative to the strongest industry on this profile. */
  affinity: number;
  /** Top contributing repos for the explain-why callout. */
  topRepos: IndustryRepoContribution[];
}

export interface IndustrySpecialismResult {
  primary: IndustryScore | null;
  secondary: IndustryScore | null;
  /** All 8, sorted descending — including ones with 0 affinity. */
  ranked: IndustryScore[];
  /** Confidence label for the primary specialism. */
  primaryConfidence: "Strong" | "Moderate" | "Light" | "Inconclusive";
}

/**
 * Score every UK industry against the user's top repos.
 */
export function scoreIndustries(topRepos: GithubRepo[]): IndustrySpecialismResult {
  if (topRepos.length === 0) {
    return {
      primary: null,
      secondary: null,
      ranked: UK_INDUSTRIES.map((def) => emptyScore(def)),
      primaryConfidence: "Inconclusive",
    };
  }

  // For each industry, walk all repos and accumulate scores.
  const perIndustry: Map<IndustryKey, IndustryScore> = new Map();
  for (const def of UK_INDUSTRIES) {
    perIndustry.set(def.key, emptyScore(def));
  }

  for (const repo of topRepos) {
    const topicSet = new Set(repo.topics.map((t) => t.toLowerCase().trim()));
    const desc = (repo.description ?? "").toLowerCase();
    const lang = (repo.language ?? "").toLowerCase().trim();
    const weight = Math.log10(1 + repo.stars + repo.forks);

    for (const def of UK_INDUSTRIES) {
      let raw = 0;
      const matched: string[] = [];

      for (const kw of def.keywords) {
        if (topicSet.has(kw)) {
          raw += 3;
          matched.push(kw);
        } else if (desc.includes(kw)) {
          raw += 1;
          matched.push(kw);
        }
      }

      if (lang && def.languages.includes(lang)) {
        raw += 2;
        matched.push(lang);
      }

      if (raw > 0) {
        const score = perIndustry.get(def.key)!;
        const contribution = raw * (1 + weight);
        score.raw += contribution;
        score.topRepos.push({
          name: repo.name,
          url: repo.url,
          stars: repo.stars,
          contribution,
          matchedOn: matched,
        });
      }
    }
  }

  // Trim each industry's contributing repos down to its strongest 3
  for (const score of perIndustry.values()) {
    score.topRepos.sort((a, b) => b.contribution - a.contribution);
    score.topRepos = score.topRepos.slice(0, 3);
  }

  const ranked = Array.from(perIndustry.values()).sort((a, b) => b.raw - a.raw);
  const maxRaw = ranked[0]?.raw ?? 0;

  for (const score of ranked) {
    score.affinity = maxRaw > 0 ? Math.round((score.raw / maxRaw) * 100) : 0;
  }

  const primary = ranked[0]?.raw > 0 ? ranked[0] : null;
  const secondary = ranked[1]?.raw > 0 ? ranked[1] : null;
  const primaryConfidence = labelConfidence(primary, secondary);

  return { primary, secondary, ranked, primaryConfidence };
}

function emptyScore(def: IndustryDefinition): IndustryScore {
  return {
    key: def.key,
    name: def.name,
    blurb: def.blurb,
    raw: 0,
    affinity: 0,
    topRepos: [],
  };
}

/**
 * Confidence is a function of how much the primary beats the secondary
 * (concentration), plus the absolute raw score (volume of signal).
 */
function labelConfidence(
  primary: IndustryScore | null,
  secondary: IndustryScore | null,
): IndustrySpecialismResult["primaryConfidence"] {
  if (!primary || primary.raw === 0) return "Inconclusive";
  const ratio = secondary && secondary.raw > 0 ? primary.raw / secondary.raw : 5;
  if (primary.raw >= 25 && ratio >= 1.7) return "Strong";
  if (primary.raw >= 12 && ratio >= 1.2) return "Moderate";
  return "Light";
}
