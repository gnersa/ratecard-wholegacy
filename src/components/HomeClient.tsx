"use client";

import Link from "next/link";
import { useState } from "react";
import SupportLink from "@/components/SupportLink";

const reviews = [
  { name: "Siti Rahma", image: "/reviews/siti-rahma.jpg", id: "Rate card saya jadi lebih rapi dan gampang dikirim ke brand. Negosiasi kerja sama terasa jauh lebih profesional.", en: "My rate card looks much more professional and is easy to send to brands. Collaboration negotiations feel much smoother." },
  { name: "Dimas Pratama", image: "/reviews/dimas-pratama.jpg", id: "Satu link sudah cukup untuk profil, statistik, rate, dan kontak. Brand tidak perlu tanya data dasar berulang kali.", en: "One link is enough for my profile, stats, rates, and contact details. Brands no longer need to ask for the basics repeatedly." },
  { name: "Nadia Putri", image: "/reviews/nadia-putri.jpg", id: "Saya bisa update harga kapan saja tanpa kirim PDF baru. Sangat membantu saat mulai dapat lebih banyak campaign.", en: "I can update my rates anytime without sending a new PDF. It really helps as I start getting more campaigns." },
  { name: "Arif Nugraha", image: "/reviews/arif-nugraha.jpg", id: "Tampilan yang jelas bikin calon sponsor lebih cepat memahami paket kerja sama saya dan cara menghubungi saya.", en: "The clear layout helps potential sponsors understand my collaboration packages and contact options much faster." },
  { name: "Aulia Safitri", image: "/reviews/aulia-safitri.jpg", id: "Cocok untuk creator yang baru mulai. Saya terlihat lebih siap saat pitching meski belum punya tim atau media kit mahal.", en: "Great for creators who are just starting out. I look more prepared when pitching even without a team or an expensive media kit." },
  { name: "Rizky Maulana", image: "/reviews/rizky-maulana.jpg", id: "Link rate card membuat komunikasi dengan sponsor lebih ringkas. Statistik dan harga bisa langsung dilihat dalam satu halaman.", en: "The rate card link keeps sponsor communication concise. Stats and pricing can be viewed immediately on one page." },
];

