"use client";

import { useState } from "react";
import {
  ArrowRightIcon,
  BrainIcon,
  BuildingsIcon,
  CalendarDotsIcon,
  ChatCircleDotsIcon,
  CheckCircleIcon,
  CirclesThreePlusIcon,
  ClockCountdownIcon,
  CurrencyDollarIcon,
  DatabaseIcon,
  EnvelopeSimpleIcon,
  GitMergeIcon,
  HardDrivesIcon,
  LockKeyIcon,
  PhoneCallIcon,
  ShieldCheckIcon,
  TrendUpIcon,
  XLogoIcon,
} from "@phosphor-icons/react";
import styles from "./HermesExplainer.module.css";

const views = [
  { id: "fleet", label: "The fleet" },
  { id: "schedule", label: "The schedule" },
  { id: "approval", label: "Approval gates" },
  { id: "memory", label: "Memory + review" },
] as const;

type ViewId = (typeof views)[number]["id"];

const agents = [
  {
    id: "main",
    lane: "Main",
    name: "Lebot James",
    title: "Conductor",
    detail: "Triages requests, routes work to specialists, handles general tasks, email digests, and side projects.",
    icon: CirclesThreePlusIcon,
  },
  {
    id: "work",
    lane: "Work",
    name: "Eddie Morra",
    title: "Property operations",
    detail: "Owns AppFolio workflows, occupancy, renewals, operating reports, and review-ready business message drafts.",
    icon: BuildingsIcon,
  },
  {
    id: "sarah",
    lane: "Sarah",
    name: "Sarah",
    title: "Leasing + intake",
    detail: "Handles leasing inquiries, maintenance intake, and quality checks for the phone-based voice assistant.",
    icon: PhoneCallIcon,
  },
  {
    id: "collections",
    lane: "Collections",
    name: "Collections Desk",
    title: "Late rent + payment plans",
    detail: "Prepares late-rent reports, payment-plan follow-up, balance summaries, and property financial snapshots.",
    icon: CurrencyDollarIcon,
  },
  {
    id: "finance",
    lane: "Finance",
    name: "Michael Burry",
    title: "Trading research",
    detail: "Runs market scans, reviews signals, keeps research organized, and puts every possible trade behind approval.",
    icon: TrendUpIcon,
  },
  {
    id: "ops",
    lane: "Ops",
    name: "Guardian Zero",
    title: "System health",
    detail: "Watches connections, schedules, credentials, backups, and failures so the operations center can report on itself.",
    icon: ShieldCheckIcon,
  },
  {
    id: "memory",
    lane: "Memory",
    name: "Archive Monk",
    title: "Shared knowledge",
    detail: "Maintains daily logs, long-term memory, the planning wiki, and the lessons that every coding lane can reuse.",
    icon: BrainIcon,
  },
  {
    id: "tweeter",
    lane: "Tweeter",
    name: "Tweeter",
    title: "X research",
    detail: "Runs X research and market scans with the tool best suited to that source.",
    icon: XLogoIcon,
  },
] as const;

const chatRoutines = [
  {
    group: "Main lane",
    jobs: [
      ["Turnover board sync", "Every 5 min", "Keeps student move-in and paint/clean boards current."],
      ["Failure watchdog", "Daily", "Checks that every other scheduled job actually ran."],
    ],
  },
  {
    group: "Property (Work lane)",
    jobs: [
      ["Morning digest", "Daily", "One property briefing before the workday starts."],
      ["Sarah call QA", "Nightly", "Reviews the day's voice-agent calls for quality."],
      ["Business text ping", "3× weekdays", "Flags new work texts that need attention."],
      ["Business text drafts", "Weekday mornings", "Drafts replies to work texts for approval."],
      ["Occupancy report", "Weekly", "Where every unit stands, every Sunday."],
      ["Tenant directory refresh", "Weekly", "Keeps the tenant roster current."],
      ["Monday sweep", "Weekly", "Start-of-week pass over open property items."],
      ["Lease renewal pipeline", "Weekly", "Who's coming due and what to offer."],
      ["Work-order history sync", "Monthly", "Refreshes the long-term maintenance record."],
    ],
  },
  {
    group: "Collections lane",
    jobs: [
      ["Delinquency report", "Monday", "Late rent, payment plans, and follow-ups."],
      ["P&L summary", "Friday", "The week's property finances in one note."],
    ],
  },
  {
    group: "Finance lane",
    jobs: [
      ["Market scan", "3× weekdays", "Research sweep of watched tickers."],
      ["End-of-day review", "Weekdays", "What the research got right and wrong today."],
      ["Research vault commit", "Nightly", "Saves the day's research history."],
    ],
  },
  {
    group: "Memory lane",
    jobs: [
      ["Daily log writer", "Nightly", "Writes the day's events to long-term memory."],
      ["Weekly review", "Friday", "Distills the week into lessons worth keeping."],
      ["Tenant wiki ingest", "Weekly", "Folds the week's changes into Sarah's knowledge base."],
    ],
  },
  {
    group: "Tweeter lane",
    jobs: [["X research scan", "3× weekdays", "Market and research sweep on X."]],
  },
];

