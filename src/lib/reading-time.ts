/**
 * Dakika başına varsayılan kelime sayısı (Türkçe/İngilizce karışık metin için yaygın değer).
 */
export const WORDS_PER_MINUTE = 200;

/**
 * Metindeki kelime sayısına göre tahmini okuma süresini dakika olarak döndürür (en az 1).
 * @param plainText - Boşlukla ayrılmış kelimelerden oluşan düz metin
 */
export function calculateReadingTimeMinutes(plainText: string): number {
  const trimmed = plainText.trim();
  if (!trimmed) {
    return 1;
  }
  const words = trimmed.split(/\s+/).filter(Boolean).length;
  const minutes = Math.ceil(words / WORDS_PER_MINUTE);
  return Math.max(1, minutes);
}
