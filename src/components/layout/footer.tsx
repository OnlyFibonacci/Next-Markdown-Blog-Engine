import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Alt bilgi alanı.
 */
export function Footer({ className }: { className?: string }) {
  const year = new Date().getFullYear();
  return (
    <footer
      className={cn(
        "border-t border-zinc-200/80 py-8 dark:border-zinc-800",
        className,
      )}
    >
      <div className="mx-auto max-w-5xl px-4 text-center text-sm text-zinc-500 dark:text-zinc-400 sm:px-6">
        © {year} {siteConfig.name}. Markdown SSG blog.
      </div>
    </footer>
  );
}
