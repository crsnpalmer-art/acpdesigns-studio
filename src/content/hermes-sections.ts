// Public copy for the Hermes section of the ACP Designs Studio site.
// First-person studio voice ("I"/"me"). No private identifiers, contact details, or amounts.

export type RequestStep = { step: string; title: string; detail: string };

export type ModelId = "codex" | "claude" | "grok" | "elevenlabs";
export type Model = {
  id: ModelId;
  name: string;
  model: string;
  role: string;
  blurb: string;
  lanes: string[];
};

export type Tool = { category: string; name: string; blurb: string };

export type Workflow = { id: string; label: string; summary: string; steps: string[] };

export type PathStep = {
  id: string;
  label: string;
  headline: string;
  body: string;
  bullets: string[];
};

export type Lyra = {
  intro: string;
  tools: { name: string; detail: string }[];
  boundaries: string[];
  phases: { label: string; detail: string }[];
};

export type Knowledge = {
  parts: { title: string; label: string; body: string; bullets: string[] }[];
  why: { title: string; body: string }[];
  plainEnglish: string;
};

export const requestLoop: RequestStep[] = [
  { step: "01", title: "Message", detail: "A tenant, an email, a schedule, or a manual request." },
  { step: "02", title: "Hermes routes", detail: "The right profile, tools, memory, and guardrails." },
  { step: "03", title: "Work happens", detail: "Drafts, checks, summaries, and reports." },
  { step: "04", title: "I gate it", detail: "Anything risky waits for my approval." },
];

export const models: Model[] = [
  {
    id: "codex",
    name: "OpenAI Codex",
    model: "GPT-6.1",
    role: "Reasoning + helper tasks",
    blurb:
      "Runs the finance, ops, and maintenance lanes, and is the fallback for the Claude lanes, including the Dispatcher. It also handles vision, compression, and small helper tasks for every lane.",
    lanes: ["Trading", "System Health", "Maintenance"],
  },
  {
    id: "claude",
    name: "Anthropic Claude",
    model: "Claude Opus 5.5",
    role: "Reasoning",
    blurb:
      "Runs the Dispatcher plus the work, collections, Lyra, and memory lanes, and is the fallback for the Codex lanes. Claude Sonnet drafts Lyra's text replies.",
    lanes: ["Dispatcher", "Leasing Back Office", "Lyra", "Collections & Books", "Memory & Wiki"],
  },
  {
    id: "grok",
    name: "xAI / Grok",
    model: "Grok 4.7",
    role: "Research lane + search",
    blurb: "Runs the tweeter lane, and powers web search and X search.",
    lanes: ["Research"],
  },
  {
    id: "elevenlabs",
    name: "ElevenLabs",
    model: "ElevenLabs voice",
    role: "Lyra's voice",
    blurb:
      "A separate voice AI runs Lyra, who answers the leasing phone line. It handles the conversation. Hermes handles the data path, the tools, and the human handoff.",
    lanes: ["Lyra"],
  },
];

export const modelChainNote =
  "Lanes are split between OpenAI Codex and Anthropic Claude, and each falls back to the other vendor. The Research lane runs on Grok with Codex as its fallback. ElevenLabs runs Lyra's phone conversations separately, and Hermes owns the data and tool handoff.";

