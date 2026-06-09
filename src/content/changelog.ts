export type ChangelogCategory = "site" | "systems" | "apps" | "property";

export type ChangelogEntry = {
  date: string;
  title: string;
  body: string;
  category?: ChangelogCategory;
  href?: string;
  hrefLabel?: string;
};

export const categoryLabel: Record<ChangelogCategory, string> = {
  site: "Site",
  systems: "Systems",
  apps: "Apps",
  property: "Property",
};

export const changelog: ChangelogEntry[] = [
  {
    date: "2026-05-07",
    category: "site",
    title: "Studio site overhaul",
    body: "Identity line, real timeline (this), app showcase mocks, per-tab hero, monogram. The site finally tells a stranger what's going on without making them click out.",
  },
  {
    date: "2026-04-29",
    category: "systems",
    title: "Tightened how the automation runs",
    body: "Six recurring jobs moved onto a stricter allowlist so the systems map only does what it is supposed to.",
    href: "https://openclaw-viz-mu.vercel.app/",
    hrefLabel: "See the map",
  },
  {
    date: "2026-04-27",
    category: "systems",
    title: "Email triage went live",
    body: "Inbound mail now feeds the operating map directly — fewer manual checks, faster handoffs.",
    href: "https://openclaw-viz-mu.vercel.app/",
    hrefLabel: "Trace the system",
  },
  {
    date: "2026-04-23",
    category: "systems",
    title: "Sarah upgrade — emergency alerts and caller history",
    body: "The voice line learned to recognize emergencies, route alerts to me directly, and remember who has called before.",
  },
  {
    date: "2026-03-22",
    category: "property",
    title: "AppFolio work-order sync",
    body: "Work-order pulls now run automatically — 28 orders parsed in under a minute, ready to review in one place.",
  },
  {
    date: "2026-04-12",
    category: "systems",
    title: "Workflow map went public",
    body: "The plain-English diagram of how calls, approvals, and reminders move is now linked from the studio site.",
    href: "https://openclaw-viz-mu.vercel.app/",
    hrefLabel: "Open the map",
  },
  {
    date: "2026-03-28",
    category: "apps",
    title: "HabitForge “gamer” teaser",
    body: "First image-to-video teaser rendered, synced to the lyric track. Brand site is live.",
    href: "https://habitforgeai.com",
    hrefLabel: "Visit HabitForge",
  },
  {
    date: "2026-03-25",
    category: "systems",
    title: "Sarah goes live on (866) 953-8055",
    body: "A 24/7 AI voice agent answers the property line, takes details, and routes work to the right place.",
    href: "tel:+18669538055",
    hrefLabel: "Call Sarah",
  },
  {
    date: "2026-01-22",
    category: "apps",
    title: "HabitForgeAI.com brand site online",
    body: "Public-facing brand site for the habit app — explainer, screenshots, download path.",
    href: "https://habitforgeai.com",
    hrefLabel: "Visit site",
  },
  {
    date: "2026-01-05",
    category: "site",
    title: "Palmer Control Center opens",
    body: "Property leasing, maintenance, documents, and daily decisions moved behind a single private workspace.",
    href: "https://palmercontrolcenter.com",
    hrefLabel: "Open site",
  },
  {
    date: "2026-03-20",
    category: "apps",
    title: "TodoToNotes prototype",
    body: "A small macOS utility: snap a handwritten list, review the parsed tasks, save a clean checklist to Apple Notes.",
  },
  {
    date: "2026-03-05",
    category: "systems",
    title: "First automation pipeline live",
    body: "The earliest scheduled jobs go online — daily summaries, reminder routing, and a Telegram approval inbox.",
  },
  {
    date: "2026-01-14",
    category: "apps",
    title: "Transfer Portal v1 hits the App Store",
    body: "Free iPhone app for tracking NCAA football transfers across all 138 FBS programs. No ads, no paywall.",
    href: "https://apps.apple.com/us/app/the-portal-cfb-transfers/id6757326986",
    hrefLabel: "App Store",
  },
  {
    date: "2026-04-23",
    category: "site",
    title: "acpdesigns.studio publishes",
    body: "First public version of the studio's front door — a single page pointing at properties, apps, and the rest.",
  },
  {
    date: "2026-03-15",
    category: "property",
    title: "Palmer Construction site online",
    body: "Public site for the parent brand behind the rental portfolio — Tuscaloosa and Northport projects.",
    href: "https://palmerconstructioncompany.co",
    hrefLabel: "Visit Palmer Construction",
  },
];

export const lastUpdated = changelog[0]?.date ?? null;

export function formatChangelogDateShort(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  return dt.toLocaleDateString("en-US", {
    timeZone: "UTC",
    month: "short",
    day: "numeric",
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

export function groupByYear(
  entries: ChangelogEntry[],
): Array<{ year: string; entries: ChangelogEntry[] }> {
  const map = new Map<string, ChangelogEntry[]>();
  for (const e of entries) {
    const year = e.date.slice(0, 4);
    const existing = map.get(year);
    if (existing) existing.push(e);
    else map.set(year, [e]);
  }
  return Array.from(map.entries())
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([year, entries]) => ({
      year,
      entries: [...entries].sort((a, b) => b.date.localeCompare(a.date)),
    }));
}
