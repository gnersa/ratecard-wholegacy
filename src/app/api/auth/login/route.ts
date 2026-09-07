import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sql } from "@/lib/db";
import { createSession } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");
    const rows = await sql`select id, name, email, password_hash from users where lower(email) = ${email} limit 1`;
    if (!rows.length || !rows[0].password_hash) return NextResponse.json({ error: "Email atau password salah." }, { status: 401 });
    const valid = await bcrypt.compare(password, rows[0].password_hash);
    if (!valid) return NextResponse.json({ error: "Email atau password salah." }, { status: 401 });
    await createSession({ id: rows[0].id, name: rows[0].name, email: rows[0].email });
    const profiles = await sql`select username from creator_profiles where user_id = ${rows[0].id} limit 1`;
    return NextResponse.json({ ok: true, redirect: profiles.length ? "/dashboard" : "/onboarding" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Login gagal." }, { status: 500 });
  }
}
