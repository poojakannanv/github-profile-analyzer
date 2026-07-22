# Daily Commit Roadmap — 28 Days

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

## Week 2 — Analysis & Visualisation ✅ COMPLETE

| Day | Task | Commit Message |
|---|---|---|
| 8 | Aggregate language stats from top repos | `feat: aggregate language statistics` |
| 9 | Add Recharts language breakdown chart | `feat: add language breakdown chart` |
| 10 | Display top repos as a card grid | `feat: add top repositories grid` |
| 11 | Set up OpenAI/Anthropic SDK in `lib/ai.ts` | `chore: setup ai sdk` |
| 12 | Write UK-tuned analysis prompt; first AI call | `feat: implement ai profile analysis` |
| 13 | Render AI summary with markdown support | `feat: render ai summary as markdown` |
| 14 | Add loading skeletons for all async sections | `feat: add loading skeletons` |

## Week 3 — UK Superpowers ✅ COMPLETE

This is the week that makes the project genuinely different from every other GitHub profile analyzer online. Actual ship order below matches the commit log.

| Day | Task | Commit Message |
|---|---|---|
| 15 | **Visa Sponsor Match** — `lib/uk-sponsors.ts` with UK Skilled Worker sponsors grouped by stack (Monzo, Revolut, Wise, Starling, Cloudflare, DeepMind, Bloomberg, etc.); show matched companies for the user's stack | `feat(uk): add UK visa sponsor match` |
| 16 | **Skill Gap detector** — `lib/uk-skills.ts` scoring the user's stack against 25 high-demand UK skills across five categories (Frontend / Backend / DevOps / Data-AI / Mobile) with have-vs-gap chips and a coverage bar | `feat(uk): add skill gap detector` |
| 17 | **Graduate Scheme Matcher** — `lib/uk-grad-schemes.ts` with 16 well-known UK grad programmes (Civil Service Fast Stream, Bloomberg, Google STEP, J.P. Morgan, Goldman, BBC, GCHQ, PwC…) plus application-window awareness (open / closing / opens-in-X) | `feat(uk): add graduate scheme matcher` |
| 18 | **UK Salary Band Estimate** — `lib/uk-salary.ts` mapping GitHub signals (log-dampened) to a 5-tier London band with Rest-of-UK adjustment (-15%) and a sector boost when Fintech / AI / Infra / Gaming signals fire | `feat(uk): add salary band estimate` |
| 19 | **Industry Specialism Detector** — `lib/uk-industries.ts` scores eight UK industries (Fintech, AI/ML, DevOps, Frontend, Backend, Data, Mobile, Security) with primary + secondary picks, confidence labels, and evidence cards showing why | `feat(uk): add industry specialism detector` |
| 20 | **LinkedIn Summary Generator** — `lib/linkedin-summary.ts` pure template builder (no AI call) producing a UK-English headline + About paragraph with copy buttons, character counters, and live edit | `feat(uk): add LinkedIn summary generator` |
| 21 | Error handling + retries + degraded-AI toast | `feat: add error taxonomy and retry` |

## Week 4 — Polish & Deploy

| Day | Task | Commit Message |
|---|---|---|
| 22 | Dynamic Open Graph image (`opengraph-image.tsx`) for shareability | `feat: dynamic og image for sharing` |
| 23 | Export full UK report as PDF (`@react-pdf/renderer` or print CSS) | `feat: export profile report as pdf` |
| 24 | Add Typed.js animation to hero ("Analyse… Improve… Get Hired in the UK") | `feat: add typed.js hero animation` |
| 25 | Mobile-responsive audit + SEO meta tags + sitemap | `feat: mobile audit and seo` |
| 26 | Analytics + performance pass (Lighthouse) | `perf: performance and analytics pass` |
| 27 | Deploy to Vercel, configure env vars, smoke test | `chore: deploy to production` |
| 28 | Final README polish + screenshots + LinkedIn post | `docs: finalise readme with screenshots` |

---

## The 5 UK Superpowers — why this project is unique

No other GitHub profile analyzer (that we've found) ships these together:

1. **Visa Sponsor Match** — every developer who needs a UK Skilled Worker visa worries about this. Maps their stack → known sponsors.
2. **Graduate Scheme Matcher** — UK has a unique grad-scheme culture (Big 4, big banks, BAE, civil service). Scores against them by name with live application-window awareness.
3. **UK Salary Band Estimate** — £ matters. A rough but informed band gives users a concrete goalpost, adjusted for region and sector.
4. **Industry Specialism Detector** — Fintech / AI / DevOps / Data are UK growth engines. Detecting them in repos is a real signal.
5. **LinkedIn Summary Generator** — UK English, UK recruiter keywords, UK norms (mentioning visa status, location flexibility), all rendered client-side.

---

## Streak Tips

1. **Commit at the end of each session**, even if the feature isn't fully polished. Small commits beat perfect ones.
2. **Use Conventional Commits** (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`). Recruiters notice this.
3. **Push every day** — local commits don't count toward the GitHub graph.
4. **If you miss a day**, do a tiny `docs:` or `chore:` the next day to keep momentum.

## Definition of Done for Each Day

- [ ] Code compiles with no TS errors (`npm run type-check`)
- [ ] Lint passes (`npm run lint`)
- [ ] Visible change in the running app
- [ ] Commit message follows Conventional Commits
- [ ] Pushed to `origin/main`
