import type { Metadata } from "next";
import HomeClient from "@/components/HomeClient";

export const metadata: Metadata = {
  title: "Rate Card Online Generator untuk Content Creator",
  description: "Buat rate card online, media kit, statistik social media, harga endorsement, dan kontak bisnis dalam satu link profesional untuk creator Indonesia.",
  keywords: ["rate card creator", "rate card online", "media kit content creator", "harga endorsement", "influencer rate card", "creator Indonesia", "TikTok rate card", "Instagram rate card"],
  alternates: { canonical: "/" },
  other: { "geo.region": "ID", "geo.placename": "Indonesia", "content-language": "id-ID, en" },
};

const faq = [
  ["Apa itu ratecard.wholegacy.com?", "Platform untuk membuat rate card online, media kit, statistik social media, harga kerja sama, portfolio, dan kontak bisnis creator dalam satu link publik."],
  ["Apakah rate card saya bisa ditemukan di Google?", "Ya. Halaman creator yang dipublish menggunakan metadata unik, canonical URL, struktur HTML yang dapat diindeks, sitemap, robots.txt, dan data terstruktur."],
  ["Apakah mendukung banyak social media?", "Ya. Instagram, TikTok, YouTube, Facebook, X, dan beberapa akun social media dapat ditampilkan dalam satu rate card."],
  ["Apakah rate card bisa disimpan sebagai PDF?", "Ya. Preview dan halaman publik menyediakan Print / Download PDF dengan layout A4 yang dioptimalkan."],
];

export default function Home() {
  const site = process.env.NEXT_PUBLIC_SITE_URL || "https://ratecard.wholegacy.com";
  const jsonLd = [
    { "@context":"https://schema.org", "@type":"WebSite", name:"RWL Rate Card", url:site, inLanguage:["id-ID","en"] },
    { "@context":"https://schema.org", "@type":"SoftwareApplication", name:"RWL Rate Card Online Generator", applicationCategory:"BusinessApplication", operatingSystem:"Web", url:site, description:"Online rate card and creator media kit generator for content creators." },
    { "@context":"https://schema.org", "@type":"FAQPage", mainEntity: faq.map(([name,text])=>({"@type":"Question",name,acceptedAnswer:{"@type":"Answer",text}})) },
  ];
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd)}}/><HomeClient/></>;
}
