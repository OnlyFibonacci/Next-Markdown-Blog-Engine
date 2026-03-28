import { cn } from "@/lib/utils";

/**
 * İşlenmiş Markdown HTML'ini Tailwind Typography prose ile gösterir.
 */
export function MarkdownContent({
  html,
  className,
}: {
  html: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "prose prose-zinc max-w-none dark:prose-invert",
        "prose-headings:scroll-mt-24 prose-headings:font-semibold",
        "prose-a:text-emerald-700 prose-a:no-underline hover:prose-a:underline dark:prose-a:text-emerald-400",
        "prose-pre:bg-transparent prose-pre:p-0",
        "[&_.shiki]:rounded-lg [&_pre.shiki]:overflow-x-auto",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
