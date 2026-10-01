export type Job = {
  name: string;
  cadence: string;
  detail: string;
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

export const snapshotDate = "October 1, 2026";

export const operatingStats = {
  agents: 9,
  routines: 33,
  macJobs: 5,
  chats: 1,
} as const;

export const agents: Agent[] = [
  {
    id: "main",
    lane: "Main",
    name: "Lebot James",
    title: "Conductor",
    detail:
      "Triages requests, routes work to the right specialist, and handles side projects and the morning newsletter.",
    owns: [
      "First stop for a new ask — route it to the right specialist.",
      "Side projects and anything that does not already have an owner.",
      "The morning newsletter.",
    ],
    chatRoutines: [
      {
        name: "Morning newsletter",
        cadence: "Daily, pre-dawn",
        detail: "A short morning read, ready before the day starts.",
      },
      {
        name: "Weekly failure review",
        cadence: "Sunday",
        detail: "Looks back at anything that failed during the week.",
      },
    ],
    macJobs: [],
  },
  {
    id: "work",
    lane: "Work",
    name: "Eddie Morra",
    title: "Property operations",
    detail:
      "Owns AppFolio workflows, occupancy, renewals, the tenant directory, and operating reports.",
    owns: [
      "Occupancy, renewals, and the next action on every unit.",
      "The morning property briefing.",
      "A current tenant directory.",
    ],
    chatRoutines: [
      {
        name: "Morning digest",
        cadence: "Daily",
        detail: "One property briefing before the workday starts.",
      },
      {
        name: "Tenant directory refresh",
        cadence: "Daily",
        detail: "Keeps the tenant roster current.",
      },
      {
        name: "Occupancy report",
        cadence: "Sunday",
        detail: "Where every unit stands, every Sunday.",
      },
      {
        name: "Monday sweep",
        cadence: "Weekly",
        detail: "Start-of-week pass over open property items.",
      },
      {
        name: "Lease renewal pipeline",
        cadence: "Monday",
        detail: "Who's coming due and what to offer.",
      },
    ],
    macJobs: [],
  },
  {
    id: "lyra",
    lane: "Lyra",
    name: "Lyra",
    title: "Leasing + resident line",
    detail: "Leasing, resident calls and texts, and quality checks on the 24/7 line.",
    owns: [
      "The 24/7 voice and text line for leasing and maintenance.",
      "Routine leasing answers; anything about money, a lease, or the law waits for a person.",
      "Keeping Lyra’s property facts current.",
    ],
    chatRoutines: [
      {
        name: "Call + text QA",
        cadence: "Twice daily",
        detail: "Reviews recent calls and texts for quality.",
      },
      {
        name: "Message reply digest",
        cadence: "3× daily",
        detail: "Rounds up messages that need a reply.",
      },
      {
        name: "Urgent message scan",
        cadence: "Every 15 min, daytime",
        detail: "Flags anything urgent so it is never stuck.",
      },
      {
        name: "Email pipeline watchdog",
        cadence: "Hourly",
        detail: "Makes sure leasing email keeps flowing.",
      },
      {
        name: "Improvement drafts",
        cadence: "Twice daily",
        detail: "Drafts fixes to Lyra’s answers for review.",
      },
    ],
    macJobs: [
      {
        name: "Knowledge sync",
        cadence: "Weekly",
        detail: "Refreshes what Lyra knows about each property.",
      },
    ],
  },
  {
    id: "maintenance",
    lane: "Maintenance",
    name: "Rocky",
    title: "Maintenance + turns",
    detail:
      "Owns work-order history, the daily vendor sheets, and the unit turn board.",
    owns: [
      "Work-order history and a daily sheet of open work for each vendor.",
      "The unit turn board: each turning unit’s checklist.",
      "Seasonal move-in jobs, paused off-season.",
    ],
    chatRoutines: [
      {
        name: "Turn board digest",
        cadence: "Daily, morning",
        detail: "Where every turning unit stands.",
      },
      {
        name: "Work-order history sync",
        cadence: "Monday",
        detail: "Refreshes the long-term maintenance record.",
      },
    ],
    macJobs: [
      {
        name: "AppFolio sync",
        cadence: "Daily, pre-dawn",
        detail: "Pulls open work orders and sorts them by vendor.",
      },
    ],
  },
  {
    id: "collections",
    lane: "Collections",
    name: "Tony Montana",
    title: "Late rent + payment plans",
    detail:
      "Prepares late-rent reports, payment-plan follow-up, balance summaries, and property financial snapshots.",
    owns: [
      "Late rent, payment plans, and who needs a follow-up.",
      "The week’s property finances in one note.",
      "Every outbound money notice still waits for a person.",
    ],
    chatRoutines: [
      {
        name: "Daily rent roll",
        cadence: "Daily",
        detail: "Who has paid and who has not.",
      },
      {
        name: "Delinquency report",
        cadence: "Monday",
        detail: "Late rent, payment plans, and follow-ups.",
      },
      {
        name: "P&L summary",
        cadence: "Friday",
        detail: "The week's property finances in one note.",
      },
    ],
    macJobs: [],
  },
  {
    id: "finance",
    lane: "Finance",
    name: "Michael Burry",
    title: "Trading research (paused)",
    detail: "Market research lane. Paused — no routines are running.",
    owns: ["Nothing scheduled while the lane is paused."],
    chatRoutines: [],
    macJobs: [],
  },
  {
    id: "ops",
    lane: "Ops",
    name: "Guardian Zero",
    title: "System health",
    detail:
      "Watches connections, schedules, credentials, backups, and failures so the operations center can report on itself.",
    owns: [
      "Keep the studio Mac signed in, backed up, and talking to the outside world.",
      "Sort inbound mail so leasing replies can be prepared.",
      "Re-run missed jobs and retry anything that did not send the first time.",
    ],
    chatRoutines: [
      {
        name: "Credential monitor",
        cadence: "Daily",
        detail: "Warns before Google access quietly expires.",
      },
      {
        name: "Browser profile monitor",
        cadence: "Every 6 hours",
        detail: "Keeps the automation browser signed in and healthy.",
      },
      {
        name: "Weekly backup",
        cadence: "Sunday, pre-dawn",
        detail: "Full backup of the operations workspace.",
      },
      {
        name: "Approval re-ping",
        cadence: "Monday",
        detail: "Nudges any approval still waiting on a person.",
      },
      {
        name: "Missed-job re-run",
        cadence: "Every 20 min",
        detail: "Re-runs any scheduled job that missed its slot.",
      },
      {
        name: "Power check",
        cadence: "Nightly",
        detail: "Makes sure the Mac is plugged in for overnight work.",
      },
      {
        name: "Voice-line spend watch",
        cadence: "Daily",
        detail: "Keeps an eye on what the voice line costs.",
      },
    ],
    macJobs: [
      {
        name: "Email pipeline",
        cadence: "Every 5 min",
        detail: "Gmail triage, alerts, and leasing reply drafts.",
      },
      {
        name: "Delivery retry",
        cadence: "Every 2 min",
        detail: "Retries messages that didn't send the first time.",
      },
    ],
  },
  {
    id: "memory",
    lane: "Memory",
    name: "Archive Monk",
    title: "Shared knowledge",
    detail:
      "Maintains daily logs, long-term memory, the planning wiki, and the lessons that every coding lane can reuse.",
    owns: [
      "Write down what happened today so tomorrow’s work starts from the truth.",
      "Turn new notes into shared project pages.",
      "Keep Lyra’s property knowledge in step with the week’s changes.",
    ],
    chatRoutines: [
      {
        name: "Daily log writer",
        cadence: "Nightly",
        detail: "Writes the day's events to long-term memory.",
      },
      {
        name: "Wiki synthesize",
        cadence: "Daily",
        detail: "Turns new notes into shared project pages.",
      },
      {
        name: "Nightly curator",
        cadence: "Nightly",
        detail: "Files the day's useful facts into the shared map.",
      },
      {
        name: "Nightly wiki save",
        cadence: "Nightly",
        detail: "Saves the day's wiki changes.",
      },
      {
        name: "Weekly review",
        cadence: "Friday",
        detail: "Distills the week into lessons worth keeping.",
      },
      {
        name: "Tenant wiki ingest",
        cadence: "Sunday",
        detail: "Folds the week's changes into Lyra's knowledge base.",
      },
      {
        name: "Weekly wiki review",
        cadence: "Sunday",
        detail: "Sunday pass over the week's curated notes.",
      },
      {
        name: "Stale-page re-read",
        cadence: "Sunday",
        detail: "Re-reads pages that have not been checked in a while.",
      },
      {
        name: "Wiki verify",
        cadence: "Monday",
        detail: "Checks the shared map still matches the live system.",
      },
    ],
    macJobs: [
      {
        name: "Wiki memory watcher",
        cadence: "Hourly",
        detail: "Indexes new notes into the shared knowledge base.",
      },
    ],
  },
  {
    id: "tweeter",
    lane: "Tweeter",
    name: "Tweeter",
    title: "X research (paused)",
    detail: "X research lane. Paused — no routines are running.",
    owns: ["Nothing scheduled while the lane is paused."],
    chatRoutines: [],
    macJobs: [],
  },
];

const routineCount = agents.reduce((sum, agent) => sum + agent.chatRoutines.length, 0);
const macJobCount = agents.reduce((sum, agent) => sum + agent.macJobs.length, 0);

if (routineCount !== operatingStats.routines || macJobCount !== operatingStats.macJobs) {
  throw new Error(
    `operating-map counts drifted: ${routineCount} routines, ${macJobCount} Mac jobs`,
  );
}
