"use client";

import { List } from "lucide-react";
import { useState } from "react";

import type { TocItem } from "@/types/post";
import { cn } from "@/lib/utils";

/**
 * h2/h3 başlıklarından üretilen içindekiler; mobilde daraltılabilir.
 */
export function TableOfContents({
  items,
  className,
}: {
  items: TocItem[];
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  if (items.length === 0) {
    return null;
  }

  return (
    <aside className={cn("w-full", className)}>
      <div className="md:hidden">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex w-full items-center justify-between gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-medium text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
        >
          <span className="inline-flex items-center gap-2">
            <List className="h-4 w-4" aria-hidden />
            İçindekiler
          </span>
          <span className="text-zinc-500">{open ? "−" : "+"}</span>
        </button>
      </div>

      <nav
        className={cn(
          "rounded-xl border border-zinc-200 bg-zinc-50/80 p-4 dark:border-zinc-800 dark:bg-zinc-900/50",
          !open && "hidden md:block",
          open && "mt-2 block",
        )}
        aria-label="İçindekiler"
      >
        <p className="mb-3 hidden text-sm font-semibold text-zinc-900 dark:text-zinc-100 md:flex md:items-center md:gap-2">
          <List className="h-4 w-4" aria-hidden />
          İçindekiler
        </p>
        <ul className="space-y-1.5 text-sm">
          {items.map((item, index) => (
            <li
              key={`${item.id}-${index}`}
              className={cn(
                item.depth === 3 && "pl-3 border-l border-zinc-200 dark:border-zinc-700",
              )}
            >
              <a
                href={`#${item.id}`}
                className="text-zinc-600 transition hover:text-emerald-700 dark:text-zinc-400 dark:hover:text-emerald-400"
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
