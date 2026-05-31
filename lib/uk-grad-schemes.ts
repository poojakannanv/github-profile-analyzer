/**
 * Day 17 — UK Graduate Scheme matcher.
 *
 * Curated list of well-known UK technology graduate schemes (and a few
 * "early careers" programmes that recruit on a similar cycle). Each entry
 * carries enough metadata to do three things on the page:
 *
 *  1. Match the user's stack against the scheme's tech focus.
 *  2. Show whether applications are open right now (or how far away).
 *  3. Flag visa sponsorship for international candidates.
 *
 * Application windows are stored as month numbers (1–12). The matcher then
 * compares against the current month to label the window "open now",
 * "closing soon", "opens in X months", or "closed (next: month)".
 */

export type GradSector =
  | "Big Tech"
  | "Finance"
  | "Consulting"
  | "Public"
  | "Media"
  | "Aerospace";

export interface UkGradScheme {
  /** Programme name shown in the card header. */
  name: string;
  /** The employer running it. */
  employer: string;
  /** Sector tag for the card chip. */
  sector: GradSector;
  /** Primary UK office city (or "Multiple" for big employers). */
  city: string;
  /** One-line summary of what graduates work on. */
  summary: string;
  /** Application window — month numbers, 1 = Jan, 12 = Dec. */
  windowOpenMonth: number;
  windowCloseMonth: number;
  /** True if the scheme typically sponsors Skilled Worker visas. */
  sponsorsVisa: boolean;
  /** Public applications / careers URL. */
  applyUrl: string;
  /** Lowercase tech focus — matched against the user's languages + topics. */
  techStack: string[];
}

