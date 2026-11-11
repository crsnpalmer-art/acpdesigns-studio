import type { Metadata } from "next";
import FieldManualChrome from "@/components/field-manual/FieldManualChrome";
import OperatingMap from "@/components/field-manual/OperatingMap";
import { numberWord, operatingStats } from "@/content/operating-map";

const description = `${numberWord(operatingStats.agents, true)} AI specialists and ${operatingStats.routines} scheduled jobs that help run a property business — what each automation does, in plain words, and where a person still decides.`;

export const metadata: Metadata = {
  title: "Systems | ACP Designs Studio",
  description:
    description,
  alternates: {
    canonical: "/systems",
  },
  openGraph: {
    title: "Systems | ACP Designs Studio",
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
      skipLabel="Skip to the systems"
    >
      <OperatingMap />
    </FieldManualChrome>
  );
}
