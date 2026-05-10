import { NextResponse } from "next/server";
import { GithubFetchError, getUserProfile, getUserRepos } from "@/lib/github";
import { validateGithubUsername } from "@/lib/validate";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface AnalyzeRequestBody {
  username?: unknown;
}

/**
 * POST /api/analyze
 * Body: { username: string }
 * Returns: { profile: GithubProfile, topRepos: GithubRepo[] } | { error: string }
 *
 * Day 5: profile.
 * Day 6: + top repos (this commit).
 * Day 8+: + language stats and AI-generated UK match report.
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

  try {
    // Fetch profile and repos in parallel — saves ~one round-trip of latency.
    const [profile, topRepos] = await Promise.all([
      getUserProfile(validation.value),
      getUserRepos(validation.value),
    ]);

    return NextResponse.json({ profile, topRepos });
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
