import type { Metadata } from "next";
import Link from "next/link";

import { MarkdownGuideSection } from "@/components/markdown-guide/markdown-guide-section";
import { markdownGuideSections } from "@/lib/markdown-guide-data";
import { markdownToHtml } from "@/lib/markdown";
import { siteConfig } from "@/lib/site";

import { BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Markdown rehberi",
  description:
    "GitHub Flavored Markdown sözdizimi: başlıklar, listeler, kod, tablolar ve daha fazlası — canlı önizleme ile.",
  openGraph: {
    title: `Markdown rehberi | ${siteConfig.name}`,
    description:
      "Markdown öğrenmek için örnekler ve bu blogda kullanılan işleme motoruyla birebir önizleme.",
    type: "website",
    url: `${siteConfig.url}/markdown-rehberi`,
  },
};

/**
 * Markdown öğrenme sayfası: tüm örnekler build sırasında markdownToHtml ile üretilir.
 */
export default async function MarkdownGuidePage() {
  const resolved = await Promise.all(
    markdownGuideSections.map(async (section) => {
      const { html } = await markdownToHtml(section.markdown);
      return { section, html };
    }),
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
      <header className="relative mb-12 overflow-hidden rounded-3xl border border-zinc-200/90 bg-white px-6 py-10 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 sm:px-10">
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-400/15 blur-3xl dark:bg-emerald-500/10"
          aria-hidden
        />
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-2xl">
            <p className="mb-2 inline-flex items-center gap-2 text-sm font-medium text-emerald-700 dark:text-emerald-400">
              <BookOpen className="h-4 w-4" aria-hidden />
              Öğren
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
              Markdown rehberi
            </h1>
            <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              Bu sayfadaki örnekler, blog yazılarınızda kullanılan{" "}
              <strong className="font-medium text-zinc-800 dark:text-zinc-200">
                aynı
              </strong>{" "}
              işleme hattıyla (GFM, Shiki, Typography) oluşturulmuştur. Solda
              ham metin, sağda sonuç.
            </p>
          </div>
          <Link
            href="/"
            className="shrink-0 self-start rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm font-medium text-zinc-800 transition hover:border-emerald-300 hover:bg-emerald-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-emerald-800 dark:hover:bg-emerald-950/40"
          >
            Yazılara dön
          </Link>
        </div>
      </header>

      <div className="flex flex-col gap-8 lg:gap-10">
        {resolved.map(({ section, html }) => (
          <MarkdownGuideSection
            key={section.id}
            title={section.title}
            description={section.description}
            source={section.markdown}
            html={html}
          />
        ))}
      </div>

      <p className="mt-12 text-center text-sm text-zinc-500 dark:text-zinc-500">
        İçeriklerinizi{" "}
        <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
          posts/*.md
        </code>{" "}
        dosyalarına yazın; frontmatter için ana sayfadaki örneklere bakın.
      </p>
    </div>
  );
}
