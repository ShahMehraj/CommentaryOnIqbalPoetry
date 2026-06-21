"use client";

import { useState } from "react";
import type { Couplet, Language } from "@/lib/types";
import HoverWord from "./HoverWord";

/**
 * Renders one couplet: the two original-script lines (with hoverable words),
 * followed by a panel showing transliteration, translation, and a two-line
 * explanation. The panel can be collapsed to keep the reading view clean.
 */
export default function CoupletBlock({
  couplet,
  language,
  index,
}: {
  couplet: Couplet;
  language: Language;
  index: number;
}) {
  const [showDetail, setShowDetail] = useState(true);
  const lang = language === "urdu" ? "ur" : "fa";

  return (
    <article className="couplet" id={`sher-${couplet.id}`}>
      <div className="couplet__number">{index + 1}</div>

      <div className="couplet__verse" dir="rtl">
        {couplet.lines.map((line, li) => (
          <p className="verse-line" key={li}>
            {line.words.map((word, wi) => (
              <HoverWord key={wi} word={word} lang={lang} />
            ))}
          </p>
        ))}
      </div>

      <button
        className="couplet__toggle"
        onClick={() => setShowDetail((v) => !v)}
        aria-expanded={showDetail}
      >
        {showDetail ? "Hide details" : "Show details"}
      </button>

      {showDetail && (
        <div className="couplet__detail">
          <div className="detail-row">
            <span className="detail-label">Transliteration</span>
            <p className="detail-translit">{couplet.transliteration}</p>
          </div>
          <div className="detail-row">
            <span className="detail-label">Translation</span>
            <p className="detail-translation">{couplet.translation}</p>
          </div>
          <div className="detail-row">
            <span className="detail-label">Explanation</span>
            <p className="detail-explanation">{couplet.explanation}</p>
          </div>
        </div>
      )}
    </article>
  );
}
