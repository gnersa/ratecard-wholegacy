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

    const allowedThemes = ["cream-editorial","dark-bento-neon","pastel-lookbook","minimal-mono","aura-glass","brutalist-paper","luxury-gold","kawaii-dashboard","modern-sidebar-pro","magazine-cover-hero","minimal","creator","dark-pro","editorial"];
    const theme = allowedThemes.includes(body.theme) ? body.theme : "cream-editorial";
    const colorPattern = String(body.colorPattern || "").slice(0,60);
    const language = ["id", "en"].includes(body.language) ? body.language : "id";
    const rows = await sql`
      insert into creator_profiles
        (user_id, username, display_name, bio, category, location, avatar_url, cover_url, contact_email, whatsapp, theme, color_pattern, language, updated_at)
      values
        (${user.id}, ${username}, ${displayName}, ${String(body.bio || "").slice(0,420)}, ${String(body.category || "").slice(0,100)}, ${String(body.location || "").slice(0,100)}, ${String(body.avatarUrl || "")}, ${String(body.coverUrl || "")}, ${String(body.contactEmail || user.email)}, ${String(body.whatsapp || "")}, ${theme}, ${colorPattern}, ${language}, now())
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
        color_pattern = excluded.color_pattern,
        language = excluded.language,
        updated_at = now()
      returning *
    `;
    return NextResponse.json({ ok: true, profile: rows[0] });
  } catch (error: any) {
    console.error("[api/profile] save failed", error);
    const code = String(error?.code || "");
    const message = String(error?.message || "");

    if (code === "42703" || /column .* does not exist/i.test(message)) {
      return NextResponse.json(
        { error: "Database belum menggunakan schema terbaru. Jalankan neon-v17.5.2-fix.sql di Neon SQL Editor, lalu coba Save & Publish lagi.", code: "SCHEMA_OUTDATED" },
        { status: 500 }
      );
    }

    if (code === "23514" || /creator_profiles_theme_check/i.test(message)) {
      return NextResponse.json(
        { error: "Pilihan desain terbaru belum diizinkan oleh constraint database. Jalankan neon-v17.5.2-fix.sql di Neon SQL Editor, lalu coba lagi.", code: "THEME_CONSTRAINT_OUTDATED" },
        { status: 500 }
      );
    }

    if (code === "22001") {
      return NextResponse.json(
        { error: "Ada data profil yang melebihi kapasitas kolom database. Jalankan neon-v17.5.2-fix.sql lalu coba lagi.", code: "COLUMN_TOO_SHORT" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Gagal menyimpan profil. Silakan coba lagi. Jika tetap gagal, periksa Vercel Function log untuk [api/profile].", code: code || "PROFILE_SAVE_FAILED" },
      { status: 500 }
    );
  }
}
