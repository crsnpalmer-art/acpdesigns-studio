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
};

type Project = {
  id: string;
  name: string;
  status: string;
  category: string;
  summary: string;
  description: string;
  bullets: string[];
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
    heading: "Four properties.\nOne family-run portfolio.",
    subheading:
      "Palmer Construction operates 122 units across Tuscaloosa and Northport, plus KnowYourHome for tenants. Residential rentals, construction, and the day-to-day systems underneath.",
    tag: "Build. Rent. Support. All in-house.",
    primaryHref: "#project-palmer-properties",
    primaryLabel: "See the portfolio",
    projectTarget: "palmer-properties",
    secondaryHref: "https://palmerconstructioncompany.co",
    secondaryLabel: "Palmer Construction",
    secondaryExternal: true,
    tint: "rgba(245, 165, 36, 0.18)",
  },
  {
    id: "openclaw",
    label: "OpenClaw",
    heading: "Automation that\nruns the operation.",
    subheading:
      "OpenClaw is the local control plane behind the studio: 6 named agents, 35 scheduled jobs, a voice subsystem, and the wiring that keeps daily work out of six different dashboards.",
    tag: "6 agents. 35 crons. One operator.",
    primaryHref: "https://openclaw-viz-mu.vercel.app/",
    primaryLabel: "See the observatory",
    projectTarget: "openclaw",
    external: true,
    secondaryHref: "https://openclaw.ai",
    secondaryLabel: "Visit OpenClaw.ai",
    secondaryExternal: true,
    tint: "rgba(192, 132, 252, 0.20)",
  },
  {
    id: "habitforge",
    label: "HabitForge",
    heading: "Habit systems\nbuilt for the long game.",
    subheading:
      "HabitForge is a four-pillar habit product covering mental, physical, spiritual, and financial growth with a structure-first approach instead of endless checklist clutter.",
    tag: "Habits. Coaching. Four pillars.",
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
    heading: "Transfer data\nwithout the media clutter.",
    subheading:
      "Transfer Portal is a focused iPhone app for tracking NCAA football portal entries, commits, and team movement without the ad-heavy sports-site experience.",
    tag: "iPhone. NCAA. Real-time tracker.",
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
    heading: "From camera roll\nto Apple Notes.",
    subheading:
      "TodoToNotes turns handwritten lists into editable tasks and saves them into Apple Notes with native checklist formatting instead of fake checkbox characters.",
    tag: "macOS. OCR. Apple Notes.",
    primaryHref: "#project-todotonotes",
    primaryLabel: "See the App",
    projectTarget: "todotonotes",
    tint: "rgba(20, 184, 166, 0.16)",
  },
];

