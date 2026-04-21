import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.acpdesigns.studio"),
  title: "ACP Designs Studio",
  description:
    "A studio site for OpenClaw, property management systems, HabitForge, Transfer Portal, and TodoToNotes.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ACP Designs Studio",
    description:
      "Products and systems Carson Palmer is actively building across property management, automation, iOS, web, and macOS.",
    url: "/",
    siteName: "ACP Designs Studio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ACP Designs Studio",
    description:
      "Products and systems Carson Palmer is actively building across property management, automation, iOS, web, and macOS.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://www.acpdesigns.studio/#person",
      name: "Carson Palmer",
      url: "https://www.acpdesigns.studio",
      email: "crsnpalmer@gmail.com",
      jobTitle: "Independent builder",
      worksFor: {
        "@type": "Organization",
        name: "ACP Designs Studio",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://www.acpdesigns.studio/#website",
      url: "https://www.acpdesigns.studio",
      name: "ACP Designs Studio",
      inLanguage: "en-US",
      publisher: { "@id": "https://www.acpdesigns.studio/#person" },
      description:
        "Products and systems Carson Palmer is actively building across property management, automation, iOS, web, and macOS.",
    },
    {
      "@type": "Organization",
      "@id": "https://www.acpdesigns.studio/#organization",
      name: "ACP Designs Studio",
      url: "https://www.acpdesigns.studio",
      founder: { "@id": "https://www.acpdesigns.studio/#person" },
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
    <html lang="en" className={inter.variable}>
      <body>
        {children}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
