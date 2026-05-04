"use client";

import { useEffect, useMemo, useRef, useState } from "react";

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
  tint: string; // CSS color — subtle accent overlay on the hero
};

type PropertyTile = {
  slug: string;
  name: string;
  city: string;
  units: number;
  fromPrice?: number;
  href: string;
  video?: string; // self-hosted mp4 path; when present, replaces the static tile
  videoPoster?: string; // frame shown before video loads
};

type Project = {
  id: string;
  name: string;
  status: string;
  category: string;
  summary: string;
  description: string;
  metrics: Array<{ label: string; value: string }>;
  href?: string;
  hrefLabel?: string;
  properties?: PropertyTile[];
  extraLink?: { href: string; label: string };
  icon?: string; // optional square brand mark rendered beside the project name
};

const heroTabs: HeroTab[] = [
  {
    id: "property-management",
    label: "Properties",
    heading: "Projects,\nproperties, apps.",
    subheading:
      "A simple home for active projects: real estate work, workflow maps, and small product ideas.",
    tag: "Start with the active projects.",
    primaryHref: "#projects",
    primaryLabel: "View projects",
    projectTarget: "palmer-properties",
    secondaryHref: "https://palmerconstructioncompany.co",
    secondaryLabel: "Palmer Construction",
    secondaryExternal: true,
    tint: "rgba(245, 165, 36, 0.18)",
  },
  {
    id: "workflow-automation",
    label: "Automation",
    heading: "Workflow maps\nfor real operations.",
    subheading:
      "Recurring work, calls, approvals, and handoffs mapped in plain English.",
    tag: "A working operating playbook.",
    primaryHref: "https://openclaw-viz-mu.vercel.app/",
    primaryLabel: "View workflow map",
    projectTarget: "workflow-automation",
    external: true,
    secondaryHref: "#project-workflow-automation",
    secondaryLabel: "See the system",
    tint: "rgba(192, 132, 252, 0.20)",
  },
  {
    id: "habitforge",
    label: "HabitForge",
    heading: "A habit app\nwith less pressure.",
    subheading:
      "A calm habit-system idea built around daily structure, private reflection, and recovery.",
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
    category: "Automation control layer",
    summary:
      "A plain-English map for recurring work.",
    description:
      "It shows how calls, reminders, approvals, and follow-up can move through one visible loop.",
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
    id: "transfer-portal",
    name: "Transfer Portal",
    status: "Active builds",
    category: "iPhone app",
    summary:
      "An iPhone app for NCAA football transfers.",
    description:
      "Entries, commitments, rankings, and team movement across all 132 FBS programs.",
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
    category: "Habit system",
    summary:
      "A calm habit app idea.",
    description:
      "Daily structure across mental, physical, spiritual, and financial life without turning progress into a scoreboard.",
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
    category: "Rental properties + construction",
    summary: "A 122-unit rental portfolio across Tuscaloosa and Northport.",
    description:
      "The properties create the real problems: leasing, maintenance, tenant support, move-ins, and follow-up.",
    metrics: [
      { label: "Units", value: "122" },
      { label: "Markets", value: "Tuscaloosa + Northport" },
      { label: "Parent", value: "Palmer Construction" },
    ],
    properties: [
      {
        slug: "pinnacle-park",
        name: "Pinnacle Park",
        city: "Tuscaloosa",
        units: 72,
        fromPrice: 2800,
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
        href: "https://thestationonmainave.com",
        video: "/property-videos/the-station.mp4",
        videoPoster: "/property-videos/the-station.jpg",
      },
      {
        slug: "forest-lake",
        name: "Forest Lake",
        city: "Tuscaloosa",
        units: 4,
        fromPrice: 4000,
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
    category: "Tenant companion",
    summary:
      "A tenant guide for move-ins and property details.",
    description:
      "Current tenants get parking, trash, move-in, move-out, and common answers in one mobile-friendly place.",
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
    category: "macOS utility",
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

const latestItems = [
  {
    title: "Workflow playbook",
    body: "Sarah is now shown as its own voice intake lane.",
    href: "https://openclaw-viz-mu.vercel.app/#workflow-images",
    label: "Trace a workflow",
  },
  {
    title: "HabitForge",
    body: "The product site now shows the app path and build note.",
    href: "https://habitforgeai.com/download",
    label: "See the preview",
  },
  {
    title: "Transfer Portal",
    body: "Live iPhone app for fast college football transfer checks.",
    href: "https://apps.apple.com/us/app/the-portal-cfb-transfers/id6757326986",
    label: "App Store",
  },
];

const startHere = [
  { title: "Apps", body: "HabitForge, Transfer Portal, TodoToNotes.", href: "#project-habitforge" },
  { title: "Properties", body: "The real-world operating base.", href: "#project-palmer-properties" },
  { title: "Workflows", body: "Maps for calls, approvals, and follow-up.", href: "#project-workflow-automation" },
];

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
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setShowVideo(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
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
          className="relative min-h-screen overflow-hidden bg-black"
        >
          {showVideo ? (
            <video
              className="hero-video absolute inset-0 h-full w-full object-cover"
              src="/hero.mp4"
              poster="/hero-poster.jpg"
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
              src="/hero-poster.jpg"
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

          <div className="relative z-10 flex min-h-screen flex-col">
            <header className="px-6 pt-6 md:px-12 lg:px-16">
              <div className="liquid-glass rounded-xl px-4 py-2">
                <nav
                  aria-label="Primary"
                  className="flex items-center justify-between gap-4"
                >
                  <a
                    href="#main"
                    className="wordmark flex flex-col text-white"
                    aria-label="ACP Designs Studio — home"
                  >
                    <span className="text-2xl font-semibold tracking-tight">ACP</span>
                    <span className="hidden text-[10px] uppercase tracking-[0.28em] text-gray-300 sm:block">
                      Designs Studio
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
                    className="inline-flex items-center rounded-lg bg-white px-6 py-2 text-sm font-medium text-black transition hover:bg-gray-100"
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
                      Projects, properties, apps.
                    </p>
                    <h1
                      className="hero-heading max-w-[12ch] text-4xl font-normal leading-[0.95] text-white md:text-5xl lg:text-6xl xl:text-7xl"
                      style={{ letterSpacing: "-0.04em" }}
                    >
                      {activeTab.heading.split("\n").map((line, i) => (
                        <span key={i} className="block">
                          {line}
                        </span>
                      ))}
                    </h1>

                    <p className="hero-sub mb-5 mt-4 max-w-2xl text-base text-gray-200 md:text-lg">
                      {activeTab.subheading}
                    </p>

                    <div className="mb-6 flex flex-wrap gap-3 text-xs uppercase tracking-[0.2em] text-gray-300 md:text-sm">
                      <span className="rounded-full border border-white/15 px-3 py-2">
                        122 rental units
                      </span>
                      <span className="rounded-full border border-white/15 px-3 py-2">
                        Workflow maps
                      </span>
                      <span className="rounded-full border border-white/15 px-3 py-2">
                        App ideas
                      </span>
                    </div>

                    <div className="hero-cta flex flex-wrap gap-4">
                      <a
                        className="inline-flex items-center rounded-lg bg-white px-8 py-3 font-medium text-black transition hover:bg-gray-100"
                        href={activeTab.primaryHref}
                        target={activeTab.external ? "_blank" : undefined}
                        rel={activeTab.external ? "noreferrer" : undefined}
                      >
                        {activeTab.primaryLabel}
                        {activeTab.external && <ExternalIcon />}
                      </a>
                      <a
                        className="liquid-glass inline-flex items-center rounded-lg border border-white/20 px-8 py-3 font-medium text-white transition hover:bg-white hover:text-black"
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
                    <div className="liquid-glass rounded-xl border border-white/20 px-6 py-3">
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
                  className="mt-4 max-w-3xl text-4xl leading-[0.98] tracking-[-0.04em] text-white md:text-6xl"
                >
                  Pick a lane.
                </h2>
                <p className="mt-5 max-w-xl text-sm leading-7 text-gray-300 md:text-base">
                  Apps, properties, and workflow notes all connect back to the same question:
                  what is useful enough to build?
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {startHere.map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    className="liquid-glass rounded-2xl border border-white/10 p-5 transition hover:border-white/30"
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

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {latestItems.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                  className="project-card block"
                >
                  <p className="eyebrow">Latest</p>
                  <h3 className="mt-4 text-2xl tracking-[-0.03em] text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-gray-300">{item.body}</p>
                  <p className="mt-5 inline-flex items-center text-sm font-medium text-white">
                    {item.label}
                    {item.href.startsWith("http") && <ExternalIcon />}
                  </p>
                </a>
              ))}
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
                <p className="eyebrow">Current work</p>
                <h2
                  id="projects-heading"
                  className="mt-4 max-w-4xl text-4xl leading-[0.98] tracking-[-0.04em] text-white md:text-6xl"
                >
                  Current work.
                </h2>
              </div>
              <p className="max-w-2xl text-sm leading-7 text-gray-300 md:text-base">
                A quick look at the projects, properties, and ideas I keep coming back to.
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
                              className="h-16 w-16 shrink-0 rounded-2xl object-cover ring-1 ring-white/10"
                            />
                          )}
                          <h3 className="text-4xl tracking-[-0.05em] text-white md:text-5xl">
                            {project.name}
                          </h3>
                        </div>
                        <p className="mt-4 max-w-3xl text-xl leading-8 text-white">
                          {project.summary}
                        </p>
                        <p className="mt-5 max-w-3xl text-base leading-8 text-gray-300">
                          {project.description}
                        </p>

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
                                  </div>
                                  <ExternalIcon />
                                </div>
                              </a>
                            ))}
                          </div>
                        )}
                      </div>

                      <aside className="liquid-glass rounded-2xl border border-white/10 p-5">
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
          <div className="liquid-glass rounded-[2rem] border border-white/10 p-8 md:p-10">
            <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
              <div>
                <p className="eyebrow">Contact</p>
                <h2 className="mt-4 max-w-3xl text-4xl leading-[0.98] tracking-[-0.04em] text-white md:text-5xl">
                  Questions, ideas,
                  <br />
                  or project access.
                </h2>
                <p className="mt-5 max-w-2xl text-sm leading-7 text-gray-300 md:text-base">
                  Email is the easiest way to ask about a project or get the right link.
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

          <p className="mt-8 text-xs uppercase tracking-[0.2em] text-gray-300">
            © {new Date().getFullYear()} ACP Designs Studio
          </p>
        </div>
      </footer>
    </>
  );
}