const backgroundJobs = [
  {
    group: "Property data",
    jobs: [
      ["AppFolio sync", "Daily, pre-dawn", "Pulls fresh property data before the workday."],
      ["Browser profile monitor", "Every 6 hours", "Keeps the automation browser signed in and healthy."],
    ],
  },
  {
    group: "Email",
    jobs: [["Email pipeline", "Every 5 min", "Gmail triage, alerts, and leasing reply drafts."]],
  },
  {
    group: "Sarah",
    jobs: [
      ["Emergency queue drain", "Every 5 min", "Makes sure urgent maintenance calls are never stuck."],
      ["Knowledge sync", "Weekly", "Refreshes what the voice agent knows about each property."],
    ],
  },
  {
    group: "Trading",
    jobs: [
      ["Auth heartbeat", "4× daily", "Confirms broker access is alive before it's needed."],
      ["Signal rescore", "Every 5 min", "Refreshes market signal scores through the day."],
      ["Approved-trade executor", "Market hours", "Carries out only trades Carson already approved."],
      ["Stop-level monitor", "Market hours", "Watches exit levels on open positions."],
      ["Watchlist sync", "Nightly", "Updates the next day's watchlist."],
      ["Heartbeat summary", "Daily", "One end-of-day note on system activity."],
      ["Dashboard publish", "Hourly, market hours", "Refreshes the private trading dashboard."],
    ],
  },
  {
    group: "Operations + memory",
    jobs: [
      ["Approval re-ping", "Daily", "Nudges any property approval still waiting on a human."],
      ["Vendor follow-up", "Mon / Wed / Fri", "Chases open vendor work so it doesn't stall."],
      ["Credential monitor", "Weekly", "Warns before Google access quietly expires."],
      ["Wiki memory watcher", "Continuous", "Indexes new notes into the shared knowledge base."],
      ["Wiki verify", "Weekly", "Checks the shared map still matches the live system."],
      ["Weekly backup", "Sunday, pre-dawn", "Full backup of the operations workspace."],
    ],
  },
];

