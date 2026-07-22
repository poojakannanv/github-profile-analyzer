/**
 * Day 21 — Client-side error taxonomy.
 *
 * The /api/analyze endpoint returns an { error: string, status } payload.
 * We classify each response into a category the UI can render specifically:
 *
 *  - not_found   → dead-end: the username doesn't exist. No retry.
 *  - rate_limit  → transient: GitHub PAT limit or IP throttle. Retry later.
 *  - forbidden   → private / blocked. No retry.
 *  - network     → the fetch itself failed. Retry now.
 *  - server      → 5xx from our route. Retry now.
 *  - unknown     → fallback bucket.
 */

export type AnalyzeErrorKind =
  | "not_found"
  | "rate_limit"
  | "forbidden"
  | "network"
  | "server"
  | "unknown";

export interface AnalyzeError {
  kind: AnalyzeErrorKind;
  /** Short line shown as the error headline. */
  title: string;
  /** Longer explanation with a suggested next step. */
  message: string;
  /** True when a Retry button makes sense. */
  retryable: boolean;
}

/** Build an AnalyzeError from a failed fetch Response + parsed body. */
export function classifyHttpError(
  status: number,
  body: { error?: unknown } | null,
): AnalyzeError {
  const raw = typeof body?.error === "string" ? body.error : "";

  if (status === 404) {
    return {
      kind: "not_found",
      title: "Profile not found",
      message:
        "GitHub doesn't have a user with that username. Check the spelling and try again.",
      retryable: false,
    };
  }
  if (status === 429) {
    return {
      kind: "rate_limit",
      title: "Rate limited",
      message:
        raw ||
        "GitHub is throttling requests. Wait a minute and try again — this usually clears quickly.",
      retryable: true,
    };
  }
  if (status === 403) {
    return {
      kind: "forbidden",
      title: "Profile blocked or private",
      message:
        raw ||
        "GitHub returned a 403. The account may be suspended or restricted.",
      retryable: false,
    };
  }
  if (status >= 500) {
    return {
      kind: "server",
      title: "Server error",
      message:
        raw ||
        "Our analyze route hit an unexpected error. Try again in a moment.",
      retryable: true,
    };
  }
  if (status >= 400) {
    return {
      kind: "unknown",
      title: "Request failed",
      message: raw || `Request failed (${status}).`,
      retryable: false,
    };
  }
  return {
    kind: "unknown",
    title: "Unexpected response",
    message: raw || `Unexpected status ${status}.`,
    retryable: true,
  };
}

/** Build an AnalyzeError for a network-level failure (no response). */
export function networkError(): AnalyzeError {
  return {
    kind: "network",
    title: "Can't reach the server",
    message:
      "Check your internet connection and try again. If this persists, refresh the page.",
    retryable: true,
  };
}
