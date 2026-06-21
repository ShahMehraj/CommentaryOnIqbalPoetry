import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllSlugs, getPoemBySlug } from "@/lib/poems";
import CoupletBlock from "@/components/CoupletBlock";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const poem = getPoemBySlug(params.slug);
  if (!poem) return { title: "Not found — Iqbal Wiki" };
  return {
    title: `${poem.titleTransliteration} — Iqbal Wiki`,
    description: poem.description,
  };
}

export default function PoemPage({ params }: { params: { slug: string } }) {
  const poem = getPoemBySlug(params.slug);
  if (!poem) notFound();

  const lang = poem.language === "urdu" ? "ur" : "fa";

  return (
    <>
      <Link href="/" className="back-link">
        ← All poems
      </Link>

      <header className="poem-header">
        <h1 className="poem-header__title" lang={lang}>
          {poem.title}
        </h1>
        <div className="poem-header__translit">
          {poem.titleTransliteration}
        </div>
        <div className="poem-header__english">{poem.titleEnglish}</div>
        {poem.description && (
          <p className="poem-header__desc">{poem.description}</p>
        )}
      </header>

      <p className="reader-hint">
        Hover over (or tap) any word to see its meaning.
      </p>

      <section className="couplets">
        {poem.couplets.map((couplet, i) => (
          <CoupletBlock
            key={couplet.id}
            couplet={couplet}
            language={poem.language}
            index={i}
          />
        ))}
      </section>
    </>
  );
}
