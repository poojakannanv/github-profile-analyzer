"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

type Theme = "light" | "dark";

/**
 * Light/dark switch.
 *
 * The app already carried a full `.dark` token set and `dark:` variants
 * throughout, but nothing ever put the `dark` class on <html>, so none of it
 * could render. This is the missing control. It also matters for the charts:
 * the series palette has separately validated light and dark steps, and the
 * dark ones are only reachable through here.
 *
 * The initial class is set by an inline script in `app/layout.tsx` before
 * paint, so there is no flash of the wrong theme; this component only reads
 * back what that script decided.
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(
      document.documentElement.classList.contains("dark") ? "dark" : "light",
    );
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", next === "dark");
    document.documentElement.style.colorScheme = next;
    try {
      window.localStorage.setItem("theme", next);
    } catch {
      // Private mode / storage disabled — the choice just won't persist.
    }
    setTheme(next);
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={toggle}
      // Rendered before hydration too, so the header doesn't shift width.
      aria-label={
        theme === null
          ? "Toggle theme"
          : `Switch to ${theme === "dark" ? "light" : "dark"} theme`
      }
      title="Toggle theme"
    >
      <Sun className="h-4 w-4 dark:hidden" aria-hidden="true" />
      <Moon className="hidden h-4 w-4 dark:block" aria-hidden="true" />
    </Button>
  );
}