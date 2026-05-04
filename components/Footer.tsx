export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/40 bg-background">
      <div className="container flex flex-col items-center justify-between gap-3 py-8 text-sm text-muted-foreground sm:flex-row">
        <p>
          Built with{" "}
          <span className="font-medium text-foreground">Next.js</span>,{" "}
          <span className="font-medium text-foreground">TypeScript</span> &amp;{" "}
          <span className="font-medium text-foreground">Tailwind</span>.
        </p>
        <p>
          UK Edition · {new Date().getFullYear()} ·{" "}
          <a
            href="https://github.com/poojakannanv"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground hover:underline"
          >
            @poojakannanv
          </a>
        </p>
      </div>
    </footer>
  );
}
