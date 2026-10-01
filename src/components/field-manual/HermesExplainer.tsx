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
  CurrencyDollarIcon,
  DatabaseIcon,
  EnvelopeSimpleIcon,
  GitMergeIcon,
  LockKeyIcon,
  PhoneCallIcon,
  ShieldCheckIcon,
  TrendUpIcon,
  WrenchIcon,
  XLogoIcon,
} from "@phosphor-icons/react";
import { agents, operatingStats, snapshotDate, type AgentId } from "@/content/operating-map";
import styles from "./HermesExplainer.module.css";

const views = [
  { id: "fleet", label: "The fleet" },
  { id: "approval", label: "Approval gates" },
  { id: "memory", label: "Memory + review" },
] as const;

type ViewId = (typeof views)[number]["id"];

const icons = {
  main: CirclesThreePlusIcon,
  work: BuildingsIcon,
  lyra: PhoneCallIcon,
  maintenance: WrenchIcon,
  collections: CurrencyDollarIcon,
  finance: TrendUpIcon,
  ops: ShieldCheckIcon,
  memory: BrainIcon,
  tweeter: XLogoIcon,
} as const;

export default function HermesExplainer() {
  const [view, setView] = useState<ViewId>("fleet");
  const [agentId, setAgentId] = useState<AgentId>("main");
  const selectedAgent = agents.find((agent) => agent.id === agentId) ?? agents[0];
  const SelectedIcon = icons[selectedAgent.id];

  return (
    <section id="hermes" className={styles.hermes} aria-labelledby="hermes-title">
      <header className={styles.intro}>
        <div>
          <p>System map · Hermes</p>
          <h2 id="hermes-title">A conductor and eight specialists.<br />One operating center.</h2>
        </div>
        <p className={styles.lead}>
          A self-hosted AI team running on one Mac: property operations, leasing,
          maintenance, collections, system health, and memory—coordinated through chat.
          Routine work can send on its own. Money, leases, and legal still wait for a person.
        </p>
      </header>

      <dl className={styles.stats} aria-label="Hermes public snapshot">
        <div><dt>{String(operatingStats.agents).padStart(2, "0")}</dt><dd>Specialized agents</dd></div>
        <div><dt>{operatingStats.routines}</dt><dd>Scheduled routines</dd></div>
        <div><dt>{String(operatingStats.macJobs).padStart(2, "0")}</dt><dd>Local background jobs</dd></div>
        <div><dt>{String(operatingStats.chats).padStart(2, "0")}</dt><dd>Private chat workspace</dd></div>
      </dl>

      <a className={styles.mapCta} href="/systems">
        <span>Open the operating map</span>
        <small>Every specialist, their chat schedule, and their Mac jobs.</small>
        <ArrowRightIcon aria-hidden="true" />
      </a>

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
                <div className={styles.agentGrid} aria-label="Nine Hermes lanes">
                  {agents.map((agent) => {
                    const AgentIcon = icons[agent.id];
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
                <p className={styles.fleetNote}>
                  The names are nicknames. Nine lanes in one chat window are easier to
                  run when each one answers to something you can say out loud.
                </p>
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

          {view === "approval" && (
            <div className={styles.approvalView}>
              <div className={styles.approvalFlow}>
                <article>
                  <EnvelopeSimpleIcon aria-hidden="true" />
                  <span>01 · Draft</span>
                  <h3>The system prepares the work.</h3>
                  <p>Leasing replies and resident messages get a review ID.</p>
                </article>
                <ArrowRightIcon aria-hidden="true" />
                <article className={styles.humanGate}>
                  <LockKeyIcon aria-hidden="true" />
                  <span>02 · Human gate</span>
                  <h3>Approve, edit, skip — or let a checker send.</h3>
                  <p>Routine leasing replies and simple resident text answers can send when they pass a checker. Money, leases, and legal still wait.</p>
                </article>
                <ArrowRightIcon aria-hidden="true" />
                <article>
                  <CheckCircleIcon aria-hidden="true" />
                  <span>03 · Act</span>
                  <h3>One narrow action runs.</h3>
                  <p>The approved message sends, with a receipt.</p>
                </article>
              </div>
              <p className={styles.policyNote}>
                Research and internal reporting can run alone. Routine messages can send
                when they pass a checker. Anything that touches money, a lease, or the law
                still stops at a person.
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
        <div><span>My part</span><p>Read the signal. Type APPROVE when money, a lease, or the law is on the line.</p></div>
        <small><ShieldCheckIcon aria-hidden="true" />Snapshot {snapshotDate}. Public names only.</small>
      </footer>
    </section>
  );
}
