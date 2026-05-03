export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6 py-16">
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-medium text-slate-600 shadow-sm">
        <span className="h-2 w-2 rounded-full bg-emerald-500" />
        UK Edition · Built for Full-Stack & Graduate roles
      </div>

      <h1 className="text-center text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl">
        GitHub Profile{" "}
        <span className="bg-gradient-to-r from-brand-600 to-purple-600 bg-clip-text text-transparent">
          Analyzer
        </span>
      </h1>

      <p className="mt-6 max-w-2xl text-center text-lg text-slate-600">
        Paste any GitHub username and get a UK-tailored hiring report — strengths,
        skill gaps, market-match score, and the next projects to build.
      </p>

      {/* TODO Day 4: Replace with <SearchForm /> component */}
      <div className="mt-10 w-full max-w-xl">
        <div className="flex gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
          <input
            type="text"
            placeholder="e.g. poojakannan"
            className="flex-1 rounded-xl bg-transparent px-4 py-3 text-slate-900 placeholder-slate-400 outline-none"
            disabled
          />
          <button
            type="button"
            className="rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white opacity-60"
            disabled
          >
            Analyse
          </button>
        </div>
        <p className="mt-3 text-center text-xs text-slate-500">
          Coming Day 4 — wired up with the GitHub API.
        </p>
      </div>

      <footer className="mt-24 text-center text-sm text-slate-500">
        Day 1 of 28 · Built with Next.js, TypeScript & Tailwind CSS
      </footer>
    </main>
  );
}
