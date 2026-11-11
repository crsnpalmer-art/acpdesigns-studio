// Public copy for the Systems page of the ACP Designs Studio site.
// First-person studio voice ("I"/"me"), written for a property owner, not an engineer:
// say what each automation does and where a person steps in. Tool and model names
// stay in the short "Under the hood" section. No private identifiers or contact details.

import { numberWord, operatingStats } from "./operating-map";

const specialists = numberWord(operatingStats.agents);

export const requestLoop = [
  { step: "01", title: "Something comes in", detail: "A call, a text, an email, a scheduled job, or a request from me." },
  { step: "02", title: "It gets routed", detail: "The dispatcher hands it to the specialist who handles that kind of work." },
  { step: "03", title: "The work gets done", detail: "A reply is drafted, a report is built, a list is updated." },
  { step: "04", title: "I approve the risky part", detail: "Anything about money, a lease, or the law waits for my yes." },
];

export const workflows = [
  {
    id: "lyra-call",
    label: "Leasing and maintenance calls",
    summary:
      "Someone calls or texts the leasing line, day or night. Lyra answers, works out whether it is a prospect or a resident, checks what is available, and takes down the request. A tour request or a maintenance issue lands in my chat with the whole conversation attached.",
    steps: ["Call or text comes in", "Lyra answers", "Request is captured", "It lands in my chat"],
    human: "I confirm tours and decide who gets sent out.",
  },
  {
    id: "emergency-call",
    label: "Emergency calls",
    summary:
      "If a caller describes an emergency, such as water, no heat, or a safety problem, the call skips the line. I get a loud alert in chat and a text message at the same moment. Nothing is dispatched automatically.",
    steps: ["Caller describes the problem", "Emergency is recognized", "Alert and text reach me"],
    human: "I decide what happens next, every time.",
  },
  {
    id: "gmail-watcher",
    label: "Inbox sorting",
    summary:
      "Six property inboxes are checked every five minutes. Each new email is sorted into leasing, maintenance, payments, owner accounting, or noise, and sent to the specialist who handles it. Leasing questions get a reply drafted right away.",
    steps: ["New email arrives", "It is sorted", "The right specialist gets it", "A reply is drafted"],
    human: "Routine leasing replies can send once they pass a checker. I approve the rest.",
  },
  {
    id: "appfolio-sync",
    label: "Daily work orders",
    summary:
      "Every morning at 6:05 the system downloads the day's open work orders from AppFolio and builds one clean sheet for each vendor, with a summary page on top. Each vendor sees exactly what is theirs.",
    steps: ["6:05 AM download", "Sorted by vendor", "One sheet per vendor", "Summary page on top"],
    human: "If AppFolio asks for a security code, it messages me for it.",
  },
  {
    id: "morning-digest",
    label: "The morning digest",
    summary:
      "By 8:30 I have one message with the day's picture: occupancy, open work orders, what is waiting on my approval, late rent, and anything that broke overnight. It only lists what is new since yesterday.",
    steps: ["Overnight numbers gathered", "One card is built", "It arrives at 8:30 AM"],
    human: "I read it and act on what matters.",
  },
  {
    id: "rent-renewals",
    label: "Late rent and renewals",
    summary:
      "Every Monday the system lists who is past due, grouped by how serious it is, and flags the leases coming up for renewal in 30, 60, and 90 days. Friday brings a one-note snapshot of the week's collections.",
    steps: ["Monday late-rent report", "Monday renewal list", "Friday collections snapshot"],
    human: "Every notice about money waits for my approval.",
  },
  {
    id: "unit-turns",
    label: "Unit turns",
    summary:
      "When a unit is turning over, it gets its own checklist. Each morning at 6:45 the turn board shows which units are in progress and what is left on each one.",
    steps: ["Unit starts turning", "Checklist is created", "Turn board at 6:45 AM"],
    human: "I set the priorities. The board keeps score.",
  },
  {
    id: "cron-approval",
    label: "Messages that need a yes",
    summary:
      "When a scheduled job writes something sensitive, like a late-rent notice or a vendor email, it stops and shows me the draft. I approve it, edit it, or skip it. Anything I have not answered gets a reminder on Monday.",
    steps: ["Job writes a draft", "Draft waits in chat", "I approve, edit, or skip", "Only then it sends"],
    human: "Nothing sensitive goes out without me.",
  },
  {
    id: "self-care",
    label: "The system looks after itself",
    summary:
      "Jobs missed while the Mac was asleep are run again. Logins are checked through the day, spending is checked every morning, and everything is backed up weekly. Each night the system writes down what happened so tomorrow starts from the facts.",
    steps: ["Missed jobs re-run", "Logins and spending checked", "Weekly backup", "Nightly log"],
    human: "I only hear about it when something needs me.",
  },
];

export const requestPath = [
  {
    id: "trigger",
    label: "Starts",
    headline: "Work shows up from one of five places.",
    body: "A scheduled job, a phone call or text to Lyra, a new email, a message from me, or the daily download from AppFolio.",
  },
  {
    id: "gateway",
    label: "Routed",
    headline: "It goes to whoever handles it.",
    body: `One dispatcher sends each piece of work to the right one of ${specialists} specialists. If the system stops, it restarts itself, and anything missed is run again within 20 minutes.`,
  },
  {
    id: "agent",
    label: "Handled",
    headline: "A specialist picks it up.",
    body: "Leasing, the phone line, maintenance, collections, record-keeping, or system upkeep. Each one knows its own part of the business.",
  },
  {
    id: "tools",
    label: "Checked",
    headline: "It works from the real records.",
    body: "Work orders and occupancy come from AppFolio. Email comes from the property inboxes. Vacancies come from the live availability sheet. Nothing is guessed.",
  },
  {
    id: "approval",
    label: "Approved",
    headline: "Risky moves stop and ask me.",
    body: "Simple, factual replies can go out on their own. Anything about accounts, money, legal issues, or work orders waits for my approval in chat. Work orders are never posted to AppFolio automatically, even in an emergency.",
  },
  {
    id: "logged",
    label: "Recorded",
    headline: "Every run leaves a record.",
    body: "A message in chat, a log entry, an updated sheet. The day's work is written down each night, so the next job starts with the full story.",
  },
];

