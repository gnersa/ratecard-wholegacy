import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const rows = await sql`select * from social_accounts where user_id = ${user.id} order by position asc, created_at asc`;
  return NextResponse.json({ socials: rows });
}

export async function PUT(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  const items = Array.isArray(body.items) ? body.items.slice(0, 10) : [];
  await sql`delete from social_accounts where user_id = ${user.id}`;
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (!item.platform) continue;
    const min = Number(item.averageViewsMin || 0);
    const max = Number(item.averageViewsMax || 0);
    const legacyAverage = min && max ? Math.round((min + max) / 2) : Number(item.averageViews || max || min || 0);
    await sql`insert into social_accounts
      (user_id, platform, handle, url, followers, average_views, average_views_min, average_views_max, engagement_rate, content_style, position)
      values (${user.id}, ${String(item.platform)}, ${String(item.handle || "")}, ${String(item.url || "")}, ${Number(item.followers || 0)}, ${legacyAverage}, ${min}, ${max}, ${Number(item.engagementRate || 0)}, ${String(item.contentStyle || "")}, ${i})`;
  }
  return NextResponse.json({ ok: true });
}
