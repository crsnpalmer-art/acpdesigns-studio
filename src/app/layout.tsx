import type { Metadata } from "next";
import { Inter } from "next/font/google";
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
    images: [{ url: "/hero-poster.jpg", width: 1600, height: 895 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ACP Designs Studio",
    description:
      "Products and systems Carson Palmer is actively building across property management, automation, iOS, web, and macOS.",
    images: ["/hero-poster.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
