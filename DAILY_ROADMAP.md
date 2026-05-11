# 📅 Daily Commit Roadmap — 28 Days

> **Goal:** One meaningful commit per day, 30–60 mins each. By Day 28 you'll have a deployed, portfolio-ready app that does something no other GitHub profile analyzer does — analyse profiles specifically for the UK job market.

Each day's task is small enough to finish in one sitting and produces a visible change you can commit with confidence.

---

## Week 1 — Foundation & GitHub Integration ✅ COMPLETE

| Day | Task | Commit Message |
|---|---|---|
| 1 | Initial scaffold — Next.js + TS + Tailwind, README, repo on GitHub | `chore: initial project scaffold` |
| 2 | Add shadcn/ui, configure base theme, layout shell | `feat: setup shadcn ui and theme` |
| 3 | Build Hero section with headline + tagline | `feat: add hero section` |
| 4 | Add SearchForm component with client validation | `feat: add github username search form` |
| 5 | Create `/api/analyze` route, integrate Octokit, fetch user profile | `feat: integrate github user api` |
| 6 | Fetch user's public repos, sort by stars | `feat: fetch and sort user repositories` |
| 7 | Render ProfileCard with avatar, bio, stats | `feat: add profile card component` |

## Week 2 — Analysis & Visualisation

| Day | Task | Commit Message |
|---|---|---|
| 8 | Aggregate language stats from top repos | `feat: aggregate language statistics` |
| 9 | Add Recharts language breakdown chart | `feat: add language breakdown chart` |
| 10 | Display top repos as a card grid (name, desc, stars, lang, topics) | `feat: add top repositories grid` |
| 11 | Set up OpenAI/Anthropic SDK in `lib/ai.ts` | `chore: setup ai sdk` |
| 12 | Write UK-tuned analysis prompt; first AI call | `feat: implement ai profile analysis` |
| 13 | Render AI summary with markdown support | `feat: render ai summary as markdown` |
| 14 | Add loading skeletons for all async sections | `feat: add loading skeletons` |

## Week 3 — 🇬🇧 UK Superpowers (the unique features)

This is the week that makes the project genuinely different from every other GitHub profile analyzer online.

| Day | Task | Commit Message |
|---|---|---|
| 15 | UK skill weights + Match Score — `lib/uk-market.ts`, compute 0–100 score for Full-Stack & Graduate roles | `feat: add uk market match score` |
| 16 | SkillGap component + AI-suggested next projects (filtered by gaps) | `feat: add skill gap and next-project suggestions` |
| 17 | 🇬🇧 **Visa Sponsor Match** — `lib/uk-companies.ts` with UK Skilled Worker visa sponsors grouped by stack (Revolut, Monzo, GCHQ, BAE, Capgemini, etc.); show matched companies for the user's stack | `feat: add uk visa sponsor matcher` |
| 18 | 🇬🇧 **Graduate Scheme Matcher** — `lib/uk-schemes.ts` scoring against PwC, KPMG, JPMorgan, Goldman, Accenture, NHS Digital, BAE Systems graduate programmes | `feat: add uk graduate scheme matcher` |
| 19 | 🇬🇧 **UK Salary Band Estimate** — `lib/uk-salary.ts` with £ ranges by role + location (London / Manchester / remote-UK); show estimated band based on profile | `feat: add uk salary band estimate` |
| 20 | 🇬🇧 **Industry Specialism Detector** — scan repos for Fintech (Open Banking, Stripe, FCA), GovTech (gov.uk patterns, NHS FHIR, accessibility), Healthtech (HL7, NHS Digital) signals | `feat: add uk industry specialism detector` |
| 21 | 🇬🇧 **LinkedIn-ready Summary Generator** — AI generates a UK-English LinkedIn About section optimised for UK recruiter search terms; copy-to-clipboard | `feat: add linkedin summary generator` |

## Week 4 — Polish & Deploy

| Day | Task | Commit Message |
|---|---|---|
| 22 | Dynamic Open Graph image (`opengraph-image.tsx`) for shareability | `feat: dynamic og image for sharing` |
| 23 | Export full UK report as PDF (`@react-pdf/renderer` or print CSS) | `feat: export profile report as pdf` |
| 24 | Add Typed.js animation to hero ("Analyse… Improve… Get Hired in the UK") | `feat: add typed.js hero animation` |
| 25 | Error handling + Sonner toast notifications | `feat: add error handling and toasts` |
| 26 | Mobile-responsive audit + SEO meta tags + sitemap | `feat: mobile audit and seo` |
| 27 | Deploy to Vercel, configure env vars, smoke test | `chore: deploy to production` |
| 28 | Final README polish + screenshots + add to portfolio + LinkedIn post | `docs: finalise readme with screenshots` |

---

## 🇬🇧 The 5 UK Superpowers — why this project is unique

No other GitHub profile analyzer (that we've found) ships these together:

1. **Visa Sponsor Match** — every developer who needs a UK Skilled Worker visa worries about this. Your tool maps their stack → known sponsors.
2. **Graduate Scheme Matcher** — UK has a unique grad-scheme culture (Big 4, big banks, BAE, civil service). Your tool scores against them by name.
3. **UK Salary Band Estimate** — £ matters. A rough but informed band gives users a concrete goalpost.
4. **Industry Specialism Detector** — Fintech / GovTech / Healthtech are the three UK growth engines. Detecting them in repos is a real signal.
5. **LinkedIn Summary Generator** — UK English, UK recruiter keywords, UK norms (e.g. mentioning visa status, location flexibility).

---

## 🔥 Streak Tips

1. **Commit at the end of each session**, even if the feature isn't fully polished. Small commits beat perfect ones.
2. **Use Conventional Commits** (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`). Recruiters notice this.
3. **Push every day** — local commits don't count toward the GitHub graph.
4. **If you miss a day**, do a tiny `docs:` or `chore:` the next day to keep momentum.
5. **Branch per week** (`week-1-foundation`, `week-2-analysis`...) — looks clean and shows planning.

## 🚦 Definition of Done for Each Day

- [ ] Code compiles with no TS errors (`npm run build`)
- [ ] Lint passes (`npm run lint`)
- [ ] Visible change in the running app
- [ ] Commit message follows Conventional Commits
- [ ] Pushed to `origin/main` (or feature branch + merged)
