export type Job = {
  name: string;
  cadence: string;
  detail: string;
};

export type AgentId =
  | "main"
  | "work"
  | "sarah"
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

export const snapshotDate = "August 13, 2026";

export const operatingStats = {
  agents: 8,
  routines: 26,
  macJobs: 19,
  chats: 1,
} as const;

export const agents: Agent[] = [
  {
    id: "main",
    lane: "Main",
    name: "Lebot James",
    title: "Conductor",
    detail:
      "Triages requests, routes work to specialists, handles general tasks, email digests, and side projects.",
    owns: [
      "First stop for a new ask — route it to the right specialist.",
      "Side projects and anything that does not already have an owner.",
      "Student move-in pages and paint/clean turnover boards.",
      "A daily check that the other schedules actually ran.",
    ],
    chatRoutines: [
      {
        name: "Move-in portal updates",
        cadence: "Every 5 min",
        detail: "Keeps each resident’s move-in page current as turns finish.",
      },
      {
        name: "Paint and clean sync",
        cadence: "Daytime",
        detail: "Keeps vendor turnover boards current while crews are working.",
      },
      {
        name: "Turnover health check",
        cadence: "Hourly",
        detail: "Flags stalled paint or clean work before it slips.",
      },
      {
        name: "Move-out form ping",
        cadence: "Every 6 hours",
        detail: "Alerts when a new move-out form arrives.",
      },
      {
        name: "Failure watchdog",
        cadence: "Daily",
        detail: "Checks that every other scheduled job actually ran.",
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
      "Owns AppFolio workflows, occupancy, renewals, operating reports, and review-ready business message drafts.",
    owns: [
      "Occupancy, renewals, and the next action on every unit.",
      "The morning property briefing.",
      "Business-text drafts waiting for a person.",
      "Quality review of the day’s leasing and maintenance calls.",
    ],
    chatRoutines: [
      {
        name: "Morning digest",
        cadence: "Daily",
        detail: "One property briefing before the workday starts.",
      },
      {
        name: "Sarah call QA",
        cadence: "Nightly",
        detail: "Reviews the day's voice-agent calls for quality.",
      },
      {
        name: "Business text ping",
        cadence: "3× weekdays",
        detail: "Flags new work texts that need attention.",
      },
      {
        name: "Business text drafts",
        cadence: "Weekday mornings",
        detail: "Drafts replies to work texts for approval.",
      },
      {
        name: "Occupancy report",
        cadence: "Weekly",
        detail: "Where every unit stands, every Sunday.",
      },
      {
        name: "Tenant directory refresh",
        cadence: "Weekly",
        detail: "Keeps the tenant roster current.",
      },
      {
        name: "Monday sweep",
        cadence: "Weekly",
        detail: "Start-of-week pass over open property items.",
      },
      {
        name: "Lease renewal pipeline",
        cadence: "Weekly",
        detail: "Who's coming due and what to offer.",
      },
      {
        name: "Work-order history sync",
        cadence: "Monthly",
        detail: "Refreshes the long-term maintenance record.",
      },
    ],
    macJobs: [
      {
        name: "AppFolio sync",
        cadence: "Daily, pre-dawn",
        detail: "Pulls fresh property data before the workday.",
      },
      {
        name: "Approval re-ping",
        cadence: "Daily",
        detail: "Nudges any property approval still waiting on a human.",
      },
      {
        name: "Vendor follow-up",
        cadence: "Mon / Wed / Fri",
        detail: "Chases open vendor work so it doesn't stall.",
      },
    ],
  },
  {
    id: "sarah",
    lane: "Sarah",
    name: "Sarah",
    title: "Leasing + intake",
    detail:
      "Handles leasing inquiries, maintenance intake, and quality checks for the phone-based voice assistant.",
    owns: [
      "The 24/7 voice line for leasing and maintenance.",
      "Turning a call into an organized request.",
      "Keeping the voice agent’s property facts current.",
    ],
    chatRoutines: [],
    macJobs: [
      {
        name: "Emergency queue drain",
        cadence: "Every 5 min",
        detail: "Makes sure urgent maintenance calls are never stuck.",
      },
      {
        name: "Knowledge sync",
        cadence: "Weekly",
        detail: "Refreshes what the voice agent knows about each property.",
      },
    ],
  },
  {
    id: "collections",
    lane: "Collections",
    name: "Collections Desk",
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
    title: "Trading research",
    detail:
      "Runs market scans, reviews signals, keeps research organized, and puts every possible trade behind approval.",
    owns: [
      "Research sweeps of watched markets.",
      "A same-day note on what the research got right and wrong.",
      "Every possible trade waits for a person.",
    ],
    chatRoutines: [
      {
        name: "Market scan",
        cadence: "3× weekdays",
        detail: "Research sweep of watched tickers.",
      },
      {
        name: "End-of-day review",
        cadence: "Weekdays",
        detail: "What the research got right and wrong today.",
      },
      {
        name: "Research vault commit",
        cadence: "Nightly",
        detail: "Saves the day's research history.",
      },
    ],
    macJobs: [
      {
        name: "Auth heartbeat",
        cadence: "4× daily",
        detail: "Confirms broker access is alive before it's needed.",
      },
      {
        name: "Signal rescore",
        cadence: "Every 5 min",
        detail: "Refreshes market signal scores through the day.",
      },
      {
        name: "Stop-level monitor",
        cadence: "Market hours",
        detail: "Watches exit levels on open positions.",
      },
      {
        name: "Watchlist sync",
        cadence: "Nightly",
        detail: "Updates the next day's watchlist.",
      },
      {
        name: "Heartbeat summary",
        cadence: "Daily",
        detail: "One end-of-day note on system activity.",
      },
      {
        name: "Dashboard publish",
        cadence: "Hourly, market hours",
        detail: "Refreshes the private trading dashboard.",
      },
    ],
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
      "Sort inbound mail so leasing drafts can be prepared.",
      "Retry anything that did not send the first time.",
    ],
    chatRoutines: [],
    macJobs: [
      {
        name: "Browser profile monitor",
        cadence: "Every 6 hours",
        detail: "Keeps the automation browser signed in and healthy.",
      },
      {
        name: "Email pipeline",
        cadence: "Every 5 min",
        detail: "Gmail triage, alerts, and leasing reply drafts.",
      },
      {
        name: "Email pipeline watchdog",
        cadence: "Continuous",
        detail: "Restarts the mail sorter if it stalls.",
      },
      {
        name: "Credential monitor",
        cadence: "Weekly",
        detail: "Warns before Google access quietly expires.",
      },
      {
        name: "Weekly backup",
        cadence: "Sunday, pre-dawn",
        detail: "Full backup of the operations workspace.",
      },
      {
        name: "Delivery retry",
        cadence: "Continuous",
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
      "Keep Sarah’s property knowledge in step with the week’s changes.",
    ],
    chatRoutines: [
      {
        name: "Daily log writer",
        cadence: "Nightly",
        detail: "Writes the day's events to long-term memory.",
      },
      {
        name: "Wiki synthesize",
        cadence: "Twice daily",
        detail: "Turns new notes into shared project pages.",
      },
      {
        name: "Nightly curator",
        cadence: "Nightly",
        detail: "Files the day's useful facts into the shared map.",
      },
      {
        name: "Weekly review",
        cadence: "Friday",
        detail: "Distills the week into lessons worth keeping.",
      },
      {
        name: "Tenant wiki ingest",
        cadence: "Weekly",
        detail: "Folds the week's changes into Sarah's knowledge base.",
      },
      {
        name: "Weekly wiki review",
        cadence: "Sunday",
        detail: "Sunday pass over the week's curated notes.",
      },
    ],
    macJobs: [
      {
        name: "Wiki memory watcher",
        cadence: "Continuous",
        detail: "Indexes new notes into the shared knowledge base.",
      },
      {
        name: "Wiki verify",
        cadence: "Weekly",
        detail: "Checks the shared map still matches the live system.",
      },
    ],
  },
  {
    id: "tweeter",
    lane: "Tweeter",
    name: "Tweeter",
    title: "X research",
    detail: "Runs X research and market scans with the tool best suited to that source.",
    owns: [
      "Research sweeps on X for the same markets the finance lane watches.",
      "A different source, same rule: nothing trades itself.",
    ],
    chatRoutines: [
      {
        name: "X research scan",
        cadence: "3× weekdays",
        detail: "Market and research sweep on X.",
      },
    ],
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
