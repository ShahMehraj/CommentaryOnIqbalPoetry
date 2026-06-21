import Link from "next/link";
import { getPoemSummaries } from "@/lib/poems";

export default function HomePage() {
  const poems = getPoemSummaries();

  return (
    <>
      <section className="hero">
        <h1>My Commentary on the Poetry of Allama Iqbal</h1>
        <p>
          A close, word-by-word reading of the poetry of Allama Muhammad Iqbal
          (1877&ndash;1938). Hover over any word to see its meaning, with full
          transliteration, an English translation, and my own explanation of
          every couplet.
        </p>
      </section>

      <section className="home-section">
        <h2 className="home-section__title">How to read</h2>
        <ul className="feature-list">
          <li>
            <span className="feature-list__label">Hover or tap any word</span>
            to reveal its transliteration and meaning, the way you would on
            quran.com.
          </li>
          <li>
            <span className="feature-list__label">Read each couplet</span>
            with its full transliteration and English translation alongside the
            original script.
          </li>
          <li>
            <span className="feature-list__label">Open the explanation</span>
            under every couplet for context that covers both lines together.
          </li>
        </ul>
      </section>

      <section className="home-section">
        <h2 className="home-section__title">Poems</h2>
        <div className="poem-list">
          {poems.map((poem) => (
            <Link
              key={poem.slug}
              href={`/poem/${poem.slug}`}
              className="poem-card"
            >
              <h3
                className="poem-card__title"
                lang={poem.language === "urdu" ? "ur" : "fa"}
              >
                {poem.title}
              </h3>
              <div className="poem-card__translit">
                {poem.titleTransliteration}
              </div>
              <div className="poem-card__english">{poem.titleEnglish}</div>
              <div className="poem-card__meta">
                <span className="badge">
                  {poem.language === "urdu" ? "Urdu" : "Persian"}
                </span>
                {poem.collection && (
                  <span className="badge badge--muted">{poem.collection}</span>
                )}
                <span className="badge badge--muted">
                  {poem.coupletCount}{" "}
                  {poem.coupletCount === 1 ? "couplet" : "couplets"}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="disclaimer" aria-label="Disclaimer">
        <h2 className="disclaimer__title">A note on these explanations</h2>
        <p>
          The explanations on this site reflect my own understanding and
          interpretation of Iqbal&rsquo;s verse. Iqbal&rsquo;s poetry is rich
          and layered, and others, including established scholars, may read
          these couplets differently. Nothing here is offered as a definitive or
          authoritative reading.
        </p>
        <p>
          The transliterations, translations, and word meanings are provided to
          aid understanding and may contain errors or simplifications. The
          original poetry of Allama Iqbal is in the public domain. If you notice
          a mistake, please treat the original text and recognised scholarship
          as the final authority.
        </p>
      </section>
    </>
  );
}
