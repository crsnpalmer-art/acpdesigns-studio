"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  categoryLabel,
  changelog,
  formatChangelogDateShort,
  formatLastUpdated,
  groupByYear,
  lastUpdated,
} from "@/content/changelog";

const HERO_VIDEO_DEFAULT = "/hero.mp4";
const HERO_POSTER_DEFAULT = "/hero-poster.jpg";

type HeroTab = {
  id: string;
  label: string;
  heading: string;
  subheading: string;
  tag: string;
  primaryHref: string;
  primaryLabel: string;
  projectTarget: string;
  external?: boolean;
  secondaryHref?: string;
  secondaryLabel?: string;
  secondaryExternal?: boolean;
  tint: string;
  heroVideo?: string;
  heroPoster?: string;
};

type PropertyTile = {
  slug: string;
  name: string;
  city: string;
  units: number;
  fromPrice?: number;
  availability?: string;
  href: string;
  video?: string;
  videoPoster?: string;
};

type Project = {
  id: string;
  name: string;
  status: string;
  access: string;
  category: string;
  why: string;
  summary: string;
  description: string;
  metrics: Array<{ label: string; value: string }>;
  href?: string;
  hrefLabel?: string;
  properties?: PropertyTile[];
  extraLink?: { href: string; label: string };
  icon?: string; // optional square brand mark rendered beside the project name
};

const studioStats = [
  { label: "Rental portfolio", value: "108 units" },
  { label: "Flagship workspace", value: "Private login" },
  { label: "Automation map", value: "35 live jobs" },
  { label: "Public apps", value: "iOS + web" },
];

const heroTabs: HeroTab[] = [
  {
    id: "property-management",
    label: "Portfolio",
    heading: "Built for\nreal work.",
    subheading:
      "Home for my property portfolio, apps,\nautomation systems, and ideas.",
    tag: "One place for the work.",
    primaryHref: "#projects",
    primaryLabel: "Explore",
    projectTarget: "palmer-properties",
    secondaryHref: "https://palmerconstructioncompany.co",
    secondaryLabel: "Palmer Construction",
    secondaryExternal: true,
    tint: "rgba(245, 165, 36, 0.18)",
    heroVideo: "/property-videos/pinnacle-park.mp4",
    heroPoster: "/property-videos/pinnacle-park.jpg",
  },
  {
    id: "workflow-automation",
    label: "Systems",
    heading: "Readable\noperations.",
    subheading:
      "Calls, approvals, reminders, and handoffs shown in plain English.",
    tag: "Practical automation, explained.",
    primaryHref: "https://openclaw-viz-mu.vercel.app/",
    primaryLabel: "Open map",
    projectTarget: "workflow-automation",
    external: true,
    secondaryHref: "#project-workflow-automation",
    secondaryLabel: "System card",
    tint: "rgba(192, 132, 252, 0.20)",
  },
  {
    id: "control-center",
    label: "Control Center",
    heading: "Private\ncommand center.",
    subheading:
      "Palmer Control Center keeps property work, documents, and daily decisions behind one login.",
    tag: "Secured daily work.",
    primaryHref: "https://palmercontrolcenter.com",
    primaryLabel: "Open site",
    projectTarget: "palmer-control-center",
    external: true,
    secondaryHref: "#project-palmer-control-center",
    secondaryLabel: "Details",
    tint: "rgba(34, 211, 238, 0.18)",
  },
  {
    id: "habitforge",
    label: "HabitForge",
    heading: "A habit app\nwith less pressure.",
    subheading:
      "A daily check-in across body, mind, money, and meaning. No streaks. No leaderboards.",
    tag: "Structure without the scoreboard.",
    primaryHref: "https://habitforgeai.com",
    primaryLabel: "Visit HabitForgeAI.com",
    projectTarget: "habitforge",
    external: true,
    secondaryHref: "#project-habitforge",
    secondaryLabel: "See the card",
    tint: "rgba(52, 211, 153, 0.18)",
  },
  {
    id: "transfer-portal",
    label: "Transfer Portal",
    heading: "College football\ntransfer tracking.",
    subheading:
      "An iPhone app for scanning transfer entries, commitments, rankings, and team movement.",
    tag: "132 FBS teams. Built for quick checks.",
    primaryHref: "https://apps.apple.com/us/app/the-portal-cfb-transfers/id6757326986",
    primaryLabel: "Get it on the App Store",
    projectTarget: "transfer-portal",
    external: true,
    secondaryHref: "#project-transfer-portal",
    secondaryLabel: "See the card",
    tint: "rgba(56, 189, 248, 0.18)",
  },
  {
    id: "todotonotes",
    label: "TodoToNotes",
    heading: "Tiny tools\nfor annoying handoffs.",
    subheading:
      "Snap a handwritten list, review the tasks, and send a clean checklist to Apple Notes.",
    tag: "Messy input. Clean output.",
    primaryHref: "#project-todotonotes",
    primaryLabel: "See the App",
    projectTarget: "todotonotes",
    tint: "rgba(20, 184, 166, 0.16)",
  },
];

