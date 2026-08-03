import { Sparkles, Info } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface AiSummaryProps {
  /** Markdown text from the LLM. */
  summary: string | null;
  /** If the AI failed or wasn't configured, the user-facing reason. */
  error: string | null;
  /** Optional provider label, e.g. "Groq · Llama 3.3" */
  providerLabel?: string;
}

/**
 * Day 13 — proper markdown rendering for the AI report.
 * Uses react-markdown with a custom component map so each markdown element
 * is styled with Tailwind to fit the site's design language.
 */
export function AiSummary({
  summary,
  error,
  providerLabel = "AI-generated · UK Edition",
}: AiSummaryProps) {
  if (!summary) {
    return (
      <section
        className="mt-8 flex items-start gap-3 rounded-2xl border border-dashed border-border bg-muted/40 p-5"
        aria-labelledby="ai-summary-empty-heading"
      >
        <Info
          className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground"
          aria-hidden="true"
        />
        <div>
          <h3
            id="ai-summary-empty-heading"
            className="text-sm font-semibold text-foreground"
          >
            AI report unavailable
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            {error ??
              "The AI didn't return a report. Try refreshing in a moment."}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      className="mt-8 overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/5 via-card to-card shadow-sm"
      aria-labelledby="ai-summary-heading"
    >
      <header className="flex items-center justify-between border-b border-border/60 px-4 py-3 sm:px-6">
        <div className="inline-flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
          <h3 id="ai-summary-heading" className="text-sm font-semibold">
            UK Market Analysis
          </h3>
        </div>
        <span className="text-xs text-muted-foreground">{providerLabel}</span>
      </header>

      <div className="px-4 py-5 text-sm leading-relaxed text-foreground/90 sm:px-6">
        <ReactMarkdown
          components={{
            h1: ({ children }) => (
              <h4 className="mt-6 text-base font-semibold text-foreground first:mt-0">
                {children}
              </h4>
            ),
            h2: ({ children }) => (
              <h4 className="mt-6 flex items-center gap-2 text-base font-semibold text-foreground first:mt-0">
                <span className="h-1 w-3 rounded-full bg-primary" aria-hidden="true" />
                {children}
              </h4>
            ),
            h3: ({ children }) => (
              <h5 className="mt-5 text-sm font-semibold text-foreground first:mt-0">
                {children}
              </h5>
            ),
            p: ({ children }) => (
              <p className="mt-2 text-sm text-foreground/80">{children}</p>
            ),
            ul: ({ children }) => (
              <ul className="mt-2 space-y-1.5 pl-1 text-sm text-foreground/80">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-sm text-foreground/80">
                {children}
              </ol>
            ),
            li: ({ children }) => (
              <li className="flex gap-2 leading-relaxed">
                <span
                  aria-hidden="true"
                  className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-primary"
                />
                <span className="min-w-0 flex-1">{children}</span>
              </li>
            ),
            strong: ({ children }) => (
              <strong className="font-semibold text-foreground">
                {children}
              </strong>
            ),
            em: ({ children }) => (
              <em className="italic text-foreground/90">{children}</em>
            ),
            code: ({ children }) => (
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-[0.85em] text-foreground">
                {children}
              </code>
            ),
            a: ({ href, children }) => (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary underline-offset-2 hover:underline"
              >
                {children}
              </a>
            ),
          }}
        >
          {summary}
        </ReactMarkdown>
      </div>
    </section>
  );
}
