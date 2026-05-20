# GitHub Profile Analyzer 🇬🇧

> The only GitHub profile analyzer built specifically for the **UK job market**.
> Paste any GitHub username and get a UK-tailored hiring report — visa-sponsor matches, graduate scheme fit, salary band, industry specialism, and a ready-to-paste LinkedIn summary.

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Licence: MIT](https://img.shields.io/badge/licence-MIT-green.svg)](./LICENSE)

## 🇬🇧 Why this is different

Every other GitHub profile analyzer is generic and global. This one is **purpose-built for the UK**:

| Feature | What it does | Why it's unique |
|---|---|---|
| 🛂 **Visa Sponsor Match** | Maps your stack to UK Skilled Worker visa sponsors (Revolut, Monzo, GCHQ, BAE, Capgemini, etc.) | The single biggest question for international developers in the UK |
| 🎓 **Graduate Scheme Matcher** | Scores against PwC, KPMG, JPMorgan, Goldman, Accenture, NHS Digital, BAE programmes | UK has a unique grad-scheme culture — generic tools ignore it |
| 💷 **UK Salary Band Estimate** | Rough £ range by role + location (London / Manchester / remote-UK) | Concrete goalpost in £, not vague "good" / "needs work" |
| 🏦 **Industry Specialism Detector** | Detects Fintech (Open Banking, Stripe, FCA), GovTech (gov.uk, NHS FHIR), Healthtech signals from repos | The UK's three biggest growth engines for developers |
| 💼 **LinkedIn Summary Generator** | AI generates a UK-English LinkedIn About section optimised for UK recruiter keywords | UK English, UK norms, visa/location flexibility callouts |

Plus the standard analyzer features:

- **Profile Summary** — AI-generated narrative of strengths
- **Tech Stack Breakdown** — real-data language proficiency chart
- **Top Projects** — most-starred repos with quality signals
- **UK Match Score** — 0–100 alignment with current UK Full-Stack / Graduate demand
- **Skill Gap Analysis** — what to learn next based on UK job postings
- **Suggested Next Projects** — AI ideas to fill the gaps
- **Shareable PDF + OG image** — paste straight into a CV or LinkedIn DM

## 🛠️ Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 14 (App Router) | Full-stack React, deploys easily on Vercel |
| Language | TypeScript | Type-safety, UK employer expectation |
| Styling | Tailwind CSS + shadcn/ui | Rapid, modern, professional |
| GitHub API | Octokit (REST) | Official, well-typed |
| AI | OpenAI-compatible (Groq, OpenAI, Together, etc.) | LLM-generated insights — provider-agnostic |
| Charts | Recharts | Language breakdown visualisation |
| Deploy | Vercel | Free tier, GitHub integration |

## 🚀 Quick Start

```bash
# Install
npm install

# Set up environment
cp .env.example .env.local
# Add GITHUB_TOKEN (optional but recommended)
# Add your AI provider key (Groq free tier recommended — see .env.example)

# Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 📅 Daily Commit Roadmap

This project is built in **28 daily commits** of 30–60 mins each, ending in a deployed app. See [`DAILY_ROADMAP.md`](./DAILY_ROADMAP.md) for the day-by-day plan.

- **Week 1 — Foundation:** Next.js, shadcn/ui, GitHub API integration
- **Week 2 — Analysis & Viz:** Language charts, repo grid, AI summary
- **Week 3 — 🇬🇧 UK Superpowers:** Visa, grad schemes, salary, industry, LinkedIn
- **Week 4 — Polish & Deploy:** OG image, PDF export, Typed.js, deploy

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
│   ├── VisaSponsorMatch.tsx     # 🇬🇧 Week 3
│   ├── GraduateSchemeMatch.tsx  # 🇬🇧 Week 3
│   ├── SalaryEstimate.tsx       # 🇬🇧 Week 3
│   ├── SpecialismDetector.tsx   # 🇬🇧 Week 3
│   └── LinkedinSummary.tsx      # 🇬🇧 Week 3
├── lib/                  # Helpers
│   ├── github.ts         # Octokit wrappers
│   ├── ai.ts             # LLM analysis
│   ├── validate.ts       # Username validation
│   ├── uk-market.ts      # UK skill weights & match score
│   ├── uk-companies.ts   # 🇬🇧 Visa sponsors by stack
│   ├── uk-schemes.ts     # 🇬🇧 Graduate scheme criteria
│   ├── uk-salary.ts      # 🇬🇧 Salary bands by role + location
│   └── uk-specialism.ts  # 🇬🇧 Industry detection patterns
├── types/                # TypeScript types
└── public/               # Static assets
```

## 📜 Licence

MIT
