// Public map of the Hermes setup. Counts and each lane's scheduled jobs
// come from hermes-live.json (generated on the studio Mac by
// `node scripts/gen-hermes-data.mjs`); each job's plain-English write-up comes
// from job-guide.json, keyed by the job's exact Hermes name. Lane copy and the
// plain-language job titles below are hand-written for a non-technical reader. Public names only: no paths, IDs, chat numbers, or phone numbers.
import live from "./hermes-live.json";
import jobGuide from "./job-guide.json";

export type JobGuide = {
  does: string;
  reads: string;
  how: string;
  result: string;
  you: string;
};

export type Job = {
  name: string;
  cadence: string;
  detail: string;
  guide?: JobGuide;
};

export type AgentId =
  | "main"
  | "work"
  | "lyra"
  | "maintenance"
  | "collections"
  | "finance"
  | "ops"
  | "memory"
  | "tweeter";

export type Agent = {
  id: AgentId;
  lane: string;
  name: string;
  title: string;
  detail: string;
  owns: string[];
  chatRoutines: Job[];
  macJobs: Job[];
};

type LiveCron = { name: string; agentId: string; h: number; cadence: string };

const guides = jobGuide as Record<string, JobGuide>;

// Plain-language titles for the public page, keyed by the exact Hermes job name.
// A job without an entry falls back to its Hermes name minus the "Area - " prefix.
const PUBLIC_NAMES: Record<string, string> = {
  "Comms - Email Pipeline Watchdog": "Inbox health check",
  "Comms - Message Reply Digest": "Business text digest",
  "Comms - Urgent Message Scan": "Urgent text watch",
  "Lyra - Tenant Wiki Delta Ingest": "New resident questions",
  "Memory - Daily Log Writer": "Daily log",
  "Memory - Weekly Review": "Weekly memory review",
  "Ops - Approval Re-ping": "Approval reminder",
  "Ops - Cron offline re-fire sweeper": "Missed-job catch-up",
  "Ops - Gog Credential Monitor": "Gmail connection check",
  "Ops - Hermes Weekly Backup": "Weekly backup",
  "Ops - Lyra Spend Watch": "Daily spend check",
  "Ops - Playwright Profile Monitor": "AppFolio login check",
  "Ops - Plug-in reminder": "Plug-in reminder",
  "Ops - Weekly failure refine": "Weekly fix-it review",
  "Property - Daily Rent Roll": "Daily rent roll",
  "Property - Lease Renewal Pipeline": "Lease renewal list",
  "Property - Lyra Improvement Drafter": "Lyra improvement notes",
  "Property - Lyra QA Review": "Lyra call review",
  "Property - Occupancy Report": "Occupancy report",
  "Property - Ops Daily Digest": "Morning property digest",
  "Property - Tenant Directory Refresh": "Tenant directory refresh",
  "Property - WO History Sync": "Work-order history",
  "Property - Weekly Delinquency Report": "Weekly late-rent report",
  "Unit turn board digest": "Unit turn board",
  "Wiki - Auto synthesize staged memory": "File the day's notes",
  "Wiki - Curator (chronicle)": "Nightly notebook tidy",
  "Wiki - Curator weekly review": "Weekly notebook tidy",
  "Wiki - Nightly auto-commit": "Nightly notebook save",
  "Wiki - Re-read stale pages": "Notebook re-check",
  "Wiki - Verify Weekly": "Notebook fact-check",
};

const displayName = (name: string) =>
  PUBLIC_NAMES[name] ?? name.replace(/^[A-Za-z]+ (?:-|—) /, "");

const crons = live.crons as LiveCron[];
const macServices = new Set(live.macServices as string[]);

function routinesFor(id: AgentId): Job[] {
  return crons
    .filter((c) => c.agentId === id)
    .sort((a, b) => a.h - b.h)
    .map((c) => ({
      name: displayName(c.name),
      cadence: c.cadence,
      detail: guides[c.name]?.does ?? "",
      guide: guides[c.name],
    }));
}

// Mac background services, by owning lane (public slugs from hermes-live.json). Listed only while loaded.
const MAC_JOBS: { label: string; lane: AgentId; job: Job }[] = [
  {
    label: "hermes-gateway",
    lane: "ops",
    job: {
      name: "The switchboard",
      cadence: "Always on",
      detail: "Listens for every message, hands it to the right specialist, starts the scheduled jobs, and restarts itself if it ever stops.",
    },
  },
  {
    label: "email-pipeline",
    lane: "ops",
    job: {
      name: "Inbox sorter",
      cadence: "Every 5 min",
      detail: "Checks six property inboxes, sorts what arrives, and prepares leasing reply drafts.",
    },
  },
  {
    label: "hermes-delivery-respooler",
    lane: "ops",
    job: {
      name: "Delivery retry",
      cadence: "Every 2 min",
      detail: "Retries messages that didn't send the first time.",
    },
  },
  {
    label: "ops-lyra-kb-sync",
    lane: "lyra",
    job: {
      name: "Knowledge sync",
      cadence: "Weekly",
      detail: "Sends the current property rules and common questions to Lyra, so she answers from this week's facts.",
    },
  },
  {
    label: "property-appfolio-sync",
    lane: "maintenance",
    job: {
      name: "Daily work-order download",
      cadence: "Daily, 6:05 AM",
      detail: "Downloads the day's open work orders from AppFolio, then builds one sheet for each vendor.",
    },
  },
  {
    label: "ops-wiki-memory-watcher",
    lane: "memory",
    job: {
      name: "Note collector",
      cadence: "As notes are written",
      detail: "Gathers each specialist's new notes so the morning pass can file them in the shared notebook.",
    },
  },
];