const projects: Project[] = [
  {
    id: "workflow-automation",
    name: "Workflow Automation",
    status: "Live system map",
    access: "Public",
    category: "Automation control layer",
    why: "Automation only earns its keep when you can see exactly what it's doing.",
    summary:
      "The studio's nervous system, drawn out so anyone can read it.",
    description:
      "Inbound calls are answered 24/7 by Sarah, an AI voice agent. Emails get triaged automatically, work orders queue up for one-tap Telegram approval, and 35 scheduled jobs keep the property business moving without me checking 12 dashboards.",
    metrics: [
      { label: "Agents", value: "6 named" },
      { label: "Scheduled jobs", value: "35 live jobs + 21 launchd services" },
      { label: "Voice", value: "Twilio inbound" },
    ],
    href: "https://openclaw-viz-mu.vercel.app/",
    hrefLabel: "Workflow map",
    icon: "/app-icons/openclaw.jpg",
  },
  {
    id: "palmer-control-center",
    name: "Palmer Control Center",
    status: "Private workspace",
    access: "Password protected",
    category: "Property operations command center",
    why: "Running a portfolio shouldn't mean keeping the whole thing in your head.",
    summary: "Where the day's property work actually gets done.",
    description:
      "Each morning: which units need leasing focus, which work orders are overdue, which tenants are due a follow-up. Lease docs, history, and decision notes all live here so I'm not digging through email.",
    metrics: [
      { label: "Access", value: "Private login" },
      { label: "Surface", value: "Web command center" },
      { label: "Domain", value: "palmercontrolcenter.com" },
    ],
    href: "https://palmercontrolcenter.com",
    hrefLabel: "Open site",
  },
  {
    id: "transfer-portal",
    name: "Transfer Portal",
    status: "Active builds",
    access: "Public app",
    category: "iPhone app",
    why: "Sometimes you don't need every grade and recruiting note — you just want the score.",
    summary:
      "Every FBS transfer, in one tap.",
    description:
      "Built for fans and recruiting nerds who want a fast read on entries, commitments, rankings, and team movement during transfer season. All 132 FBS programs, no ads, no paywall.",
    metrics: [
      { label: "Platform", value: "iOS" },
      { label: "Scope", value: "132 FBS teams" },
      { label: "Business", value: "Free, no ads" },
    ],
    href: "https://apps.apple.com/us/app/the-portal-cfb-transfers/id6757326986",
    hrefLabel: "App Store",
    icon: "/app-icons/transfer-portal.jpg",
  },
  {
    id: "habitforge",
    name: "HabitForge",
    status: "Live brand, active product",
    access: "Public preview",
    category: "Habit system",
    why: "Most habit apps punish you for missing a day. This one doesn't.",
    summary:
      "A daily check-in across body, mind, money, and meaning.",
    description:
      "Open it in the morning, log a short reflection in each pillar, and get back to your day. No streaks to break, no leaderboards. Logs are private and stay private.",
    metrics: [
      { label: "Pillars", value: "4" },
      { label: "Platforms", value: "Web + iOS" },
      { label: "Domain", value: "HabitForgeAI.com" },
    ],
    href: "https://habitforgeai.com",
    hrefLabel: "Visit site",
    icon: "/app-icons/habitforge.jpg",
  },
  {
    id: "palmer-properties",
    name: "Palmer Properties",
    status: "Active portfolio",
    access: "Public sites",
    category: "Rental properties + construction",
    why: "The portfolio is the live test environment for everything else in the studio.",
    summary: "A 108-unit rental portfolio across Tuscaloosa and Northport.",
    description:
      "Leasing, maintenance, tenant support, unit turns, and follow-up — backed by Palmer Construction for renovations and new builds.",
    metrics: [
      { label: "Units", value: "108" },
      { label: "Markets", value: "Tuscaloosa + Northport" },
      { label: "Parent", value: "Palmer Construction" },
    ],
    properties: [
      {
        slug: "pinnacle-park",
        name: "Pinnacle Park",
        city: "Tuscaloosa",
        units: 50,
        fromPrice: 2800,
        availability: "Inquire for availability",
        href: "https://pinnacleparknr.com",
        video: "/property-videos/pinnacle-park.mp4",
        videoPoster: "/property-videos/pinnacle-park.jpg",
      },
      {
        slug: "first-and-main",
        name: "First and Main",
        city: "Northport",
        units: 30,
        fromPrice: 2700,
        availability: "Inquire for availability",
        href: "https://firstandmaincondos.com",
        video: "/property-videos/first-and-main.mp4",
        videoPoster: "/property-videos/first-and-main.jpg",
      },
      {
        slug: "the-station",
        name: "The Station",
        city: "Northport",
        units: 16,
        fromPrice: 4000,
        availability: "Inquire for availability",
        href: "https://thestationonmainave.com",
        video: "/property-videos/the-station.mp4",
        videoPoster: "/property-videos/the-station.jpg",
      },
      {
        slug: "forest-lake",
        name: "Forest Lake",
        city: "Tuscaloosa",
        units: 12,
        fromPrice: 4000,
        availability: "Inquire for availability",
        href: "https://forestlakerentals.com",
        video: "/property-videos/forest-lake.mp4",
        videoPoster: "/property-videos/forest-lake.jpg",
      },
    ],
    href: "https://palmerconstructioncompany.co",
    hrefLabel: "Palmer Construction",
  },
  {
    id: "knowyourhome",
    name: "KnowYourHome",
    status: "Current tenants only",
    access: "Private",
    category: "Tenant companion",
    why: "Tenants shouldn't have to wait on a reply just to find out which dumpster is theirs.",
    summary:
      "Move-in answers without the long text thread.",
    description:
      "Current tenants find parking rules, trash schedules, move-in steps, and the dozen other answers usually buried in email — all on a phone-friendly page tied to their property.",
    metrics: [
      { label: "Audience", value: "Current tenants" },
      { label: "Coverage", value: "4 properties + storage" },
      { label: "Surface", value: "Mobile-first" },
    ],
    icon: "/app-icons/knowyourhome.jpg",
  },
  {
    id: "todotonotes",
    name: "TodoToNotes",
    status: "Open-source app",
    access: "Prototype",
    category: "macOS utility",
    why: "Handwritten lists shouldn't need retyping — and OCR alone usually misses the structure.",
    summary:
      "A small macOS utility for handwritten lists.",
    description:
      "Take a photo, review the extracted tasks, and save a clean checklist to Apple Notes.",
    metrics: [
      { label: "Platform", value: "macOS" },
      { label: "Input", value: "Camera or image" },
      { label: "Output", value: "Apple Notes" },
    ],
    icon: "/app-icons/todotonotes.jpg",
  },
];

