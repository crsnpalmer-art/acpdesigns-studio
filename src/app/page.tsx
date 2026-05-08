import HomeClient from "./home-client";

// Inlined here (not imported) because exports from a "use client" module
// become client-reference proxies when read on the server — `.includes` won't
// exist. This keeps the source of truth in home-client.tsx's `heroTabs`, with
// a small duplication for the allowlist.
const TAB_IDS = [
  "property-management",
  "workflow-automation",
  "control-center",
  "habitforge",
  "transfer-portal",
  "todotonotes",
] as const;
type TabId = (typeof TAB_IDS)[number];

// Opting into dynamic rendering is automatic because we read `searchParams`,
// and that trade-off is intentional: the deep-link feature requires a per-request
// initial hero state so crawlers and no-JS users see the right tab without a
// post-hydration flip.
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  const rawTab = Array.isArray(sp.tab) ? sp.tab[0] : sp.tab;
  const initialTab: TabId =
    rawTab && (TAB_IDS as readonly string[]).includes(rawTab)
      ? (rawTab as TabId)
      : TAB_IDS[0];

  return <HomeClient initialTab={initialTab} />;
}
