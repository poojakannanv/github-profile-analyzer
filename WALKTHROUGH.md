# GitHub Profile Analyzer: Walkthrough and Interview Notes

Study notes for talking about this project in interviews. Each section covers a design decision, why it was made, and where to find the code.

Live at https://github-profile-analyzer-blush.vercel.app

## 1. The request flow in one breath

File: `app/api/analyze/route.ts`.

- The whole product is one POST endpoint. It validates the username, fetches the profile and repos in parallel (`Promise.all`), fetches language bytes for those repos, makes one AI call, and returns `{ profile, topRepos, languages, aiSummary, aiError }`.
- Profile and repos are independent, so they run concurrently. The language breakdown needs the repo list first, so it is the one sequential step. The AI call goes last because its prompt is built from everything before it.
- The route is `runtime = "nodejs"`, `dynamic = "force-dynamic"` and `maxDuration = 30`: the Octokit and OpenAI SDKs want Node, a report must never be served stale from a cache, and the AI call needs more than the default timeout.
- Everything the UK features need is already in that one response. The visa, graduate scheme, salary, industry, skill gap and LinkedIn sections are all computed in the browser from it, with no further requests.

Likely question: "Why one endpoint instead of one per feature?" Answer: every feature reads the same three inputs (profile, repos, languages). One round trip means one loading state, one error path, and GitHub is only hit once per analysis.

## 2. Server and client split

Files: `components/Hero.tsx`, `components/AnalyzeSection.tsx`.

- The landing page is server-rendered. `Hero`, `HowItWorks`, `Header` and `Footer` are server components, so the first paint is plain HTML with no data fetching.
- Only seven components are client components, and each one needs the browser: the search form, the analyse flow, the toast system, the theme toggle, the typed tagline, the PDF button, and the LinkedIn editor.
- `AnalyzeSection` owns the search, fetch and display flow as a discriminated union: `idle | loading | error | success`. Each state carries exactly the data it needs (the error state has an `AnalyzeError`, the success state has the report), so the compiler stops you rendering a report that does not exist.
- The API keys never reach the browser. `GITHUB_TOKEN` and `OPENAI_API_KEY` are read only inside the route handler and the `lib/` functions it calls.

Likely question: "Why a state union and not three booleans?" Answer: `isLoading`, `isError` and `data` allow impossible combinations such as loading and error at once. A union makes those states unrepresentable.

## 3. The GitHub data layer

File: `lib/github.ts`.