export const tools: Tool[] = [
  { category: "Notification channel", name: "Telegram", blurb: "The main approval and notification channel, with one lane per profile. Risky actions wait for an APPROVE reply here." },
  { category: "Control plane", name: "Hermes Agent", blurb: "The local agent framework that runs profiles, tools, memory, skills, scheduled jobs, and the messaging gateway." },
  { category: "Property backbone", name: "AppFolio", blurb: "The system of record for tenants, occupancy, work orders, vendors, and accounting." },
  { category: "Inbox + Sheets", name: "Google Workspace", blurb: "Gmail polling across six accounts, Sheets queues, the sheet I edit Lyra from, and the unit-turn board doc." },
  { category: "Voice AI", name: "ElevenLabs", blurb: "Lyra's phone voice. Hermes handles the data path and human handoff around it." },
  { category: "Phone + SMS", name: "Twilio", blurb: "Lyra's phone number and two-way texting." },
  { category: "Business texts", name: "iMessage", blurb: "Business-text digests and urgent-message scans." },
  { category: "Browser automation", name: "Playwright", blurb: "A persistent browser profile drives AppFolio exports when no clean API exists." },
  { category: "Edge automation", name: "Cloudflare Workers", blurb: "Lyra's worker: phone webhooks, texts, and signed approval links." },
  { category: "Static hosting", name: "Vercel", blurb: "Hosts public sites, dashboards, and marketing pages." },
  { category: "Memory + search", name: "Hermes memory", blurb: "Holographic fact memory, session search, skills, Kanban handoffs between lanes, and the planning wiki." },
  { category: "Service runner", name: "macOS launchd", blurb: "The Mac's service manager keeps the gateway and a few helper scripts alive." },
];

export const workflows: Workflow[] = [
  {
    id: "gmail-watcher",
    label: "Gmail watcher",
    summary:
      "Six Gmail accounts are polled every 5 minutes. New mail gets classified, routed to a dedicated Telegram channel, and the right agent picks it up.",
    steps: ["Gmail poll", "Mail payload", "Routed channel", "Agent classifies"],
  },
  {
    id: "appfolio-sync",
    label: "AppFolio sync",
    summary:
      "Every day at 6:05 AM, a local Playwright browser runs against AppFolio, downloads the Excel export, and parses it on the Mac. It then builds one work-order PDF per vendor, plus a scoreboard front page. Any 2FA prompt comes to me on Telegram.",
    steps: ["Daily 6:05 AM", "Local Playwright", "Excel export", "Vendor PDFs"],
  },
  {
    id: "lyra-call",
    label: "Lyra call",
    summary:
      "A leasing or tenant call comes in on Lyra's line, gets understood by ElevenLabs, runs through scoped tools, and ends with a logged record.",
    steps: ["Caller", "ElevenLabs", "Tool call", "Log", "Human follow-up"],
  },
  {
    id: "emergency-call",
    label: "Emergency call",
    summary:
      "Urgent calls skip the normal queue and fire a loud Telegram alert and an SMS to me at the same time. No work order is created automatically. I decide.",
    steps: ["Caller", "Detect", "Telegram emergency channel + SMS", "Human response"],
  },
  {
    id: "agent-review",
    label: "Agent review",
    summary:
      "Hermes or a coding agent does the work, then a separate review pass checks the meaningful changes before they ship.",
    steps: ["Author", "Independent review", "Human merge"],
  },
  {
    id: "cron-approval",
    label: "Cron + approval",
    summary:
      "A scheduled job drafts something risky, like a collection notice or a vendor email. The agent stops at the approval gate and waits for me on Telegram.",
    steps: ["Cron", "Agent draft", "Telegram APPROVE", "Send"],
  },
];

