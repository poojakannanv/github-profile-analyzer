"use client";

import { useId, useState, type FormEvent } from "react";
import { Loader2, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { validateGithubUsername } from "@/lib/validate";

interface SearchFormProps {
  /** Optional initial value, e.g. preset from URL params later */
  defaultValue?: string;
  /** Called with the validated username when the user submits */
  onSubmitUsername?: (username: string) => void;
  /** Externally-controlled disabled state (e.g. while parent is fetching) */
  disabled?: boolean;
}

/**
 * Pure form component — validates input and emits the cleaned username.
 * Fetching, loading state and result rendering live in the parent
 * (`AnalyzeSection`) so this stays reusable.
 */
export function SearchForm({
  defaultValue = "",
  onSubmitUsername,
  disabled = false,
}: SearchFormProps) {
  const inputId = useId();
  const errorId = useId();

  const [value, setValue] = useState(defaultValue);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = validateGithubUsername(value);
    if (!result.valid) {
      setError(result.error);
      return;
    }
    setError(null);
    onSubmitUsername?.(result.value);
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
            "ml-2 h-4 w-4 shrink-0 sm:ml-3",
            hasError ? "text-destructive" : "text-muted-foreground",
          )}
          aria-hidden="true"
        />
        {/* min-w-0 matters: a flex item defaults to min-width:auto, so without
            it the input refuses to shrink below its placeholder text and
            pushes the submit button off the edge at 320px. */}
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
          }}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : undefined}
          className="min-w-0 flex-1 bg-transparent px-2 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none disabled:opacity-60"
        />
        <Button
          type="submit"
          size="default"
          disabled={disabled}
          className="shrink-0 px-3 sm:px-4"
        >
          {disabled ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <Sparkles className="h-4 w-4" aria-hidden="true" />
          )}
          {disabled ? "Analysing…" : "Analyse"}
        </Button>
      </div>

      <div className="mt-3 min-h-[1.25rem] text-xs">
        {hasError ? (
          <p id={errorId} role="alert" className="text-destructive">
            {error}
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
