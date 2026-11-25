# GitHub Profile Analyzer

Next.js 14 (App Router) app that analyses any GitHub profile for the UK job market: strengths, skill gaps, match score, visa sponsor match, graduate schemes, salary band, and an AI-written UK market summary.

## Stack

Next.js 14, TypeScript, Tailwind + shadcn/ui, Recharts, @octokit/rest, openai SDK (works with any OpenAI-compatible provider such as Groq or Together), react-markdown.

## Commands

- `npm run dev` - local dev server
- `npm run build` - production build (lint + type-check included)
- `npm run lint` / `npm run type-check`

## Environment (.env.local, gitignored, copied between machines manually)

`GITHUB_TOKEN` (read-only PAT, no push scope), `OPENAI_API_KEY`, `OPENAI_BASE_URL`, `OPENAI_MODEL`. Never commit values. The AI layer degrades gracefully if the key is missing (see `lib/ai.ts` `isAiConfigured`).

## Conventions

- `WALKTHROUGH.md` holds the design decisions and interview notes; keep it in step when a decision changes.
- Built as a daily roadmap: see `DAILY_ROADMAP.md`. One meaningful commit per day, message style `feat(scope): ...` (conventional commits, scope often `uk` or `ai`).
- Git author: Pooja Kannan <poojakannanv98@gmail.com>.
- Key dirs: `app/api/analyze` (single POST endpoint), `components/`, `lib/` (github, ai, uk-* market data), `types/`.

## Two-laptop workflow

This repo lives on a work laptop (feature work and commits) and a personal laptop (running and testing). GitHub is the sync point. Always `git pull` before editing and `git push` at the end of every session, even WIP. After pulling a commit that touched `package.json`, run `npm install`.

## Current state (2026-11-24)

Live at https://github-profile-analyzer-blush.vercel.app (Vercel Hobby, auto-deploys from `main`). That is the public URL; the `-poojakannanv` alias sits behind Vercel login. Roadmap Weeks 1-3 are complete and Week 4 is done except Day 26 (analytics + Lighthouse performance pass) and the LinkedIn launch post.

Shipped in Week 4: generated OG image (`app/opengraph-image.tsx`), PDF export via print stylesheet (`components/ExportPdfButton.tsx` + `@media print` in `globals.css`), typed hero tagline (`components/TypedTagline.tsx`), sitemap/robots/canonical/JSON-LD (`app/sitemap.ts`, `app/robots.ts`, `lib/site.ts`).

Gotchas: Groq retired `llama-3.3-70b-versatile` from the free tier, so `OPENAI_MODEL` is `openai/gpt-oss-120b`. Fine-grained GitHub PATs expire; an expired `GITHUB_TOKEN` surfaces as "Failed to reach the GitHub API". Env var changes in Vercel need a redeploy.
