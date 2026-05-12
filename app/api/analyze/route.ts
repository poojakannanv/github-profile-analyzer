import { NextResponse } from "next/server";
import {
  GithubFetchError,
  getLanguageBreakdown,
  getUserProfile,
  getUserRepos,
} from "@/lib/github";
import { validateGithubUsername } from "@/lib/validate";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface AnalyzeRequestBody {
  username?: unknown;
}

/**
 * POST /api/analyze
 * Body: { username: string }
 * Returns: { profile, topRepos, languages } | { error }
 *
 * Day 5: profile.
 * Day 6: + topRepos.
 * Day 8: + languages (this commit).
 * Week 3+: UK match score, visa sponsors, salary band, etc.
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
    // Step 1: profile + repos in parallel (we need repos before we can fetch
    // their language breakdowns)
    const [profile, topRepos] = await Promise.all([
      getUserProfile(username),
      getUserRepos(username),
    ]);

    // Step 2: language breakdown across those repos
    const languages = await getLanguageBreakdown(username, topRepos);

    return NextResponse.json({ profile, topRepos, languages });
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
