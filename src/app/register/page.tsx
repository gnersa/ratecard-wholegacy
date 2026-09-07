"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setLoading(true); setError("");
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/auth/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: form.get("name"), email: form.get("email"), password: form.get("password") }) });
    const data = await res.json();
    if (!res.ok) { setError(data.error || "Pendaftaran gagal."); setLoading(false); return; }
    window.location.href = data.redirect || "/onboarding";
  }

  return <main className="simplePage"><section className="panel authPanel">
    <Link href="/" className="brand">Wholegacy<span>.</span></Link>
    <h1>Buat akun creator</h1><p>Satu akun untuk membuat, mengedit, dan mempublikasikan rate card kamu.</p>
    <form onSubmit={submit}>
      <div className="field"><label>Nama</label><input name="name" placeholder="Nama kamu" required /></div>
      <div className="field"><label>Email</label><input type="email" name="email" placeholder="nama@email.com" required /></div>
      <div className="field"><label>Password</label><input type="password" name="password" minLength={8} placeholder="Minimal 8 karakter" required /></div>
      {error && <div className="formError">{error}</div>}
      <button className="button primary full" disabled={loading}>{loading ? "Membuat akun..." : "Daftar"}</button>
    </form>
    <p className="authFoot">Sudah punya akun? <Link href="/login">Login</Link></p>
  </section></main>;
}
