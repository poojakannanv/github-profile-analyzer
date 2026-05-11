import Image from "next/image";
import {
  ExternalLink,
  MapPin,
  Link2,
  Calendar,
  BookOpen,
  Users,
  UserPlus,
  Star,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { GithubProfile, GithubRepo } from "@/types/github";

interface ProfileCardProps {
  profile: GithubProfile;
  topRepos: GithubRepo[];
}

/**
 * Portfolio-grade profile card — Day 7.
 * Computes aggregate stats (total stars, top languages) from the repos we
 * already have, so we avoid extra API calls.
 */
export function ProfileCard({ profile, topRepos }: ProfileCardProps) {
  const totalStars = topRepos.reduce((sum, repo) => sum + repo.stars, 0);
  const topLanguages = computeTopLanguages(topRepos, 3);
  const accountAge = formatAccountAge(profile.createdAt);
  const blog = normaliseBlogUrl(profile.blog);

  return (
    <article className="mt-8 overflow-hidden rounded-2xl border border-border bg-card text-left shadow-sm">
      {/* Decorative gradient banner */}
      <div className="relative h-24 bg-gradient-to-r from-primary via-purple-600 to-pink-500">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.25),transparent_50%)]"
        />
      </div>

      <div className="px-6 pb-6 sm:px-8">
        {/* Avatar overlapping the banner */}
        <div className="-mt-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end">
            <Image
              src={profile.avatarUrl}
              alt={`${profile.login}'s avatar`}
              width={96}
              height={96}
              className="h-24 w-24 rounded-2xl ring-4 ring-card"
              unoptimized
            />
            <div className="min-w-0">
              <h2 className="text-2xl font-bold tracking-tight">
                {profile.name ?? profile.login}
              </h2>
              <a
                href={`https://github.com/${profile.login}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                @{profile.login}
                <ExternalLink className="h-3 w-3" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
              {accountAge}
            </span>
          </div>
        </div>

        {/* Bio */}
        {profile.bio && (
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-foreground/90">
            {profile.bio}
          </p>
        )}

        {/* Meta row */}
        <ul className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
          {profile.location && (
            <li className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              {profile.location}
            </li>
          )}
          {blog && (
            <li className="inline-flex items-center gap-1.5">
              <Link2 className="h-3.5 w-3.5" aria-hidden="true" />
              <a
                href={blog.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary hover:underline"
              >
                {blog.label}
              </a>
            </li>
          )}
          <li className="inline-flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
            Joined{" "}
            {new Date(profile.createdAt).toLocaleDateString("en-GB", {
              month: "short",
              year: "numeric",
            })}
          </li>
        </ul>

        {/* Stats grid */}
        <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat
            icon={BookOpen}
            label="Public repos"
            value={profile.publicRepos.toLocaleString("en-GB")}
          />
          <Stat
            icon={Users}
            label="Followers"
            value={profile.followers.toLocaleString("en-GB")}
          />
          <Stat
            icon={UserPlus}
            label="Following"
            value={profile.following.toLocaleString("en-GB")}
          />
          <Stat
            icon={Star}
            label="Stars (top repos)"
            value={totalStars.toLocaleString("en-GB")}
            accent
          />
        </dl>

        {/* Top languages — derived from topRepos */}
        {topLanguages.length > 0 && (
          <section className="mt-6">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Top tech in their repos
            </h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {topLanguages.map((lang) => (
                <span
                  key={lang.name}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium"
                >
                  <span
                    aria-hidden="true"
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: languageColour(lang.name) }}
                  />
                  {lang.name}
                  <span className="text-muted-foreground">·</span>
                  <span className="text-muted-foreground">
                    {lang.count} repo{lang.count === 1 ? "" : "s"}
                  </span>
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
  accent = false,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div
      className={
        "rounded-xl border bg-background p-4 transition-colors " +
        (accent
          ? "border-primary/30 bg-primary/5"
          : "border-border hover:border-primary/30")
      }
    >
      <dt className="flex items-center gap-1.5 text-[11px] uppercase tracking-wide text-muted-foreground">
        <Icon className="h-3.5 w-3.5" aria-hidden="true" />
        {label}
      </dt>
      <dd className="mt-1 text-xl font-semibold text-foreground">{value}</dd>
    </div>
  );
}

/** Compute the N most-used languages across the provided repos. */
function computeTopLanguages(
  repos: GithubRepo[],
  limit: number,
): { name: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const repo of repos) {
    if (!repo.language) continue;
    counts.set(repo.language, (counts.get(repo.language) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([name, count]) => ({ name, count }));
}

/** Convert createdAt to a human "3 years on GitHub" string. */
function formatAccountAge(createdAt: string): string {
  const created = new Date(createdAt);
  const now = new Date();
  const months =
    (now.getFullYear() - created.getFullYear()) * 12 +
    (now.getMonth() - created.getMonth());

  if (months < 12) {
    return `${months || 1} month${months === 1 ? "" : "s"} on GitHub`;
  }
  const years = Math.floor(months / 12);
  return `${years} year${years === 1 ? "" : "s"} on GitHub`;
}

/** GitHub's "blog" field can be a bare domain — coerce it into a URL. */
function normaliseBlogUrl(
  blog: string | null,
): { href: string; label: string } | null {
  if (!blog) return null;
  const trimmed = blog.trim();
  if (!trimmed) return null;
  const href = trimmed.startsWith("http") ? trimmed : `https://${trimmed}`;
  const label = trimmed.replace(/^https?:\/\//, "").replace(/\/$/, "");
  return { href, label };
}

/**
 * Small subset of the popular "github-language-colors" mapping.
 * Keeps the bundle tiny — falls back to a neutral grey for unknown languages.
 */
function languageColour(language: string): string {
  const colours: Record<string, string> = {
    TypeScript: "#3178c6",
    JavaScript: "#f1e05a",
    Python: "#3572A5",
    Java: "#b07219",
    "C#": "#178600",
    "C++": "#f34b7d",
    C: "#555555",
    Go: "#00ADD8",
    Rust: "#dea584",
    Ruby: "#701516",
    PHP: "#4F5D95",
    Kotlin: "#A97BFF",
    Swift: "#F05138",
    HTML: "#e34c26",
    CSS: "#563d7c",
    SCSS: "#c6538c",
    Shell: "#89e051",
    Dockerfile: "#384d54",
    Vue: "#41b883",
    Svelte: "#ff3e00",
    Dart: "#00B4AB",
    Lua: "#000080",
    R: "#198CE7",
    Scala: "#c22d40",
    Elixir: "#6e4a7e",
    Haskell: "#5e5086",
    Solidity: "#AA6746",
    Astro: "#ff5a03",
  };
  return colours[language] ?? "#94a3b8";
}
