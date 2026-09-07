import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { getCurrentUser } from "@/lib/auth";

const allowedKinds = new Set(["avatar", "cover"]);
const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
const MAX_SIZE = 5 * 1024 * 1024;

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const form = await request.formData();
    const file = form.get("file");
    const kind = String(form.get("kind") || "");

    if (!(file instanceof File)) return NextResponse.json({ error: "File gambar tidak ditemukan." }, { status: 400 });
    if (!allowedKinds.has(kind)) return NextResponse.json({ error: "Jenis upload tidak valid." }, { status: 400 });
    if (!allowedTypes.has(file.type)) return NextResponse.json({ error: "Gunakan JPG, PNG, atau WebP." }, { status: 400 });
    if (file.size > MAX_SIZE) return NextResponse.json({ error: "Ukuran maksimal 5 MB." }, { status: 400 });

    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const pathname = `ratecard/${user.id}/${kind}-${Date.now()}.${ext}`;
    const blob = await put(pathname, file, { access: "public" });
    return NextResponse.json({ ok: true, url: blob.url });
  } catch (error) {
    console.error("blob upload error", error);
    return NextResponse.json({ error: "Upload gagal. Pastikan Vercel Blob sudah terhubung ke project." }, { status: 500 });
  }
}
