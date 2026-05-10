"use client";

import { useState } from "react";
import { AlertCircle, Loader2 } from "lucide-react";
import { SearchForm } from "@/components/SearchForm";
import { ProfilePreview } from "@/components/ProfilePreview";
import { TopReposList } from "@/components/TopReposList";
import type { GithubProfile, GithubRepo } from "@/types/github";

interface AnalyzeSuccess {
  profile: GithubProfile;
  topRepos: GithubRepo[];
}

type Status =
  | { kind: "idle" }
  | { kind: "loading"; username: string }
  | { kind: "error"; message: string }
  | ({ kind: "success" } & AnalyzeSuccess);

type AnalyzeResponse = AnalyzeSuccess | { error: string };

/**
 * Client wrapper that owns the search → fetch → display flow.
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
      <SearchForm
        onSubmitUsername={analyze}
        disabled={status.kind === "loading"}
      />

      {status.kind === "loading" && (
        <div
          role="status"
          aria-live="polite"
          className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground"
        >
          <Loader2 className="h-4 w-4 animate-spin" />
          Analysing <span className="font-mono">{status.username}</span>…
        </div>
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
          <ProfilePreview profile={status.profile} />
          <TopReposList repos={status.topRepos} />
        </>
      )}
    </div>
  );
}
