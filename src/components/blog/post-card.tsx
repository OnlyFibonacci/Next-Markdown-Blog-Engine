import Link from "next/link";

import type { PostMeta } from "@/types/post";
import { tagToSlug } from "@/lib/tag-utils";
import { cn } from "@/lib/utils";

import { Calendar, Clock, Tag } from "lucide-react";

/**
 * Ana sayfa ve etiket listesi yazı kartı.
 * Etiketler ayrı link olduğu için kart gövdesi ile iç içe `<a>` oluşturulmaz.
 */
export function PostCard({
  post,
  className,
}: {
  post: PostMeta;
  className?: string;
}) {
  const formatted = new Intl.DateTimeFormat("tr-TR", {
    dateStyle: "medium",
  }).format(new Date(post.date));

  return (
    <article
      className={cn(
        "group flex flex-col rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-sm transition hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700",
        className,
      )}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="flex flex-1 flex-col gap-3 outline-none"
      >
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 transition group-hover:text-emerald-700 dark:text-zinc-50 dark:group-hover:text-emerald-400">
          {post.title}
        </h2>
        <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {post.excerpt}
        </p>
        <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 dark:text-zinc-500">
          <span className="inline-flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" aria-hidden />
            {formatted}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" aria-hidden />
            {post.readingTimeMinutes} dk okuma
          </span>
        </div>
      </Link>
      {post.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2 border-t border-zinc-100 pt-4 dark:border-zinc-800">
          {post.tags.map((tag) => (
            <Link
              key={`${post.slug}-${tag}`}
              href={`/tag/${tagToSlug(tag)}`}
              className="inline-flex items-center gap-1 rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-700 transition hover:bg-emerald-100 hover:text-emerald-900 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-emerald-950 dark:hover:text-emerald-200"
            >
              <Tag className="h-3 w-3 shrink-0" aria-hidden />
              {tag}
            </Link>
          ))}
        </div>
      )}
    </article>
  );
}