export const lyra = {
  intro:
    "Lyra answers my leasing line by voice and by text, around the clock. She knows the properties, checks what is actually available, and takes down requests the way a good front-desk person would. She has been live since April 2026.",
  tools: [
    { name: "Recognize the caller", detail: "Match a call to a resident by phone number or name." },
    { name: "Confirm who they are", detail: "Verify identity before sharing anything about an account." },
    { name: "Check availability", detail: "Look up real vacancies for the dates someone asks about." },
    { name: "Take a tour request", detail: "Capture the property and time, and send it to me." },
    { name: "Remember earlier calls", detail: "Pull up prior conversations so nobody has to start over." },
    { name: "Raise an emergency", detail: "Alert me in chat and by text at the same moment." },
    { name: "Hand off to a person", detail: "Transfer the call to me with a short briefing first." },
  ],
  boundaries: [
    "She never places outbound calls. Texts go out only as replies, one text back after a missed call, or a safe follow-up.",
    "Every call is logged automatically, with the conversation attached.",
    "Tours and leasing requests are captured and queued. Nothing is promised without me.",
    "Maintenance issues are written up. Who gets sent out is my decision.",
    "Rent, payments, legal questions, and evictions are flagged and passed to me.",
  ],
  phases: [
    { label: "April 2026", detail: "Live on the phone: caller verification, real availability, the emergency alert, and call history." },
    { label: "Then", detail: "Handing a call to a person, plus a review of recent calls twice a day." },
    { label: "September 2026", detail: "Two-way texting on the same number. A missed call gets one text back." },
  ],
};

export const knowledge = {
  plainEnglish:
    "The AI team shares a notebook. They read it before they start and write in it when they finish. It is plain text on my Mac, so I can read every page myself. Each week the system checks the notebook against what is really happening and fixes anything out of date.",
  parts: [
    {
      title: "The team notebook",
      label: "How the work gets done",
      body:
        "A page for each part of the system, a running list of decisions, step-by-step guides for recurring fixes, and a short summary that is rewritten every week.",
      bullets: ["Project pages", "Decisions", "How-to guides", "Weekly summary"],
    },
    {
      title: "What Lyra knows",
      label: "Updated weekly and on request",
      body:
        "Property rules, vacancies, lease policies, and common resident questions. It is refreshed every week, and the same day whenever I approve a change, so Lyra answers from today's rules.",
      bullets: ["Property rules", "Vacancies", "Lease policies", "Resident questions"],
    },
  ],
  why: [
    { title: "Everyone works from the same facts", body: "Every specialist reads the same pages, so they do not contradict each other." },
    { title: "It corrects itself", body: "A weekly check compares the notebook with the live system and flags anything stale." },
    { title: "I can read all of it", body: "Nothing is hidden inside a tool. Every page opens like a normal note." },
  ],
};

export const guardrails: string[] = [
  "Simple, factual replies (property facts, how-tos) can go out automatically after passing a safety check. Anything about accounts, money, legal issues, or work orders waits for my approval in chat.",
  "Scheduled jobs cannot take risky actions at all.",
  "No work order is ever posted to AppFolio automatically, even for an emergency.",
  "Public pages show summaries only: no resident names, units, balances, or messages.",
  "When the notebook and the live system disagree, the live system wins.",
];

export const underTheHood = {
  models: [
    {
      id: "claude",
      name: "Anthropic Claude",
      role: "Day-to-day thinking",
      blurb: "Runs the dispatcher, leasing, Lyra's text replies, collections, and record-keeping.",
    },
    {
      id: "codex",
      name: "OpenAI",
      role: "Upkeep and backup",
      blurb: "Runs maintenance and system upkeep, and takes over if Claude is unavailable.",
    },
    {
      id: "grok",
      name: "xAI Grok",
      role: "Research",
      blurb: "Handles quick research and web searches when I ask.",
    },
    {
      id: "elevenlabs",
      name: "ElevenLabs",
      role: "Lyra's voice",
      blurb: "The voice callers hear on the leasing line.",
    },
  ],
  tools: [
    { category: "Where I talk to it", name: "Telegram", blurb: "One private group chat. Each specialist has its own thread, and approvals happen here." },
    { category: "Property records", name: "AppFolio", blurb: "Residents, occupancy, work orders, vendors, and accounting." },
    { category: "Email and sheets", name: "Google Workspace", blurb: "Six property inboxes, the availability sheet, and the unit turn board." },
    { category: "Phone and texting", name: "Twilio", blurb: "Lyra's phone number and two-way texting." },
    { category: "Business texts", name: "iMessage", blurb: "A digest of business texts and a watch for urgent ones." },
    { category: "Where it runs", name: "One Mac", blurb: "Everything runs on a single Mac in the studio, not a rented server farm." },
  ],
};

export const offPage: { title: string; detail: string }[] = [
  { title: "Resident and owner information", detail: "Names, balances, lease terms, payment plans, and anything tied to a real person." },
  { title: "Addresses and unit details", detail: "Specific units, floor plans, and building-level private details." },
  { title: "Phone numbers and inboxes", detail: "The property email addresses, chat groups, and the numbers that receive alerts." },
  { title: "Passwords and keys", detail: "Every login and access key the system uses stays on the studio Mac." },
];
