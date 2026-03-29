/**
 * Markdown rehberi sayfasındaki tek bir örnek bölümü tanımlar.
 */
export interface MarkdownGuideSectionData {
  /** Benzersiz anahtar (React key, anchor için) */
  id: string;
  /** Bölüm başlığı */
  title: string;
  /** Kısa Türkçe açıklama */
  description: string;
  /** Gösterilecek ham Markdown örneği */
  markdown: string;
}

/**
 * GitHub Flavored Markdown öğeleri; sıra öğretim akışına göre.
 * Bu blogda kullanılan remark-gfm ile uyumludur.
 */
export const markdownGuideSections: MarkdownGuideSectionData[] = [
  {
    id: "basliklar",
    title: "Başlıklar",
    description:
      "`#` ile H1, `##` ile H2, `###` ile H3 üretirsiniz. Bu sitede içindekiler yalnızca H2 ve H3’ü listeler.",
    markdown: `## İkinci seviye başlık
### Üçüncü seviye başlık
#### Dördüncü seviye (içindekilerde yok)`,
  },
  {
    id: "vurgu",
    title: "Kalın, italik, birleşik",
    description:
      "Yıldız veya alt çizgi ile vurgu. Üç yıldız hem kalın hem italik yapar.",
    markdown: `**kalın metin** veya __kalın__

*italik* veya _italik_

***kalın ve italik***`,
  },
  {
    id: "satir-ici-kod",
    title: "Satır içi kod",
    description:
      "Tek ters tırnak ile komut, dosya adı veya kısa kod parçası gösterebilirsiniz.",
    markdown: `\`npm run build\` komutunu çalıştırın.

Dosya yolu: \`src/app/page.tsx\``,
  },
  {
    id: "kod-blogu",
    title: "Kod bloğu ve dil etiketi",
    description:
      "Üç ters tırnak ile çit; dil adı (ör. ts, bash) syntax highlighting için kullanılır (Shiki).",
    markdown: `\`\`\`ts
function merhaba(isim: string): string {
  return \`Selam, \${isim}!\`;
}
\`\`\`

\`\`\`bash
git add . && git commit -m "mesaj"
\`\`\``,
  },
  {
    id: "listeler",
    title: "Sırasız ve sıralı listeler",
    description:
      "Tire, yıldız veya artı ile madde işaretli liste; rakam ile numaralı liste.",
    markdown: `- Birinci madde
- İkinci madde
  - İç içe madde

1. Adım bir
2. Adım iki
3. Adım üç`,
  },
  {
    id: "gorev-listesi",
    title: "Görev listesi (checkbox)",
    description:
      "GFM özelliği: köşeli parantez içinde boşluk veya x ile yapılacak / yapıldı işaretleri.",
    markdown: `- [ ] Yapılacak iş
- [x] Tamamlanan iş
- [ ] Başka bir madde`,
  },
  {
    id: "alinti",
    title: "Alıntı (blockquote)",
    description:
      "Satır başına `>` koyarak alıntı bloğu oluşturursunuz.",
    markdown: `> Bu bir alıntıdır.
> Birden fazla satır aynı blokta olabilir.

Normal paragraf devam eder.`,
  },
  {
    id: "baglantilar",
    title: "Bağlantılar",
    description:
      "Köşeli parantez içinde görünen metin, normal parantez içinde URL.",
    markdown: `[Next.js dokümantasyonu](https://nextjs.org)

Otomatik link: <https://github.com>`,
  },
  {
    id: "gorsel",
    title: "Görsel",
    description:
      "Bağlantı sözdiziminin başına ünlem ekleyin. Harici veya kendi sitenizdeki görseller için tam URL kullanın.",
    markdown: `![Açıklayıcı alt metin](https://picsum.photos/seed/mdguide/400/200)`,
  },
  {
    id: "tablo",
    title: "Tablo",
    description:
      "Pipe (`|`) ile sütunlar; ikinci satırda hizalama çizgileri (`---`, `:---`, `---:`).",
    markdown: `| Sütun A | Sütun B |
| ------- | ------- |
| Hücre 1 | Hücre 2 |
| Hücre 3 | Hücre 4 |`,
  },
  {
    id: "ustu-cizili",
    title: "Üstü çizili",
    description: "İki tilde veya çift tire ile GFM üstü çizili metin.",
    markdown: `~~iptal edilmiş metin~~`,
  },
  {
    id: "yatay-cizgi",
    title: "Yatay çizgi",
    description:
      "Üç veya daha fazla tire, yıldız veya alt çizgi tek başına bir satırda.",
    markdown: `Üst bölüm

---

Alt bölüm`,
  },
  {
    id: "kacis",
    title: "Özel karakterleri gösterme",
    description:
      "Markdown işareti olarak kullanılan karakterleri önüne ters eğik çizgi koyarak yazabilirsiniz.",
    markdown: `Yıldızları göstermek: \\*metin\\*

Köşeli parantez: \\[değil link\\]`,
  },
];
