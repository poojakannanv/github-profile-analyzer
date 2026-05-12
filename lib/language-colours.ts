/**
 * Small subset of the popular "github-language-colors" mapping.
 * Keeps the bundle tiny — unknown languages fall back to a neutral grey.
 */
const COLOURS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Java: "#b07219",
  "C#": "#178600",
  "C++": "#f34b7d",
  C: "#555555",
  Go: "#00ADD8",
  Rust: "#dea584",
  Ruby: "#701516",
  PHP: "#4F5D95",
  Kotlin: "#A97BFF",
  Swift: "#F05138",
  HTML: "#e34c26",
  CSS: "#563d7c",
  SCSS: "#c6538c",
  Shell: "#89e051",
  Dockerfile: "#384d54",
  Vue: "#41b883",
  Svelte: "#ff3e00",
  Dart: "#00B4AB",
  Lua: "#000080",
  R: "#198CE7",
  Scala: "#c22d40",
  Elixir: "#6e4a7e",
  Haskell: "#5e5086",
  Solidity: "#AA6746",
  Astro: "#ff5a03",
  Other: "#94a3b8",
};

const FALLBACK = "#94a3b8";

export function languageColour(language: string): string {
  return COLOURS[language] ?? FALLBACK;
}