export default function HermesExplainer() {
  const [view, setView] = useState<ViewId>("fleet");
  const [agentId, setAgentId] = useState<(typeof agents)[number]["id"]>("main");
  const selectedAgent = agents.find((agent) => agent.id === agentId) ?? agents[0];
  const SelectedIcon = selectedAgent.icon;

  return (
    <section id="hermes" className={styles.hermes} aria-labelledby="hermes-title">
      <header className={styles.intro}>
        <div>
          <p>System map · Hermes</p>
          <h2 id="hermes-title">Eight specialists.<br />One operating center.</h2>
        </div>
        <p className={styles.lead}>
          A self-hosted AI team running on one Mac: property operations, leasing,
          collections, research, system health, and memory—coordinated through chat
          and stopped by a human gate before anything leaves the system.
        </p>
      </header>

      <dl className={styles.stats} aria-label="Hermes public snapshot">
        <div><dt>08</dt><dd>Specialized agents</dd></div>
        <div><dt>20</dt><dd>Scheduled routines</dd></div>
        <div><dt>18</dt><dd>Local background jobs</dd></div>
        <div><dt>01</dt><dd>Private chat workspace</dd></div>
      </dl>

      <div className={styles.explorer}>
        <div className={styles.tabs} role="tablist" aria-label="Explore the Hermes system">
          {views.map((item, index) => (
            <button
              id={`hermes-tab-${item.id}`}
              key={item.id}
              type="button"
              role="tab"
              aria-controls="hermes-active-panel"
              aria-selected={view === item.id}
              tabIndex={view === item.id ? 0 : -1}
              onClick={() => setView(item.id)}
              onKeyDown={(event) => {
                if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
                event.preventDefault();
                const nextIndex = event.key === "Home"
                  ? 0
                  : event.key === "End"
                    ? views.length - 1
                    : (index + (event.key === "ArrowRight" ? 1 : -1) + views.length) % views.length;
                const nextView = views[nextIndex];
                setView(nextView.id);
                requestAnimationFrame(() => document.getElementById(`hermes-tab-${nextView.id}`)?.focus());
              }}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>{item.label}
            </button>
          ))}
        </div>

        <div
          id="hermes-active-panel"
          className={styles.panel}
          role="tabpanel"
          aria-labelledby={`hermes-tab-${view}`}
          key={view}
        >
          {view === "fleet" && (
            <div className={styles.fleetView}>
              <div className={styles.fleetMap}>
                <div className={styles.chatHub}>
                  <ChatCircleDotsIcon aria-hidden="true" />
                  <span>One private Telegram group</span>
                  <strong>Ask once. Route to the right lane.</strong>
                </div>
                <div className={styles.agentGrid} aria-label="Eight Hermes agents">
                  {agents.map((agent) => {
                    const AgentIcon = agent.icon;
                    return (
                      <button
                        key={agent.id}
                        type="button"
                        aria-pressed={agentId === agent.id}
                        onClick={() => setAgentId(agent.id)}
                      >
                        <AgentIcon aria-hidden="true" />
                        <span>{agent.lane}</span>
                        <strong>{agent.name}</strong>
                        <small>{agent.title}</small>
                      </button>
                    );
                  })}
                </div>
              </div>
              <aside className={styles.agentDetail} aria-live="polite">
                <SelectedIcon aria-hidden="true" />
                <p>{selectedAgent.lane} lane</p>
                <h3>{selectedAgent.name}</h3>
                <strong>{selectedAgent.title}</strong>
                <span>{selectedAgent.detail}</span>
                <small>Runs on the AI that best fits the job.</small>
              </aside>
            </div>
          )}

          {view === "schedule" && (
            <div className={styles.scheduleView}>
              <article>
                <div className={styles.viewHeading}>
                  <ClockCountdownIcon aria-hidden="true" />
                  <span>Layer 01 · 20 routines</span>
                  <h3>Recurring chat routines</h3>
                  <p>Scheduled work that reports back to the right private chat.</p>
                </div>
                {chatRoutines.map((section) => (
                  <div className={styles.scheduleGroup} key={section.group}>
                    <p>{section.group}</p>
                    <ol>
                      {section.jobs.map(([name, cadence, job]) => (
                        <li key={name}>
                          <strong>{name}</strong>
                          <em>{cadence}</em>
                          <span>{job}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                ))}
              </article>
              <article>
                <div className={styles.viewHeading}>
                  <HardDrivesIcon aria-hidden="true" />
                  <span>Layer 02 · 18 jobs</span>
                  <h3>Local background jobs</h3>
                  <p>Small local programs gather data, watch health, and keep the work grounded.</p>
                </div>
                {backgroundJobs.map((section) => (
                  <div className={styles.scheduleGroup} key={section.group}>
                    <p>{section.group}</p>
                    <ol>
                      {section.jobs.map(([name, cadence, job]) => (
                        <li key={name}>
                          <strong>{name}</strong>
                          <em>{cadence}</em>
                          <span>{job}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                ))}
              </article>
              <p className={styles.scheduleNote}>
                Snapshot verified July 18, 2026, against the live system. One-off reminders come and go as needed
                and aren&apos;t listed. Names are public-friendly; private IDs and paths stay private.
              </p>
            </div>
          )}

          {view === "approval" && (
            <div className={styles.approvalView}>
              <div className={styles.approvalFlow}>
                <article>
                  <EnvelopeSimpleIcon aria-hidden="true" />
                  <span>01 · Draft</span>
                  <h3>The system prepares the work.</h3>
                  <p>Leasing replies, business texts, family messages, and trade ideas get a review ID.</p>
                </article>
                <ArrowRightIcon aria-hidden="true" />
                <article className={styles.humanGate}>
                  <LockKeyIcon aria-hidden="true" />
                  <span>02 · Human gate</span>
                  <h3>Approve, edit, or skip.</h3>
                  <p>Nothing outbound moves until Carson makes the decision.</p>
                </article>
                <ArrowRightIcon aria-hidden="true" />
                <article>
                  <CheckCircleIcon aria-hidden="true" />
                  <span>03 · Act</span>
                  <h3>One narrow action runs.</h3>
                  <p>The approved message sends—or the approved trade executes—with a receipt.</p>
                </article>
              </div>
              <p className={styles.policyNote}>
                Research and internal reporting can run alone. Anything that touches another
                person or an account stops at the written autonomy policy.
              </p>
            </div>
          )}

          {view === "memory" && (
            <div className={styles.memoryView}>
              <article>
                <DatabaseIcon aria-hidden="true" />
                <span>Shared source</span>
                <h3>Planning wiki</h3>
                <p>Project pages, playbooks, and decisions give every AI one shared, up-to-date notebook.</p>
              </article>
              <article>
                <BrainIcon aria-hidden="true" />
                <span>Lane context</span>
                <h3>Agent memory</h3>
                <p>Each specialist keeps focused memory plus nightly logs from the Memory lane.</p>
              </article>
              <article>
                <GitMergeIcon aria-hidden="true" />
                <span>Quality loop</span>
                <h3>Second-pair-of-eyes review</h3>
                <p>Claude, Codex, and Cursor work in separate lanes; a different AI reviews the result.</p>
              </article>
              <div className={styles.memoryLoop}>
                <CalendarDotsIcon aria-hidden="true" />
                <p><strong>Observe → review → distill → reuse.</strong> Weekly verification keeps the shared map from drifting away from the live system.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <footer className={styles.dayStrip}>
        <div><span>Before I wake</span><p>Property data syncs. The morning digest waits.</p></div>
        <div><span>Through the day</span><p>New work becomes a draft, alert, or routed specialist task.</p></div>
        <div><span>My part</span><p>Read the signal. Type APPROVE when the work is right.</p></div>
        <small><ShieldCheckIcon aria-hidden="true" />Public map. Private IDs, paths, and topic numbers omitted.</small>
      </footer>
    </section>
  );
}
