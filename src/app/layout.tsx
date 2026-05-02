import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.acpdesigns.studio"),
  title: "ACP Designs Studio",
  description:
    "A relaxed shelf for property work, workflow maps, app ideas, and notes from the build.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ACP Designs Studio",
    description:
      "A relaxed shelf for property work, workflow maps, app ideas, and notes from the build.",
    url: "/",
    siteName: "ACP Designs Studio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ACP Designs Studio",
    description:
      "A relaxed shelf for property work, workflow maps, app ideas, and notes from the build.",
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
        "A relaxed shelf for property work, workflow maps, app ideas, and notes from the build.",
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
    <html lang="en">
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
