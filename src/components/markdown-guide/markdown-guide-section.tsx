import { MarkdownContent } from "@/components/blog/markdown-content";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  description: string;
  source: string;
  html: string;
  className?: string;
};

/**
 * Tek bir Markdown örneği: ham kaynak ve işlenmiş önizleme yan yana (mobilde üst üste).
 */
export function MarkdownGuideSection({
  title,
  description,
  source,
  html,
  className,
}: Props) {
  return (
    <section
      className={cn(
        "overflow-hidden rounded-2xl border border-zinc-200/90 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950",
        className,
      )}
    >
      <div className="border-b border-zinc-100 bg-gradient-to-r from-emerald-50/80 to-transparent px-5 py-4 dark:border-zinc-800 dark:from-emerald-950/30">
        <h2 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          {title}
        </h2>
        <p className="mt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {description}
        </p>
      </div>
      <div className="grid gap-0 md:grid-cols-2 md:divide-x md:divide-zinc-200 dark:md:divide-zinc-800">
        <div className="flex flex-col border-b border-zinc-100 dark:border-zinc-800 md:border-b-0">
          <div className="border-b border-zinc-100 bg-zinc-50/90 px-3 py-2 text-xs font-medium uppercase tracking-wide text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-400">
            Kaynak
          </div>
          <pre className="max-h-[min(70vh,28rem)] overflow-auto p-4 font-mono text-xs leading-relaxed text-zinc-800 dark:text-zinc-200 sm:text-sm">
            <code>{source}</code>
          </pre>
        </div>
        <div className="flex flex-col">
          <div className="border-b border-zinc-100 bg-zinc-50/90 px-3 py-2 text-xs font-medium uppercase tracking-wide text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-400">
            Önizleme
          </div>
          <div className="p-4 md:p-5">
            <MarkdownContent html={html} className="prose-sm sm:prose-base" />
          </div>
        </div>
      </div>
    </section>
  );
}
