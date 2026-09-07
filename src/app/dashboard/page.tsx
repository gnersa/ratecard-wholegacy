import Link from "next/link";

export const metadata = { title: "Dashboard" };

export default function DashboardPage() {
  return (
    <main className="dashboard">
      <div className="container dashboardGrid">
        <aside className="sidebar">
          <Link href="/" className="brand">W<span>.</span> Ratecard</Link>
          <p style={{color:'#777', fontSize:12}}>Creator workspace</p>
          <a href="#">Overview</a><a href="#">Profile</a><a href="#">Social accounts</a><a href="#">Portfolio</a><a href="#">Rates</a><a href="#">Settings</a>
        </aside>
        <section className="dashMain">
          <h1>Creator dashboard</h1>
          <p style={{color:'#999'}}>Starter dashboard prepared for database and authentication integration.</p>
          <div className="dashCards">
            <div className="dashCard"><span>Profile status</span><strong>Draft</strong></div>
            <div className="dashCard"><span>Rate services</span><strong>0</strong></div>
            <div className="dashCard"><span>Portfolio items</span><strong>0</strong></div>
          </div>
        </section>
      </div>
    </main>
  );
}
