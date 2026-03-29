import GithubSlugger from "github-slugger";

import { getAllPosts } from "@/lib/markdown";
import type { PostMeta } from "@/types/post";

/**
 * Etiket metnini URL segmenti için GitHub uyumlu slug'a çevirir.
 */
export function tagToSlug(raw: string): string {
  const slugger = new GithubSlugger();
  return slugger.slug(raw.trim());
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