const macJobsFor = (id: AgentId): Job[] =>
  MAC_JOBS.filter((m) => m.lane === id && macServices.has(m.label)).map((m) => m.job);

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export const snapshotDate = formatDate(live.verified);

const NUMBER_WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"];

/** 9 -> "nine" (falls back to digits past twelve). Pass true to capitalize. */
export function numberWord(n: number, capital = false): string {
  const word = NUMBER_WORDS[n] ?? String(n);
  return capital ? word.charAt(0).toUpperCase() + word.slice(1) : word;
}

export const operatingStats = {
  agents: live.agentCount,
  routines: live.cronEnabledCount,
  macJobs: MAC_JOBS.filter((m) => macServices.has(m.label)).length,
  chats: 1,
} as const;

type LaneCopy = Omit<Agent, "chatRoutines" | "macJobs">;

const lanes: LaneCopy[] = [
  {
    id: "main",
    lane: "Front desk",
    name: "Dispatcher",
    title: "First stop for every request",
    detail:
      "Reads each new request, answers what it can, and hands the rest to the right specialist. It also writes The Front Porch, my morning paper.",
    owns: [
      "Sending each new request to the right specialist.",
      "Side projects and anything that has no other owner.",
      "The Front Porch, every morning.",
    ],
  },
  {
    id: "work",
    lane: "Leasing office",
    name: "Leasing Back Office",
    title: "Occupancy, renewals, lease paperwork",
    detail:
      "Keeps track of which units are leased, which leases are coming up, applications in progress, lease paperwork, and the tenant directory.",
    owns: [
      "Occupancy, renewals, and the next step on every lease.",
      "The morning property digest.",
      "An up-to-date tenant directory.",
    ],
  },
  {
    id: "lyra",
    lane: "Phone line",
    name: "Lyra",
    title: "Answers calls and texts, day and night",
    detail:
      "Talks with prospects and residents about tours, move-ins, move-outs, and maintenance, on the phone and by text, around the clock.",
    owns: [
      "The 24/7 voice and text line for leasing and maintenance.",
      "Routine leasing answers. Anything about money, a lease, or the law waits for a person.",
      "Keeping her property facts current.",
    ],
  },
  {
    id: "maintenance",
    lane: "Maintenance",
    name: "Maintenance",
    title: "Work orders, vendors, unit turns",
    detail:
      "Keeps work orders, appliance repair claims, vendors, and unit turns organized, and makes sure the daily AppFolio download arrives.",
    owns: [
      "Work-order history and a daily sheet of open work for each vendor.",
      "The unit turn board: a checklist for every unit that is turning.",
      "Emergencies first: safety and livability before cosmetics.",
    ],
  },
  {
    id: "collections",
    lane: "Money",
    name: "Collections & Books",
    title: "Late rent, payment plans, the books",
    detail:
      "Tracks late rent, payment plans, and owner accounting, and sums up the week's collections in one note.",
    owns: [
      "Late rent, payment plans, and who needs a follow-up.",
      "The week's collections picture in one note.",
      "Every notice about money still waits for a person.",
    ],
  },
  {
    id: "finance",
    lane: "Markets",
    name: "Trading",
    title: "Market research (paused)",
    detail: "Market research and trade ideas. Its scheduled scans are paused, so it works only when I ask.",
    owns: ["Research when I ask. Nothing is scheduled while the scans are paused."],
  },
  {
    id: "ops",
    lane: "Upkeep",
    name: "System Health",
    title: "Keeps everything running",
    detail:
      "Watches the scheduled jobs, logins, backups, and anything that fails. Every report starts with OK, WATCH, or FAIL.",
    owns: [
      "Keeping the studio Mac signed in, backed up, and connected.",
      "Sorting incoming email so leasing replies can be prepared.",
      "Re-running missed jobs and retrying anything that did not send the first time.",
    ],
  },
  {
    id: "memory",
    lane: "Records",
    name: "Memory & Notebook",
    title: "Daily logs and the shared notebook",
    detail:
      "Writes down what happened each day, keeps the shared notebook tidy and accurate, and records the decisions worth remembering.",
    owns: [
      "Writing down what happened today so tomorrow starts from the facts.",
      "Turning new notes into shared project pages.",
      "Keeping what Lyra knows in step with the week's changes.",
    ],
  },
  {
    id: "tweeter",
    lane: "Research",
    name: "Research",
    title: "Quick answers and web research",
    detail: "A desk for quick answers and web research. Nothing is scheduled, so it works only when I ask.",
    owns: ["Answers and research when I ask."],
  },
];

export const agents: Agent[] = lanes.map((lane) => ({
  ...lane,
  chatRoutines: routinesFor(lane.id),
  macJobs: macJobsFor(lane.id),
}));
