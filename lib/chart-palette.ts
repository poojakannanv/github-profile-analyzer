/**
 * Chart series colours.
 *
 * Charts do NOT use the GitHub brand language colours. Those are picked for
 * logo recognition, not for telling two slices apart: TypeScript (#3178c6)
 * and Python (#3572a5) differ by only dE 5.1 for *normal* colour vision —
 * far below the dE 15 floor — and that pairing is extremely common on the
 * UK full-stack profiles this app is built for. Whichever six languages a
 * user happens to have, brand hues can collide, and no amount of adjusting
 * lightness fixes it because the underlying hues are the same blue.
 *
 * So the comparison surface (the language chart and its legend) uses a
 * validated categorical palette, assigned by rank and never cycled. The
 * brand colours stay in `lib/language-colours.ts`, where they are used for
 * the small recognition dots on repo cards — those always sit beside the
 * language name as text, and are never marks being compared against each
 * other.
 *
 * Slot values live in `app/globals.css` as `--viz-*` custom properties so
 * the light and dark steps swap with the theme.
 */

/** Slots 1-6, in the fixed order that makes the palette colourblind-safe. */
const SERIES_SLOTS = [
  "var(--viz-1)",
  "var(--viz-2)",
  "var(--viz-3)",
  "var(--viz-4)",
  "var(--viz-5)",
  "var(--viz-6)",
] as const;

/** The de-emphasis bucket. Low-chroma on purpose — it carries no identity. */
const OTHER_SLOT = "var(--viz-other)";

/** The label the GitHub layer uses for its folded-tail bucket. */
const OTHER_LABEL = "Other";

/**
 * Colour for the language at `rank` (0-based) in a ranked breakdown.
 *
 * "Other" always takes the neutral slot regardless of where it lands, and
 * anything past slot 6 also folds to neutral rather than reusing a hue —
 * a cycled 7th colour is indistinguishable from an existing one under
 * simulated colour-vision deficiency.
 */
export function seriesColour(language: string, rank: number): string {
  if (language === OTHER_LABEL) return OTHER_SLOT;
  return SERIES_SLOTS[rank] ?? OTHER_SLOT;
}