- One shared Octokit client, created lazily. Without a token GitHub allows 60 requests an hour; with `GITHUB_TOKEN` it allows 5,000. One analysis costs about 14 requests (profile, repo list, then one language call per top repo), so the token is what makes the app usable by more than four people an hour.
- Raw API responses are mapped to small domain types (`types/github.ts`) at the boundary. Nothing outside `lib/github.ts` knows GitHub's field names, so `stargazers_count` becomes `stars` exactly once.
- Repos: forks are excluded (they are not the user's work), sorted by stars with most-recently-updated as the tiebreak, then cut to the top 12.
- Languages: GitHub's `listLanguages` returns bytes per language per repo. Those calls run in parallel, bytes are summed across repos, the top 6 are kept and the tail is folded into "Other".
- Partial failure is tolerated on purpose. One repo's language call failing is treated as empty and the report still renders. A 403 or 429 is different: that is recorded and raised as a rate-limit error after the batch, because silently showing half the data would be misleading.

Likely question: "Why bytes and not repo count for the language chart?" Answer: repo count says a 50-line script and a 20,000-line app are equal. Bytes is closer to where the time actually went. The profile card separately shows repo counts per language, so both views exist.

## 4. One AI call, provider-agnostic, allowed to fail

File: `lib/ai.ts`.

- The client is the OpenAI SDK pointed at any OpenAI-compatible endpoint via `OPENAI_BASE_URL` and `OPENAI_MODEL`. Production runs on Groq's free tier. Swapping provider or model is an environment variable change, not a code change.
- The system prompt fixes the output: British English, exactly four markdown sections in a set order (Snapshot, Strengths, Gaps, Next steps), 250 to 400 words, no preamble. It also says "never fabricate facts, only use what is in the provided data, and if the profile is sparse say so plainly".
- The user message is a compact plain-text digest (profile lines, language percentages, numbered repo list) rather than raw JSON. Smaller prompt, lower cost, faster response.
- `temperature: 0.4` keeps the tone consistent between runs; `max_tokens: 800` caps cost and latency.
- The AI is treated as an optional extra. If the key is missing or the call throws, the route still returns 200 with `aiSummary: null` and an `aiError` string. The UI shows the rest of the report and a toast explaining the AI part is unavailable.

A real example of why that matters: Groq moved `llama-3.3-70b-versatile` off the free tier while this was deployed. The site kept working, minus one card, and the fix was changing `OPENAI_MODEL` to `openai/gpt-oss-120b` in Vercel and redeploying. No code changed.

Likely question: "How do you stop the model inventing things about a candidate?" Answer: it only sees public data that the page also shows, the prompt forbids going beyond it, and every number on the page (salary, match scores, percentages) is computed in code, not by the model.

## 5. Why the UK features are deterministic, not AI

Files: `lib/uk-sponsors.ts`, `lib/uk-grad-schemes.ts`, `lib/uk-salary.ts`, `lib/uk-industries.ts`, `lib/uk-skills.ts`, `lib/linkedin-summary.ts`.

This is the main design decision in the project. The six UK-specific sections are pure functions over curated data. Only the market analysis card uses a model.

- **Visa sponsor match.** A curated list of companies on the Home Office Register of Licensed Sponsors, each with a tech stack. Each shared language scores a point, weighted by the size of the sponsor's stack, so matching 2 of 3 languages beats matching 2 of 6.
- **Graduate schemes.** Each scheme stores its application window as month numbers. `windowState` works out "open now", "closing soon" or "opens in N months" by walking forward month by month, which is what makes windows that cross the year boundary (September to January) come out right.
- **Salary band.** An experience score blends years on GitHub with `log10` of repos, stars and followers, then maps to a tier. The log is deliberate: one viral repo should not turn a graduate into a Staff engineer.
- **Industry specialism.** Per repo: topic hits x3, primary language x2, description hits x1, multiplied by `log10(1 + stars + forks)`. Summed per industry and normalised so the strongest is 100. The UI lists which repos produced each score.
- **Skill gap.** A matrix of skills that recur in UK job posts, compared against the user's languages and topics. Names are normalised so `C#`, `c-sharp` and `csharp` are one key.
- **LinkedIn summary.** A template builder, clamped to LinkedIn's real limits (220 character headline, 2,600 character About).

Why not ask the model for all of it:

- Instant and free. No latency and no token cost for those six sections.
- Explainable. The page can show why a score is what it is. A model's "you are 73% fintech" cannot be audited.
- No invented facts where they would do harm. A hallucinated visa sponsor or salary figure could send someone down the wrong path.
- Testable. Pure functions with fixed inputs are the easiest code in the repo to unit test.

The trade-off to own: curated data goes stale. Sponsor lists, application windows and salary bands need a periodic review, and the UI labels them as directional.

Likely question: "Where would you use AI here that you do not today?" Answer: reading READMEs and commit history to judge project quality, which keyword matching on topics cannot do.

## 6. Error handling, on both sides of the wire

Files: `lib/github.ts` (`GithubFetchError`), `lib/errors.ts`, `components/AnalyzeSection.tsx`.

- Server: `GithubFetchError` carries an HTTP status (404, 403, 429 or 500), and the route returns that status with a readable message.
- Client: `classifyHttpError` turns the response into one of six kinds (`not_found`, `rate_limit`, `forbidden`, `network`, `server`, `unknown`), each with a title, a next step and a `retryable` flag.
- The Retry button only appears when retrying can help. A username that does not exist is a dead end; a rate limit or a dropped connection is not.
- Validation is shared: `lib/validate.ts` implements GitHub's username rules once and is imported by both the form and the route. The form check is for speed, the route check is the one that counts.

A known gap, found in production: an expired GitHub token returns 401, which is not one of the handled statuses, so it surfaced as the generic "Failed to reach the GitHub API". The fix is a dedicated branch for 401 that logs a clear server-side message, because that error is the operator's problem, not the visitor's.

## 7. Charts, colour and accessibility

Files: `components/LanguageChart.tsx`, `lib/chart-palette.ts`, `app/globals.css`, `components/ThemeToggle.tsx`.

- The donut is hand-written SVG, not Recharts. Recharts' `ResponsiveContainer` measures its parent before drawing, and in this layout it rendered an empty chart once the section became a flex row on desktop. An SVG with a `viewBox` has no measurement step and no effects, so it draws correctly at any width on the first render.
- Chart colours are not the GitHub language brand colours. TypeScript and Python are nearly the same blue, and that pair is very common on the profiles this app targets. The chart uses a categorical palette assigned by rank, and never reuses a hue: anything beyond six languages folds into a neutral "Other".
- The brand colours still exist (`lib/language-colours.ts`) for the small dots on repo cards, where they sit next to the language name as text and are never compared against each other.
- Light and dark values for every colour are CSS custom properties, so the theme swaps without re-rendering charts.
- The theme is applied by a small inline script in `app/layout.tsx` before first paint, so a dark-mode user never sees a white flash.
- `prefers-reduced-motion` turns off the background animation and the typed tagline. The tagline also gives screen readers one stable sentence rather than a character-by-character stream (`components/TypedTagline.tsx`).

Likely question: "Why did you drop a charting library for one chart?" Answer: the library's value is handling many chart types and interactions. For one static donut it added bundle weight and a layout bug, and a short hand-written SVG replaced it.

## 8. PDF export, share card and SEO

Files: `components/ExportPdfButton.tsx`, `app/globals.css` (`@media print`), `app/opengraph-image.tsx`, `app/sitemap.ts`, `app/robots.ts`, `lib/site.ts`.

- PDF export uses the browser's print pipeline with a print stylesheet, not a PDF library. The text stays selectable, the real components are reused instead of a second layout, and nothing is added to the bundle. The cost is that the user chooses "Save as PDF" in the print dialog.
- The print rules keep small units (a sponsor card, a skill row) on one page while letting the large sections split, and force background colours to print so chart bars do not vanish.
- The button listens for `beforeprint` and `afterprint`, so Ctrl+P gets the same treatment: dark theme is switched off for the print and the document title becomes the report name, which browsers use as the PDF filename.
- The Open Graph image is generated from code with `next/og`, so the share card cannot drift from the real branding.
- `lib/site.ts` is the single source for the site URL, name and descriptions. Metadata, the share card, the sitemap and robots.txt all read from it.

## 9. Deployment

- Vercel, deploying automatically from `main`. Environment variables are set in the Vercel project, and a change to them only takes effect on the next deployment.
- Two production issues so far, both configuration rather than code: an expired GitHub token (section 6) and a retired model (section 4). Both were fixed by changing an environment variable and redeploying.
- The per-deployment and per-account URLs sit behind Vercel's login. The public address is the production domain only.

## 10. Other questions worth preparing

- "What is the biggest weakness?" There are no automated tests and no CI. The first tests to write are for the pure functions in `lib/uk-*.ts`, because they have fixed inputs and outputs. After that, a Playwright run of the analyse flow against a mocked API response.
- "What stops someone hammering your endpoint and burning your AI quota?" Nothing yet. The endpoint is public and unauthenticated. The fix is a per-IP rate limit in front of the route.
- "Why is nothing cached?" Simplicity, and reports should reflect the profile as it is now. At any real volume the answer changes: cache the response per username for a few minutes, which also protects the GitHub and AI quotas.
- "How would this handle a user with 500 repos?" It reads the first 100 by most recently updated, then keeps the top 12 by stars. That favours popular repos over recent ones, which is the right bias for a hiring report but worth saying out loud.
- "Is any user data stored?" No. Only public GitHub data is read, nothing is written to a database, and the report exists only in the visitor's browser.
- "What would you build next?" Tests and CI first, then rate limiting and caching, then an analytics and Lighthouse pass, then a shareable URL per report.
