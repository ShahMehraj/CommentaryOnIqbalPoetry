/**
 * Data model for Iqbal poetry.
 *
 * A poem is made of couplets (sher). Each couplet has two lines (misra).
 * Each line is a sequence of words. Every word carries its own transliteration
 * and meaning so the reader can hover any word (quran.com style).
 *
 * Transliteration, translation, and a prose explanation are provided at the
 * couplet level — the explanation always covers both lines together so the
 * reader gets full context.
 */

export type Language = "urdu" | "persian";

export interface Word {
  /** The word as written in the original script (Urdu/Persian). */
  text: string;
  /** Roman transliteration of this single word. */
  transliteration: string;
  /** Short English meaning / gloss shown on hover. */
  meaning: string;
}

export interface Line {
  /** Ordered words that make up this line (misra). */
  words: Word[];
}

export interface Couplet {
  /** Stable id within the poem, e.g. "1", "2"… used for anchors. */
  id: string;
  /** The two lines of the couplet. Iqbal's verse is couplet-based. */
  lines: [Line, Line];
  /** Full roman transliteration of the whole couplet. */
  transliteration: string;
  /** English translation of the couplet. */
  translation: string;
  /** Prose explanation covering BOTH lines together for full context. */
  explanation: string;
}

export interface Poem {
  /** URL-safe identifier, e.g. "shikwa". */
  slug: string;
  /** Title in the original script. */
  title: string;
  /** Title in roman transliteration. */
  titleTransliteration: string;
  /** Title in English. */
  titleEnglish: string;
  /** Which language/script the verse is written in. */
  language: Language;
  /** Collection this poem belongs to, e.g. "Bang-e-Dra". */
  collection?: string;
  /** Short intro shown on the poem page. */
  description?: string;
  /** The couplets, in order. */
  couplets: Couplet[];
}

/** Lightweight shape used for listing poems on the home page. */
export interface PoemSummary {
  slug: string;
  title: string;
  titleTransliteration: string;
  titleEnglish: string;
  language: Language;
  collection?: string;
  description?: string;
  coupletCount: number;
}
