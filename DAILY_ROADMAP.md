# 📅 Daily Commit Roadmap — 28 Days

> **Goal:** One meaningful commit per day, 30–60 mins each. By Day 28 you'll have a deployed, portfolio-ready app.

Each day's task is small enough to finish in one sitting and produces a visible change you can commit with confidence.

---

## Week 1 — Foundation & GitHub Integration

| Day | Task | Commit Message |
|---|---|---|
| 1 | Initial scaffold — Next.js + TS + Tailwind, README, repo on GitHub | `chore: initial project scaffold` |
| 2 | Add shadcn/ui, configure base theme, layout shell | `feat: setup shadcn ui and theme` |
| 3 | Build Hero section with headline + tagline | `feat: add hero section` |
| 4 | Add SearchForm component (input + submit) with client validation | `feat: add github username search form` |
| 5 | Create `/api/analyze` route, integrate Octokit, fetch user profile | `feat: integrate github user api` |
| 6 | Fetch user's public repos, sort by stars | `feat: fetch and sort user repositories` |
| 7 | Render ProfileCard with avatar, bio, stats (followers, repos) | `feat: add profile card component` |

## Week 2 — Analysis & Visualisation

| Day | Task | Commit Message |
|---|---|---|
| 8 | Aggregate language stats from top repos | `feat: aggregate language statistics` |
| 9 | Add Recharts language breakdown chart | `feat: add language breakdown chart` |
| 10 | Display top 6 repos as cards (name, desc, stars, lang) | `feat: add top repositories grid` |
| 11 | Set up OpenAI/Anthropic SDK in `lib/ai.ts` | `chore: setup ai sdk` |
| 12 | Write UK-tuned analysis prompt; first AI call | `feat: implement ai profile analysis` |
| 13 | Render AI summary with markdown support | `feat: render ai summary as markdown` |
| 14 | Add loading skeletons for all async sections | `feat: add loading skeletons` |

## Week 3 — UK Market Features

| Day | Task | Commit Message |
|---|---|---|
| 15 | Define `lib/uk-market.ts` — UK skill weights for Full-Stack/Junior | `feat: add uk market scoring config` |
| 16 | Compute UK Match Score (0–100) from languages + repos | `feat: implement uk match score` |
| 17 | Build SkillGap component listing missing UK-in-demand skills | `feat: add skill gap analysis` |
| 18 | Suggest next projects via AI, filtered by gaps | `feat: ai-suggested next projects` |
| 19 | Add "Suggested Learning Resources" section (curated UK links) | `feat: add learning resources` |
| 20 | Generate shareable Open Graph image (`opengraph-image.tsx`) | `feat: dynamic og image for sharing` |
| 21 | Add export-as-PDF button (use `@react-pdf/renderer` or print CSS) | `feat: export profile report as pdf` |

## Week 4 — Polish & Deploy

| Day | Task | Commit Message |
|---|---|---|
| 22 | Add Typed.js animation to hero ("Analyse… Improve… Get Hired") | `feat: add typed.js hero animation` |
| 23 | Error handling: 404 user, rate-limit, network errors | `feat: add comprehensive error handling` |
| 24 | Add toast notifications (sonner) | `feat: add toast notifications` |
| 25 | Mobile-responsive audit and fixes | `fix: mobile responsive layout` |
| 26 | SEO: meta tags, sitemap, robots.txt | `feat: seo optimization` |
| 27 | Deploy to Vercel, set env vars, smoke test | `chore: deploy to production` |
| 28 | Final README polish + screenshots + add to your portfolio | `docs: finalise readme with screenshots` |

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
