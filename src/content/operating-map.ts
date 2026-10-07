// Public map of the Hermes setup. Counts, models, and each lane's scheduled jobs
// come from hermes-live.json (generated on the studio Mac by
// `node scripts/gen-hermes-data.mjs`); each job's plain-English write-up comes
// from job-guide.json, keyed by the job's exact Hermes name. Lane copy below is
// hand-written. Public names only: no paths, IDs, chat numbers, or phone numbers.
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
  model: string;
  chatRoutines: Job[];
  macJobs: Job[];
};

type LiveCron = { name: string; agentId: string; h: number; cadence: string };
type LiveAgent = { id: string; model: string };

const guides = jobGuide as Record<string, JobGuide>;

// "Property - Daily Rent Roll" -> "Daily Rent Roll"
const displayName = (name: string) => name.replace(/^[A-Za-z]+ (?:-|—) /, "");

// "anthropic/claude-opus-5-5" -> "Claude Opus 5.5"; "openai-codex/gpt-6.1-sol" -> "Codex GPT-6.1"
function modelLabel(id: string): string {
  const name = id.split("/").pop() ?? id;
  if (name.startsWith("claude-")) {
    const [family, ...version] = name.replace("claude-", "").split("-");
    return `Claude ${family.charAt(0).toUpperCase()}${family.slice(1)} ${version.join(".")}`;
  }
  if (name.startsWith("gpt-")) return `Codex ${name.replace(/^gpt-/, "GPT-").replace(/-sol$/, "")}`;
  if (name.startsWith("grok-")) return `Grok ${name.replace("grok-", "")}`;
  return name;
}

const crons = live.crons as LiveCron[];
const liveAgents = live.agents as LiveAgent[];
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
      name: "Hermes gateway",
      cadence: "Always on",
      detail: "One process serves all nine lanes: it listens for messages, routes work, runs the schedules, and restarts itself if it crashes.",
    },
  },
  {
    label: "email-pipeline",
    lane: "ops",
    job: {
      name: "Email pipeline",
      cadence: "Every 5 min",
      detail: "Polls six Gmail accounts, sorts what arrives, and prepares leasing reply drafts.",
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
      detail: "Pushes the current property rules and FAQs to Lyra's voice and text line.",
    },
  },
  {
    label: "property-appfolio-sync",
    lane: "maintenance",
    job: {
      name: "AppFolio sync",
      cadence: "Daily, 6:05 AM",
      detail: "Pulls the AppFolio export in a local browser, then builds one work-order sheet per vendor.",
    },
  },
  {
    label: "ops-wiki-memory-watcher",
    lane: "memory",
    job: {
      name: "Wiki memory watcher",
      cadence: "On change",
      detail: "Queues new lane notes so the morning wiki pass can fold them in.",
    },
  },
];

const macJobsFor = (id: AgentId): Job[] =>
  MAC_JOBS.filter((m) => m.lane === id && macServices.has(m.label)).map((m) => m.job);

const modelFor = (id: AgentId) => modelLabel(liveAgents.find((a) => a.id === id)?.model ?? "");

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

export const operatingStats = {
  agents: live.agentCount,
  routines: live.cronEnabledCount,
  macJobs: MAC_JOBS.filter((m) => macServices.has(m.label)).length,
  chats: 1,
} as const;

type LaneCopy = Omit<Agent, "model" | "chatRoutines" | "macJobs">;

const lanes: LaneCopy[] = [
  {
    id: "main",
    lane: "Main",
    name: "Dispatcher",
    title: "Front desk for the whole team",
    detail:
      "Triages every new ask, answers what's its own, and hands the rest to the right lane fast. Also writes The Front Porch, the daily morning paper.",
    owns: [
      "First stop for a new ask — route it to the right lane.",
      "Side projects and anything that does not already have an owner.",
      "The Front Porch, every morning.",
    ],
  },
  {
    id: "work",
    lane: "Work",
    name: "Leasing Back Office",
    title: "Occupancy, renewals, lease packets",
    detail:
      "Owns occupancy, renewals, the lease pipeline, applications, lease packets, and the tenant directory.",
    owns: [
      "Occupancy, renewals, and the next step on every lease.",
      "The morning property briefing.",
      "A current tenant directory.",
    ],
  },
  {
    id: "lyra",
    lane: "Lyra",
    name: "Lyra",
    title: "Leasing + resident line",
    detail:
      "Leasing and every resident-facing message — prospects, tenants, tours, move-ins and move-outs — plus the 24/7 voice and text line.",
    owns: [
      "The 24/7 voice and text line for leasing and maintenance.",
      "Routine leasing answers; anything about money, a lease, or the law waits for a person.",
      "Keeping Lyra’s property facts current.",
    ],
  },
  {
    id: "maintenance",
    lane: "Maintenance",
    name: "Maintenance",
    title: "Work orders, vendors, turns",
    detail:
      "Owns work orders, appliance repair claims, vendors, unit turns, and the health of the AppFolio sync.",
    owns: [
      "Work-order history and a daily sheet of open work for each vendor.",
      "The unit turn board: each turning unit’s checklist.",
      "Emergencies first, and plainly — safety and habitability before cosmetics.",
    ],
  },
  {
    id: "collections",
    lane: "Collections",
    name: "Collections & Books",
    title: "Late rent, payment plans, the books",
    detail:
      "Owns late rent, payment plans, owner accounting, and money risk, with a weekly collections snapshot.",
    owns: [
      "Late rent, payment plans, and who needs a follow-up.",
      "The week’s collections picture in one note.",
      "Every outbound money notice still waits for a person.",
    ],
  },
  {
    id: "finance",
    lane: "Finance",
    name: "Trading",
    title: "Market research (paused)",
    detail: "Market research and trade ideas. Its scheduled scans are paused, so it works on request.",
    owns: ["Research on request; nothing scheduled while the scans are paused."],
  },
  {
    id: "ops",
    lane: "Ops",
    name: "System Health",
    title: "Gateway, jobs, backups, alerts",
    detail:
      "Watches the gateway, scheduled jobs, logins, backups, and failures. Every report starts with OK, WATCH, or FAIL.",
    owns: [
      "Keep the studio Mac signed in, backed up, and talking to the outside world.",
      "Sort inbound mail so leasing replies can be prepared.",
      "Re-run missed jobs and retry anything that did not send the first time.",
    ],
  },
  {
    id: "memory",
    lane: "Memory",
    name: "Memory & Wiki",
    title: "Logs, wiki, lasting decisions",
    detail:
      "Keeps the daily logs, the planning wiki, memory health across the lanes, and the decisions worth remembering. It records; System Health acts.",
    owns: [
      "Write down what happened today so tomorrow’s work starts from the truth.",
      "Turn new notes into shared project pages.",
      "Keep Lyra’s property knowledge in step with the week’s changes.",
    ],
  },
  {
    id: "tweeter",
    lane: "Tweeter",
    name: "Research",
    title: "Quick answers + web and X research",
    detail: "A quick-answer and web/X research desk. Its scheduled scan is paused, so it works on request.",
    owns: ["Answers and research on request; nothing scheduled."],
  },
];

export const agents: Agent[] = lanes.map((lane) => ({
  ...lane,
  model: modelFor(lane.id),
  chatRoutines: routinesFor(lane.id),
  macJobs: macJobsFor(lane.id),
}));
