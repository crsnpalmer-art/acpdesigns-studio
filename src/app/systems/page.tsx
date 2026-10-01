import type { Metadata } from "next";
import FieldManualChrome from "@/components/field-manual/FieldManualChrome";
import OperatingMap from "@/components/field-manual/OperatingMap";

export const metadata: Metadata = {
  title: "Operating map | ACP Designs Studio",
  description:
    "A conductor and eight specialists, 33 scheduled routines, and 5 Mac background jobs — the public map of how ACP Designs Studio runs.",
  alternates: {
    canonical: "/systems",
  },
  openGraph: {
    title: "Operating map | ACP Designs Studio",
    description:
      "A conductor and eight specialists, 33 scheduled routines, and 5 Mac background jobs — the public map of how ACP Designs Studio runs.",
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