const startHere = [
  { title: "Portfolio", body: "The property base in Tuscaloosa and Northport.", href: "#project-palmer-properties" },
  { title: "Control", body: "The private workspace for daily decisions.", href: "#flagship" },
  { title: "Systems", body: "How recurring work is routed and reviewed.", href: "#project-workflow-automation" },
  { title: "Apps", body: "Small products with a practical purpose.", href: "#project-habitforge" },
];

const ecosystemLinks = [
  { label: "Palmer Control Center", href: "https://palmercontrolcenter.com" },
  { label: "Workflow map", href: "https://openclaw-viz-mu.vercel.app/" },
  { label: "HabitForge", href: "https://habitforgeai.com" },
  { label: "Transfer Portal", href: "https://apps.apple.com/us/app/the-portal-cfb-transfers/id6757326986" },
  { label: "Palmer Construction", href: "https://palmerconstructioncompany.co" },
];

type SocialLink = { label: string; href: string; external?: boolean };

const socialLinks: SocialLink[] = [
  { label: "Email", href: "mailto:crsnpalmer@gmail.com" },
  { label: "Phone (Sarah, 24/7)", href: "tel:+18669538055" },
  { label: "Instagram @crsnpalmer", href: "https://instagram.com/crsnpalmer", external: true },
  { label: "X @crsnpalmer", href: "https://x.com/crsnpalmer", external: true },
];

const appShowcases: Record<
  string,
  { tagline: string; bullets: string[]; ctaLabel: string; ctaHref: string }
> = {
  habitforge: {
    tagline: "Calm structure across four pillars.",
    bullets: ["Web + iOS", "No streak shaming", "Daily reflection"],
    ctaLabel: "Visit HabitForge",
    ctaHref: "https://habitforgeai.com",
  },
  "transfer-portal": {
    tagline: "Every FBS transfer, in one tap.",
    bullets: ["132 teams", "Free, no ads", "Built for game-day checks"],
    ctaLabel: "App Store",
    ctaHref:
      "https://apps.apple.com/us/app/the-portal-cfb-transfers/id6757326986",
  },
};

function ExternalIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      width="13"
      height="13"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      className="ml-1.5 inline-block align-[-0.08em]"
    >
      <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Monogram() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 36 36"
      width="32"
      height="32"
      className="monogram"
    >
      <defs>
        <radialGradient id="acp-bg" cx="30%" cy="25%" r="80%">
          <stop offset="0%" stopColor="#3a3a3a" />
          <stop offset="100%" stopColor="#000000" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="36" height="36" rx="9" fill="url(#acp-bg)" />
      <rect
        x="0.5"
        y="0.5"
        width="35"
        height="35"
        rx="8.5"
        fill="none"
        stroke="rgba(255,255,255,0.18)"
      />
      <text
        x="18"
        y="22.5"
        textAnchor="middle"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="13"
        fontWeight="600"
        letterSpacing="-0.5"
        fill="#fff"
      >
        ACP
      </text>
    </svg>
  );
}

