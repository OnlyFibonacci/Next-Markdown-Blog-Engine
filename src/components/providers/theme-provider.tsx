"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * next-themes sarmalayıcısı; kök layout'ta kullanılır.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
