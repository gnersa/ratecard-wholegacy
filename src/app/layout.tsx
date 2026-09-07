import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://ratecard.wholegacy.com"),
  title: {
    default: "RWL Rate Card — Online Rate Card Generator",
    template: "%s | RWL Rate Card",
  },
  description: "Create and share a professional online rate card and creator media kit for Instagram, TikTok, YouTube, Facebook, X, and more.",
  openGraph: {
    title: "RWL Rate Card — Online Rate Card Generator",
    description: "Create a professional creator media kit and online rate card in one shareable link.",
    type: "website",
    url: "/",
    siteName: "RWL Rate Card",
    images: [{ url: "/og-image.png", width: 1672, height: 941, alt: "RWL Rate Card Online Generator" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "RWL Rate Card — Online Rate Card Generator",
    description: "Create a professional creator media kit and online rate card in one shareable link.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
