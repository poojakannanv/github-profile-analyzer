# GitHub Profile Analyzer 🇬🇧

> An AI-powered tool that analyzes any GitHub profile and generates UK-market-tailored insights for Full-Stack and Graduate Developer roles.

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

## ✨ What It Does

Paste any GitHub username → get a personalised report covering:

- **Profile Summary** — AI-generated narrative of the developer's strengths
- **Tech Stack Breakdown** — language proficiency from real commits
- **Top Projects** — pinned/most-starred repos with quality scores
- **UK Market Match** — alignment with current UK Full-Stack / Junior Dev demand
- **Skill Gap Analysis** — what to learn next based on UK job postings
- **Suggested Next Projects** — portfolio-worthy ideas to fill gaps
- **Shareable Card** — exportable PNG/PDF for LinkedIn

## 🛠️ Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 14 (App Router) | Full-stack React, deploys easily |
| Language | TypeScript | Type-safety, UK employer expectation |
| Styling | Tailwind CSS + shadcn/ui | Rapid, modern, professional |
| GitHub API | Octokit (REST) | Official, well-typed |
| AI | OpenAI / Anthropic API | LLM-generated insights |
| Charts | Recharts | Language breakdown visualisation |
| Deploy | Vercel | Free tier, GitHub integration |

## 🚀 Quick Start

```bash
# Install
npm install

# Set up environment
cp .env.example .env.local
# Add your GITHUB_TOKEN and OPENAI_API_KEY

# Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 📅 Daily Commit Roadmap

This project is designed to be built in **~28 daily commits** of 30–60 mins each.
See [`DAILY_ROADMAP.md`](./DAILY_ROADMAP.md) for the day-by-day plan.

## 🎯 UK Market Focus

The AI analysis prompt is tuned for the UK 2026 job market with emphasis on:

- TypeScript + React/Next.js (highest demand for Full-Stack roles)
- Cloud familiarity (AWS / Azure)
- Testing (Jest, Playwright)
- Graduate scheme readiness signals (Capgemini, BAE, Accenture, JPMorgan, etc.)
- Right-to-work-friendly project quality bars

## 📂 Project Structure

```
github-profile-analyzer/
├── app/                  # Next.js App Router
│   ├── layout.tsx
│   ├── page.tsx          # Landing + analyzer form
│   ├── globals.css
│   └── api/
│       └── analyze/      # API route for GitHub + AI analysis
├── components/           # React components
│   ├── Hero.tsx
│   ├── SearchForm.tsx
│   ├── ProfileCard.tsx
│   ├── LanguageChart.tsx
│   └── ...
├── lib/                  # Helpers
│   ├── github.ts         # Octokit wrappers
│   ├── ai.ts             # LLM analysis
│   └── uk-market.ts      # UK-specific scoring
├── types/                # TypeScript types
└── public/               # Static assets
```

## 📜 Licence

MIT