const copy = {
  id: {
    navFeatures: "Fitur", navHow: "Cara kerja", navFaq: "FAQ", login: "Masuk", create: "Buat rate card",
    eyebrow: "Dibuat untuk creator, mudah dibaca brand", title: "Nilai kreatormu, dalam satu link.",
    intro: "Buat rate card, portfolio, dan media kit profesional untuk Instagram, TikTok, Facebook, YouTube, dan platform lainnya. Bagikan ke brand melalui URL creator Wholegacy milikmu sendiri.",
    cta: "Buat rate card →", example: "Lihat contoh", helper: "Contoh: ratecard.wholegacy.com/namamu",
    featureTitle: "Bukan PDF rate card yang terlupakan.", featureLead: "Profil publikmu menjadi media kit hidup yang terus mengikuti perkembangan audience, portfolio, dan harga kerja sama.",
    features: [
      ["01", "Satu link, semua informasi", "Gabungkan rate card, social media, statistik audience, harga kerja sama, dan kontak bisnis dalam satu halaman creator."],
      ["02", "Siap ditemukan", "Halaman creator memiliki metadata unik, konten yang dapat dibaca mesin pencari, dan struktur yang ramah Google maupun AI."],
      ["03", "Update tanpa kirim PDF baru", "Ubah statistik atau rate dari CMS. Link tetap sama sehingga brand selalu melihat informasi terbarumu."],
    ],
    howTitle: "Buat sekali. Bagikan ke mana saja.", howText: "Pilih username creator, lengkapi profil, tambahkan akun social media dan rate, pilih desain, lalu publish di ratecard.wholegacy.com.", howCta: "Ambil link kamu",
    reviewsTitle: "Creator lebih siap saat brand datang.", reviewsLead: "Cerita singkat dari creator yang memakai rate card online untuk mempercepat kerja sama, pitching, dan komunikasi sponsor.",
    faqTitle: "Pertanyaan yang sering ditanyakan", faqLead: "Semua yang perlu kamu tahu sebelum membuat rate card online di Wholegacy.",
    faq: [
      ["Apa itu ratecard.wholegacy.com?", "Platform untuk membuat rate card online, media kit, statistik social media, harga kerja sama, portfolio, dan kontak bisnis creator dalam satu link publik."],
      ["Apakah rate card saya bisa ditemukan di Google?", "Ya. Halaman creator yang dipublish menggunakan metadata unik, canonical URL, struktur HTML yang dapat diindeks, sitemap, robots.txt, dan data terstruktur untuk membantu mesin pencari memahami profilmu."],
      ["Apakah cocok untuk Instagram, TikTok, YouTube, Facebook, dan X?", "Ya. Kamu dapat menambahkan beberapa akun social media sekaligus beserta followers, engagement rate, average views, content style, dan link profil masing-masing."],
      ["Apakah saya bisa mengubah harga tanpa mengganti link?", "Bisa. Perbarui data melalui CMS lalu publish kembali. URL creator tetap sama sehingga brand selalu membuka versi terbaru."],
      ["Apakah rate card bisa disimpan sebagai PDF?", "Bisa. Halaman preview dan rate card publik menyediakan Print / Download PDF dengan layout A4 yang dioptimalkan."],
      ["Apakah tampilannya mobile-friendly?", "Ya. Template rate card dan CMS dirancang responsif agar nyaman digunakan dari desktop maupun smartphone."],
    ],
    footer: "© 2026 Wholegacy. Tools untuk kolaborasi creator modern.", lang: "EN",
  },
  en: {
    navFeatures: "Features", navHow: "How it works", navFaq: "FAQ", login: "Log in", create: "Create rate card",
    eyebrow: "Built for creators, easy for brands to read", title: "Your creator value, in one link.",
    intro: "Build a professional rate card, portfolio, and media kit for Instagram, TikTok, Facebook, YouTube, and more. Share it with brands using your own Wholegacy creator URL.",
    cta: "Create your rate card →", example: "View example", helper: "Example: ratecard.wholegacy.com/yourname",
    featureTitle: "Not another forgotten rate card PDF.", featureLead: "Your public profile becomes a living media kit that grows with your audience, portfolio, and collaboration pricing.",
    features: [
      ["01", "One link, everything", "Bring your rate card, social profiles, audience highlights, collaboration rates, and business contact into one creator page."],
      ["02", "Built to be discovered", "Creator pages use unique metadata, indexable content, and search-friendly structure for Google and AI systems."],
      ["03", "Update without resending PDFs", "Change stats or rates from the CMS. Your link stays the same so brands always see the latest information."],
    ],
    howTitle: "Create once. Share everywhere.", howText: "Claim your creator username, complete your profile, add social accounts and rates, choose a design, then publish under ratecard.wholegacy.com.", howCta: "Claim your link",
    reviewsTitle: "Creators look ready when brands arrive.", reviewsLead: "Short stories from creators using an online rate card to simplify pitching, sponsorships, and collaboration conversations.",
    faqTitle: "Frequently asked questions", faqLead: "Everything you need to know before creating your online rate card with Wholegacy.",
    faq: [
      ["What is ratecard.wholegacy.com?", "A platform for creating an online rate card, media kit, social statistics, collaboration pricing, portfolio, and business contact page in one public creator link."],
      ["Can my rate card appear on Google?", "Yes. Published creator pages use unique metadata, canonical URLs, indexable HTML, sitemap, robots.txt, and structured data to help search engines understand your profile."],
      ["Does it support Instagram, TikTok, YouTube, Facebook, and X?", "Yes. Add multiple social accounts with followers, engagement rate, average views, content style, and direct profile links."],
      ["Can I change my rates without changing the link?", "Yes. Update your information in the CMS and publish again. Your creator URL stays the same so brands always see the latest version."],
      ["Can I save the rate card as a PDF?", "Yes. Preview and public rate card pages include Print / Download PDF with an A4-optimized layout."],
      ["Is it mobile-friendly?", "Yes. Both the rate card templates and the CMS are responsive for desktop and smartphone use."],
    ],
    footer: "© 2026 Wholegacy. Creator tools for the modern collaboration economy.", lang: "ID",
  }
};

