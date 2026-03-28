import Link from "next/link";

/**
 * Bilinmeyen rota veya yazı bulunamadığında gösterilir.
 */
export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center justify-center px-4 py-24 text-center">
      <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
        Sayfa bulunamadı
      </h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Aradığınız içerik taşınmış veya silinmiş olabilir.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700"
      >
        Ana sayfaya dön
      </Link>
    </div>
  );
}
