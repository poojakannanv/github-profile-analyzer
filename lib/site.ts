/**
 * Canonical site facts, shared by the metadata, the Open Graph image,
 * the sitemap and robots.txt so they can never drift apart.
 *
 * Set NEXT_PUBLIC_SITE_URL if the app is ever served from a custom domain.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://github-profile-analyzer-blush.vercel.app"
).replace(/\/$/, "");

export const SITE_NAME = "GitHub Profile Analyzer";

export const SITE_TITLE = "GitHub Profile Analyzer | UK Edition";

export const SITE_DESCRIPTION =
  "AI-powered GitHub profile analysis tailored for the UK Full-Stack and Graduate Developer market.";

export const SITE_TAGLINE =
  "Analyse any GitHub profile against UK Full-Stack and Graduate Developer roles.";
