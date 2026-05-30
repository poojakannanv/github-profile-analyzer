/**
 * Day 16 — UK skill demand matrix.
 *
 * A curated list of skills that consistently appear in UK Full-Stack and
 * Graduate / Junior Engineer job posts across the major hiring boards
 * (Otta/Welcome to the Jungle, LinkedIn UK, Hired, Indeed). The matcher
 * compares this list to the user's combined signal (repo languages plus
 * repo topics) to surface "have" and "missing" buckets.
 *
 * This is intentionally directional, not authoritative — demand shifts
 * quarter-to-quarter and the matrix should be reviewed periodically.
 */

export type SkillCategory =
  | "Frontend"
  | "Backend"
  | "DevOps"
  | "Data/AI"
  | "Mobile";

export type DemandLevel = "high" | "medium";

export interface UkSkill {
  /** Display name shown to the user. */
  name: string;
  /** Bucket the skill sits in on the page. */
  category: SkillCategory;
  /** Rough demand level — high gets a stronger visual cue. */
  demand: DemandLevel;
  /** Lowercase keywords that count as "user has this skill" when matched
   *  against their repo languages and topics. */
  signals: string[];
  /** One-line "why this matters" hint shown in the gap state. */
  hint: string;
}

export const UK_SKILLS: UkSkill[] = [
  /* ---------------------------------------------------------------------- */
  /* Frontend                                                                */
  /* ---------------------------------------------------------------------- */
  {
    name: "TypeScript",
    category: "Frontend",
    demand: "high",
    signals: ["typescript", "ts"],
    hint: "Almost every UK frontend role asks for TS over plain JS.",
  },
  {
    name: "React",
    category: "Frontend",
    demand: "high",
    signals: ["react", "reactjs", "react.js"],
    hint: "Default UI library for UK product teams.",
  },
  {
    name: "Next.js",
    category: "Frontend",
    demand: "high",
    signals: ["next", "nextjs", "next.js"],
    hint: "App-router Next is the standard React stack in UK startups.",
  },
  {
    name: "Tailwind CSS",
    category: "Frontend",
    demand: "medium",
    signals: ["tailwind", "tailwindcss", "tailwind-css"],
    hint: "Frequently bundled with shadcn/ui in modern UK frontends.",
  },
  {
    name: "Vue",
    category: "Frontend",
    demand: "medium",
    signals: ["vue", "vuejs", "vue.js", "nuxt"],
    hint: "Common at GitLab, Statista, and a chunk of UK e-commerce.",
  },

  /* ---------------------------------------------------------------------- */
  /* Backend                                                                 */
  /* ---------------------------------------------------------------------- */
  {
    name: "Node.js",
    category: "Backend",
    demand: "high",
    signals: ["node", "nodejs", "node.js", "express", "nestjs", "fastify"],
    hint: "Pairs with TS for full-stack UK roles.",
  },
  {
    name: "Python",
    category: "Backend",
    demand: "high",
    signals: ["python", "django", "flask", "fastapi"],
    hint: "Top backend at Octopus, Cleo, Marshmallow and most data teams.",
  },
  {
    name: "Go",
    category: "Backend",
    demand: "medium",
    signals: ["go", "golang"],
    hint: "Heavy at Monzo, Cloudflare, Snyk — strong infra / API niche.",
  },
  {
    name: "Java / Kotlin",
    category: "Backend",
    demand: "high",
    signals: ["java", "kotlin", "spring", "spring-boot"],
    hint: "Dominant at fintech (Revolut, Wise, Starling) and enterprise.",
  },
  {
    name: "C# / .NET",
    category: "Backend",
    demand: "medium",
    signals: ["csharp", "c#", "dotnet", ".net", "aspnet", "asp.net"],
    hint: "Strong demand at ASOS, Trustpilot, public sector UK.",
  },

  /* ---------------------------------------------------------------------- */
  /* DevOps / Infra                                                          */
  /* ---------------------------------------------------------------------- */
  {
    name: "Docker",
    category: "DevOps",
    demand: "high",
    signals: ["docker", "dockerfile", "containers"],
    hint: "Table stakes for any backend or full-stack interview.",
  },
  {
    name: "Kubernetes",
    category: "DevOps",
    demand: "medium",
    signals: ["kubernetes", "k8s", "helm"],
    hint: "Asked for at scale-ups and any platform/SRE-adjacent role.",
  },
  {
    name: "AWS",
    category: "DevOps",
    demand: "high",
    signals: ["aws", "amazon-web-services", "lambda", "s3", "ec2"],
    hint: "Most-asked cloud on UK job posts; GCP and Azure trail.",
  },
  {
    name: "Terraform",
    category: "DevOps",
    demand: "medium",
    signals: ["terraform", "iac", "pulumi"],
    hint: "Infrastructure-as-code is standard at any series-A+ scale-up.",
  },
  {
    name: "CI/CD",
    category: "DevOps",
    demand: "high",
    signals: [
      "github-actions",
      "githubactions",
      "actions",
      "ci",
      "cicd",
      "ci-cd",
      "gitlab-ci",
      "circleci",
      "jenkins",
    ],
    hint: "Shipping pipelines, not just tests — interviewers will ask.",
  },

  /* ---------------------------------------------------------------------- */
  /* Data / AI                                                               */
  /* ---------------------------------------------------------------------- */
  {
    name: "SQL",
    category: "Data/AI",
    demand: "high",
    signals: ["sql", "postgres", "postgresql", "mysql", "sqlite", "mssql"],
    hint: "Every backend / data interview probes SQL — joins and indexes.",
  },
  {
    name: "LLMs / GenAI",
    category: "Data/AI",
    demand: "high",
    signals: [
      "llm",
      "openai",
      "anthropic",
      "langchain",
      "rag",
      "embeddings",
      "llama",
      "vector-db",
      "chromadb",
      "pinecone",
    ],
    hint: "Fastest-rising UK skill — even non-AI teams want one shipper.",
  },
  {
    name: "Pandas / NumPy",
    category: "Data/AI",
    demand: "medium",
    signals: ["pandas", "numpy", "jupyter", "data-analysis"],
    hint: "Default data exploration stack for analyst + ML interviews.",
  },
  {
    name: "PyTorch / TF",
    category: "Data/AI",
    demand: "medium",
    signals: ["pytorch", "tensorflow", "tf", "huggingface", "transformers"],
    hint: "Required for ML-engineer paths at DeepMind, Stability, etc.",
  },
  {
    name: "Spark / dbt",
    category: "Data/AI",
    demand: "medium",
    signals: ["spark", "pyspark", "dbt", "airflow", "snowflake", "databricks"],
    hint: "Data-engineering scale-up roles (Deliveroo, ASOS, Just Eat).",
  },

  /* ---------------------------------------------------------------------- */
  /* Mobile                                                                  */
  /* ---------------------------------------------------------------------- */
  {
    name: "React Native",
    category: "Mobile",
    demand: "medium",
    signals: ["react-native", "reactnative", "expo"],
    hint: "Most-asked cross-platform stack at UK consumer startups.",
  },
  {
    name: "Swift",
    category: "Mobile",
    demand: "medium",
    signals: ["swift", "swiftui", "ios"],
    hint: "Native iOS at Monzo, Revolut, BBC, and any premium app.",
  },
  {
    name: "Kotlin (Android)",
    category: "Mobile",
    demand: "medium",
    signals: ["kotlin", "android", "jetpack", "compose-android"],
    hint: "Native Android — paired with Swift to cover both platforms.",
  },
  {
    name: "Flutter",
    category: "Mobile",
    demand: "medium",
    signals: ["flutter", "dart"],
    hint: "Growing niche — common at challenger banks and startups.",
  },
];

