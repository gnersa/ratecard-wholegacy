import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { isValidUsername, normalizeUsername } from "@/lib/username";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const rows = await sql`select * from creator_profiles where user_id = ${user.id} limit 1`;
  return NextResponse.json({ user, profile: rows[0] || null });
}

export async function PUT(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await request.json();
    const username = normalizeUsername(String(body.username || ""));
    if (!isValidUsername(username)) return NextResponse.json({ error: "Username tidak valid atau merupakan nama sistem." }, { status: 400 });
    const displayName = String(body.displayName || "").trim();
    if (displayName.length < 2) return NextResponse.json({ error: "Nama creator wajib diisi." }, { status: 400 });

    const duplicate = await sql`select user_id from creator_profiles where lower(username) = ${username} and user_id <> ${user.id} limit 1`;
    if (duplicate.length) return NextResponse.json({ error: "Username sudah digunakan." }, { status: 409 });

    const theme = ["minimal", "creator", "dark-pro"].includes(body.theme) ? body.theme : "minimal";
    const rows = await sql`
      insert into creator_profiles
        (user_id, username, display_name, bio, category, location, avatar_url, cover_url, contact_email, whatsapp, theme, updated_at)
      values
        (${user.id}, ${username}, ${displayName}, ${String(body.bio || "")}, ${String(body.category || "")}, ${String(body.location || "")}, ${String(body.avatarUrl || "")}, ${String(body.coverUrl || "")}, ${String(body.contactEmail || user.email)}, ${String(body.whatsapp || "")}, ${theme}, now())
      on conflict (user_id) do update set
        username = excluded.username,
        display_name = excluded.display_name,
        bio = excluded.bio,
        category = excluded.category,
        location = excluded.location,
        avatar_url = excluded.avatar_url,
        cover_url = excluded.cover_url,
        contact_email = excluded.contact_email,
        whatsapp = excluded.whatsapp,
        theme = excluded.theme,
        updated_at = now()
      returning *
    `;
    return NextResponse.json({ ok: true, profile: rows[0] });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Gagal menyimpan profile." }, { status: 500 });
  }
}
