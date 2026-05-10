import Image from "next/image";
import { ExternalLink, MapPin, Users, GitFork, BookOpen } from "lucide-react";
import type { GithubProfile } from "@/types/github";

interface ProfilePreviewProps {
  profile: GithubProfile;
}

/**
 * Lean profile display — Day 5 deliverable.
 * Day 7 will polish this into a richer ProfileCard with badges, stats and styling.
 */
export function ProfilePreview({ profile }: ProfilePreviewProps) {
  const memberSince = new Date(profile.createdAt).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
  });

  return (
    <article className="mt-8 w-full rounded-2xl border border-border bg-card p-6 text-left shadow-sm sm:p-8">
      <header className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <Image
          src={profile.avatarUrl}
          alt={`${profile.login}'s avatar`}
          width={72}
          height={72}
          className="h-18 w-18 rounded-full ring-2 ring-border"
          unoptimized
        />
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-semibold tracking-tight">
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
        <span className="rounded-full border border-border bg-muted px-3 py-1 text-xs text-muted-foreground">
          Joined {memberSince}
        </span>
      </header>

      {profile.bio && (
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
          {profile.bio}
        </p>
      )}

      <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat
          icon={<BookOpen className="h-4 w-4" />}
          label="Public repos"
          value={profile.publicRepos}
        />
        <Stat
          icon={<Users className="h-4 w-4" />}
          label="Followers"
          value={profile.followers}
        />
        <Stat
          icon={<GitFork className="h-4 w-4" />}
          label="Following"
          value={profile.following}
        />
        <Stat
          icon={<MapPin className="h-4 w-4" />}
          label="Location"
          value={profile.location ?? "—"}
        />
      </dl>

      <p className="mt-6 rounded-lg border border-dashed border-border bg-muted/40 px-4 py-3 text-xs text-muted-foreground">
        🔮 Day 7 ships the full ProfileCard · Day 9 adds the language breakdown
        chart · Day 12 plugs in the AI report.
      </p>
    </article>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-lg border border-border bg-background px-4 py-3">
      <dt className="flex items-center gap-1.5 text-xs uppercase tracking-wide text-muted-foreground">
        {icon}
        {label}
      </dt>
      <dd className="mt-1 truncate text-base font-semibold text-foreground">
        {value}
      </dd>
    </div>
  );
}
