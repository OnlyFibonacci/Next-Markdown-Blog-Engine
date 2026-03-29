import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PostCard } from "@/components/blog/post-card";
import {
  getAllTagSlugs,
  getPostsByTagSlug,
  resolveTagLabel,
} from "@/lib/tag-utils";
import { siteConfig } from "@/lib/site";

import { ArrowLeft } from "lucide-react";

type PageProps = {
  params: Promise<{ tag: string }>;
};

/**
 * Tüm etiket slug'ları için statik rota üretir.
 */
export async function generateStaticParams() {
  const tags = await getAllTagSlugs();
  return tags.map((tag) => ({ tag }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { tag } = await params;
  const posts = await getPostsByTagSlug(tag);

  if (posts.length === 0) {
    return { title: "Etiket bulunamadı" };
  }

  const label = resolveTagLabel(tag, posts);
  const title = `Etiket: ${label}`;

  return {
    title,
    description: `“${label}” etiketiyle yayınlanan yazılar.`,
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description: `“${label}” etiketiyle eşleşen blog yazıları.`,
      type: "website",
      url: `${siteConfig.url}/tag/${encodeURIComponent(tag)}`,
    },
  };
}

/**
 * Etikete göre filtrelenmiş yazı listesi.
 */
export default async function TagPage({ params }: PageProps) {
  const { tag } = await params;
  const posts = await getPostsByTagSlug(tag);

  if (posts.length === 0) {
    notFound();
  }

  const label = resolveTagLabel(tag, posts);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-emerald-700 hover:underline dark:text-emerald-400"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Tüm yazılar
      </Link>

      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          Etiket:{" "}
          <span className="text-emerald-700 dark:text-emerald-400">{label}</span>
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          {posts.length} yazı bulundu.
        </p>
      </header>

      <ul className="grid gap-6 sm:grid-cols-2">
        {posts.map((post) => (
          <li key={post.slug}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>
    </div>
  );
}
