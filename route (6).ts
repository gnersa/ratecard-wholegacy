import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const rows = await sql`select * from rate_items where user_id = ${user.id} order by position asc, created_at asc`;
  return NextResponse.json({ rates: rows });
}

export async function PUT(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  const items = Array.isArray(body.items) ? body.items.slice(0, 30) : [];
  await sql`delete from rate_items where user_id = ${user.id}`;
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (!item.platform || !item.serviceName) continue;
    await sql`insert into rate_items (user_id, platform, service_name, price, currency, description, position)
      values (${user.id}, ${String(item.platform)}, ${String(item.serviceName)}, ${Number(item.price || 0)}, ${String(item.currency || "IDR")}, ${String(item.description || "")}, ${i})`;
  }
  return NextResponse.json({ ok: true });
}
