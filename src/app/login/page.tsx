import Link from "next/link";

export const metadata = { title: "Log in" };

export default function LoginPage() {
  return (
    <main className="simplePage">
      <section className="panel">
        <Link href="/" className="brand">Wholegacy<span>.</span> Ratecard</Link>
        <h1>Welcome back.</h1>
        <p>Authentication UI is ready for the next step. Connect this form to Supabase Auth or Auth.js.</p>
        <div className="field"><label>Email</label><input type="email" placeholder="you@example.com" /></div>
        <div className="field"><label>Password</label><input type="password" placeholder="••••••••" /></div>
        <button className="button primary full">Log in</button>
        <p>New creator? <Link href="/register">Create an account</Link></p>
      </section>
    </main>
  );
}
