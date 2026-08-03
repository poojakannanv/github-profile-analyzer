"use client";

import { useState } from "react";
import { AlertCircle, Loader2, RefreshCw } from "lucide-react";
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
import { LinkedInSummary } from "@/components/LinkedInSummary";
import { ToastProvider, useToast } from "@/components/Toaster";
import {
  classifyHttpError,
  networkError,
  type AnalyzeError,
} from "@/lib/errors";
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
  | { kind: "error"; username: string; error: AnalyzeError }
  | ({ kind: "success"; username: string } & AnalyzeSuccess);

type AnalyzeResponse = AnalyzeSuccess | { error: string };

/**
 * Client wrapper that owns the search -> fetch -> display flow.
 * Keeps Hero a pure server component. Wraps everything in a ToastProvider
 * so children (including the degraded-AI notice below) can push toasts.
 */
export function AnalyzeSection() {
  return (
    <ToastProvider>
      <AnalyzeSectionInner />
    </ToastProvider>
  );
}

function AnalyzeSectionInner() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const { push } = useToast();

  async function analyze(username: string) {
    setStatus({ kind: "loading", username });

    let res: Response;
    try {
      res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });
    } catch {
      setStatus({ kind: "error", username, error: networkError() });
      return;
    }

    let data: AnalyzeResponse | null = null;
    try {
      data = (await res.json()) as AnalyzeResponse;
    } catch {
      // Body wasn't JSON — treat as a server error
      setStatus({
        kind: "error",
        username,
        error: classifyHttpError(res.status, null),
      });
      return;
    }

    if (!res.ok || "error" in data) {
      const bodyForClassify = "error" in data ? data : null;
      setStatus({
        kind: "error",
        username,
        error: classifyHttpError(res.status, bodyForClassify),
      });
      return;
    }

    setStatus({
      kind: "success",
      username,
      profile: data.profile,
      topRepos: data.topRepos,
      languages: data.languages,
      aiSummary: data.aiSummary,
      aiError: data.aiError,
    });

    // Non-blocking notice: profile loaded fine but AI degraded.
    if (data.aiError) {
      push({
        tone: "warning",
        title: "AI report unavailable",
        description:
          "Showing the profile without the AI summary. Everything else is live.",
      });
    }
  }

  function retry() {
    if (status.kind === "error" || status.kind === "success" || status.kind === "loading") {
      analyze(status.username);
    }
  }

  return (
    <div className="w-full">
      {/* The search form stays a comfortable reading width at every
          resolution; only the report below it widens. */}
      <div className="mx-auto w-full max-w-xl">
        <SearchForm
          onSubmitUsername={analyze}
          disabled={status.kind === "loading"}
        />
      </div>

      {status.kind === "idle" && (
        <div className="mx-auto w-full max-w-2xl">
          <TrustStrip />
        </div>
      )}

      {status.kind === "loading" && (
        <div className="report-width">
          <div
            role="status"
            aria-live="polite"
            className="mt-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-sm text-muted-foreground"
          >
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>
              Analysing <span className="font-mono">{status.username}</span>…
            </span>
            <span className="text-xs opacity-70">(AI takes ~5s)</span>
          </div>
          <ResultsSkeleton />
        </div>
      )}

      {status.kind === "error" && (
        <div className="mx-auto w-full max-w-2xl">
          <ErrorPanel
            username={status.username}
            error={status.error}
            onRetry={retry}
          />
        </div>
      )}

      {status.kind === "success" && (
        <div className="report-width">
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
          <LinkedInSummary
            profile={status.profile}
            topRepos={status.topRepos}
            languages={status.languages}
          />
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */

interface ErrorPanelProps {
  username: string;
  error: AnalyzeError;
  onRetry: () => void;
}

function ErrorPanel({ username, error, onRetry }: ErrorPanelProps) {
  return (
    <div
      role="alert"
      className="mt-6 rounded-lg border border-destructive/40 bg-destructive/5 p-5 text-sm"
    >
      <div className="flex items-start gap-3">
        <AlertCircle
          className="mt-0.5 h-4 w-4 shrink-0 text-destructive"
          aria-hidden="true"
        />
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-destructive">{error.title}</p>
          <p className="mt-1 text-destructive/90">{error.message}</p>
          <p className="mt-2 text-xs text-muted-foreground">
            Tried <span className="font-mono">{username}</span>
          </p>

          {error.retryable && (
            <button
              type="button"
              onClick={onRetry}
              className="mt-3 inline-flex items-center gap-1.5 rounded-md border border-destructive/40 bg-background px-3 py-1.5 text-xs font-medium text-destructive shadow-sm transition-colors hover:bg-destructive/10"
            >
              <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
              Try again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
