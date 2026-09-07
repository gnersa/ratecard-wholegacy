import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sql } from "@/lib/db";
import RatecardTemplates from "@/components/ratecard-templates";
import PrintDownloadButton from "@/components/PrintDownloadButton";

async function getCreator(username: string) {
  const profiles = await sql`select * from creator_profiles where lower(username) = ${username.toLowerCase()} and published = true limit 1`;
  if (!profiles.length) return null;
  const p = profiles[0];
  const socials = await sql`select * from social_accounts where user_id = ${p.user_id} order by position asc, created_at asc`;
  const rates = await sql`select * from rate_items where user_id = ${p.user_id} order by position asc, created_at asc`;
  const experiences = await sql`select * from collaboration_experiences where user_id = ${p.user_id} order by position asc, created_at asc`;
  const terms = await sql`select * from terms_conditions where user_id = ${p.user_id} order by position asc, created_at asc`;
  return {
    profile: p,
    socials: socials.map((s:any)=>({platform:s.platform,handle:s.handle,url:s.url,followers:Number(s.followers||0),averageViews:Number(s.average_views||0),averageViewsMin:Number(s.average_views_min||0),averageViewsMax:Number(s.average_views_max||0),engagementRate:Number(s.engagement_rate||0),contentStyle:s.content_style||""})),
    rates: rates.map((r:any)=>({platform:r.platform,serviceName:r.service_name,price:Number(r.price||0),currency:r.currency,description:r.description})),
    experiences: experiences.map((x:any)=>({label:x.label})),
    terms: terms.map((x:any)=>({content:x.content}))
  };
}

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }): Promise<Metadata> {
  const { username } = await params; const data = await getCreator(username);
  if (!data) return { title: "Creator not found | Wholegacy Ratecard" };
  const p:any = data.profile; const site=process.env.NEXT_PUBLIC_SITE_URL||"https://ratecard.wholegacy.com";
  const title = `${p.display_name} Rate Card & Media Kit | Wholegacy`;
  const description = `View ${p.display_name}'s creator rate card, audience metrics, collaboration rates and business contact${p.category ? ` for ${p.category}` : ""}.`;
  const url = `${site}/${p.username}`;
  return { title, description, alternates:{canonical:url}, openGraph:{title,description,url,type:"profile",images:p.cover_url?[p.cover_url]:p.avatar_url?[p.avatar_url]:undefined} };
}

export default async function CreatorPage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params; const data = await getCreator(username); if(!data) notFound();
  const p:any=data.profile;
  return <main className="publicV3"><div className="publicV3Shell"><div className="publicRateActions"><PrintDownloadButton /></div><RatecardTemplates profile={p} socials={data.socials} rates={data.rates} experiences={data.experiences} terms={data.terms} theme={p.theme}/><div className="publicV3Contact"><small>Created with <a href="/">Wholegacy Ratecard</a></small></div></div></main>;
}
