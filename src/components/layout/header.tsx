import Link from "next/link";

import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

import { ThemeToggle } from "./theme-toggle";

/**
 * Üst gezinme ve site başlığı.
 */
export function Header({ className }: { className?: string }) {
  return (
    <header
      className={cn(
        "border-b border-zinc-200/80 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80",
        className,
      )}
    >
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
        >
          {siteConfig.name}
        </Link>
        <nav className="flex items-center gap-3">
          <Link
            href="/"
            className="text-sm text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            Yazılar
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
