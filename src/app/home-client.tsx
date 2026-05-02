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
    heading: "A shelf for\nwhat I am building.",
    subheading:
      "A laid-back home for property work, workflow maps, app ideas, and the notes that make the next version better.",
    tag: "Projects, notes, and useful scraps from real work.",
    primaryHref: "#projects",
    primaryLabel: "Browse the shelf",
    projectTarget: "palmer-properties",
    secondaryHref: "https://palmerconstructioncompany.co",
    secondaryLabel: "Palmer Construction",
    secondaryExternal: true,
    tint: "rgba(245, 165, 36, 0.18)",
  },
  {
    id: "workflow-automation",
    label: "Automation",
    heading: "Workflow maps\nwith the messy parts left in.",
    subheading:
      "The automation notes show how recurring work, customer service intake, approvals, guardrails, and human follow-up can fit together.",
    tag: "Patterns from a real operating setup.",
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
    heading: "A habit app\nstill getting sharper.",
    subheading:
      "HabitForge is a calm habit system idea built around structure without pressure mechanics, with the product thinking kept nearby.",
    tag: "Screens, product notes, and the habit-system idea.",
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
    heading: "A sports app\nfrom a simple annoyance.",
    subheading:
      "Transfer Portal started from a simple gap: transfer news is scattered, slow to scan, and awkward on mobile.",
    tag: "132 FBS teams. iPhone-first.",
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
    heading: "Tiny tools\nfor everyday friction.",
    subheading:
      "TodoToNotes is a small macOS utility idea: snap a handwritten list, review the extracted tasks, and send clean checklists to Apple Notes.",
    tag: "A compact idea for turning messy input into useful output.",
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
      "A plain-English map for recurring work and operational follow-through.",
    description:
      "This system coordinates recurring operations, routed workflows, reminders, customer-service intake, and maintenance tasks. The useful part is the shape: what comes in, where it goes, what gets checked, and when a person needs to step in.",
    bullets: [
      "Shows how local-first automation can stay observable and reversible",
      "Turns scattered reminders and handoffs into a visible operating loop",
      "Leaves behind patterns other operators can borrow without copying the whole stack",
    ],
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
      "A focused iPhone app concept for NCAA football transfer tracking.",
    description:
      "Transfer Portal tracks entries, commitments, rankings, and team movement across all 132 FBS programs. The idea is simple: make roster movement fast to scan without forcing fans through scattered articles and slow pages.",
    bullets: [
      "Live transfer tracking for all 132 FBS teams",
      "Rankings, team grades, and roster views in one place",
      "A product note on turning a noisy information market into a clean mobile tool",
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
      "A four-pillar habit app idea for structure without pressure mechanics.",
    description:
      "HabitForge organizes habits across mental, physical, spiritual, and financial life. The product note is about shape: how to create accountability without turning self-improvement into a scoreboard.",
    bullets: [
      "Four dimensions: mental, physical, spiritual, and financial",
      "Daily rhythm, private reflection, and recovery from imperfect weeks",
      "A relaxed example of turning a personal system into a product concept",
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
    summary: "A 122-unit rental portfolio across Tuscaloosa and Northport.",
    description:
      "Palmer Construction Company owns and operates rental properties across Tuscaloosa and Northport. The properties are the real-world lab: leasing, maintenance, tenant support, AppFolio gaps, and move-in workflows create the problems the software has to solve.",
    bullets: [
      "Condos, townhomes, and single-family rentals across Tuscaloosa and Northport",
      "Each property has its own site and process for leasing, maintenance, and tenant support",
      "The portfolio creates the operating pressure that shapes the internal tools",
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
      "A tenant companion idea shaped by move-in questions and property quirks.",
    description:
      "KnowYourHome provides current tenants with move-in guidance, property-specific information, parking and trash rules, and common answers in one mobile-friendly place. The lesson is that support content should live where residents can actually use it.",
    bullets: [
      "Not public — tenants get access when their lease starts",
      "Per-property guidance for Pinnacle Park, First and Main, The Station, Forest Lake, and storage",
      "Move-in and move-out checklists plus practical property information",
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
      "A small macOS utility for turning handwritten lists into Apple Notes checklists.",
    description:
      "TodoToNotes converts a photo of a handwritten list into editable tasks and saves them to Apple Notes using native checklist formatting. It is intentionally small: one annoying handoff, made clean.",
    bullets: [
      "Supports camera capture, drag-and-drop, and structured review before save",
      "Uses AI vision to read handwriting and improve task extraction",
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
    title: "Start where the problem is",
    body: "The best ideas here come from the place where the friction is obvious: properties, calls, lists, schedules, screens, and real handoffs.",
  },
  {
    title: "Leave the useful part",
    body: "The point is not to make everything look impressive. It is to leave the diagram, note, or product shape clear enough for someone else to use.",
  },
  {
    title: "Let it stay unfinished",
    body: "A good idea does not have to arrive polished. It just needs to be honest about what exists, what is being tested, and what was learned.",
  },
];

const focusAreas = [
  {
    title: "Systems",
    body: "Workflow maps, recurring operations, customer-service routing, and guardrails that keep work from drifting.",
  },
  {
    title: "App ideas",
    body: "HabitForge, Transfer Portal, TodoToNotes, and other product ideas with the original problem still attached.",
  },
  {
    title: "Properties",
    body: "The real-world testing ground: leasing, maintenance, move-in support, tenant questions, and property-specific workflows.",
  },
];

const fieldNotes = [
  {
    title: "Inputs before software",
    body: "Most useful tools here start by naming the real input: a call, a lease question, a handwritten list, a transfer rumor, or a recurring task that keeps slipping.",
  },
  {
    title: "Workflows need guardrails",
    body: "Automation is only useful when someone can inspect what happened, approve the risky parts, and reverse the change if the system misunderstood the situation.",
  },
  {
    title: "Small products still teach",
    body: "A tiny app idea still has a product argument: who it helps, what current tools miss, why the flow is simpler, and what should stay out of scope.",
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
                    <p className="eyebrow hero-kicker mb-4 text-white/80">
                      Properties, workflow maps, app ideas, and notes from the build.
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
                        122 units operated
                      </span>
                      <span className="rounded-full border border-white/15 px-3 py-2">
                        Local-first automation
                      </span>
                      <span className="rounded-full border border-white/15 px-3 py-2">
                        iPhone, web, and macOS apps
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
                  What is on the shelf.
                  <br />
                  Take what is useful.
                </h2>
              </div>
              <p className="max-w-2xl text-sm leading-7 text-gray-300 md:text-base">
                A simple place to keep the active projects visible: what they are,
                why they exist, what is working, and what someone else might borrow.
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {focusAreas.map((area) => (
                <article
                  key={area.title}
                  className="liquid-glass rounded-2xl border border-white/10 p-5"
                >
                  <p className="text-sm uppercase tracking-[0.24em] text-gray-200">
                    {area.title}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-gray-300">
                    {area.body}
                  </p>
                </article>
              ))}
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
                  Rough enough
                  <br />
                  to stay useful.
                </h2>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-200">
                  This is not trying to be a glossy case study. It is a place for real
                  operating problems, diagrams, product sketches, and the notes that make
                  the next build sharper.
                </p>
              </div>

              <div className="liquid-glass rounded-2xl border border-white/10 p-6">
                <p className="eyebrow">Studio</p>
                <p className="mt-4 text-3xl tracking-[-0.04em] text-white">
                  The idea shelf
                </p>
                <p className="mt-4 text-sm leading-7 text-gray-300">
                  Properties create the pressure, workflows reveal the pattern, and the app
                  ideas turn those lessons into something more focused.
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

        <section
          id="field-notes"
          className="section-shell border-t border-white/10"
          aria-labelledby="field-notes-heading"
        >
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_28rem] lg:items-end">
              <div>
                <p className="eyebrow">Field notes</p>
                <h2
                  id="field-notes-heading"
                  className="mt-4 max-w-4xl text-4xl leading-[0.98] tracking-[-0.04em] text-white md:text-6xl"
                >
                  What is worth
                  <br />
                  carrying forward.
                </h2>
              </div>
              <p className="max-w-2xl text-sm leading-7 text-gray-300 md:text-base">
                Each project should leave behind more than a link. The good stuff is usually
                the pattern: what problem showed up, what the first version tried, and what
                should be borrowed, avoided, or rebuilt better.
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {fieldNotes.map((note, index) => (
                <article
                  key={note.title}
                  className="liquid-glass rounded-2xl border border-white/10 p-6"
                >
                  <p className="text-sm uppercase tracking-[0.24em] text-gray-300">
                    Note {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-4 text-2xl tracking-[-0.03em] text-white">
                    {note.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-gray-300">
                    {note.body}
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
        <div className="mx-auto max-w-7xl">
          <div className="liquid-glass rounded-[2rem] border border-white/10 p-8 md:p-10">
            <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
              <div>
                <p className="eyebrow">Shelf notes</p>
                <h2 className="mt-4 max-w-3xl text-4xl leading-[0.98] tracking-[-0.04em] text-white md:text-5xl">
                  The notes stay open:
                  <br />
                  systems, notes, ideas.
                </h2>
                <p className="mt-5 max-w-2xl text-sm leading-7 text-gray-300 md:text-base">
                  The goal is to make the work useful without making it feel performative:
                  clear links, honest status, useful patterns, and enough context for
                  someone else to build their own version.
                </p>
                <div className="mt-6 flex flex-wrap gap-3 text-xs uppercase tracking-[0.2em] text-gray-300">
                  <span className="rounded-full border border-white/15 px-3 py-2">
                    Field notes
                  </span>
                  <span className="rounded-full border border-white/15 px-3 py-2">
                    Workflow maps
                  </span>
                  <span className="rounded-full border border-white/15 px-3 py-2">
                    App concepts
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
                  Use email for project questions, collaboration, or access to related materials.
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