export const UK_GRAD_SCHEMES: UkGradScheme[] = [
  /* ---- Big Tech ---- */
  {
    name: "Software Engineer Graduate",
    employer: "Bloomberg",
    sector: "Big Tech",
    city: "London",
    summary:
      "Build the systems behind the Bloomberg Terminal — low-latency C++ services and Python tooling.",
    windowOpenMonth: 8,
    windowCloseMonth: 11,
    sponsorsVisa: true,
    applyUrl: "https://www.bloomberg.com/careers/students/",
    techStack: ["cpp", "c++", "python", "javascript", "typescript"],
  },
  {
    name: "STEP / Engineering Residency",
    employer: "Google UK",
    sector: "Big Tech",
    city: "London",
    summary:
      "Structured year-long entry programme across Google's product engineering teams.",
    windowOpenMonth: 9,
    windowCloseMonth: 12,
    sponsorsVisa: true,
    applyUrl: "https://buildyourfuture.withgoogle.com/programs/step/",
    techStack: ["python", "go", "typescript", "java", "cpp"],
  },
  {
    name: "MACH Graduate Programme",
    employer: "Microsoft UK",
    sector: "Big Tech",
    city: "Reading",
    summary:
      "Microsoft Academy of College Hires — rotational early-careers track across product, consulting, and cloud.",
    windowOpenMonth: 9,
    windowCloseMonth: 12,
    sponsorsVisa: true,
    applyUrl: "https://careers.microsoft.com/v2/global/en/students",
    techStack: ["csharp", "c#", "typescript", "python", "azure"],
  },
  {
    name: "SDE Graduate Programme",
    employer: "Amazon UK",
    sector: "Big Tech",
    city: "London",
    summary:
      "Build internet-scale services across AWS, Prime, or Retail. Heavy systems-design focus.",
    windowOpenMonth: 8,
    windowCloseMonth: 11,
    sponsorsVisa: true,
    applyUrl: "https://www.amazon.jobs/en-gb/teams/student-programs",
    techStack: ["java", "python", "typescript", "go", "aws"],
  },

  /* ---- Finance ---- */
  {
    name: "Software Engineer Programme",
    employer: "J.P. Morgan",
    sector: "Finance",
    city: "London / Glasgow",
    summary:
      "Two-year rotational across trading, asset management, and CIB engineering platforms.",
    windowOpenMonth: 8,
    windowCloseMonth: 10,
    sponsorsVisa: true,
    applyUrl: "https://careers.jpmorgan.com/global/en/students",
    techStack: ["java", "python", "typescript", "react", "kotlin"],
  },
  {
    name: "Engineering New Analyst",
    employer: "Goldman Sachs",
    sector: "Finance",
    city: "London / Birmingham",
    summary:
      "Build low-latency trading, risk, and developer-platform tooling. Strong systems focus.",
    windowOpenMonth: 7,
    windowCloseMonth: 10,
    sponsorsVisa: true,
    applyUrl: "https://www.goldmansachs.com/careers/students-and-graduates/",
    techStack: ["java", "python", "javascript", "typescript", "kotlin"],
  },
  {
    name: "Technology Analyst Programme",
    employer: "Morgan Stanley",
    sector: "Finance",
    city: "London / Glasgow",
    summary:
      "Two-year analyst rotation across infra, data, and product engineering teams.",
    windowOpenMonth: 8,
    windowCloseMonth: 11,
    sponsorsVisa: true,
    applyUrl: "https://www.morganstanley.com/people-opportunities/students-graduates",
    techStack: ["java", "python", "csharp", "c#", "typescript"],
  },
  {
    name: "Technology Graduate",
    employer: "Barclays",
    sector: "Finance",
    city: "London / Manchester",
    summary:
      "Two-year rotational across investment banking technology, infrastructure, and cyber.",
    windowOpenMonth: 9,
    windowCloseMonth: 1,
    sponsorsVisa: true,
    applyUrl: "https://search.jobs.barclays/students-and-graduates",
    techStack: ["java", "python", "typescript", "react", "kotlin"],
  },
  {
    name: "Technology Graduate",
    employer: "HSBC",
    sector: "Finance",
    city: "London / Sheffield",
    summary:
      "Three-year track covering software engineering, cloud, cyber, and data.",
    windowOpenMonth: 9,
    windowCloseMonth: 1,
    sponsorsVisa: true,
    applyUrl: "https://www.hsbc.com/careers/students-and-graduates",
    techStack: ["java", "python", "typescript", "aws", "kotlin"],
  },

  /* ---- Consulting ---- */
  {
    name: "Technology Consulting Graduate",
    employer: "Accenture",
    sector: "Consulting",
    city: "Multiple",
    summary:
      "Client-facing engineering and platform delivery across cloud, data, and digital.",
    windowOpenMonth: 9,
    windowCloseMonth: 5,
    sponsorsVisa: false,
    applyUrl: "https://www.accenture.com/gb-en/careers/local/uk-graduates",
    techStack: ["java", "python", "typescript", "react", "aws"],
  },
  {
    name: "Technology Consulting Graduate",
    employer: "PwC",
    sector: "Consulting",
    city: "Multiple",
    summary:
      "Three-year track across cloud transformation, data engineering, and product builds.",
    windowOpenMonth: 9,
    windowCloseMonth: 5,
    sponsorsVisa: false,
    applyUrl: "https://www.pwc.co.uk/careers/student-careers.html",
    techStack: ["python", "typescript", "csharp", "c#", "aws"],
  },
  {
    name: "Technology Consulting Graduate",
    employer: "Deloitte",
    sector: "Consulting",
    city: "Multiple",
    summary:
      "Engineering and platform consulting across financial services and public sector clients.",
    windowOpenMonth: 9,
    windowCloseMonth: 6,
    sponsorsVisa: false,
    applyUrl: "https://www2.deloitte.com/uk/en/pages/careers/topics/students.html",
    techStack: ["python", "typescript", "java", "aws", "react"],
  },

  /* ---- Public ---- */
  {
    name: "Digital, Data & Technology Fast Stream",
    employer: "Civil Service",
    sector: "Public",
    city: "Multiple",
    summary:
      "Four-year leadership track across Government Digital Service and major departments.",
    windowOpenMonth: 9,
    windowCloseMonth: 11,
    sponsorsVisa: false,
    applyUrl: "https://www.faststream.gov.uk/",
    techStack: ["python", "typescript", "javascript", "ruby", "go"],
  },
  {
    name: "Software Engineer Graduate",
    employer: "GCHQ",
    sector: "Public",
    city: "Cheltenham",
    summary:
      "National security software work — requires UK national status and security clearance.",
    windowOpenMonth: 9,
    windowCloseMonth: 12,
    sponsorsVisa: false,
    applyUrl: "https://www.gchq-careers.co.uk/early-careers.html",
    techStack: ["python", "java", "go", "rust", "cpp"],
  },

  /* ---- Media ---- */
  {
    name: "Software Engineering Graduate",
    employer: "BBC",
    sector: "Media",
    city: "London / Salford",
    summary:
      "Build BBC iPlayer, Sounds, and the digital platforms behind BBC News.",
    windowOpenMonth: 10,
    windowCloseMonth: 1,
    sponsorsVisa: false,
    applyUrl: "https://careers.bbc.co.uk/early-careers",
    techStack: ["typescript", "javascript", "java", "scala", "python"],
  },

  /* ---- Aerospace ---- */
  {
    name: "Software Engineering Graduate",
    employer: "BAE Systems",
    sector: "Aerospace",
    city: "Multiple",
    summary:
      "Defence and aerospace software — requires UK eligibility for security clearance.",
    windowOpenMonth: 9,
    windowCloseMonth: 1,
    sponsorsVisa: false,
    applyUrl: "https://www.baesystems.com/en/careers/careers-in-the-uk/graduates",
    techStack: ["csharp", "c#", "cpp", "java", "python"],
  },
];

