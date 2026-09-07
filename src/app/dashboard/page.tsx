import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { sql } from "@/lib/db";
import DashboardClient from "@/components/DashboardClient";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const profiles = await sql`select * from creator_profiles where user_id = ${user.id} limit 1`;
  if (!profiles.length) redirect("/onboarding");
  const socials = await sql`select * from social_accounts where user_id = ${user.id} order by position asc, created_at asc`;
  const rates = await sql`select * from rate_items where user_id = ${user.id} order by position asc, created_at asc`;
  return <DashboardClient user={user} profile={profiles[0]} initialSocials={socials} initialRates={rates} />;
}
