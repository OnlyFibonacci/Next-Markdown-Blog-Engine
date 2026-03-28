import { getAllPosts } from "@/lib/markdown";
import { siteConfig } from "@/lib/site";

import { PostCard } from "@/components/blog/post-card";

/**
 * Ana sayfa: tüm yazılar tarihe göre (yeniden eskiye).
 */
export default async function HomePage() {
  const posts = await getAllPosts();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <header className="mb-12 max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          {siteConfig.name}
        </h1>
        <p className="mt-3 text-lg text-zinc-600 dark:text-zinc-400">
          {siteConfig.description}
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="rounded-xl border border-dashed border-zinc-300 bg-white p-8 text-center text-zinc-600 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-400">
          Henüz yayınlanmış yazı yok. <code className="rounded bg-zinc-100 px-1 dark:bg-zinc-900">posts/</code>{" "}
          klasörüne <code className="rounded bg-zinc-100 px-1 dark:bg-zinc-900">.md</code> dosyası ekleyin.
        </p>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2">
          {posts.map((post) => (
            <li key={post.slug}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
