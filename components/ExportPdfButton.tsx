"use client";

import { useEffect } from "react";
import { FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ExportPdfButtonProps {
  username: string;
  /** Display name if the profile has one; falls back to the username. */
  name: string | null;
}

/**
 * Day 23: export the report as a PDF.
 *
 * Uses the browser's own print pipeline ("Save as PDF") with a dedicated
 * print stylesheet in globals.css, rather than a PDF library. That keeps the
 * text selectable and searchable, reuses the real components instead of a
 * second hand-built layout, and adds nothing to the bundle.
 *
 * The beforeprint/afterprint listeners also cover Ctrl+P, not just the
 * button, for as long as a report is on screen:
 *  - dark theme is switched off for the print, so nobody burns a toner
 *    cartridge on a navy page, then restored afterwards
 *  - the document title becomes the report name, because browsers use it
 *    as the suggested PDF filename
 */
export function ExportPdfButton({ username, name }: ExportPdfButtonProps) {
  useEffect(() => {
    const root = document.documentElement;
    let wasDark = false;
    let previousTitle = document.title;

    function beforePrint() {
      wasDark = root.classList.contains("dark");
      previousTitle = document.title;
      if (wasDark) {
        root.classList.remove("dark");
        root.style.colorScheme = "light";
      }
      document.title = `${name ?? username} (${username}) - UK GitHub Profile Report`;
    }

    function afterPrint() {
      if (wasDark) {
        root.classList.add("dark");
        root.style.colorScheme = "dark";
      }
      document.title = previousTitle;
    }

    window.addEventListener("beforeprint", beforePrint);
    window.addEventListener("afterprint", afterPrint);
    return () => {
      window.removeEventListener("beforeprint", beforePrint);
      window.removeEventListener("afterprint", afterPrint);
    };
  }, [username, name]);

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={() => window.print()}
      aria-label="Export this report as a PDF"
    >
      <FileDown className="h-4 w-4" aria-hidden="true" />
      Export PDF
    </Button>
  );
}
