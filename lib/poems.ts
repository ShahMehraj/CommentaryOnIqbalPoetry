import fs from "fs";
import path from "path";
import type { Poem, PoemSummary } from "./types";

const POEMS_DIR = path.join(process.cwd(), "data", "poems");

/** Read and parse every poem JSON file in data/poems. */
export function getAllPoems(): Poem[] {
  const files = fs
    .readdirSync(POEMS_DIR)
    .filter((f) => f.endsWith(".json"));

  return files.map((file) => {
    const raw = fs.readFileSync(path.join(POEMS_DIR, file), "utf-8");
    return JSON.parse(raw) as Poem;
  });
}

/** Summaries for listing pages — no need to ship full couplet data. */
export function getPoemSummaries(): PoemSummary[] {
  return getAllPoems().map((poem) => ({
    slug: poem.slug,
    title: poem.title,
    titleTransliteration: poem.titleTransliteration,
    titleEnglish: poem.titleEnglish,
    language: poem.language,
    collection: poem.collection,
    description: poem.description,
    coupletCount: poem.couplets.length,
  }));
}

/** Load a single poem by slug, or null if not found. */
export function getPoemBySlug(slug: string): Poem | null {
  const file = path.join(POEMS_DIR, `${slug}.json`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf-8");
  return JSON.parse(raw) as Poem;
}

/** All slugs — used by Next.js to statically generate poem pages. */
export function getAllSlugs(): string[] {
  return fs
    .readdirSync(POEMS_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(/\.json$/, ""));
}
