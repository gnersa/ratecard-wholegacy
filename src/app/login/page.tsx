"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export default function LoginPage() {
  const [loading, setLoading] = useState(false); const [error, setError] = useState("");
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setLoading(true); setError("");
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: form.get("email"), password: form.get("password") }) });
    const data = await res.json();
    if (!res.ok) { setError(data.error || "Login gagal."); setLoading(false); return; }
    window.location.href = data.redirect || "/dashboard";
  }
  return <main className="simplePage"><section className="panel authPanel">
    <Link href="/" className="brand">Wholegacy<span>.</span></Link>
    <h1>Welcome back</h1><p>Masuk untuk mengelola rate card dan halaman creator kamu.</p>
    <form onSubmit={submit}>
      <div className="field"><label>Email</label><input type="email" name="email" required /></div>
      <div className="field"><label>Password</label><input type="password" name="password" required /></div>
      {error && <div className="formError">{error}</div>}
      <button className="button primary full" disabled={loading}>{loading ? "Masuk..." : "Login"}</button>
    </form>
    <p className="authFoot">Belum punya akun? <Link href="/register">Daftar</Link></p>
  </section></main>;
}
