import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sql } from "@/lib/db";

function formatNumber(n: number) {
  return new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(n || 0);
}
function formatPrice(value: number, currency: string) {
  try { return new Intl.NumberFormat("id-ID", { style: "currency", currency: currency || "IDR", maximumFractionDigits: 0 }).format(value || 0); }
  catch { return `${currency || "IDR"} ${Number(value || 0).toLocaleString("id-ID")}`; }
}
async function getCreator(username: string) {
  const profiles = await sql`select * from creator_profiles where lower(username) = ${username.toLowerCase()} and published = true limit 1`;
  if (!profiles.length) return null;
  const p = profiles[0];
  const socials = await sql`select * from social_accounts where user_id = ${p.user_id} order by position asc, created_at asc`;
  const rates = await sql`select * from rate_items where user_id = ${p.user_id} order by position asc, created_at asc`;
  return { profile: p, socials, rates };
}

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }): Promise<Metadata> {
  const { username } = await params;
  const data = await getCreator(username);
  if (!data) return { title: "Creator not found | Wholegacy Ratecard" };
  const p = data.profile;
  const title = `${p.display_name} Rate Card & Portfolio | Wholegacy`;
  const description = `View ${p.display_name}'s creator rate card, social media profile and collaboration rates${p.category ? ` for ${p.category}` : ""}.`;
  const url = `https://ratecard.wholegacy.com/${p.username}`;
  return { title, description, alternates: { canonical: url }, openGraph: { title, description, url, type: "profile", images: p.cover_url ? [p.cover_url] : undefined } };
}

export default async function CreatorPage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const data = await getCreator(username);
  if (!data) notFound();
  const { profile: p, socials, rates } = data;
  const theme = ["minimal", "creator", "dark-pro"].includes(p.theme) ? p.theme : "minimal";
  return <main className={`publicCreator theme-${theme}`}>
    <div className="publicShell">
      <header className="creatorHeader">
        {p.cover_url ? <img className="creatorCover" src={p.cover_url} alt={`${p.display_name} cover`} /> : <div className="creatorCover placeholder" />}
        <div className="creatorIdentity">
          {p.avatar_url ? <img className="creatorAvatar" src={p.avatar_url} alt={p.display_name} /> : <div className="creatorAvatar avatarFallback">{String(p.display_name || "C")[0]}</div>}
          <div><div className="creatorKicker">WHOLEGACY RATECARD</div><h1>{p.display_name}</h1><p>{[p.category,p.location].filter(Boolean).join(" • ")}</p></div>
        </div>
        {p.bio && <p className="creatorBio">{p.bio}</p>}
      </header>
      {socials.length > 0 && <section className="publicSection"><div className="sectionLabel">Social reach</div><div className="socialStatGrid">{socials.map((s:any)=><div className="socialStat" key={s.id}><span>{s.platform}</span><strong>{formatNumber(Number(s.followers))}</strong><small>{s.handle || "followers"}</small></div>)}</div></section>}
      <section className="publicSection"><div className="sectionLabel">Collaboration rates</div><div className="publicRates">{rates.map((r:any)=><article className="publicRate" key={r.id}><div><span>{r.platform}</span><h2>{r.service_name}</h2>{r.description && <p>{r.description}</p>}</div><strong>{formatPrice(Number(r.price), r.currency)}</strong></article>)}</div></section>
      {(p.contact_email || p.whatsapp) && <section className="publicContact"><div><span>Ready to collaborate?</span><h2>Work with {p.display_name}</h2></div><div className="contactActions">{p.contact_email && <a className="button primary" href={`mailto:${p.contact_email}`}>Email Creator</a>}{p.whatsapp && <a className="button secondary" href={`https://wa.me/${String(p.whatsapp).replace(/\D/g,"")}`} target="_blank">WhatsApp</a>}</div></section>}
      <footer className="publicFooter">Created with <a href="/">Wholegacy Ratecard</a></footer>
    </div>
  </main>;
}
