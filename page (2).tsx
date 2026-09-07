import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import OnboardingForm from "@/components/OnboardingForm";

export default async function OnboardingPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return <OnboardingForm defaultName={user.name} defaultEmail={user.email} />;
}