function WorkflowDiagram() {
  const stages = [
    { label: "Inbound", items: ["Phone calls", "Email triage", "Forms"] },
    { label: "Routing", items: ["Sarah (voice AI)", "OpenClaw gateway"] },
    { label: "Action", items: ["Approvals", "Reminders", "Work orders"] },
    { label: "Review", items: ["Logs", "Daily summary", "Carson"] },
  ];
  return (
    <div className="workflow-diagram" role="img" aria-label="Operations flow: inbound, routing, action, review">
      {stages.map((stage, i) => (
        <div key={stage.label} className="workflow-stage">
          <p className="workflow-stage-label">{stage.label}</p>
          <ul className="workflow-stage-items">
            {stage.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          {i < stages.length - 1 && (
            <span aria-hidden="true" className="workflow-arrow">
              →
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

function AppShowcase({
  appId,
  iconSrc,
  name,
}: {
  appId: keyof typeof appShowcases;
  iconSrc?: string;
  name: string;
}) {
  const data = appShowcases[appId];
  if (!data) return null;
  return (
    <div className="app-showcase">
      <div className="app-showcase-frame" aria-hidden="true">
        <div className="app-showcase-screen">
          {iconSrc && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={iconSrc}
              alt=""
              width={120}
              height={120}
              className="app-showcase-icon"
            />
          )}
          <p className="app-showcase-name">{name}</p>
          <p className="app-showcase-tagline">{data.tagline}</p>
        </div>
      </div>
      <ul className="app-showcase-bullets">
        {data.bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
    </div>
  );
}

export default function HomeClient({ initialTab }: { initialTab: string }) {
  const [selectedTab, setSelectedTab] = useState(initialTab);
  const [showVideo, setShowVideo] = useState(false);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const mobileTabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const activeTab = useMemo(
    () => heroTabs.find((tab) => tab.id === selectedTab) ?? heroTabs[0],
    [selectedTab],
  );

  // Write ?tab= on change. (The initial value is derived on the server from the
  // request, so no onMount read is needed — the SSR HTML already reflects the tab.)
  // Pass window.history.state through replaceState so Next.js's internal router
  // state (scroll restoration, client cache key) isn't wiped on every tab click.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    if (selectedTab === heroTabs[0].id) {
      url.searchParams.delete("tab");
    } else {
      url.searchParams.set("tab", selectedTab);
    }
    if (url.toString() !== window.location.href) {
      window.history.replaceState(window.history.state, "", url.toString());
    }
  }, [selectedTab]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const scrollToHash = () => {
      const id = window.location.hash.slice(1);
      if (!id) return;
      document.getElementById(id)?.scrollIntoView({ block: "start" });
    };
    const timers = [0, 120, 450, 900].map((delay) =>
      window.setTimeout(scrollToHash, delay),
    );
    window.addEventListener("hashchange", scrollToHash);
    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      window.removeEventListener("hashchange", scrollToHash);
    };
  }, []);

  // Mobile: skip the 4.7 MB video, use the poster image only.
  // Also honor prefers-reduced-motion: poster image, never video.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const sizeMq = window.matchMedia("(min-width: 768px)");
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setShowVideo(sizeMq.matches && !motionMq.matches);
    update();
    sizeMq.addEventListener("change", update);
    motionMq.addEventListener("change", update);
    return () => {
      sizeMq.removeEventListener("change", update);
      motionMq.removeEventListener("change", update);
    };
  }, []);

  const handleTabKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
    refs: React.RefObject<Array<HTMLButtonElement | null>>,
  ) => {
    const { key } = event;
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(key)) return;
    event.preventDefault();

    let next = index;
    if (key === "ArrowLeft") next = (index - 1 + heroTabs.length) % heroTabs.length;
    else if (key === "ArrowRight") next = (index + 1) % heroTabs.length;
    else if (key === "Home") next = 0;
    else if (key === "End") next = heroTabs.length - 1;

    setSelectedTab(heroTabs[next].id);
    refs.current[next]?.focus();
  };

  return (
    <>
      <a href="#projects" className="skip-link">
        Skip to projects
      </a>

      <main id="main" className="bg-black text-white">
        <section
          aria-label="Studio introduction"
          className="relative min-h-[86svh] overflow-hidden bg-black"
        >
          {showVideo ? (
            <video
              key={activeTab.heroVideo ?? HERO_VIDEO_DEFAULT}
              className="hero-video absolute inset-0 h-full w-full object-cover"
              src={activeTab.heroVideo ?? HERO_VIDEO_DEFAULT}
              poster={activeTab.heroPoster ?? HERO_POSTER_DEFAULT}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              aria-hidden="true"
              tabIndex={-1}
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              className="hero-video absolute inset-0 h-full w-full object-cover"
              src={activeTab.heroPoster ?? HERO_POSTER_DEFAULT}
              alt=""
              aria-hidden="true"
            />
          )}
          <div className="hero-overlay absolute inset-0 z-[1]" aria-hidden="true" />
          <div
            className="absolute inset-0 z-[1] transition-[background] duration-700"
            style={{
              background: `radial-gradient(ellipse at bottom, ${activeTab.tint}, transparent 60%)`,
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 flex min-h-[86svh] flex-col">
            <header className="px-6 pt-6 md:px-12 lg:px-16">
              <div className="liquid-glass rounded-xl px-4 py-2">
                <nav
                  aria-label="Primary"
                  className="flex items-center justify-between gap-4"
                >
                  <a
                    href="#main"
                    className="wordmark flex items-center gap-3 text-white"
                    aria-label="ACP Designs Studio — home"
                  >
                    <Monogram />
                    <span className="hidden flex-col leading-tight sm:flex">
                      <span className="text-base font-semibold tracking-normal">
                        ACP Designs Studio
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.28em] text-gray-300">
                        Carson Palmer
                      </span>
                    </span>
                  </a>

                  <div
                    role="tablist"
                    aria-label="Project areas"
                    className="hidden items-center gap-2 md:flex"
                  >
                    {heroTabs.map((tab, i) => (
                      <button
                        key={tab.id}
                        ref={(el) => {
                          tabRefs.current[i] = el;
                        }}
                        id={`tab-${tab.id}`}
                        role="tab"
                        aria-selected={selectedTab === tab.id}
                        aria-controls="hero-panel"
                        tabIndex={selectedTab === tab.id ? 0 : -1}
                        className={`tab-button ${selectedTab === tab.id ? "tab-button-active" : ""}`}
                        onClick={() => setSelectedTab(tab.id)}
                        onKeyDown={(e) => handleTabKeyDown(e, i, tabRefs)}
                        type="button"
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  <a
                    className="hidden items-center rounded-lg bg-white px-6 py-2 text-sm font-medium text-black transition hover:bg-gray-100 sm:inline-flex"
                    href={activeTab.primaryHref}
                    target={activeTab.external ? "_blank" : undefined}
                    rel={activeTab.external ? "noreferrer" : undefined}
                  >
                    {activeTab.primaryLabel}
                    {activeTab.external && <ExternalIcon />}
                  </a>
                </nav>
              </div>
            </header>

            <div className="px-6 pt-4 md:hidden">
              <div
                role="tablist"
                aria-label="Project areas"
                className="mobile-tabs flex gap-3 overflow-x-auto pb-1"
              >
                {heroTabs.map((tab, i) => (
                  <button
                    key={tab.id}
                    ref={(el) => {
                      mobileTabRefs.current[i] = el;
                    }}
                    role="tab"
                    aria-selected={selectedTab === tab.id}
                    aria-controls="hero-panel"
                    tabIndex={selectedTab === tab.id ? 0 : -1}
                    className={`liquid-glass min-w-max rounded-xl px-4 py-2 text-sm transition ${selectedTab === tab.id ? "text-white" : "text-gray-200"}`}
                    onClick={() => setSelectedTab(tab.id)}
                    onKeyDown={(e) => handleTabKeyDown(e, i, mobileTabRefs)}
                    type="button"
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div
              id="hero-panel"
              role="tabpanel"
              aria-labelledby={`tab-${activeTab.id}`}
              aria-live="polite"
              className="flex-1 px-6 pb-12 md:px-12 lg:flex lg:flex-col lg:justify-end lg:px-16 lg:pb-16"
            >
              <div className="flex h-full flex-col justify-end">
                <div
                  key={activeTab.id}
                  className="hero-stage lg:grid lg:grid-cols-2 lg:items-end lg:gap-10"
                >
                  <div>
                    <p className="eyebrow hero-kicker mb-4 text-white/80">
                      ACP Designs Studio
                    </p>
                    <p className="hero-sub mb-3 text-sm font-medium text-white/90 md:text-base">
                      Carson Palmer · Tuscaloosa landlord, builder of small tools.
                    </p>
                    <h1
                      className="hero-heading max-w-[12ch] text-4xl font-medium leading-[0.95] tracking-normal text-white md:text-5xl lg:text-6xl xl:text-7xl"
                    >
                      {activeTab.heading.split("\n").map((line, i) => (
                        <span key={i} className="block">
                          {line}
                        </span>
                      ))}
                    </h1>

                    <p className="hero-sub mb-5 mt-4 max-w-[calc(100vw-3rem)] text-base text-gray-200 md:max-w-2xl md:text-lg">
                      {activeTab.subheading.split("\n").map((line, i) => (
                        <span key={i} className="block">
                          {line}
                        </span>
                      ))}
                    </p>

                    <div className="mb-6 flex flex-wrap gap-3 text-xs uppercase tracking-[0.2em] text-gray-300 md:text-sm">
                      <span className="rounded-full border border-white/15 px-3 py-2">
                        108 rental units
                      </span>
                      <span className="rounded-full border border-white/15 px-3 py-2">
                        Operating maps
                      </span>
                      <span className="rounded-full border border-white/15 px-3 py-2">
                        Useful tools
                      </span>
                    </div>

                    <div className="hero-cta flex flex-wrap gap-4">
                      <a
                        className="inline-flex w-full items-center justify-center rounded-lg bg-white px-8 py-3 font-medium text-black transition hover:bg-gray-100 sm:w-auto"
                        href={activeTab.primaryHref}
                        target={activeTab.external ? "_blank" : undefined}
                        rel={activeTab.external ? "noreferrer" : undefined}
                      >
                        {activeTab.primaryLabel}
                        {activeTab.external && <ExternalIcon />}
                      </a>
                      <a
                        className="liquid-glass inline-flex w-full items-center justify-center rounded-lg border border-white/20 px-8 py-3 font-medium text-white transition hover:bg-white hover:text-black sm:w-auto"
                        href={activeTab.secondaryHref ?? `#project-${activeTab.projectTarget}`}
                        target={activeTab.secondaryExternal ? "_blank" : undefined}
                        rel={activeTab.secondaryExternal ? "noreferrer" : undefined}
                      >
                        {activeTab.secondaryLabel ?? "Explore Now"}
                        {activeTab.secondaryExternal && <ExternalIcon />}
                      </a>
                    </div>
                  </div>

                  <div className="hero-tag mt-8 flex items-end justify-start lg:mt-0 lg:justify-end">
                    <div className="hero-tag-card liquid-glass rounded-lg border border-white/20 px-6 py-3">
                      <p className="text-lg font-light text-white md:text-xl lg:text-2xl">
                        {activeTab.tag}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="latest"
          className="section-shell border-b border-white/10"
          aria-labelledby="latest-heading"
        >
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
              <div>
                <p className="eyebrow">Start here</p>
                <h2
                  id="latest-heading"
                  className="mt-4 max-w-3xl text-4xl leading-[0.98] tracking-normal text-white md:text-6xl"
                >
                  Start here.
                </h2>
                <p className="mt-5 max-w-xl text-sm leading-7 text-gray-300 md:text-base">
                  A short path into my property portfolio, apps, automation systems, and ideas.
                </p>
                <p className="mt-4 text-xs uppercase tracking-[0.24em] text-gray-400">
                  Updated {formatLastUpdated(lastUpdated)}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {startHere.map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    className="liquid-glass rounded-lg border border-white/10 p-5 transition hover:border-white/30"
                  >
                    <p className="text-sm uppercase tracking-[0.24em] text-white">
                      {item.title}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-gray-300">
                      {item.body}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="changelog"
          className="section-shell border-b border-white/10"
          aria-labelledby="changelog-heading"
        >
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
              <div className="lg:sticky lg:top-8">
                <p className="eyebrow">Timeline</p>
                <h2
                  id="changelog-heading"
                  className="mt-4 max-w-3xl text-4xl leading-[0.98] tracking-normal text-white md:text-6xl"
                >
                  What&rsquo;s actually shipped.
                </h2>
                <p className="mt-5 max-w-xl text-sm leading-7 text-gray-300 md:text-base">
                  A running log of the most recent things I&rsquo;ve put live across the studio. Dates before April 2026 are approximate.
                </p>
                <div className="timeline-legend mt-6 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.18em] text-gray-300">
                  {(Object.keys(categoryLabel) as Array<keyof typeof categoryLabel>).map((k) => (
                    <span key={k} className={`timeline-chip timeline-chip-${k}`}>
                      {categoryLabel[k]}
                    </span>
                  ))}
                </div>
              </div>

              <div className="timeline">
                {groupByYear(changelog).map((group) => (
                  <section
                    key={group.year}
                    aria-label={`Year ${group.year}`}
                    className="timeline-year-group"
                  >
                    <h3 className="timeline-year">{group.year}</h3>
                    <ol className="timeline-list">
                      {group.entries.map((entry) => (
                        <li
                          key={entry.date + entry.title}
                          className="timeline-item"
                        >
                          <span aria-hidden="true" className="timeline-dot" />
                          <time dateTime={entry.date} className="timeline-date">
                            {formatChangelogDateShort(entry.date)}
                          </time>
                          <div className="timeline-content">
                            <div className="flex flex-wrap items-center gap-2">
                              <h4 className="timeline-title">{entry.title}</h4>
                              {entry.category && (
                                <span
                                  className={`timeline-chip timeline-chip-${entry.category}`}
                                >
                                  {categoryLabel[entry.category]}
                                </span>
                              )}
                            </div>
                            <p className="timeline-text">{entry.body}</p>
                            {entry.href && (
                              <a
                                href={entry.href}
                                target={entry.href.startsWith("http") ? "_blank" : undefined}
                                rel={entry.href.startsWith("http") ? "noreferrer" : undefined}
                                className="timeline-link"
                              >
                                {entry.hrefLabel ?? "Open"}
                                {entry.href.startsWith("http") && <ExternalIcon />}
                              </a>
                            )}
                          </div>
                        </li>
                      ))}
                    </ol>
                  </section>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="flagship"
          className="section-shell border-b border-white/10"
          aria-labelledby="flagship-heading"
        >
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_0.95fr] lg:items-stretch">
              <div className="project-card project-card-active flex flex-col justify-between">
                <div>
                  <p className="eyebrow">Flagship</p>
                  <h2
                    id="flagship-heading"
                    className="mt-4 max-w-4xl text-4xl leading-[0.98] tracking-normal text-white md:text-6xl"
                  >
                    Palmer Control Center.
                  </h2>
                  <p className="mt-5 max-w-2xl text-lg leading-8 text-white md:text-xl">
                    A private command center for leasing, maintenance, documents, and daily property decisions.
                  </p>
                  <p className="mt-5 max-w-2xl text-sm leading-7 text-gray-300 md:text-base">
                    This is the piece that makes ACP Designs Studio feel different: the public site points to real properties, real apps, and a protected workspace built for the work behind them.
                  </p>
                </div>
                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    className="inline-flex items-center rounded-lg bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-gray-100"
                    href="https://palmercontrolcenter.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open Palmer Control Center
                    <ExternalIcon />
                  </a>
                  <a
                    className="inline-flex items-center rounded-lg border border-white/20 px-6 py-3 text-sm font-medium text-white transition hover:bg-white hover:text-black"
                    href="#project-palmer-control-center"
                  >
                    View details
                  </a>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {studioStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="liquid-glass rounded-lg border border-white/10 p-5"
                  >
                    <p className="text-xs uppercase tracking-[0.22em] text-gray-300">
                      {stat.label}
                    </p>
                    <p className="mt-4 text-3xl font-normal tracking-normal text-white">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="projects"
          className="section-shell"
          aria-labelledby="projects-heading"
        >
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 border-b border-white/10 pb-10 lg:grid-cols-[minmax(0,1fr)_28rem] lg:items-end">
              <div>
                <p className="eyebrow">Selected work</p>
                <h2
                  id="projects-heading"
                  className="mt-4 max-w-4xl text-4xl leading-[0.98] tracking-normal text-white md:text-6xl"
                >
                  Built around real use.
                </h2>
              </div>
              <p className="max-w-2xl text-sm leading-7 text-gray-300 md:text-base">
                The businesses, tools, and operating surfaces I keep improving.
              </p>
            </div>

            <div className="mt-10 grid gap-6">
              {projects.map((project) => {
                const isActive = activeTab.projectTarget === project.id;

                return (
                  <article
                    key={project.id}
                    id={`project-${project.id}`}
                    className={`project-card ${isActive ? "project-card-active" : ""}`}
                  >
                    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_18rem]">
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="rounded-full border border-white/20 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-white">
                            {project.status}
                          </span>
                          <span className="text-xs uppercase tracking-[0.24em] text-gray-300">
                            {project.category}
                          </span>
                          <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-gray-300">
                            {project.access}
                          </span>
                        </div>

                        <div className="mt-6 flex items-center gap-5">
                          {project.icon && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={project.icon}
                              alt=""
                              width={64}
                              height={64}
                              loading="lazy"
                              className="h-16 w-16 shrink-0 rounded-lg object-cover ring-1 ring-white/10"
                            />
                          )}
                          <h3 className="text-4xl tracking-normal text-white md:text-5xl">
                            {project.name}
                          </h3>
                        </div>
                        <p className="mt-4 max-w-3xl text-xl leading-8 text-white">
                          {project.summary}
                        </p>
                        <p className="mt-5 max-w-3xl text-base leading-8 text-gray-300">
                          {project.description}
                        </p>
                        <p className="mt-4 max-w-3xl border-l border-white/20 pl-4 text-sm leading-7 text-gray-300">
                          Why it exists: {project.why}
                        </p>

                        {project.id === "workflow-automation" && (
                          <WorkflowDiagram />
                        )}

                        {(project.id === "habitforge" ||
                          project.id === "transfer-portal") && (
                          <AppShowcase
                            appId={project.id}
                            iconSrc={project.icon}
                            name={project.name}
                          />
                        )}

                        {project.properties && (
                          <div className="mt-6 grid gap-3 sm:grid-cols-2">
                            {project.properties.map((p) => (
                              <a
                                key={p.name}
                                href={p.href}
                                target="_blank"
                                rel="noreferrer"
                                className="group flex flex-col overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] transition hover:border-white/30 hover:bg-white/[0.06]"
                              >
                                {p.video ? (
                                  <video
                                    src={p.video}
                                    poster={p.videoPoster}
                                    width={960}
                                    height={540}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    preload="metadata"
                                    aria-hidden="true"
                                    tabIndex={-1}
                                    className="aspect-[8/5] w-full object-cover"
                                  />
                                ) : (
                                  // eslint-disable-next-line @next/next/no-img-element
                                  <img
                                    src={`/api/tile/${p.slug}`}
                                    alt=""
                                    width={800}
                                    height={500}
                                    loading="lazy"
                                    className="aspect-[8/5] w-full object-cover"
                                  />
                                )}
                                <div className="flex items-center justify-between gap-3 px-4 py-3">
                                  <div>
                                    <p className="text-base font-medium text-white">
                                      {p.name}
                                    </p>
                                    <p className="text-xs text-gray-300">
                                      {p.city} · {p.units} unit{p.units === 1 ? "" : "s"}
                                      {p.fromPrice
                                        ? ` · from $${p.fromPrice.toLocaleString()}/mo`
                                        : ""}
                                    </p>
                                    {p.availability && (
                                      <p className="mt-1 inline-flex items-center rounded-full border border-white/20 bg-white/[0.04] px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] text-white">
                                        {p.availability}
                                      </p>
                                    )}
                                  </div>
                                  <ExternalIcon />
                                </div>
                              </a>
                            ))}
                          </div>
                        )}
                      </div>

                      <aside className="liquid-glass rounded-lg border border-white/10 p-5">
                        <p className="eyebrow">Snapshot</p>
                        <dl className="mt-4 space-y-3">
                          {project.metrics.map((metric) => (
                            <div
                              key={metric.label}
                              className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-3 last:border-b-0 last:pb-0"
                            >
                              <dt className="text-[11px] uppercase tracking-[0.18em] text-gray-300">
                                {metric.label}
                              </dt>
                              <dd className="text-right text-sm font-medium text-white">
                                {metric.value}
                              </dd>
                            </div>
                          ))}
                        </dl>

                        {project.href ? (
                          <a
                            className="mt-6 inline-flex items-center rounded-lg bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-gray-100"
                            href={project.href}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {project.hrefLabel}
                            <ExternalIcon />
                          </a>
                        ) : (
                          <p className="mt-6 text-sm leading-7 text-gray-300">
                            Active work, not publicly launched yet.
                          </p>
                        )}

                        {project.extraLink && (
                          <a
                            className="mt-3 inline-flex items-center text-sm font-medium text-white underline-offset-4 hover:underline"
                            href={project.extraLink.href}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {project.extraLink.label}
                            <ExternalIcon />
                          </a>
                        )}
                      </aside>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <footer
        id="contact"
        className="border-t border-white/10 bg-black px-6 py-14 md:px-12 lg:px-16"
      >
        <div className="mx-auto max-w-7xl">
          <div className="liquid-glass rounded-lg border border-white/10 p-8 md:p-10">
            <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
              <div>
                <p className="eyebrow">Contact</p>
                <h2 className="mt-4 max-w-3xl text-4xl leading-[0.98] tracking-normal text-white md:text-5xl">
                  Need a link,
                  <br />
                  or context?
                </h2>
                <p className="mt-5 max-w-2xl text-sm leading-7 text-gray-300 md:text-base">
                  Email is the easiest way to ask about a site, app, or private workspace.
                </p>
                <div className="mt-6 flex flex-wrap gap-3 text-xs uppercase tracking-[0.2em] text-gray-300">
                  <span className="rounded-full border border-white/15 px-3 py-2">
                    Properties
                  </span>
                  <span className="rounded-full border border-white/15 px-3 py-2">
                    Workflows
                  </span>
                  <span className="rounded-full border border-white/15 px-3 py-2">
                    Apps
                  </span>
                </div>
              </div>

              <div>
                <a
                  href="mailto:crsnpalmer@gmail.com"
                  className="inline-flex items-center rounded-lg bg-white px-6 py-3 text-base font-medium text-black transition hover:bg-gray-100"
                >
                  Contact Carson
                </a>
                <p className="mt-4 text-sm leading-7 text-gray-400">
                  I will point you to the right project.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-8 border-t border-white/10 pt-8 md:grid-cols-2">
            <div>
              <p className="eyebrow">Projects & sites</p>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3 text-sm text-gray-400">
                {ecosystemLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center transition hover:text-white"
                  >
                    {link.label}
                    <ExternalIcon />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <p className="eyebrow">Find Carson</p>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3 text-sm text-gray-400">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noreferrer" : undefined}
                    className="inline-flex items-center transition hover:text-white"
                  >
                    {link.label}
                    {link.external && <ExternalIcon />}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <p className="mt-8 text-xs uppercase tracking-[0.2em] text-gray-300">
            © {new Date().getFullYear()} ACP Designs Studio
          </p>
        </div>
      </footer>
    </>
  );
}
