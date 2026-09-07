import Link from "next/link";
import Navbar from "@/components/Navbar";
import SupportLink from "@/components/SupportLink";

const features = [
  ["01", "One link, everything", "Bring your rate card, portfolio, social profiles, audience highlights, and business contact into a single creator page."],
  ["02", "Built to be discovered", "Public creator pages are structured for search engines with unique metadata, readable rates, and indexable profile content."],
  ["03", "Update without resending PDFs", "Change rates or portfolio items from your dashboard. The link stays the same, so brands always see your latest media kit."],
];

export default function Home() {
  return (
    <main>
      <Navbar />
      <section className="hero">
        <div className="container heroGrid">
          <div>
            <div className="eyebrow"><span className="dot" /> Built for creators, made for brands</div>
            <h1>Your creator value, in one link.</h1>
            <p>Build a professional rate card, portfolio, and media kit for Instagram, TikTok, Facebook, and more. Share it with brands using your own Wholegacy creator URL.</p>
            <div className="actions">
              <Link href="/register" className="button primary">Create your rate card →</Link>
              <Link href="/maira" className="button secondary">View example</Link>
            </div>
            <div className="helper">Example: ratecard.wholegacy.com/yourname</div>
          </div>

          <div className="creatorMock" aria-label="Example creator rate card preview">
            <div className="mockCover" />
            <div className="mockAvatar" />
            <div className="mockHead">
              <h3>Maira Putri</h3>
              <p>Beauty · Lifestyle · Jakarta<br />Creating warm, high-converting lifestyle content.</p>
            </div>
            <div className="stats">
              <div className="stat"><strong>128K</strong><span>Instagram</span></div>
              <div className="stat"><strong>342K</strong><span>TikTok</span></div>
              <div className="stat"><strong>4.8%</strong><span>Engagement</span></div>
            </div>
            <div className="rateList">
              <div className="rateRow"><span>Instagram Story</span><strong>Rp500K</strong></div>
              <div className="rateRow"><span>Instagram Reels</span><strong>Rp2.5JT</strong></div>
              <div className="rateRow"><span>TikTok Video</span><strong>Rp3JT</strong></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="features">
        <div className="container">
          <div className="sectionHeader">
            <h2>Not another forgotten rate card PDF.</h2>
            <p>Your public profile becomes a living media kit that can grow with your audience, work, and pricing.</p>
          </div>
          <div className="cards">
            {features.map(([n, title, body]) => (
              <article className="card" key={n}>
                <div className="cardNum">{n}</div>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="how">
        <div className="container">
          <div className="cta">
            <div>
              <h2>Create once. Share everywhere.</h2>
              <p>Claim your creator username, complete your profile, add services and rates, then publish a clean public page under ratecard.wholegacy.com.</p>
            </div>
            <Link href="/register" className="button">Claim your link</Link>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container landingFooterInner"><span>© 2026 Wholegacy. Creator tools for the modern collaboration economy.</span><SupportLink /></div>
      </footer>
    </main>
  );
}
