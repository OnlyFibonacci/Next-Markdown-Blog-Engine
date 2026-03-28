/**
 * Site genel bilgileri ve SEO için taban URL.
 */
export const siteConfig = {
  name: "Readme Blog",
  description:
    "Dosya tabanlı Markdown blog — Next.js SSG, Shiki ve Tailwind Typography.",
  /** Üretimde Coolify / ters proxy domain'i ile `NEXT_PUBLIC_SITE_URL` ayarlayın. */
  get url(): string {
    return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  },
} as const;
