/**
 * Small 4-stat strip shown below the search form before the user analyses
 * anyone. Disappears once an analysis is running or has results, so it never
 * collides with the report cards.
 */
export function TrustStrip() {
  const stats = [
    { value: "100%", label: "Open source" },
    { value: "UK", label: "Market-tuned" },
    { value: "AI", label: "Powered analysis" },
    { value: "Free", label: "To use" },
  ];

  return (
    <div
      role="list"
      className="mt-10 grid w-full grid-cols-2 gap-4 sm:grid-cols-4"
    >
      {stats.map((stat) => (
        <div
          key={stat.label}
          role="listitem"
          className="rounded-lg border border-border/60 bg-card/40 px-4 py-3 text-center backdrop-blur-sm"
        >
          <div className="text-xl font-semibold text-foreground">
            {stat.value}
          </div>
          <div className="mt-0.5 text-xs uppercase tracking-wide text-muted-foreground">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