/* ---------------------------------------------------------------------------
 * Matcher
 * ------------------------------------------------------------------------ */

export interface MatchedSkill extends UkSkill {
  have: boolean;
  /** Which user-side signals matched (for debugging / future use). */
  matchedOn: string[];
}

export interface CategoryBreakdown {
  category: SkillCategory;
  skills: MatchedSkill[];
  haveCount: number;
  totalCount: number;
}

export interface SkillMatchResult {
  categories: CategoryBreakdown[];
  totalHave: number;
  total: number;
  /** 0-100 — percentage of in-demand skills the user covers. */
  percent: number;
}

const ORDER: SkillCategory[] = [
  "Frontend",
  "Backend",
  "DevOps",
  "Data/AI",
  "Mobile",
];

/**
 * Compare the user's combined signal (repo languages + topics) against
 * the curated UK skill matrix and return a per-category breakdown.
 */
export function matchSkills(
  languages: string[],
  topics: string[],
): SkillMatchResult {
  const signals = new Set<string>();
  for (const lang of languages) signals.add(normaliseSignal(lang));
  for (const topic of topics) signals.add(normaliseSignal(topic));
  signals.delete(""); // drop any empty after normalising

  const matched: MatchedSkill[] = UK_SKILLS.map((skill) => {
    const hits = skill.signals.filter((sig) => signals.has(normaliseSignal(sig)));
    return { ...skill, have: hits.length > 0, matchedOn: hits };
  });

  const categories: CategoryBreakdown[] = ORDER.map((category) => {
    const skills = matched.filter((s) => s.category === category);
    return {
      category,
      skills,
      haveCount: skills.filter((s) => s.have).length,
      totalCount: skills.length,
    };
  });

  const totalHave = matched.filter((s) => s.have).length;
  const total = matched.length;
  const percent = total === 0 ? 0 : Math.round((totalHave / total) * 100);

  return { categories, totalHave, total, percent };
}

/**
 * Lower-case + strip the common punctuation that GitHub topics use so that
 * "C#", "c-sharp", and "csharp" all collapse to the same key.
 */
function normaliseSignal(raw: string): string {
  return raw
    .toLowerCase()
    .trim()
    .replace(/\.js$/, "")
    .replace(/\s+/g, "-");
}
