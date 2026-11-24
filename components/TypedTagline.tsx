"use client";

import { useEffect, useState } from "react";

const PHRASES = [
  "Analyse your GitHub.",
  "Improve your profile.",
  "Get hired in the UK.",
] as const;

/** Read by screen readers and shown as-is when motion is reduced. */
const FULL_SENTENCE = "Analyse. Improve. Get hired in the UK.";

const TYPE_MS = 55;
const DELETE_MS = 28;
/** How long a finished phrase stays on screen. */
const HOLD_MS = 1700;
/** Beat of empty line before the next phrase starts. */
const GAP_MS = 350;

/**
 * Day 24: typewriter tagline for the hero.
 *
 * Hand-rolled instead of pulling in Typed.js: the whole effect is one
 * timer, and owning it means it can do the three things a library makes
 * awkward here:
 *  - the server renders the first phrase as real text, so crawlers and
 *    no-JS visitors get content and there is no empty flash on load
 *  - prefers-reduced-motion gets a static sentence, no animation at all
 *  - assistive tech reads one stable sentence instead of a stream of
 *    single-character updates
 *
 * The line has a fixed height, so the phrases changing length never shift
 * the search form below it.
 */
export function TypedTagline() {
  const [text, setText] = useState<string>(PHRASES[0]);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReducedMotion(true);
      return;
    }

    let index = 0;
    let length: number = PHRASES[0].length;
    // The first phrase is already on screen in full, so start by deleting it.
    let deleting = true;
    let timer: ReturnType<typeof setTimeout>;

    function tick() {
      if (deleting) {
        length -= 1;
        if (length === 0) {
          deleting = false;
          index = (index + 1) % PHRASES.length;
          setText("");
          timer = setTimeout(tick, GAP_MS);
          return;
        }
        setText(PHRASES[index].slice(0, length));
        timer = setTimeout(tick, DELETE_MS);
        return;
      }

      length += 1;
      setText(PHRASES[index].slice(0, length));
      if (length === PHRASES[index].length) {
        deleting = true;
        timer = setTimeout(tick, HOLD_MS);
      } else {
        timer = setTimeout(tick, TYPE_MS);
      }
    }

    timer = setTimeout(tick, HOLD_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <p className="mt-4 flex h-7 items-center justify-center font-mono text-base font-medium text-primary print:hidden sm:mt-5 sm:h-8 sm:text-lg">
      <span className="sr-only">{FULL_SENTENCE}</span>
      <span aria-hidden="true" className="whitespace-nowrap">
        {reducedMotion ? FULL_SENTENCE : text}
      </span>
      {!reducedMotion && <span aria-hidden="true" className="typed-cursor" />}
    </p>
  );
}
