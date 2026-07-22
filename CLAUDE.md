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

- Built as a daily roadmap: see `DAILY_ROADMAP.md`. One meaningful commit per day, message style `feat(scope): ...` (conventional commits, scope often `uk` or `ai`).
- Git author: Pooja Kannan <poojakannanv98@gmail.com>.
- Key dirs: `app/api/analyze` (single POST endpoint), `components/`, `lib/` (github, ai, uk-* market data), `types/`.

## Two-laptop workflow

This repo lives on a work laptop (feature work and commits) and a personal laptop (running and testing). GitHub is the sync point. Always `git pull` before editing and `git push` at the end of every session, even WIP. After pulling a commit that touched `package.json`, run `npm install`.

## Current state (2026-07-22)

Weeks 1-3 of the roadmap are complete, including the Day 12/13 AI summary (aiSummary in the analyze route, AiSummary component with react-markdown) and all five UK superpower features. Next up is Week 4: OG image (Day 22), PDF export (23), hero animation (24), error handling/toasts (25), mobile/SEO audit (26), Vercel deploy (27), README polish (28). Not yet deployed.