export const requestPath: PathStep[] = [
  {
    id: "trigger",
    label: "Trigger",
    headline: "Work shows up from one of five places.",
    body:
      "A cron timer, an inbound phone call to Lyra, a new Gmail message that matches a watch rule, a Telegram command from me, or a background sync (AppFolio, Lyra's knowledge base).",
    bullets: ["Cron timer", "Phone call (Lyra)", "Gmail watcher", "Telegram message", "Background sync"],
  },
  {
    id: "gateway",
    label: "Gateway",
    headline: "The Hermes gateway picks it up.",
    body:
      "The gateway receives the request, decides which profile owns the work, and hands it off. One gateway process serves all nine profiles. macOS restarts it if it crashes, and a Hermes job re-fires any missed scheduled run every 20 minutes.",
    bullets: ["One gateway, nine lanes", "Auto-restart", "Service supervision", "Missed-job sweeper"],
  },
  {
    id: "agent",
    label: "Agent",
    headline: "One of nine Hermes profiles picks up the work.",
    body:
      "The Dispatcher, Leasing Back Office, Lyra, Trading, Collections & Books, System Health, Memory & Wiki, Maintenance, or Research. Each runs with broad tool access. The safety boundary is the approval gate, not a per-tool lockdown.",
    bullets: ["Approval-gated", "Per-agent Telegram channel", "Per-agent personality", "Human owns risky writes"],
  },
  {
    id: "tools",
    label: "Tools",
    headline: "The agent calls scoped tools.",
    body:
      "AppFolio (work orders, occupancy) through a local Playwright browser, Gmail (inbox), Google Sheets (queues), Hermes memory, session search, Kanban handoffs, Telegram, or Cloudflare Worker endpoints. Each agent gets only what it needs.",
    bullets: ["AppFolio", "Gmail / Sheets", "Kanban handoffs", "Memory index", "Cloudflare Workers"],
  },
  {
    id: "approval",
    label: "Approval",
    headline: "Risky moves stop and ask me.",
    body:
      "Routine, fact-only replies (property facts, how-tos) can go out automatically behind safety filters. Anything about accounts, money, legal issues, or work orders waits for my APPROVE on Telegram, and scheduled jobs can't run risky commands at all. Work orders never get auto-posted to AppFolio. Every one is a manual reply, even emergencies.",
    bullets: ["Telegram APPROVE / DECLINE", "No auto AppFolio writes", "Emergency = loud, not automatic", "Per-work-order approval"],
  },
  {
    id: "logged",
    label: "Logged",
    headline: "Every run leaves proof.",
    body:
      "A log entry, a Telegram message, a returned record count, a sheet update. The session writes to Hermes memory and session search, so the next agent that needs context starts smarter.",
    bullets: ["Telegram receipt", "Hermes memory/session receipt", "Daily log writer (11 PM)", "Weekly review (Friday 5 PM)"],
  },
];

export const lyra: Lyra = {
  intro:
    "Lyra is the voice and text agent for my leasing line. She's an ElevenLabs voice on top of Hermes-controlled tools. She handles the conversation, and Hermes handles the data path and the human handoff. Texts run through a small Cloudflare worker, and Claude drafts the replies. She has been live around the clock since April 2026.",
  tools: [
    { name: "lookup_tenant", detail: "Match a caller to a tenant record by phone or name." },
    { name: "verify_tenant", detail: "Confirm the caller's identity before sharing sensitive context." },
    { name: "check_availability", detail: "Date-scoped vacancy lookup against a live availability sheet." },
    { name: "schedule_tour", detail: "Capture a tour request with property and time, and send it to me." },
    { name: "get_caller_history", detail: "Pull prior calls for context, so she isn't starting from zero." },
    { name: "emergency_alert", detail: "Fast path: a dedicated Telegram channel and an SMS to me, in parallel." },
    { name: "get_date", detail: "Today's date and time, so scheduling math is never stale." },
    { name: "transfer_to_number", detail: "Warm transfer to a person, with a briefing." },
  ],
  boundaries: [
    "No outbound calls. Texts go out only as replies, missed-call text-backs, or safe follow-ups.",
    "Every call gets an official log, written automatically by the post-call webhook.",
    "Tour and leasing requests can be captured, checked, and queued. No commitments without me.",
    "Maintenance issues get logged with the transcript attached. Dispatch decisions stay human.",
    "Rent, payment, legal, and eviction topics are tagged for review and end with a follow-up to me.",
    "Approvals on the Lyra side route through Hermes-controlled approval gates and Cloudflare Worker endpoints, not a direct Telegram webhook.",
  ],
  phases: [
    {
      label: "Phase 1: live",
      detail: "Tenant verification, date-scoped availability, the emergency fast path, and caller history. Shipped April 2026.",
    },
    {
      label: "Phase 2: live",
      detail: "Warm transfer to a person, plus a QA review of recent calls twice a day.",
    },
    {
      label: "Phase 3: live (September 2026)",
      detail: "Two-way texting on the same number. Missed calls get one text-back.",
    },
  ],
};

