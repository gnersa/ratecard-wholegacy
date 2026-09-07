import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="nav">
      <div className="container navInner">
        <Link href="/" className="brand brandImageLink"><img src="/brand-logo.png" alt="RWL Rate Card" className="navBrandLogo" /></Link>
        <div className="navLinks">
          <a href="#features">Features</a>
          <a href="#how">How it works</a>
          <Link href="/login">Log in</Link>
          <Link href="/register" className="button primary">Create rate card</Link>
        </div>
      </div>
    </nav>
  );
}
