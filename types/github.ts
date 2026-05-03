/**
 * Domain types used across the analyzer.
 * Kept lean intentionally — extend per Week 2/3 features.
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

export interface UkMatchReport {
  score: number; // 0-100
  strengths: string[];
  gaps: string[];
  suggestedRoles: string[];
  suggestedProjects: string[];
}

export interface AnalysisResult {
  profile: GithubProfile;
  topRepos: GithubRepo[];
  languages: LanguageBreakdown[];
  ukMatch: UkMatchReport;
  aiSummary: string; // markdown
}
