/**
 * Markdown ön yüzünde beklenen alanlar (gray-matter).
 */
export interface PostFrontmatter {
  title: string;
  /** ISO 8601 tarih string'i */
  date: string;
  tags?: string[];
  excerpt?: string;
  /** true ise üretimde listelenmez */
  draft?: boolean;
}

/**
 * İçindekiler satırı; id, rehype-slug ile üretilen anchor ile eşleşir.
 */
export interface TocItem {
  id: string;
  text: string;
  /** 2 = h2, 3 = h3 */
  depth: 2 | 3;
}

/**
 * Liste görünümü için özet meta (HTML içermez).
 */
export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  readingTimeMinutes: number;
  draft: boolean;
}

/**
 * Tam yazı: işlenmiş HTML ve TOC.
 */
export interface Post extends PostMeta {
  html: string;
  toc: TocItem[];
}