const projects: Project[] = [
  {
    id: "openclaw",
    name: "OpenClaw",
    status: "Live runtime",
    category: "Automation control plane",
    summary:
      "The local automation system underneath the rest of the studio.",
    description:
      "OpenClaw is the internal runtime that keeps recurring ops, agent workflows, and project maintenance from turning into a stack of disconnected tools. It is the backbone behind the public-facing products — and the observatory shows it running in real time.",
    bullets: [
      "Runs local-first on one machine instead of depending on a mess of SaaS glue",
      "Observable at a glance: 6 named agents, 35 crons, 21 launchd services, voice inbound on Twilio",
      "Acts as the control plane behind the apps and tenant tooling",
    ],
    metrics: [
      { label: "Agents", value: "6 named" },
      { label: "Scheduled jobs", value: "35 crons + 21 services" },
      { label: "Voice", value: "Twilio inbound" },
    ],
    href: "https://openclaw-viz-mu.vercel.app/",
    hrefLabel: "Live observatory",
    icon: "/app-icons/openclaw.jpg",
  },
  {
    id: "transfer-portal",
    name: "Transfer Portal",
    status: "Active builds",
    category: "iPhone app",
    summary:
      "A cleaner, ad-free tracker for NCAA football transfer movement.",
    description:
      "Transfer Portal is built for people who want the data without the slideshow. It tracks entries, commits, rankings, and team movement across all 132 FBS programs with a fast native iPhone experience.",
    bullets: [
      "Live transfer tracking for all 132 FBS teams",
      "Rankings, team grades, and roster views in one place",
      "Designed to feel faster and calmer than sports media feeds",
    ],
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
      "A four-pillar habit platform for building the future version of yourself.",
    description:
      "HabitForge centers on habits across mental, physical, spiritual, and financial life. The direction is structured and coach-assisted rather than turning habit tracking into another endless checklist.",
    bullets: [
      "Four dimensions: mental, physical, spiritual, and financial",
      "Cross-device direction with secure auth and cloud sync",
      "Built to turn vague self-improvement into concrete daily structure",
    ],
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
    summary: "Four properties, 122 units, one family-run operation.",
    description:
      "Palmer Construction Company owns and operates four Alabama rental properties plus the construction arm behind them. Every property has its own public site, tenant portal, and maintenance pipeline — all running under the same small team.",
    bullets: [
      "Condos, townhomes, and single-family rentals across Tuscaloosa and Northport",
      "Each property has its own site and tenant portal for rent + maintenance",
      "Expansion planned into Hayden, AL and Milton, FL",
    ],
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
      },
      {
        slug: "first-and-main",
        name: "First and Main",
        city: "Northport",
        units: 30,
        fromPrice: 2700,
        href: "https://firstandmaincondos.com",
      },
      {
        slug: "the-station",
        name: "The Station",
        city: "Northport",
        units: 16,
        fromPrice: 4000,
        href: "https://thestationonmainave.com",
      },
      {
        slug: "forest-lake",
        name: "Forest Lake",
        city: "Tuscaloosa",
        units: 4,
        fromPrice: 4000,
        href: "https://forestlakerentals.com",
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
      "A private mobile guide for current tenants — not a marketing site.",
    description:
      "Every Palmer property already has a public site and a tenant portal for rent and maintenance. KnowYourHome is the lighter companion tenants actually open on day one: move-in orientation, the small quirks of each building, trash and parking rules, and answers to the questions that usually come in as a phone call. Per-property content, one surface.",
    bullets: [
      "Not public — tenants get access when their lease starts",
      "Per-property guidance for Pinnacle Park, First and Main, The Station, Forest Lake, and storage",
      "Move-in and move-out checklists plus practical how-tos before anyone picks up the phone",
    ],
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
      "Snap a handwritten list, review the OCR, and save it into Apple Notes with native checklists.",
    description:
      "TodoToNotes takes the friction out of handwritten capture. A photo from your camera or desktop becomes editable structured tasks, then lands in Apple Notes with real checkboxes instead of fake Unicode bullets.",
    bullets: [
      "Supports camera capture, drag-and-drop, and structured review before save",
      "Uses AI vision to read handwriting with custom context for better accuracy",
      "Exports to Apple Notes using native checklist formatting",
    ],
    metrics: [
      { label: "Platform", value: "macOS" },
      { label: "Input", value: "Camera or image" },
      { label: "Output", value: "Apple Notes" },
    ],
    icon: "/app-icons/todotonotes.jpg",
  },
];

