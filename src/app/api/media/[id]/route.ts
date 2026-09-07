import { sql } from "@/lib/db";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const rows = await sql`select content_type, data from media_assets where id = ${id}::uuid limit 1`;

  if (!rows.length) {
    return new Response("Not found", { status: 404 });
  }

  const row = rows[0] as { content_type?: string; data: unknown };
  const buffer = Buffer.isBuffer(row.data)
    ? row.data
    : Buffer.from(row.data as Uint8Array);

  // Response accepts ArrayBuffer as BodyInit. Slice the underlying buffer to the
  // exact byte range because Node Buffers can share a larger ArrayBuffer.
  const body = buffer.buffer.slice(
    buffer.byteOffset,
    buffer.byteOffset + buffer.byteLength,
  ) as ArrayBuffer;

  return new Response(body, {
    headers: {
      "Content-Type": String(row.content_type || "application/octet-stream"),
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
