import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { getCurrentUser } from "@/lib/auth";
import { sql } from "@/lib/db";
export const runtime = "nodejs";
const allowedKinds=new Set(["avatar","cover"]),allowedTypes=new Set(["image/jpeg","image/png","image/webp"]),MAX=5*1024*1024;
export async function POST(request:Request){
  const user=await getCurrentUser();
  if(!user)return NextResponse.json({error:"Unauthorized"},{status:401});
  try{
    const form=await request.formData(); const file=form.get("file"),kind=String(form.get("kind")||"");
    if(!(file instanceof File))return NextResponse.json({error:"File gambar tidak ditemukan."},{status:400});
    if(!allowedKinds.has(kind))return NextResponse.json({error:"Jenis upload tidak valid."},{status:400});
    if(!allowedTypes.has(file.type))return NextResponse.json({error:"Gunakan JPG, PNG, atau WebP."},{status:400});
    if(file.size>MAX)return NextResponse.json({error:"Ukuran maksimal 5 MB."},{status:400});
    const ext=(file.name.split(".").pop()||"jpg").toLowerCase();
    if(process.env.BLOB_READ_WRITE_TOKEN){
      const blob=await put(`ratecard/${user.id}/${kind}-${Date.now()}.${ext}`,file,{access:"public",token:process.env.BLOB_READ_WRITE_TOKEN,addRandomSuffix:true});
      return NextResponse.json({ok:true,url:blob.url,storage:"vercel-blob"});
    }
    // Fallback for projects that have not connected Vercel Blob yet.
    const bytes = new Uint8Array(await file.arrayBuffer());
    const rows:any = await sql`insert into media_assets (user_id,kind,content_type,file_name,data) values (${user.id},${kind},${file.type},${file.name},${bytes}) returning id`;
    const id=String(rows[0].id);
    return NextResponse.json({ok:true,url:`/api/media/${id}`,storage:"neon-fallback"});
  }catch(e:any){
    console.error("media upload",e);
    const msg=String(e?.message||"");
    if(msg.includes("media_assets"))return NextResponse.json({error:"Storage fallback belum disiapkan. Jalankan neon-v11-migration.sql sekali di Neon SQL Editor."},{status:500});
    return NextResponse.json({error:"Upload gambar gagal. Coba ulangi atau periksa koneksi storage."},{status:500});
  }
}