const principles = [
  {
    title: "Use it first",
    body: "Every project here is something I use every day. That keeps scope honest and surfaces problems before anyone else hits them.",
  },
  {
    title: "Own the stack",
    body: "Local-first systems that stay debuggable. No dependency pyramid that breaks when a vendor changes their mind.",
  },
  {
    title: "Ship rough, edit later",
    body: "Live beats polished. Most of these launched well before they were \u201Cdone\u201D and got sharper by being used.",
  },
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

export default function Home() {
  const [selectedTab, setSelectedTab] = useState(heroTabs[0].id);
  const [showVideo, setShowVideo] = useState(false);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const mobileTabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const activeTab = useMemo(
    () => heroTabs.find((tab) => tab.id === selectedTab) ?? heroTabs[0],
    [selectedTab],
  );

  // Deep-link: read ?tab= on mount, write on change.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const tab = params.get("tab");
    if (tab && heroTabs.some((t) => t.id === tab)) {
      setSelectedTab(tab);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    if (selectedTab === heroTabs[0].id) {
      url.searchParams.delete("tab");
    } else {
      url.searchParams.set("tab", selectedTab);
    }
    window.history.replaceState({}, "", url.toString());
  }, [selectedTab]);

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
                    className="wordmark text-2xl font-semibold tracking-tight text-white"
                    aria-label="ACP Designs Studio — home"
                  >
                    ACP
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
                className="flex gap-3 overflow-x-auto pb-1"
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
                  Tabs for the surfaces.
                  <br />
                  Cards for the details.
                </h2>
              </div>
              <p className="max-w-2xl text-sm leading-7 text-gray-300 md:text-base">
                The hero points to the main lanes of work. The cards below give
                each product a clearer snapshot: what it is, who it is for, and
                whether it is public yet.
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

                        <ul className="mt-6 grid gap-3">
                          {project.bullets.map((bullet) => (
                            <li
                              key={bullet}
                              className="flex items-start gap-3 text-sm leading-7 text-gray-300"
                            >
                              <span
                                aria-hidden="true"
                                className="mt-2 block h-2 w-2 shrink-0 rounded-full bg-white"
                              />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>

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
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={`/api/tile/${p.slug}`}
                                  alt=""
                                  width={800}
                                  height={500}
                                  loading="lazy"
                                  className="aspect-[8/5] w-full object-cover"
                                />
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

        <section
          id="approach"
          className="section-shell border-t border-white/10"
          aria-labelledby="approach-heading"
        >
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
              <div>
                <p className="eyebrow">Approach</p>
                <h2
                  id="approach-heading"
                  className="mt-4 max-w-4xl text-4xl leading-[0.98] tracking-[-0.04em] text-white md:text-6xl"
                >
                  Products, not promises.
                </h2>
                <p className="mt-6 max-w-3xl text-base leading-8 text-gray-300">
                  Each project here started because I needed it and stuck around
                  because it kept earning its spot. No pitch decks, no stack of
                  prototypes, no placeholder pages that stay placeholder.
                </p>
              </div>

              <div className="liquid-glass rounded-2xl border border-white/10 p-6">
                <p className="eyebrow">Studio</p>
                <p className="mt-4 text-3xl tracking-[-0.04em] text-white">
                  Carson Palmer
                </p>
                <p className="mt-4 text-sm leading-7 text-gray-300">
                  Independent builder across property ops, automation, iOS, web,
                  and macOS.
                </p>
              </div>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {principles.map((p, index) => (
                <article
                  key={p.title}
                  className="liquid-glass rounded-2xl border border-white/10 p-6"
                >
                  <p className="text-sm uppercase tracking-[0.24em] text-gray-300">
                    {String(index + 1).padStart(2, "0")}. {p.title}
                  </p>
                  <p className="mt-4 text-sm leading-7 text-gray-300">
                    {p.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer
        id="contact"
        className="border-t border-white/10 bg-black px-6 py-14 md:px-12 lg:px-16"
      >
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <div>
            <p className="eyebrow">Get in touch</p>
            <a
              href="mailto:crsnpalmer@gmail.com"
              className="mt-3 inline-block text-2xl tracking-[-0.02em] text-white underline-offset-4 hover:underline md:text-3xl"
            >
              crsnpalmer@gmail.com
            </a>
            <p className="mt-3 max-w-md text-sm leading-7 text-gray-300">
              Best for product questions, collaboration, and anything tenant- or
              automation-related.
            </p>
          </div>
          <p className="text-xs uppercase tracking-[0.2em] text-gray-300">
            © {new Date().getFullYear()} ACP Designs Studio
          </p>
        </div>
      </footer>
    </>
  );
}
