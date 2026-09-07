import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sql } from "@/lib/db";
import { createSession } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");

    if (name.length < 2) return NextResponse.json({ error: "Nama minimal 2 karakter." }, { status: 400 });
    if (!/^\S+@\S+\.\S+$/.test(email)) return NextResponse.json({ error: "Email tidak valid." }, { status: 400 });
    if (password.length < 8) return NextResponse.json({ error: "Password minimal 8 karakter." }, { status: 400 });

    const existing = await sql`select id from users where lower(email) = ${email} limit 1`;
    if (existing.length) return NextResponse.json({ error: "Email sudah terdaftar." }, { status: 409 });

    const passwordHash = await bcrypt.hash(password, 12);
    const rows = await sql`
      insert into users (name, email, password_hash)
      values (${name}, ${email}, ${passwordHash})
      returning id, name, email
    `;
    const user = rows[0];
    await createSession({ id: user.id, name: user.name, email: user.email });
    return NextResponse.json({ ok: true, redirect: "/onboarding" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Gagal membuat akun. Pastikan database sudah disiapkan." }, { status: 500 });
  }
}
