import { Octokit } from "@octokit/rest";
import type { GithubProfile } from "@/types/github";

/**
 * Single shared Octokit client.
 * Without a token: 60 requests/hour (fine for personal/demo use).
 * With GITHUB_TOKEN env: 5,000 requests/hour.
 */
let client: Octokit | null = null;

function getClient(): Octokit {
  if (client) return client;
  client = new Octokit({
    auth: process.env.GITHUB_TOKEN,
    userAgent: "github-profile-analyzer-uk",
  });
  return client;
}

/**
 * Custom error type so the API route can map to the right HTTP status.
 */
export class GithubFetchError extends Error {
  constructor(
    message: string,
    public readonly status: 404 | 403 | 429 | 500,
  ) {
    super(message);
    this.name = "GithubFetchError";
  }
}

/**
 * Fetch a GitHub user's public profile.
 * Maps the raw API response to our domain `GithubProfile` type.
 */
export async function getUserProfile(username: string): Promise<GithubProfile> {
  const octokit = getClient();

  try {
    const { data } = await octokit.users.getByUsername({ username });

    return {
      login: data.login,
      name: data.name,
      avatarUrl: data.avatar_url,
      bio: data.bio,
      followers: data.followers,
      following: data.following,
      publicRepos: data.public_repos,
      location: data.location,
      blog: data.blog,
      createdAt: data.created_at,
    };
  } catch (err) {
    const status = (err as { status?: number })?.status;

    if (status === 404) {
      throw new GithubFetchError(
        `No GitHub user named "${username}" was found.`,
        404,
      );
    }
    if (status === 403 || status === 429) {
      throw new GithubFetchError(
        "GitHub rate limit reached. Add a GITHUB_TOKEN in .env.local for higher limits.",
        429,
      );
    }
    throw new GithubFetchError(
      "Failed to reach the GitHub API. Please try again.",
      500,
    );
  }
}
