export type ChangelogEntry = {
  date: string;
  title: string;
  body: string;
  href?: string;
  hrefLabel?: string;
};

export const changelog: ChangelogEntry[] = [
  {
    date: "2026-04-29",
    title: "Tightened how the studio's automation runs",
    body: "Six recurring jobs moved onto a stricter allowlist so the systems map only does what it is supposed to.",
    href: "https://openclaw-viz-mu.vercel.app/",
    hrefLabel: "See the map",
  },
  {
    date: "2026-04-27",
    title: "Email triage went live",
    body: "Inbound mail now feeds the operating map directly — fewer manual checks, faster handoffs.",
    href: "https://openclaw-viz-mu.vercel.app/",
    hrefLabel: "Trace the system",
  },
  {
    date: "2026-04-25",
    title: "Sarah, the 24/7 voice line",
    body: "An AI voice agent answers the property line around the clock and routes work cleanly to the right place.",
    href: "tel:+18669538055",
    hrefLabel: "(866) 953-8055",
  },
  {
    date: "2026-04-21",
    title: "Cloud AppFolio sync",
    body: "Work-order pulls now run from the cloud — 28 orders in under a minute, parsed and ready to review.",
  },
  {
    date: "2026-03-28",
    title: "HabitForge teaser — \"gamer\"",
    body: "First image-to-video teaser rendered, synced to the lyric track. Brand site is live.",
    href: "https://habitforgeai.com",
    hrefLabel: "Visit HabitForge",
  },
  {
    date: "2026-02-14",
    title: "Transfer Portal hits the App Store",
    body: "Free iPhone app for tracking NCAA football transfers across all 132 FBS programs.",
    href: "https://apps.apple.com/us/app/the-portal-cfb-transfers/id6757326986",
    hrefLabel: "App Store",
  },
  {
    date: "2026-01-12",
    title: "Palmer Control Center opens",
    body: "Property leasing, maintenance, and daily decisions moved behind a single private workspace.",
    href: "https://palmercontrolcenter.com",
    hrefLabel: "Open site",
  },
];

export const lastUpdated = changelog[0]?.date ?? null;

export function formatChangelogDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  return dt.toLocaleDateString("en-US", {
    timeZone: "UTC",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatLastUpdated(iso: string | null): string {
  if (!iso) return "";
  const [y, m] = iso.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, 1));
  return dt.toLocaleDateString("en-US", {
    timeZone: "UTC",
    month: "long",
    year: "numeric",
  });
}
