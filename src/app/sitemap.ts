import type { MetadataRoute } from "next";
import live from "@/content/hermes-live.json";

// Pages change when the content snapshot does, not on every build.
const lastModified = new Date(live.verified);

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.acpdesigns.studio",
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://www.acpdesigns.studio/systems",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://www.acpdesigns.studio/systems/playbook",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://www.acpdesigns.studio/systems/playbook/build",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: "https://www.acpdesigns.studio/systems/playbook/costs",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: "https://www.acpdesigns.studio/systems/playbook/reference",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: "https://www.acpdesigns.studio/privacy",
      lastModified,
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];
}