export const guardrails: string[] = [
  "Routine, fact-only replies (property facts, how-tos) can go out automatically behind safety filters. Anything about accounts, money, legal issues, or work orders waits for my APPROVE on Telegram.",
  "Scheduled jobs can't run risky commands at all.",
  "No work order is ever auto-posted to AppFolio, even for emergencies.",
  "Public pages get summary-only data: no tenant names, units, balances, message bodies, or send controls.",
  "Live state wins over memory or old write-ups.",
];

export const knowledge: Knowledge = {
  parts: [
    {
      title: "The planning wiki",
      label: "Obsidian vault",
      body:
        "An Obsidian vault of plain markdown files. It has project pages (one per system: gateway, Lyra, AppFolio, the Gmail watcher, and more), a chronological decisions log, playbooks for recurring recovery tasks, and a fast-read summary that is regenerated each week.",
      bullets: ["Obsidian vault", "Project pages", "Decisions log", "Playbooks", "Auto-regenerated summary"],
    },
    {
      title: "Lyra's knowledge base",
      label: "Synced weekly + on demand",
      body:
        "A separate markdown collection for property rules, vacancy info, lease policies, and tenant FAQs. It syncs weekly to ElevenLabs and to Lyra's text worker, plus same-day pushes when I approve a change. Lyra answers from the current rules, not a snapshot from when she was trained.",
      bullets: ["Property notes", "Vacancy info", "Lease policies", "Tenant FAQs", "Weekly + on-demand sync"],
    },
  ],
  why: [
    { title: "Plain markdown", body: "Git-able, future-proof, no vendor lock-in. Any text editor opens it. Any script can search it." },
    { title: "Cross-AI source of truth", body: "Hermes profiles and coding assistants read the wiki at session start and write durable decisions back after. They stop drifting because they share one set of facts." },
    { title: "Self-maintaining", body: "Weekly verify scripts compare wiki claims to live state and flag anything stale. The wiki tells me when it's wrong about itself." },
    { title: "Visible", body: "I can open any file in Obsidian, search across all of it, and edit it like a normal note. No proprietary index, no opaque storage." },
    { title: "Composable", body: "Every scheduled job and every Hermes profile can read, search, parse, or append to it. Memory becomes a tool the rest of the system uses." },
  ],
  plainEnglish:
    "The AIs share a notebook. They read it before doing anything and write to it after. The notebook lives on my Mac in a format I can read with my own eyes. Every week the system checks the notebook against reality and fixes anything that drifted.",
};

export const offPage: { title: string; detail: string }[] = [
  { title: "Telegram tokens + chat IDs", detail: "Bot tokens, group and topic IDs, and the user ID that gets emergency DMs." },
  { title: "AppFolio internals", detail: "Account credentials, internal routes, tenant names, unit numbers, and owner names." },
  { title: "ElevenLabs + Twilio secrets", detail: "API keys (kept in two stores, deliberately), agent IDs, and account identifiers." },
  { title: "Gmail + OAuth", detail: "The six Gmail account addresses, OAuth tokens, and refresh paths." },
  { title: "Cloudflare credentials", detail: "Worker API tokens, KV namespace IDs, and route configurations." },
  { title: "Local runtime files", detail: "Anything in profile state, secrets, credentials, sessions, or local runtime internals." },
  { title: "Tenant + financial data", detail: "Names, balances, lease terms, payment plans, and anything tied to a real person." },
  { title: "Property addresses", detail: "Specific units, addresses, floor plans, and building-level private details." },
];
