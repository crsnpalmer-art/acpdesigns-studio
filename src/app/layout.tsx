import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Bodoni_Moda, Manrope } from "next/font/google";
import "./globals.css";

const displayFont = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.acpdesigns.studio"),
  title: "ACP Designs Studio",
  description:
    "Carson Palmer builds useful systems for real property operations, practical software, and human-supervised AI.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ACP Designs Studio",
    description:
      "Useful systems for real property operations, practical software, and human-supervised AI.",
    url: "/",
    siteName: "ACP Designs Studio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ACP Designs Studio",
    description:
      "Useful systems for real property operations, practical software, and human-supervised AI.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://www.acpdesigns.studio/#website",
      url: "https://www.acpdesigns.studio",
      name: "ACP Designs Studio",
      inLanguage: "en-US",
      publisher: { "@id": "https://www.acpdesigns.studio/#organization" },
      description:
        "Useful systems for real property operations, practical software, and human-supervised AI.",
    },
    {
      "@type": "Organization",
      "@id": "https://www.acpdesigns.studio/#organization",
      name: "ACP Designs Studio",
      url: "https://www.acpdesigns.studio",
      email: "crsnpalmer@gmail.com",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
