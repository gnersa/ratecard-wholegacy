import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { isValidUsername, normalizeUsername } from "@/lib/username";

export async function GET(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const username = normalizeUsername(new URL(request.url).searchParams.get("username") || "");
  if (!isValidUsername(username)) return NextResponse.json({ available: false, reason: "Gunakan 3–30 karakter: huruf kecil, angka, titik, underscore, atau dash." });
  const rows = await sql`select user_id from creator_profiles where lower(username) = ${username} limit 1`;
  const available = !rows.length || rows[0].user_id === user.id;
  return NextResponse.json({ available });
}
