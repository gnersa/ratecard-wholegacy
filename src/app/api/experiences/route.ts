import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function PUT(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  const items = Array.isArray(body.items) ? body.items.slice(0, 20) : [];
  await sql`delete from collaboration_experiences where user_id = ${user.id}`;
  for (let i = 0; i < items.length; i++) {
    const label = String(items[i]?.label || "").trim().slice(0,500);
    if (!label) continue;
    await sql`insert into collaboration_experiences (user_id, label, position) values (${user.id}, ${label}, ${i})`;
  }
  return NextResponse.json({ ok: true });
}
