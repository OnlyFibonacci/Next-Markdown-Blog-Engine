import "server-only";

import fs from "node:fs/promises";
import path from "node:path";

import GithubSlugger from "github-slugger";
import matter from "gray-matter";
import { headingRank } from "hast-util-heading-rank";
import { toString } from "hast-util-to-string";
import type { Root as HastRoot } from "hast";
import type { Root as MdastRoot } from "mdast";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeShiki from "@shikijs/rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { visit } from "unist-util-visit";

import type { Post, PostFrontmatter, PostMeta, TocItem } from "@/types/post";

import { calculateReadingTimeMinutes } from "./reading-time";

const POSTS_DIR = "posts";

/**
 * Markdown dosyalarının bulunduğu kök dizin yolu.
 */
export function getPostsDirectory(): string {
  return path.join(process.cwd(), POSTS_DIR);
}

/**
 * Frontmatter alanlarını doğrular ve tip güvenli nesne döndürür.
 * @param data - gray-matter `data` çıktısı
 */
export function parseFrontmatter(data: unknown): PostFrontmatter {
  if (!data || typeof data !== "object") {
    throw new Error("Geçersiz frontmatter.");
  }
  const o = data as Record<string, unknown>;
  const title = o.title;
  const date = o.date;
  if (typeof title !== "string" || !title.trim()) {
    throw new Error('Frontmatter: "title" zorunlu ve boş olamaz.');
  }
  if (typeof date !== "string" || !date.trim()) {
    throw new Error('Frontmatter: "date" zorunlu ve boş olamaz.');
  }
  return {
    title: title.trim(),
    date: date.trim(),
    tags: Array.isArray(o.tags)
      ? o.tags.filter((t): t is string => typeof t === "string")
      : undefined,
    excerpt: typeof o.excerpt === "string" ? o.excerpt : undefined,
    draft: typeof o.draft === "boolean" ? o.draft : undefined,
  };
}

/**
 * Excerpt yoksa gövdeden kısa önizleme metni üretir.
 */
function excerptFromContent(content: string, max = 180): string {
  const plain = content
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\*\*|__/g, "")
    .replace(/`+/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\n+/g, " ")
    .trim();
  if (plain.length <= max) {
    return plain;
  }
  return `${plain.slice(0, max).trim()}…`;
}

/**
 * rehype-slug ile aynı sıra ve github-slugger davranışı: HAST üzerinde başlık id'lerini üretir,
 * yalnızca h2/h3'ü TOC listesine ekler (tüm başlıklar slug sayacını ilerletir).
 */
function extractTocFromHast(tree: HastRoot): TocItem[] {
  const toc: TocItem[] = [];
  const slugger = new GithubSlugger();

  visit(tree, "element", (node) => {
    const rank = headingRank(node);
    if (!rank) {
      return;
    }
    if (node.properties?.id) {
      return;
    }
    const text = toString(node);
    const id = slugger.slug(text);
    if (rank === 2 || rank === 3) {
      toc.push({ id, text, depth: rank });
    }
  });

  return toc;
}

/**
 * Markdown gövdesini Shiki + slug + autolink ile HTML'e çevirir; TOC'yi aynı kaynak HAST'tan üretir.
 */
export async function markdownToHtml(
  markdown: string,
): Promise<{ html: string; toc: TocItem[] }> {
  const mdast = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .parse(markdown) as MdastRoot;
  const hast = (await unified().use(remarkRehype).run(mdast)) as HastRoot;
  const toc = extractTocFromHast(hast);

  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: "wrap",
      properties: { className: ["anchor"] },
    })
    .use(rehypeShiki, {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
    })
    .use(rehypeStringify)
    .process(markdown);

  return { html: String(file), toc };
}

/**
 * Tüm .md dosya adlarından slug listesi (draft'lar geliştirmede dahil).
 */
export async function getPostSlugs(): Promise<string[]> {
  const dir = getPostsDirectory();
  let files: string[];
  try {
    files = await fs.readdir(dir);
  } catch {
    return [];
  }
  const isProd = process.env.NODE_ENV === "production";
  const slugs: string[] = [];

  for (const file of files) {
    if (!file.endsWith(".md")) {
      continue;
    }
    const slug = file.replace(/\.md$/, "");
    const raw = await fs.readFile(path.join(dir, file), "utf8");
    const { data } = matter(raw);
    const fm = parseFrontmatter(data);
    if (isProd && fm.draft) {
      continue;
    }
    slugs.push(slug);
  }

  return slugs;
}

/**
 * Ana sayfa için meta listesi; tarihe göre yeniden eskiye sıralı.
 */
export async function getAllPosts(): Promise<PostMeta[]> {
  const dir = getPostsDirectory();
  let files: string[];
  try {
    files = await fs.readdir(dir);
  } catch {
    return [];
  }
  const isProd = process.env.NODE_ENV === "production";
  const results: PostMeta[] = [];

  for (const file of files) {
    if (!file.endsWith(".md")) {
      continue;
    }
    const slug = file.replace(/\.md$/, "");
    const raw = await fs.readFile(path.join(dir, file), "utf8");
    const { data, content } = matter(raw);
    const fm = parseFrontmatter(data);
    if (isProd && fm.draft) {
      continue;
    }

    const readingTimeMinutes = calculateReadingTimeMinutes(content);
    const excerpt = fm.excerpt ?? excerptFromContent(content);

    results.push({
      slug,
      title: fm.title,
      date: fm.date,
      tags: fm.tags ?? [],
      excerpt,
      readingTimeMinutes,
      draft: fm.draft ?? false,
    });
  }

  return results.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

/**
 * Tek yazı: HTML, TOC ve meta. Bulunamaz veya üretimde draft ise `null`.
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const safe = path.basename(slug);
  if (safe !== slug || slug.includes("..")) {
    return null;
  }

  const filePath = path.join(getPostsDirectory(), `${safe}.md`);
  try {
    await fs.access(filePath);
  } catch {
    return null;
  }

  const raw = await fs.readFile(filePath, "utf8");
  const { data, content } = matter(raw);
  const fm = parseFrontmatter(data);

  if (process.env.NODE_ENV === "production" && fm.draft) {
    return null;
  }

  const { html, toc } = await markdownToHtml(content);
  const readingTimeMinutes = calculateReadingTimeMinutes(content);
  const excerpt = fm.excerpt ?? excerptFromContent(content);

  return {
    slug: safe,
    title: fm.title,
    date: fm.date,
    tags: fm.tags ?? [],
    excerpt,
    readingTimeMinutes,
    draft: fm.draft ?? false,
    html,
    toc,
  };
}
