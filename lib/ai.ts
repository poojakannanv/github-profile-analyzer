import OpenAI from "openai";
import type {
  GithubProfile,
  GithubRepo,
  LanguageBreakdown,
} from "@/types/github";

/**
 * Model to use for analysis.
 * - `gpt-4o-mini` — cheap, fast, plenty smart for this use case (default)
 * - `gpt-4o` — higher quality but ~10× the cost
 *
 * Swap by setting OPENAI_MODEL in .env.local.
 */
export const DEFAULT_MODEL = "gpt-4o-mini";

/**
 * Custom error so the API route can return a clear "AI not configured" message
 * (rather than a generic 500) when OPENAI_API_KEY isn't set.
 */
export class AiNotConfiguredError extends Error {
  constructor() {
    super(
      "AI features are not configured. Add OPENAI_API_KEY to .env.local and restart the server.",
    );
    this.name = "AiNotConfiguredError";
  }
}

/** True when an API key is present at request time. */
export function isAiConfigured(): boolean {
  return Boolean(process.env.OPENAI_API_KEY);
}

/** Lazily initialised — we only construct the client when first needed. */
let client: OpenAI | null = null;

/**
 * Returns an OpenAI-compatible client. By default this talks to OpenAI, but
 * if `OPENAI_BASE_URL` is set we point at any OpenAI-compatible provider:
 *
 *   - Groq           → https://api.groq.com/openai/v1
 *   - Together       → https://api.together.xyz/v1
 *   - Anyscale       → https://api.endpoints.anyscale.com/v1
 *   - LM Studio      → http://localhost:1234/v1
 *
 * Combine with `OPENAI_MODEL` to pick the right model for that provider
 * (e.g. `llama-3.3-70b-versatile` for Groq).
 */
export function getAiClient(): OpenAI {
  if (client) return client;
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new AiNotConfiguredError();
  const baseURL = process.env.OPENAI_BASE_URL || undefined;
  client = new OpenAI({ apiKey, baseURL });
  return client;
}

/** Human-readable provider name for the UI ("OpenAI", "Groq", etc.). */
export function getProviderName(): string {
  const baseURL = process.env.OPENAI_BASE_URL ?? "";
  if (baseURL.includes("groq.com")) return "Groq";
  if (baseURL.includes("together.xyz")) return "Together";
  if (baseURL.includes("anyscale.com")) return "Anyscale";
  if (baseURL.includes("localhost")) return "Local";
  return "OpenAI";
}

/**
 * Input shape for the UK-tuned analysis prompt.
 */
export interface UkAnalysisInput {
  profile: GithubProfile;
  topRepos: GithubRepo[];
  languages: LanguageBreakdown[];
  /** Override default target market — defaults to "UK Full-Stack & Graduate". */
  targetRole?: string;
}

/**
 * System prompt — defines the analyst voice and required output format.
 * Written in British English; deliberately blunt to avoid sycophantic output.
 */
const SYSTEM_PROMPT = `You are a senior UK technical recruiter and developer career coach.
You are analysing a GitHub profile to help the developer position themselves for
**UK Full-Stack and Graduate Developer roles** in 2026.

WRITE IN BRITISH ENGLISH. Be honest, specific and direct — not sycophantic.
Never fabricate facts about the developer. Only use what is in the provided data.
If the profile is sparse or new, say so plainly.

Output strict markdown with EXACTLY these four sections in this order:

## Snapshot
Two sentences summarising who this developer appears to be based on their public code.

## Strengths for the UK market
Three to four bullet points. Tie each strength to a real UK demand signal —
TypeScript adoption, React/Next.js dominance, AWS/Azure cloud, testing maturity (Jest/Playwright),
modern tooling. Reference specific repos or languages from the data when you can.

## Gaps to address
Three to four bullet points of what is missing for a competitive UK Full-Stack or
Graduate scheme application. Examples: no visible tests, no cloud deployment, no
recent activity, limited language breadth, no production-grade projects.

## Recommended next steps
Two to three actions — concrete projects to build, technologies to learn, or
activities (open-source PRs, blog posts) to undertake. Each step should be specific
enough to start tomorrow.

Total length: 250 to 400 words. Do not include preamble, salutations, or
post-amble — start directly with the "## Snapshot" heading.`;

/**
 * Generate a UK-tailored profile analysis using gpt-4o-mini.
 *
 * Cost: roughly £0.0001–£0.0005 per call. Latency ~3–6 seconds.
 * Errors propagate — the API route catches them so the rest of the analysis
 * can still be returned without the AI summary.
 */
export async function generateUkAnalysis(
  input: UkAnalysisInput,
): Promise<string> {
  if (!isAiConfigured()) throw new AiNotConfiguredError();

  const openai = getAiClient();
  const model = process.env.OPENAI_MODEL ?? DEFAULT_MODEL;

  const completion = await openai.chat.completions.create({
    model,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: formatUserMessage(input) },
    ],
    temperature: 0.4,
    max_tokens: 800,
  });

  const content = completion.choices[0]?.message?.content?.trim();
  if (!content) {
    throw new Error("The AI returned an empty response. Please try again.");
  }
  return content;
}

/**
 * Format the profile/repos/languages into a compact, easy-to-parse user
 * message. Smaller payload = faster + cheaper.
 */
function formatUserMessage(input: UkAnalysisInput): string {
  const { profile, topRepos, languages, targetRole } = input;

  const lines: string[] = [];

  lines.push(
    `TARGET ROLE: ${targetRole ?? "UK Full-Stack Developer or Graduate Developer scheme"}`,
    "",
    "PROFILE",
    `- Username: ${profile.login}`,
    `- Name: ${profile.name ?? "(not set)"}`,
    `- Bio: ${profile.bio ?? "(none)"}`,
    `- Location: ${profile.location ?? "(not set)"}`,
    `- Public repos: ${profile.publicRepos}`,
    `- Followers: ${profile.followers}`,
    `- Joined GitHub: ${profile.createdAt.slice(0, 10)}`,
    "",
  );

  if (languages.length > 0) {
    lines.push("LANGUAGE BREAKDOWN (by bytes across top repos)");
    for (const lang of languages) {
      lines.push(`- ${lang.language}: ${lang.percent.toFixed(1)}%`);
    }
    lines.push("");
  }

  if (topRepos.length > 0) {
    lines.push(`TOP ${topRepos.length} REPOSITORIES (sorted by stars)`);
    topRepos.forEach((repo, index) => {
      const topics = repo.topics.length > 0 ? ` [${repo.topics.join(", ")}]` : "";
      const desc = repo.description ?? "(no description)";
      const lang = repo.language ?? "—";
      lines.push(
        `${index + 1}. ${repo.name} — ${desc} (★ ${repo.stars}, lang: ${lang})${topics}`,
      );
    });
  } else {
    lines.push("TOP REPOSITORIES: none (no public non-fork repos found)");
  }

  return lines.join("\n");
}
