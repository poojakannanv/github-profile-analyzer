"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { CheckCircle2, AlertTriangle, Info, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * Day 21 — lightweight in-house toast.
 *
 * A minimal Context + hook so we don't pull in Sonner. Toasts stack in a
 * bottom-right region, auto-dismiss after 5s, and can be dismissed manually.
 */

export type ToastTone = "success" | "warning" | "info";

interface Toast {
  id: number;
  tone: ToastTone;
  title: string;
  description?: string;
}

interface ToastContextValue {
  push: (t: Omit<Toast, "id">) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const push = useCallback((t: Omit<Toast, "id">) => {
    setToasts((prev) => [...prev, { ...t, id: Date.now() + Math.random() }]);
  }, []);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const value = useMemo(() => ({ push }), [push]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="pointer-events-none fixed bottom-4 right-4 z-50 flex w-full max-w-sm flex-col gap-2"
      >
        {toasts.map((t) => (
          <ToastCard key={t.id} toast={t} onDismiss={() => dismiss(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be called inside <ToastProvider>");
  }
  return ctx;
}

/* -------------------------------------------------------------------------- */

function ToastCard({ toast, onDismiss }: { toast: Toast; onDismiss: () => void }) {
  useEffect(() => {
    const timer = window.setTimeout(onDismiss, 5000);
    return () => window.clearTimeout(timer);
  }, [onDismiss]);

  const { Icon, tone } = toneMeta(toast.tone);

  return (
    <div
      role={toast.tone === "warning" ? "alert" : "status"}
      className={
        "pointer-events-auto flex items-start gap-3 rounded-lg border bg-card p-3 text-sm shadow-md " +
        tone
      }
    >
      <Icon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      <div className="min-w-0 flex-1">
        <p className="font-medium text-foreground">{toast.title}</p>
        {toast.description && (
          <p className="mt-0.5 text-xs text-muted-foreground">
            {toast.description}
          </p>
        )}
      </div>
      <button
        type="button"
        onClick={onDismiss}
        className="shrink-0 rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        aria-label="Dismiss notification"
      >
        <X className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
    </div>
  );
}

function toneMeta(tone: ToastTone): { Icon: LucideIcon; tone: string } {
  switch (tone) {
    case "success":
      return {
        Icon: CheckCircle2,
        tone: "border-emerald-500/30 [--tw-shadow-color:theme(colors.emerald.500/0.1)]",
      };
    case "warning":
      return {
        Icon: AlertTriangle,
        tone: "border-amber-500/30 [--tw-shadow-color:theme(colors.amber.500/0.1)]",
      };
    case "info":
    default:
      return { Icon: Info, tone: "border-border" };
  }
}