/* ---------------------------------------------------------------------------
 * Window helpers
 * ------------------------------------------------------------------------ */

export type WindowState =
  | { kind: "open"; closesInMonths: number }
  | { kind: "closing"; closesInMonths: 0 }
  | { kind: "closed"; opensInMonths: number };

/**
 * Compute whether the scheme is currently open, closing soon, or how far
 * away the next window is, based on the current month.
 *
 * Windows can span the year boundary (e.g. Sep–Jan) — we handle that by
 * walking month-by-month forwards rather than naive arithmetic.
 */
export function windowState(
  scheme: UkGradScheme,
  now: Date = new Date(),
): WindowState {
  const month = now.getMonth() + 1; // 1-12
  const isOpen = isMonthInWindow(month, scheme.windowOpenMonth, scheme.windowCloseMonth);

  if (isOpen) {
    const closesIn = monthsUntil(month, scheme.windowCloseMonth);
    if (closesIn <= 0) return { kind: "closing", closesInMonths: 0 };
    return { kind: "open", closesInMonths: closesIn };
  }

  const opensIn = monthsUntil(month, scheme.windowOpenMonth);
  return { kind: "closed", opensInMonths: opensIn };
}

function isMonthInWindow(month: number, open: number, close: number): boolean {
  if (open <= close) {
    return month >= open && month <= close;
  }
  // Span across year-end (e.g. Sep=9, Jan=1)
  return month >= open || month <= close;
}

function monthsUntil(from: number, to: number): number {
  if (from === to) return 0;
  const diff = (to - from + 12) % 12;
  return diff;
}

/* ---------------------------------------------------------------------------
 * Matcher
 * ------------------------------------------------------------------------ */

export interface MatchedGradScheme extends UkGradScheme {
  score: number;
  matches: string[];
  state: WindowState;
}

/**
 * Score and rank UK grad schemes by the overlap between their tech focus
 * and the user's languages + topics. Returns top N.
 */
export function matchGradSchemes(
  userLanguages: string[],
  userTopics: string[],
  limit: number = 6,
  now: Date = new Date(),
): MatchedGradScheme[] {
  const signals = new Set<string>();
  for (const lang of userLanguages) signals.add(normaliseGradSignal(lang));
  for (const topic of userTopics) signals.add(normaliseGradSignal(topic));
  signals.delete("");

  const scored = UK_GRAD_SCHEMES.map((scheme) => {
    const matches = scheme.techStack.filter((t) =>
      signals.has(normaliseGradSignal(t)),
    );
    const coverage = matches.length / scheme.techStack.length;
    const score = matches.length + coverage * 2;
    return { ...scheme, score, matches, state: windowState(scheme, now) };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => {
      // Open schemes float to the top within the same score band
      const aOpen = a.state.kind === "open" || a.state.kind === "closing" ? 1 : 0;
      const bOpen = b.state.kind === "open" || b.state.kind === "closing" ? 1 : 0;
      if (Math.abs(a.score - b.score) < 0.5 && aOpen !== bOpen) return bOpen - aOpen;
      return b.score - a.score;
    })
    .slice(0, limit);
}

export function normaliseGradSignal(raw: string): string {
  const lower = raw.toLowerCase().trim();
  if (lower === "c#") return "csharp";
  if (lower === "c++") return "cpp";
  return lower;
}

export function monthName(month: number): string {
  return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][
    Math.max(0, Math.min(11, month - 1))
  ];
}
