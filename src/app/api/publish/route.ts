import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json().catch(() => ({}));
  const published = body.published !== false;
  const profiles = await sql`select username, display_name from creator_profiles where user_id = ${user.id} limit 1`;
  if (!profiles.length) return NextResponse.json({ error: "Lengkapi profile terlebih dahulu." }, { status: 400 });
  const rates = await sql`select id from rate_items where user_id = ${user.id} limit 1`;
  if (published && !rates.length) return NextResponse.json({ error: "Tambahkan minimal satu rate sebelum publish." }, { status: 400 });
  await sql`update creator_profiles set published = ${published}, updated_at = now() where user_id = ${user.id}`;
  return NextResponse.json({ ok: true, published, url: `/${profiles[0].username}` });
}
