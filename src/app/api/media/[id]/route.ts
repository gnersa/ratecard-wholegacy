import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
export const runtime = "nodejs";
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const rows = await sql`select content_type, data from media_assets where id = ${id}::uuid limit 1`;
  if (!rows.length) return new NextResponse("Not found", { status: 404 });
  const row:any = rows[0];
  const raw:any = row.data;
  const body = raw instanceof Uint8Array ? raw : Buffer.from(raw);
  return new NextResponse(body, { headers: { "Content-Type": String(row.content_type || "application/octet-stream"), "Cache-Control": "public, max-age=31536000, immutable" } });
}
