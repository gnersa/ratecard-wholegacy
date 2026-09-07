import Link from "next/link";

export const metadata = { title: "Create account" };

export default function RegisterPage() {
  return (
    <main className="simplePage">
      <section className="panel">
        <Link href="/" className="brand">Wholegacy<span>.</span> Ratecard</Link>
        <h1>Create your creator page.</h1>
        <p>This starter includes the UI only. Email verification and Google login will be wired to the auth provider in the next development phase.</p>
        <div className="field"><label>Name</label><input placeholder="Creator name" /></div>
        <div className="field"><label>Email</label><input type="email" placeholder="you@example.com" /></div>
        <div className="field"><label>Password</label><input type="password" placeholder="Minimum 8 characters" /></div>
        <button className="button primary full">Create account</button>
        <p>Already registered? <Link href="/login">Log in</Link></p>
      </section>
    </main>
  );
}
