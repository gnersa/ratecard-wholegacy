import type { Metadata } from "next";

const demoProfile = {
  name: "Maira Putri",
  username: "maira",
  bio: "Beauty and lifestyle creator based in Jakarta. Available for social campaigns, product storytelling, and brand collaborations.",
  rates: [
    ["Instagram Story", "Rp500.000"],
    ["Instagram Feed Post", "Rp1.500.000"],
    ["Instagram Reels", "Rp2.500.000"],
    ["TikTok Video", "Rp3.000.000"],
  ],
};

type Props = { params: Promise<{ username: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  const displayName = username.toLowerCase() === demoProfile.username ? demoProfile.name : username;
  return {
    title: `${displayName} Rate Card & Portfolio`,
    description: `View ${displayName}'s creator rate card, portfolio, social media collaboration services, and business information on Wholegacy Ratecard.`,
    alternates: { canonical: `/${username}` },
  };
}

export default async function CreatorPage({ params }: Props) {
  const { username } = await params;
  const isDemo = username.toLowerCase() === demoProfile.username;
  const profile = isDemo ? demoProfile : { ...demoProfile, name: username.replace(/[-_]/g, " "), username };

  return (
    <main className="profilePage">
      <div className="profileShell">
        <div className="profileHero">
          <div className="profileBanner" />
          <div className="profileContent">
            <div className="eyebrow"><span className="dot" /> Wholegacy Creator</div>
            <h1 className="profileName" style={{marginTop:16}}>{profile.name}</h1>
            <div className="chips"><span className="chip">Beauty</span><span className="chip">Lifestyle</span><span className="chip">Jakarta</span></div>
            <p style={{color:'#aaa', lineHeight:1.7}}>{profile.bio}</p>
          </div>
        </div>

        <section className="profileSection">
          <h2>Audience</h2>
          <div className="stats" style={{padding:0}}>
            <div className="stat"><strong>128K</strong><span>Instagram</span></div>
            <div className="stat"><strong>342K</strong><span>TikTok</span></div>
            <div className="stat"><strong>4.8%</strong><span>Engagement</span></div>
          </div>
        </section>

        <section className="profileSection">
          <h2>Collaboration rates</h2>
          <div className="rateList" style={{margin:0}}>
            {profile.rates.map(([service, price]) => <div className="rateRow" key={service}><span>{service}</span><strong>{price}</strong></div>)}
          </div>
        </section>

        <section className="profileSection">
          <h2>Portfolio</h2>
          <p style={{color:'#888', lineHeight:1.6}}>Portfolio gallery placeholder. This section will later load creator uploads from storage/database.</p>
        </section>
      </div>
    </main>
  );
}
