import type { MetadataRoute } from "next";
import { sql } from "@/lib/db";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const site=process.env.NEXT_PUBLIC_SITE_URL||"https://ratecard.wholegacy.com";
  const base: MetadataRoute.Sitemap=[{url:site,lastModified:new Date(),changeFrequency:"weekly",priority:1}];
  try {
    const rows=await sql`select username, updated_at from creator_profiles where published=true and username is not null order by updated_at desc limit 5000`;
    return [...base,...rows.map((r:any)=>({url:`${site}/${r.username}`,lastModified:r.updated_at||new Date(),changeFrequency:"weekly" as const,priority:.8}))];
  } catch { return base; }
}
