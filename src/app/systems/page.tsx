import type { Metadata } from "next";
import FieldManualChrome from "@/components/field-manual/FieldManualChrome";
import OperatingMap from "@/components/field-manual/OperatingMap";
import { operatingStats } from "@/content/operating-map";

const description = `A dispatcher and eight specialists, ${operatingStats.routines} scheduled jobs, and ${operatingStats.macJobs} Mac background services — the public map of how ACP Designs Studio runs, and how every job works.`;

export const metadata: Metadata = {
  title: "Operating map | ACP Designs Studio",
  description:
    description,
  alternates: {
    canonical: "/systems",
  },
  openGraph: {
    title: "Operating map | ACP Designs Studio",
    description:
      description,
    url: "/systems",
    siteName: "ACP Designs Studio",
    type: "article",
  },
};

export default function SystemsPage() {
  return (
    <FieldManualChrome
      page="systems"
      skipHref="#operating-map"
      skipLabel="Skip to the operating map"
      rail={["v1.0", "Operating Map", "Nine Lanes"]}
    >
      <OperatingMap />
    </FieldManualChrome>
  );
}
