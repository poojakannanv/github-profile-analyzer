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

export function getAiClient(): OpenAI {
  if (client) return client;
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new AiNotConfiguredError();
  client = new OpenAI({ apiKey });
  return client;
}

/**
 * Input shape for the UK-tuned analysis prompt.
 * Stays here so the prompt + types live together.
 */
export interface UkAnalysisInput {
  profile: GithubProfile;
  topRepos: GithubRepo[];
  languages: LanguageBreakdown[];
  /** Override default target market — defaults to "UK Full-Stack & Graduate". */
  targetRole?: string;
}

/**
 * Generate a UK-tailored profile analysis.
 *
 * Day 11 (this commit): stub — wires the SDK + types but doesn't call the API.
 * Day 12: implement the actual prompt + chat.completions call.
 */
export async function generateUkAnalysis(
  _input: UkAnalysisInput,
): Promise<string> {
  if (!isAiConfigured()) throw new AiNotConfiguredError();
  throw new Error(
    "generateUkAnalysis() is stubbed — implementation lands on Day 12.",
  );
}