type Lang = keyof typeof copy;

export default function HomeClient() {
  const [lang, setLang] = useState<Lang>("id");
  const t = copy[lang];
  const duplicated = [...reviews, ...reviews];
  return (
    <main>
      <nav className="nav">
        <div className="container navInner">
          <Link href="/" className="brand brandImageLink"><img src="/brand-logo.png" alt="RWL Rate Card" className="navBrandLogo" /></Link>
          <div className="navLinks">
            <a href="#features">{t.navFeatures}</a><a href="#how">{t.navHow}</a><a href="#faq">{t.navFaq}</a>
            <Link href="/login">{t.login}</Link>
            <button className="landingLang" type="button" onClick={() => setLang(lang === "id" ? "en" : "id")} aria-label="Switch language">{t.lang}</button>
            <Link href="/register" className="button primary">{t.create}</Link>
          </div>
        </div>
      </nav>

      <section className="hero"><div className="container heroGrid"><div>
        <div className="eyebrow"><span className="dot" /> {t.eyebrow}</div><h1>{t.title}</h1><p>{t.intro}</p>
        <div className="actions"><Link href="/register" className="button primary">{t.cta}</Link><Link href="/maira" className="button secondary">{t.example}</Link></div><div className="helper">{t.helper}</div>
      </div><div className="creatorMock" aria-label="Example creator rate card preview"><img className="mockCover" src="/maira-cover.png" alt="Maira Putri cover" /><img className="mockAvatar" src="/maira-profile.png" alt="Maira Putri" /><div className="mockHead"><h3>Maira Putri</h3><p>Beauty · Lifestyle · Jakarta<br />Creating warm, high-converting lifestyle content.</p></div><div className="stats"><div className="stat"><strong>128K</strong><span>Instagram</span></div><div className="stat"><strong>342K</strong><span>TikTok</span></div><div className="stat"><strong>4.8%</strong><span>Engagement</span></div></div><div className="rateList"><div className="rateRow"><span>Instagram Story</span><strong>Rp500K</strong></div><div className="rateRow"><span>Instagram Reels</span><strong>Rp2.5JT</strong></div><div className="rateRow"><span>TikTok Video</span><strong>Rp3JT</strong></div></div></div></div></section>

      <section className="section" id="features"><div className="container"><div className="sectionHeader"><h2>{t.featureTitle}</h2><p>{t.featureLead}</p></div><div className="cards">{t.features.map(([n,title,body])=><article className="card" key={n}><div className="cardNum">{n}</div><h3>{title}</h3><p>{body}</p></article>)}</div></div></section>

      <section className="reviewSection" aria-labelledby="review-title"><div className="container sectionHeader reviewHeader"><h2 id="review-title">{t.reviewsTitle}</h2><p>{t.reviewsLead}</p></div><div className="reviewMarquee"><div className="reviewTrack">{duplicated.map((r,i)=><article className="reviewCard" key={`${r.name}-${i}`} aria-hidden={i>=reviews.length}><img src={r.image} alt={i<reviews.length?r.name:""}/><div><strong>{r.name}</strong><p>{r[lang]}</p></div></article>)}</div></div></section>

      <section className="section" id="how"><div className="container"><div className="cta"><div><h2>{t.howTitle}</h2><p>{t.howText}</p></div><Link href="/register" className="button">{t.howCta}</Link></div></div></section>

      <section className="section faqSection" id="faq"><div className="container"><div className="sectionHeader"><h2>{t.faqTitle}</h2><p>{t.faqLead}</p></div><div className="faqGrid">{t.faq.map(([q,a],i)=><details className="faqItem" key={q} open={i===0}><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}</div></div></section>

      <footer className="footer"><div className="container landingFooterInner"><span>{t.footer}</span><SupportLink /></div></footer>
    </main>
  );
}
