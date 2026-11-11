"use client";

import { useState } from "react";
import {
  ArrowRightIcon,
  BrainIcon,
  BuildingsIcon,
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
import { agents, numberWord, operatingStats, snapshotDate, type AgentId } from "@/content/operating-map";
import styles from "./HermesExplainer.module.css";

const views = [
  { id: "fleet", label: "The team" },
  { id: "approval", label: "Where I approve" },
  { id: "memory", label: "How it remembers" },
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
          <p>The AI team · Hermes</p>
          <h2 id="hermes-title">A dispatcher and {numberWord(operatingStats.agents - 1)} specialists.<br />One chat to run them.</h2>
        </div>
        <p className={styles.lead}>
          An AI team that works the property business alongside me. It answers the leasing
          line, sorts the inbox, tracks rent and renewals, lines up maintenance, and writes
          down what happened. Routine work goes out on its own. Money, leases, and legal
          still wait for a person.
        </p>
      </header>

      <dl className={styles.stats} aria-label="Hermes public snapshot">
        <div><dt>{String(operatingStats.agents).padStart(2, "0")}</dt><dd>AI specialists</dd></div>
        <div><dt>{operatingStats.routines}</dt><dd>Jobs on a schedule</dd></div>
        <div><dt>{String(operatingStats.macJobs).padStart(2, "0")}</dt><dd>Always-on helpers</dd></div>
        <div><dt>{String(operatingStats.chats).padStart(2, "0")}</dt><dd>Chat to run it all</dd></div>
      </dl>

      <a className={styles.mapCta} href="/systems">
        <span>See every automation</span>
        <small>What runs on its own, who handles it, and where I step in.</small>
        <ArrowRightIcon aria-hidden="true" />
      </a>

      <div className={styles.explorer}>
        <div className={styles.tabs} role="tablist" aria-label="Explore the AI team">
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
                  <span>One private group chat</span>
                  <strong>I ask once. It goes to the right specialist.</strong>
                </div>
                <div className={styles.agentGrid} aria-label="The specialists">
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
                  The names are nicknames. A team in one chat window is easier to
                  run when each member answers to something you can say out loud.
                </p>
              </div>
              <aside className={styles.agentDetail} aria-live="polite">
                <SelectedIcon aria-hidden="true" />
                <p>{selectedAgent.lane}</p>
                <h3>{selectedAgent.name}</h3>
                <strong>{selectedAgent.title}</strong>
                <span>{selectedAgent.detail}</span>
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
                  <p>Leasing replies and resident messages are written up and held for review.</p>
                </article>
                <ArrowRightIcon aria-hidden="true" />
                <article className={styles.humanGate}>
                  <LockKeyIcon aria-hidden="true" />
                  <span>02 · My decision</span>
                  <h3>Approve, edit, skip — or let a checker send.</h3>
                  <p>Routine leasing replies and simple resident text answers can send when they pass a checker. Money, leases, and legal still wait.</p>
                </article>
                <ArrowRightIcon aria-hidden="true" />
                <article>
                  <CheckCircleIcon aria-hidden="true" />
                  <span>03 · Act</span>
                  <h3>Only that message goes out.</h3>
                  <p>The approved message sends, and a record of it is kept.</p>
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
                <span>Shared by everyone</span>
                <h3>The team notebook</h3>
                <p>Project pages, how-to guides, and decisions give every specialist one shared, up-to-date notebook.</p>
              </article>
              <article>
                <BrainIcon aria-hidden="true" />
                <span>Kept by each one</span>
                <h3>Each specialist&apos;s notes</h3>
                <p>Every specialist keeps notes on its own work, and a log of the day is written each night.</p>
              </article>
              <article>
                <GitMergeIcon aria-hidden="true" />
                <span>Checked twice</span>
                <h3>A second pair of eyes</h3>
                <p>When one AI changes how the system works, a different AI reviews it before it is used.</p>
              </article>
              <div className={styles.memoryLoop}>
                <CheckCircleIcon aria-hidden="true" />
                <p><strong>Watch, review, write it down, reuse.</strong> A weekly check keeps the notebook matching what the system really does.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <p className={styles.snapshot}>
        <ShieldCheckIcon aria-hidden="true" />Checked against the live system on {snapshotDate}. Public names only.
      </p>
    </section>
  );
}
