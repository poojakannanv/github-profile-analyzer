import { cn } from "@/lib/utils";

/**
 * Base skeleton primitive — a muted, pulsing block that mirrors a piece of
 * eventual content. Built on Tailwind's `animate-pulse` so we avoid a
 * dependency on tailwindcss-animate keyframes.
 */
export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "animate-pulse rounded-md bg-muted/70",
        className,
      )}
      {...props}
    />
  );
}
