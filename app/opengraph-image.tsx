import { ImageResponse } from "next/og";

/**
 * Day 22: Open Graph image, generated from code rather than checked in as
 * a PNG, so the share card can never go stale against the real branding.
 *
 * Next.js serves this at /opengraph-image and wires the og:image tags up
 * automatically. LinkedIn, Slack, WhatsApp and X all read it.
 *
 * Satori (the renderer behind ImageResponse) only understands flexbox, so
 * every element with more than one child sets display: flex explicitly.
 */

export const runtime = "edge";

export const alt =
  "GitHub Profile Analyzer, UK Edition. Paste a GitHub username, get a UK-tailored hiring report.";

export const size = { width: 1200, height: 630 };

export const contentType = "image/png";

const FEATURES = [
  "Visa sponsor match",
  "Graduate schemes",
  "Salary band",
  "Skill gaps",
  "AI summary",
];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          backgroundColor: "#020617",
          backgroundImage:
            "radial-gradient(circle at 15% 0%, rgba(99,102,241,0.45), transparent 55%), radial-gradient(circle at 95% 100%, rgba(236,72,153,0.30), transparent 50%)",
          color: "#f8fafc",
          fontFamily: "sans-serif",
        }}
      >
        {/* Brand row */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 14,
              backgroundColor: "#4f46e5",
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            {"</>"}
          </div>
          <div
            style={{
              display: "flex",
              marginLeft: 18,
              fontSize: 30,
              fontWeight: 600,
            }}
          >
            Profile Analyzer
          </div>
          <div
            style={{
              display: "flex",
              marginLeft: 16,
              padding: "6px 16px",
              borderRadius: 999,
              border: "2px solid #334155",
              color: "#cbd5e1",
              fontSize: 20,
              fontWeight: 600,
              letterSpacing: 2,
            }}
          >
            UK EDITION
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 92,
              fontWeight: 800,
              letterSpacing: -3,
              lineHeight: 1.05,
            }}
          >
            <span>GitHub Profile</span>
            <span style={{ marginLeft: 24, color: "#a78bfa" }}>Analyzer</span>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 24,
              maxWidth: 940,
              fontSize: 34,
              lineHeight: 1.35,
              color: "#cbd5e1",
            }}
          >
            Paste any GitHub username and get a hiring report built for the UK
            Full-Stack and Graduate market.
          </div>
        </div>

        {/* Feature pills */}
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {FEATURES.map((feature) => (
            <div
              key={feature}
              style={{
                display: "flex",
                marginRight: 12,
                padding: "10px 16px",
                borderRadius: 999,
                backgroundColor: "rgba(148,163,184,0.14)",
                border: "1px solid rgba(148,163,184,0.35)",
                fontSize: 21,
                color: "#e2e8f0",
              }}
            >
              {feature}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
