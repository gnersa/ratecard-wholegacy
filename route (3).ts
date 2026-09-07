import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function PUT(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  const items = Array.isArray(body.items) ? body.items.slice(0, 20) : [];
  await sql`delete from terms_conditions where user_id = ${user.id}`;
  for (let i = 0; i < items.length; i++) {
    const content = String(items[i]?.content || "").trim();
    if (!content) continue;
    await sql`insert into terms_conditions (user_id, content, position) values (${user.id}, ${content}, ${i})`;
  }
  return NextResponse.json({ ok: true });
}
