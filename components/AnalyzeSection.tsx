"use client";

import { useState } from "react";
import { AlertCircle, Loader2 } from "lucide-react";
import { SearchForm } from "@/components/SearchForm";
import { ProfileCard } from "@/components/ProfileCard";
import { LanguageBreakdown } from "@/components/LanguageBreakdown";
import { TopReposList } from "@/components/TopReposList";
import { AiSummary } from "@/components/AiSummary";
import { TrustStrip } from "@/components/TrustStrip";
import { ResultsSkeleton } from "@/components/ResultsSkeleton";
import { VisaSponsorMatch } from "@/components/VisaSponsorMatch";
import { SkillGap } from "@/components/SkillGap";
import { GradSchemeMatcher } from "@/components/GradSchemeMatcher";
import { SalaryBand } from "@/components/SalaryBand";
import { IndustrySpecialism } from "@/components/IndustrySpecialism";
import type {
  GithubProfile,
  GithubRepo,
  LanguageBreakdown as LanguageBreakdownType,
} from "@/types/github";

interface AnalyzeSuccess {
  profile: GithubProfile;
  topRepos: GithubRepo[];
  languages: LanguageBreakdownType[];
  aiSummary: string | null;
  aiError: string | null;
}

type Status =
  | { kind: "idle" }
  | { kind: "loading"; username: string }
  | { kind: "error"; message: string }
  | ({ kind: "success" } & AnalyzeSuccess);

type AnalyzeResponse = AnalyzeSuccess | { error: string };

/**
 * Client wrapper that owns the search -> fetch -> display flow.
 * Keeps Hero a pure server component.
 */
export function AnalyzeSection() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function analyze(username: string) {
    setStatus({ kind: "loading", username });

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });

      const data = (await res.json()) as AnalyzeResponse;

      if (!res.ok || "error" in data) {
        const message =
          "error" in data ? data.error : `Request failed (${res.status}).`;
        setStatus({ kind: "error", message });
        return;
      }

      setStatus({
        kind: "success",
        profile: data.profile,
        topRepos: data.topRepos,
        languages: data.languages,
        aiSummary: data.aiSummary,
        aiError: data.aiError,
      });
    } catch {
      setStatus({
        kind: "error",
        message: "Network error — please check your connection and try again.",
      });
    }
  }

  return (
    <div className="w-full">
      <div className="mx-auto max-w-xl">
        <SearchForm
          onSubmitUsername={analyze}
          disabled={status.kind === "loading"}
        />
      </div>

      {/* Trust strip is decoration for the empty state only.
          When loading/error/success it gives way to live content. */}
      {status.kind === "idle" && (
        <div className="mx-auto max-w-2xl">
          <TrustStrip />
        </div>
      )}

      {status.kind === "loading" && (
        <>
          <div
            role="status"
            aria-live="polite"
            className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground"
          >
            <Loader2 className="h-4 w-4 animate-spin" />
            Analysing <span className="font-mono">{status.username}</span>…
            <span className="text-xs opacity-70">(AI takes ~5s)</span>
          </div>
          <ResultsSkeleton />
        </>
      )}

      {status.kind === "error" && (
        <div
          role="alert"
          className="mt-6 flex items-start gap-3 rounded-lg border border-destructive/40 bg-destructive/5 p-4 text-left text-sm text-destructive"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <p>{status.message}</p>
        </div>
      )}

      {status.kind === "success" && (
        <>
          <ProfileCard profile={status.profile} topRepos={status.topRepos} />
          <AiSummary
            summary={status.aiSummary}
            error={status.aiError}
          />
          <LanguageBreakdown languages={status.languages} />
          <IndustrySpecialism topRepos={status.topRepos} />
          <SkillGap
            languages={status.languages}
            topRepos={status.topRepos}
          />
          <SalaryBand
            profile={status.profile}
            topRepos={status.topRepos}
          />
          <VisaSponsorMatch languages={status.languages} />
          <GradSchemeMatcher
            languages={status.languages}
            topRepos={status.topRepos}
          />
          <TopReposList repos={status.topRepos} />
        </>
      )}
    </div>
  );
}
