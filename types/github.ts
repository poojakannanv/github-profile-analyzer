/**
 * Domain types used across the analyzer.
 * Kept lean intentionally — feature-specific derived types live next to the
 * feature (see lib/uk-*.ts and lib/linkedin-summary.ts).
 */

export interface GithubProfile {
  login: string;
  name: string | null;
  avatarUrl: string;
  bio: string | null;
  followers: number;
  following: number;
  publicRepos: number;
  location: string | null;
  blog: string | null;
  createdAt: string;
}

export interface GithubRepo {
  name: string;
  description: string | null;
  url: string;
  stars: number;
  forks: number;
  language: string | null;
  topics: string[];
  updatedAt: string;
}

export interface LanguageBreakdown {
  language: string;
  bytes: number;
  percent: number;
}
