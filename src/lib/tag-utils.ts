import GithubSlugger from "github-slugger";

import { getAllPosts } from "@/lib/markdown";
import type { PostMeta } from "@/types/post";

/**
 * Türkçe harfleri URL'de güvenli ASCII karşılıklarına çevirir (ş→s, ı→i, ğ→g vb.).
 * Böylece rota segmenti yalnızca [a-z0-9-] kalır; 404 ve kodlama sorunları önlenir.
 */
function transliterateTurkishForSlug(text: string): string {
  const lower = text.trim().normalize("NFC").toLocaleLowerCase("tr-TR");
  const map: Record<string, string> = {
    ç: "c",
    ğ: "g",
    ı: "i",
    i: "i",
    ö: "o",
    ş: "s",
    ü: "u",
  };
  return [...lower].map((ch) => map[ch] ?? ch).join("");
}

/**
 * Etiket metnini URL segmenti için slug üretir (ASCII, github-slugger ile noktalama/boşluk temizliği).
 */
export function tagToSlug(raw: string): string {
  const slugger = new GithubSlugger();
  return slugger.slug(transliterateTurkishForSlug(raw));
}

/**
 * Verilen slug ile eşleşen etikete sahip yazıları döndürür (tarih yeniden eskiye).
 */
export async function getPostsByTagSlug(tagSlug: string): Promise<PostMeta[]> {
  const all = await getAllPosts();
  return all.filter((post) =>
    post.tags.some((t) => tagToSlug(t) === tagSlug),
  );
}

/**
 * Sitede kullanılan tüm etiket slug'larının benzersiz listesi (SSG parametreleri).
 */
export async function getAllTagSlugs(): Promise<string[]> {
  const all = await getAllPosts();
  const set = new Set<string>();
  for (const post of all) {
    for (const tag of post.tags) {
      set.add(tagToSlug(tag));
    }
  }
  return [...set].sort();
}

/**
 * Slug için görünen etiket metnini (ilk eşleşen ham değer) döndürür.
 */
export function resolveTagLabel(tagSlug: string, posts: PostMeta[]): string {
  for (const post of posts) {
    const found = post.tags.find((t) => tagToSlug(t) === tagSlug);
    if (found) {
      return found;
    }
  }
  return tagSlug;
}
