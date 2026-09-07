import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  const site=process.env.NEXT_PUBLIC_SITE_URL||"https://ratecard.wholegacy.com";
  return { rules:[{userAgent:"*",allow:"/",disallow:["/dashboard","/preview","/api/","/login","/register","/onboarding"]}], sitemap:`${site}/sitemap.xml`, host:site };
}
