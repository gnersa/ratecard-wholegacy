"use client";
import { FormEvent, useEffect, useState } from "react";

export default function OnboardingForm({ defaultName, defaultEmail }: { defaultName: string; defaultEmail: string }) {
  const [username, setUsername] = useState(""); const [available, setAvailable] = useState<boolean | null>(null); const [checking, setChecking] = useState(false); const [error, setError] = useState("");
  useEffect(() => {
    if (username.length < 3) { setAvailable(null); return; }
    setChecking(true); const t = setTimeout(async () => { const r = await fetch(`/api/username/check?username=${encodeURIComponent(username)}`); const d = await r.json(); setAvailable(Boolean(d.available)); setChecking(false); }, 350);
    return () => clearTimeout(t);
  }, [username]);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setError(""); const form = new FormData(e.currentTarget);
    const res = await fetch("/api/profile", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username, displayName: form.get("displayName"), bio: form.get("bio"), category: form.get("category"), location: form.get("location"), contactEmail: defaultEmail, theme: "minimal" }) });
    const data = await res.json(); if (!res.ok) { setError(data.error || "Gagal menyimpan."); return; } window.location.href = "/dashboard";
  }
  return <main className="simplePage"><section className="panel onboardingPanel">
    <div className="eyebrow"><span className="dot"/>Creator onboarding</div><h1>Buat identitas rate card kamu.</h1><p>Pilih username unik. Ini akan menjadi URL publik yang kamu bagikan ke brand.</p>
    <form onSubmit={submit}>
      <div className="field"><label>Nama creator</label><input name="displayName" defaultValue={defaultName} required /></div>
      <div className="field"><label>Username</label><div className="urlInput"><span>ratecard.wholegacy.com/</span><input value={username} onChange={e => setUsername(e.target.value.toLowerCase().replace(/\s+/g, ""))} placeholder="namacreator" required /></div><small className={available ? "availability good" : available === false ? "availability bad" : "availability"}>{checking ? "Checking..." : available === true ? "✓ Username tersedia" : available === false ? "✕ Username tidak tersedia / tidak valid" : "3–30 karakter"}</small></div>
      <div className="field"><label>Category / niche</label><input name="category" placeholder="Beauty, Gaming, Food, Lifestyle..." /></div>
      <div className="field"><label>Location</label><input name="location" placeholder="Jakarta, Indonesia" /></div>
      <div className="field"><label>Bio</label><textarea name="bio" placeholder="Ceritakan singkat tentang konten kamu." /></div>
      {error && <div className="formError">{error}</div>}
      <button className="button primary full" disabled={available !== true}>Lanjut ke CMS</button>
    </form>
  </section></main>;
}
