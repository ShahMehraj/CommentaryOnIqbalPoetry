import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Iqbal Wiki — The Poetry of Allama Iqbal",
  description:
    "Explore the poetry of Allama Muhammad Iqbal word by word: meanings, transliteration, translation, and explanation.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <header className="site-header">
          <div className="container site-header__inner">
            <Link href="/" className="site-header__brand">
              اقبالؔ <span>Iqbal Wiki</span>
            </Link>
            <nav className="site-header__nav">
              <Link href="/">Poems</Link>
            </nav>
          </div>
        </header>
        <main className="container">{children}</main>
        <footer className="site-footer">
          <div className="container">
            <p>
              The poetry of Allama Muhammad Iqbal (1877–1938). Built for study
              and reflection.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
