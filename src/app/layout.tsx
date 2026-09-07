import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://ratecard.wholegacy.com"),
  title: {
    default: "Wholegacy Ratecard — Creator Media Kit & Rate Card",
    template: "%s | Wholegacy Ratecard",
  },
  description: "Build and share a professional creator media kit, portfolio, and social media rate card with one simple link.",
  openGraph: {
    title: "Wholegacy Ratecard",
    description: "Creator media kit, portfolio, and rate card in one link.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
