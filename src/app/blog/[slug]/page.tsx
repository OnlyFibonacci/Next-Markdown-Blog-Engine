import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { MarkdownContent } from "@/components/blog/markdown-content";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { getPostBySlug, getPostSlugs } from "@/lib/markdown";
import { siteConfig } from "@/lib/site";
import { tagToSlug } from "@/lib/tag-utils";

import { ArrowLeft, Calendar, Clock } from "lucide-react";

type PageProps = {
  params: Promise<{ slug: string }>;
};

/**
 * Build zamanında tüm slug rotalarını üretir (SSG).
 */
export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

/**
 * Yazı başlığı ve açıklama için dinamik metadata.
 */
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "Yazı bulunamadı" };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      url: `${siteConfig.url}/blog/${post.slug}`,
    },
  };
}

/**
 * Tek blog yazısı: içerik, TOC ve SEO.
 */
export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const formatted = new Intl.DateTimeFormat("tr-TR", {
    dateStyle: "long",
  }).format(new Date(post.date));

  return (
    <article className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-emerald-700 hover:underline dark:text-emerald-400"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Tüm yazılar
      </Link>

      <header className="mb-10 border-b border-zinc-200 pb-8 dark:border-zinc-800">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          {post.title}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-4 w-4" aria-hidden />
            {formatted}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-4 w-4" aria-hidden />
            {post.readingTimeMinutes} dakika okuma
          </span>
        </div>
        {post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/tag/${tagToSlug(tag)}`}
                className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 transition hover:bg-emerald-100 hover:text-emerald-900 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-emerald-950 dark:hover:text-emerald-200"
              >
                {tag}
              </Link>
            ))}
          </div>
        )}
      </header>

      <div className="flex flex-col gap-10 lg:flex-row lg:gap-12">
        <div className="lg:order-2 lg:w-64 lg:shrink-0">
          <div className="lg:sticky lg:top-24">
            <TableOfContents items={post.toc} />
          </div>
        </div>
        <MarkdownContent
          html={post.html}
          className="min-w-0 flex-1 lg:order-1"
        />
      </div>
    </article>
  );
}
