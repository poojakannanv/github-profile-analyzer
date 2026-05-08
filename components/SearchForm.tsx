"use client";

import { useId, useState, type FormEvent } from "react";
import { Loader2, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { validateGithubUsername } from "@/lib/validate";

interface SearchFormProps {
  /** Optional initial value, e.g. preset from URL params later */
  defaultValue?: string;
  /** Optional submit hook — wired up properly on Day 5 */
  onSubmitUsername?: (username: string) => void;
}

/**
 * Client component for entering a GitHub username.
 * Day 4 scope: validation, loading state, accessible error display.
 * Day 5 will swap the simulated submit for a real /api/analyze call.
 */
export function SearchForm({ defaultValue = "", onSubmitUsername }: SearchFormProps) {
  const inputId = useId();
  const errorId = useId();

  const [value, setValue] = useState(defaultValue);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedFor, setSubmittedFor] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmittedFor(null);

    const result = validateGithubUsername(value);
    if (!result.valid) {
      setError(result.error);
      return;
    }
    setError(null);
    setIsSubmitting(true);

    // Day 4 placeholder: simulate latency, then surface a "ready for Day 5" message.
    // Day 5 will replace this block with: router.push(`/${result.value}`)
    window.setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedFor(result.value);
      onSubmitUsername?.(result.value);
    }, 600);
  }

  const hasError = Boolean(error);

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Analyse a GitHub profile"
      className="w-full"
    >
      <div
        className={cn(
          "flex items-center gap-2 rounded-2xl border bg-card p-2 shadow-lg transition-colors",
          hasError
            ? "border-destructive shadow-destructive/10"
            : "border-border shadow-primary/5",
        )}
      >
        <label htmlFor={inputId} className="sr-only">
          GitHub username
        </label>
        <Search
          className={cn(
            "ml-3 h-4 w-4 shrink-0",
            hasError ? "text-destructive" : "text-muted-foreground",
          )}
          aria-hidden="true"
        />
        <input
          id={inputId}
          type="text"
          inputMode="text"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          placeholder="e.g. poojakannanv"
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            if (error) setError(null);
            if (submittedFor) setSubmittedFor(null);
          }}
          disabled={isSubmitting}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : undefined}
          className="flex-1 bg-transparent px-2 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none disabled:opacity-60"
        />
        <Button type="submit" size="default" disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <Sparkles className="h-4 w-4" aria-hidden="true" />
          )}
          {isSubmitting ? "Analysing…" : "Analyse"}
        </Button>
      </div>

      {/* Status row — error OR Day-5 acknowledgement OR helper text */}
      <div className="mt-3 min-h-[1.25rem] text-xs">
        {hasError ? (
          <p id={errorId} role="alert" className="text-destructive">
            {error}
          </p>
        ) : submittedFor ? (
          <p className="text-emerald-600">
            ✓ <span className="font-mono">{submittedFor}</span> looks valid —
            full analysis wires up on Day 5.
          </p>
        ) : (
          <p className="text-muted-foreground">
            Public GitHub profiles only — no token required.
          </p>
        )}
      </div>
    </form>
  );
}
