"use client";

import { useState, useRef, useEffect } from "react";
import type { Word } from "@/lib/types";

/**
 * A single hoverable/tappable word. On hover (desktop) or tap (mobile) it
 * reveals a popover with the word's transliteration and meaning — the
 * quran.com word-by-word interaction.
 */
export default function HoverWord({
  word,
  lang,
}: {
  word: Word;
  lang: "ur" | "fa";
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  // Close the popover when tapping/clicking elsewhere (mobile-friendly).
  useEffect(() => {
    if (!open) return;
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [open]);

  return (
    <span
      ref={ref}
      className={`word${open ? " word--active" : ""}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onClick={(e) => {
        e.stopPropagation();
        setOpen((v) => !v);
      }}
    >
      <span className="word__text" lang={lang}>
        {word.text}
      </span>
      {open && (
        <span className="word__popover" role="tooltip">
          <span className="word__popover-translit">
            {word.transliteration}
          </span>
          <span className="word__popover-meaning">{word.meaning}</span>
        </span>
      )}
    </span>
  );
}
