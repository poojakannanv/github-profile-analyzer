import { NextResponse } from "next/server";
import {
  GithubFetchError,
  getLanguageBreakdown,
  getUserProfile,
  getUserRepos,
} from "@/lib/github";
import { generateUkAnalysis, isAiConfigured } from "@/lib/ai";
import { validateGithubUsername } from "@/lib/validate";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** AI calls are slow — give the route plenty of time. */
export const maxDuration = 30;

interface AnalyzeRequestBody {
  username?: unknown;
}

/**
 * POST /api/analyze
 * Body: { username: string }
 * Returns: { profile, topRepos, languages, aiSummary }
 *
 * Day 5: profile · Day 6: + topRepos · Day 8: + languages
 * Day 12 (this commit): + aiSummary (UK-tailored markdown)
 */
export async function POST(request: Request) {
  let body: AnalyzeRequestBody;

  try {
    body = (await request.json()) as AnalyzeRequestBody;
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  if (typeof body.username !== "string") {
    return NextResponse.json(
      { error: "`username` (string) is required." },
      { status: 400 },
    );
  }

  const validation = validateGithubUsername(body.username);
  if (!validation.valid) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const username = validation.value;

  try {
    // Step 1: profile + repos in parallel
    const [profile, topRepos] = await Promise.all([
      getUserProfile(username),
      getUserRepos(username),
    ]);

    // Step 2: language breakdown across those repos
    const languages = await getLanguageBreakdown(username, topRepos);

    // Step 3: AI analysis — graceful degradation if key missing or API fails.
    // The basic profile data is still valuable on its own.
    let aiSummary: string | null = null;
    let aiError: string | null = null;

    if (isAiConfigured()) {
      try {
        aiSummary = await generateUkAnalysis({ profile, topRepos, languages });
      } catch (err) {
        console.error("AI analysis failed:", err);
        aiError = err instanceof Error ? err.message : "AI analysis failed.";
      }
    } else {
      aiError = "AI not configured — add OPENAI_API_KEY to .env.local.";
    }

    return NextResponse.json({
      profile,
      topRepos,
      languages,
      aiSummary,
      aiError,
    });
  } catch (err) {
    if (err instanceof GithubFetchError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    console.error("Unexpected /api/analyze error", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
