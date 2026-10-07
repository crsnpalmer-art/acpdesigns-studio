import type { Metadata } from "next";
import FieldManualChrome from "@/components/field-manual/FieldManualChrome";
import Playbook, {
  Callout,
  Card,
  Cards,
  Checklist,
  Code,
  Flow,
  Lead,
  Section,
  TableWrap,
} from "@/components/field-manual/Playbook";

const description =
  "How to build the pattern: a phase plan, the stack in build order, worksheets, the pieces in plain English, and the prompts Carson actually uses.";

export const metadata: Metadata = {
  title: "Playbook: Build | ACP Designs Studio",
  description,
  alternates: {
    canonical: "/systems/playbook/build",
  },
  openGraph: {
    title: "Playbook: Build | ACP Designs Studio",
    description,
    url: "/systems/playbook/build",
    siteName: "ACP Designs Studio",
    type: "article",
  },
};

const operatorPrompt = `Before you write code or take action:
1. State your assumptions explicitly. If uncertain, ask.
2. If multiple interpretations exist, present them — don't pick silently.
3. For non-trivial work (3+ steps or architectural decisions),
   propose an approach and wait for confirmation before editing.
4. If a fix feels hacky, pause and ask "is there a more elegant way?"
5. If something goes sideways, STOP and re-plan — don't keep pushing.

Style:
- Terse. State results directly. No trailing summaries of what
  you just read or did.
- Define success criteria. Verify before claiming done.
- After edits to runnable code: run tests, type-check, or lint
  as appropriate. Don't claim done based on "it looks right."
- Reconcile against LIVE state (files, processes, deployed code),
  not narrative reports.
- On correction passes: retract plainly, don't rationalize.

Don't add features, refactor, or introduce abstractions beyond
what the task requires. Three similar lines is better than a
premature abstraction.`;

const reviewPrompt = `Read the diff/output above. Don't validate it — review it.

Specifically:
- Are there assumptions baked in that could be wrong?
- Is there an edge case the code doesn't handle?
- Is there a simpler way that I'm missing?
- Is anything overcomplicated for the actual task?
- If you were reviewing this for a senior engineer to ship,
  what would you push back on?

Be specific. Quote line numbers. If you'd ship as-is, say
so plainly. Don't soften your critique to be polite.`;

const weeklyPrompt = `Pull the last 7 days of:
  - decisions made (from the decisions log)
  - things that broke (from the ops Telegram channel)
  - cron failures (from launchd logs)
  - any new project pages or playbooks

For each one, answer:
  1. What was the actual outcome? (vs. the intended outcome)
  2. Is there a pattern with previous weeks?
  3. What rule or playbook should be updated as a result?
  4. What's worth telling future-me even if it seems obvious now?

Be honest about what didn't work. Don't summarize for the
sake of summarizing — if a week was uneventful, say so in
one line.

Append the output to wiki/log.md with this week's date.`;

const ingestPrompt = `Read all new files in raw/ that I haven't ingested yet.

For each one, extract:
  - Decisions made (date them, link to source line)
  - Risks identified (separate from decisions)
  - Action items with explicit owners
  - Facts worth remembering (gotchas, working recipes, gotchas about gotchas)

Then for each affected project page in wiki/projects/:
  - Update Current State if it changed
  - Append to Decisions section (don't overwrite history)
  - Add new risks to Risks and Blockers
  - Update Next Checkpoint

Rules:
  - Never delete historical decisions unless I tell you to.
  - If new content contradicts old content, KEEP BOTH and
    mark the contradiction. Add "superseded by" if applicable.
  - Mark uncertain claims as "Status: tentative".
  - Cite source files for every non-trivial claim.

When done, append a timestamped entry to wiki/log.md
summarizing what changed.`;

const guardrailPrompt = `Destructive Action Guardrails:
- Never \`rm -rf\`, \`git reset --hard\`, force-push, drop tables,
  or kill shared processes without explicit confirmation.
- Never skip hooks (--no-verify), bypass signing, or disable
  safety checks as a shortcut.
- Never commit .env, credentials, or token-bearing files.
- If state looks unfamiliar (stray files, unknown branches),
  investigate — don't delete.
- Before running destructive operations, consider whether there
  is a safer alternative. Only use destructive operations when
  they are truly the best approach.
- Approval in one context doesn't extend to the next. Confirm
  before each new destructive action.`;

const planningPrompt = `Don't write code yet. Help me plan.

The task: [DESCRIBE IT]

Walk me through:
  1. What this actually needs to do (re-state in your own words)
  2. The 3-5 main steps, in order
  3. Each step's:
     - Files that need to change
     - What can go wrong
     - How to verify it worked
  4. Risks I'm not thinking about
  5. Questions you have for me before starting

If the task feels under-specified, ask me clarifying
questions instead of guessing.

After I confirm the plan, you can start.`;

const voicePrompt = `You are [NAME], an inbound assistant for [BUSINESS].

Your job:
  - Answer the call warmly. Identify yourself once.
  - Understand what the caller actually needs (not what they
    first say — listen for intent).
  - Use the tools available to look up real information.
  - For anything sensitive (account data, money, legal),
    verify the caller's identity before sharing details.
  - For anything urgent (emergency, safety), use the
    emergency_alert tool immediately, then keep talking
    to the caller.
  - For anything you can't resolve, get the details and
    promise a callback. Don't make commitments on behalf
    of the business.

What you DON'T do:
  - Make pricing exceptions.
  - Promise outcomes you can't deliver.
  - Send messages or take actions the user can't see.
  - Continue trying to "solve" when the caller wants a human.

If the caller is frustrated, acknowledge it directly. Don't
keep offering options when they want escalation.

Always log the call summary at the end with: who, what,
intent, urgency, what I told them, what's outstanding.`;

const genericPrompt = `You are helping me build a local-first workflow operating system for a portfolio management team.

Explain everything in plain language.

The system should have:
- AI model roles for coding, reasoning, classification, retrieval, and review.
- A local control plane like Hermes with agents, tools, approvals, logs, and memory.
- Operating lanes for customer intake, leasing, maintenance, finance, collections, reliability, and memory.
- Software/API connections for our systems of record, inboxes, task tools, voice/SMS tools, dashboards, and documentation.
- Cron-style recurring jobs for agent-owned judgment work.
- LaunchAgent/system-service-style jobs for background polling, syncs, backups, watchdogs, and cleanup.
- Human approval gates before any send, dispatch, payment, legal step, official-record change, deletion, or public action.
- Receipts and logs for every run.

Do not design silent automation.
Start with one workflow in dry-run mode.
Ask me questions until you can produce a build plan, a risk list, and the first workflow card.`;

function PromptCard({ title, children }: { title: string; children: string }) {
  return (
    <Card title={title}>
      <p>
        <code>Prompt:</code> {children}
      </p>
    </Card>
  );
}

export default function PlaybookBuildPage() {
  return (
    <FieldManualChrome
      page="systems"
      skipHref="#playbook-content"
      skipLabel="Skip to the playbook"
      rail={["v1.0", "Playbook", "Build"]}
    >
      <Playbook
        current="build"
        eyebrow="How to build it"
        meta="4 min read"
        title="Build one loop first."
        lead={
          <p>
            The safest way to copy the system is not to automate everything. Pick one painful workflow, make it
            visible, verify it, then widen the pattern.
          </p>
        }
      >
        <Section label="Phase plan" title="Build sequence.">
          <Checklist
            items={[
              <>
                <strong>Phase 1: Inventory.</strong>{" "}List inputs, systems of record, recurring reports, approval points,
                and painful handoffs.
              </>,
              <>
                <strong>Phase 2: Choose one workflow.</strong>{" "}Good first choices are leasing follow-up, daily
                maintenance triage, owner brief prep, or delinquency review.
              </>,
              <>
                <strong>Phase 3: Run dry.</strong>{" "}Let the system classify and draft, but do not let it send, dispatch,
                pay, delete, or change official records.
              </>,
              <>
                <strong>Phase 4: Add receipts.</strong>{" "}Every run should leave proof: source data, draft, decision,
                approval, final action, and log.
              </>,
              <>
                <strong>Phase 5: Add the scheduler.</strong>{" "}Put recurring judgment work on an agent schedule. Put
                boring syncs and health checks in system services.
              </>,
              <>
                <strong>Phase 6: Add memory.</strong>{" "}Write lessons into the playbook so the next run uses the current
                truth instead of old assumptions.
              </>,
              <>
                <strong>Phase 7: Expand lanes.</strong>{" "}Add the next workflow only after the first one is boring,
                visible, and easy to turn off.
              </>,
            ]}
          />
        </Section>

        <Section label="Stack build order" title="Put the pieces in this order.">
          <Flow
            rows={[
              [
                "Models",
                "Pick model roles first: OpenAI/Codex-style coding support, Claude-style reasoning, fast classification, and retrieval/search.",
              ],
              [
                "Control",
                "Add a Hermes-style control plane: agents, tools, gateway, dashboard, approvals, logs, and memory startup.",
              ],
              [
                "Records",
                "Connect systems of record: AppFolio or your property platform, Google Sheets/Docs, accounting exports, and a task manager if you use one.",
              ],
              [
                "Comms",
                "Add communication APIs: Telegram for approvals, Gmail for inbox signals, ElevenLabs/Twilio for voice/SMS intake, and business-text reminders if needed.",
              ],
              [
                "Schedules",
                "Use cron for recurring agent judgment and LaunchAgents/system services for background polling, syncs, watchdogs, backups, and drains.",
              ],
              [
                "Proof",
                "Use browser automation, logs, receipts, screenshots, returned records, and dashboards to prove each run worked.",
              ],
            ]}
          />
        </Section>

        <Section label="Templates" title="Copy these worksheets.">
          <Cards>
            <Card title="Workflow card">
              <p>
                <code>Input:</code>{" "}Where does this start?
              </p>
              <p>
                <code>Owner:</code>{" "}Which lane owns the next step?
              </p>
              <p>
                <code>Context:</code>{" "}What data is needed?
              </p>
              <p>
                <code>Draft:</code>{" "}What should the system prepare?
              </p>
              <p>
                <code>Verify:</code>{" "}What proof says it worked?
              </p>
              <p>
                <code>Approve:</code>{" "}Who must say yes?
              </p>
              <p>
                <code>Log:</code>{" "}Where does the result live?
              </p>
            </Card>
            <Card title="Risk card">
              <p>
                <code>External impact:</code>{" "}Could this message or action affect someone else?
              </p>
              <p>
                <code>Money impact:</code>{" "}Could this move cash, invoices, charges, or owner reporting?
              </p>
              <p>
                <code>Legal impact:</code>{" "}Could this affect notices, lease status, collections, or compliance?
              </p>
              <p>
                <code>Data impact:</code>{" "}Could this expose private records?
              </p>
              <p>
                <code>Rollback:</code>{" "}How do we turn it off?
              </p>
            </Card>
          </Cards>
        </Section>

        <Section label="Minimum viable version" title="What to build first." tone="dark">
          <p>
            Start with one dashboard, one lane, one recurring dry-run job, one approval rule, and one memory note. That
            is enough to prove the pattern without creating a fragile automation maze.
          </p>
        </Section>

        <Section id="stack" label="Model layer" title="AI models are split by job.">
          <TableWrap label="Model layer">
            <thead>
              <tr>
                <th scope="col">Model/API category</th>
                <th scope="col">What it does here</th>
                <th scope="col">How another team should copy it</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>OpenAI / Codex</strong>
                </td>
                <td>Coding, implementation, site edits, local verification, browser checks, and structured tool work.</td>
                <td>
                  Use a coding-oriented model for repository edits, scripts, tests, deployments, and repeatable tooling.
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Claude / Claude CLI</strong>
                </td>
                <td>Long-form planning, architecture review, audits, policy reasoning, and operator-facing analysis.</td>
                <td>Use a strong reasoning model for ambiguous business logic, audits, and complex operating decisions.</td>
              </tr>
              <tr>
                <td>
                  <strong>Fast classification models</strong>
                </td>
                <td>Message triage, extraction, routing, summarization, and repeated low-risk ops checks.</td>
                <td>
                  Use cheaper or faster models for high-frequency classification and extraction after the rules are
                  clear.
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Retrieval/search layer</strong>
                </td>
                <td>
                  Finds prior decisions, runbooks, tenant-safe context, and historical lessons before a workflow acts.
                </td>
                <td>
                  Build search over docs and logs before adding automation. The system should remember what it already
                  learned.
                </td>
              </tr>
            </tbody>
          </TableWrap>
          <Callout>
            <p>
              <strong>In the reference setup today:</strong>{" "}the Dispatcher plus the work, collections, Lyra, and memory
              lanes run on Anthropic Claude Opus 5.5; the finance, ops, and maintenance lanes run on OpenAI Codex
              GPT-6.1; the tweeter lane runs on xAI Grok 4.7; and ElevenLabs gives Lyra her voice.
            </p>
          </Callout>
        </Section>

        <Section label="Control layer" title="Hermes is the operator hub.">
          <Cards>
            <Card title="Gateway">
              <p>One always-on local gateway that connects all profiles, tools, Telegram lanes, and scheduled jobs.</p>
            </Card>
            <Card title="Agents">
              <p>
                Nine lanes: the Dispatcher (main), work, Lyra (leasing and resident intake), finance,
                collections, ops, memory, maintenance, and a Grok-powered tweeter lane.
              </p>
            </Card>
            <Card title="Tools">
              <p>
                Narrow access to shell, files, browser automation, Google tools, Vercel deploys, GitHub, local scripts,
                and app-specific commands.
              </p>
            </Card>
            <Card title="Approvals">
              <p>
                Human gates sit in Telegram and the operator loop. Work orders, sensitive messages, legal/financial
                actions, and destructive edits stay approval-owned.
              </p>
            </Card>
          </Cards>
        </Section>

        <Section label="APIs and software" title="What sits around Hermes.">
          <TableWrap label="APIs and software">
            <thead>
              <tr>
                <th scope="col">Software/API</th>
                <th scope="col">Role in the system</th>
                <th scope="col">Copy pattern</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>Telegram Bot API</strong>
                </td>
                <td>Primary notification, approval, alert, and handoff channel across specialist lanes.</td>
                <td>Use one visible human channel first. Every risky workflow should have a clear approval surface.</td>
              </tr>
              <tr>
                <td>
                  <strong>Google Workspace APIs</strong>
                </td>
                <td>Gmail signals, Sheets queues, Docs/Drive references, and calendar-style context.</td>
                <td>Use Workspace as the first queue and source-of-truth surface if your team already lives there.</td>
              </tr>
              <tr>
                <td>
                  <strong>AppFolio</strong>
                </td>
                <td>Property system of record for residents, work orders, vendors, occupancy, delinquency, and reports.</td>
                <td>Connect to the portfolio system of record. Read first, draft second, approve before writes.</td>
              </tr>
              <tr>
                <td>
                  <strong>ElevenLabs</strong>
                </td>
                <td>Lyra voice AI: inbound call handling, intent collection, knowledge-base answers, and call analysis.</td>
                <td>
                  Start with inbound-only voice intake. Let it collect context and hand off before it promises outcomes.
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Twilio</strong>
                </td>
                <td>Phone number plus live two-way texting around customer communication.</td>
                <td>Keep compliance and opt-in requirements outside the model. Let the phone/SMS layer enforce them.</td>
              </tr>
              <tr>
                <td>
                  <strong>iMessage</strong>
                </td>
                <td>Business-text digests and urgent-message scans.</td>
                <td>
                  Keep specialized message scanners separate from the main agent loop so they can fail independently.
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Kanban handoffs</strong>
                </td>
                <td>Hermes&apos;s built-in board for passing work between lanes.</td>
                <td>Give every handoff an owner, so work never falls between lanes.</td>
              </tr>
              <tr>
                <td>
                  <strong>Cloudflare Workers</strong>
                </td>
                <td>
                  Thin webhook/edge API pattern used for worker-style glue and public-facing handoffs when useful.
                </td>
                <td>
                  Put small public API surfaces at the edge; keep private decision logic and secrets out of the public
                  docs.
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Vercel</strong>
                </td>
                <td>Hosts this public explanation site.</td>
                <td>Use a public site to explain the pattern, not to expose private machinery.</td>
              </tr>
              <tr>
                <td>
                  <strong>Browser automation</strong>
                </td>
                <td>Used where a system lacks a clean API or visual verification is necessary.</td>
                <td>Prefer APIs first. Use browser automation for legacy portals and proof-gathering.</td>
              </tr>
              <tr>
                <td>
                  <strong>Node.js + Python</strong>
                </td>
                <td>Local scripts, sync jobs, parsers, browser tooling, reports, and small service glue.</td>
                <td>Keep scripts small, named, logged, and easy to run by hand before scheduling them.</td>
              </tr>
            </tbody>
          </TableWrap>
        </Section>

        <Section label="Schedules" title="Cron and LaunchAgents do different jobs.">
          <Cards>
            <Card title="Hermes scheduled jobs">
              <p>
                Recurring agent-owned jobs: ops daily digest, occupancy, tenant directory, lease renewals, daily rent
                roll, weekly delinquency and collections snapshot, work-order history, unit-turn digest, business-text
                digests and urgent scans, Lyra QA and improvement drafts, wiki synthesis/curation/verification, daily
                logs, weekly reviews, backups, and a morning newsletter.
              </p>
            </Card>
            <Card title="macOS LaunchAgents">
              <p>
                Only a handful: the gateway, the 5-minute email pipeline, the daily AppFolio pull, the weekly Lyra KB
                sync, a Telegram delivery re-sender, and the wiki file watcher. Everything else moved into Hermes
                scheduled jobs.
              </p>
            </Card>
          </Cards>
          <p>
            The rule is simple: if the job needs judgment, put it in the agent scheduler. If it mostly checks, syncs,
            drains, watches, or keeps something alive, make it a boring service.
          </p>
        </Section>

        <Section label="Current job families" title="What the recurring work covers.">
          <Lead>
            The real setup has 32 scheduled jobs. Publicly, they are best understood as job families instead of exact
            private schedules.
          </Lead>
          <TableWrap label="Scheduled job families">
            <thead>
              <tr>
                <th scope="col">Job family</th>
                <th scope="col">What it does</th>
                <th scope="col">Why it exists</th>
              </tr>
            </thead>
            <tbody>
              {(
                [
                  [
                    "Wiki synthesis + curation",
                    "Updates the shared planning wiki and keeps recent decisions searchable.",
                    "Stops the agents from working from stale notes.",
                  ],
                  [
                    "Lyra QA (twice daily)",
                    "Reviews customer-service calls and texts and flags quality or routing issues.",
                    "Keeps the voice agent useful and accountable.",
                  ],
                  ["Daily log writer", "Writes the day into a durable record.", "Makes tomorrow's work smarter than today's memory."],
                  [
                    "Weekly failure review",
                    "Looks for repeated failures and turns them into rules or fixes.",
                    "Prevents the same mistake from repeating quietly.",
                  ],
                  [
                    "Property sync",
                    "Pulls property-system data like work orders, occupancy, tenants, and updates.",
                    "Keeps dashboards and follow-ups based on current records.",
                  ],
                  [
                    "Work-order sheets",
                    "The daily AppFolio pull turns work-order changes into per-vendor sheets.",
                    "Turns maintenance status into visible follow-up.",
                  ],
                  ["Ops daily brief", "Summarizes property operations and open work.", "Gives the operator a morning control panel."],
                  [
                    "Occupancy report",
                    "Checks which units or assets are occupied, vacant, or changing.",
                    "Supports leasing and owner visibility.",
                  ],
                  [
                    "Weekly collections snapshot",
                    "Summarizes late-rent totals and how fresh the data is.",
                    "Turns accounting data into reviewable insight.",
                  ],
                  [
                    "Weekly delinquency + daily rent roll",
                    "Tracks past-due balances and follow-up.",
                    "Keeps money-risk work from slipping.",
                  ],
                  [
                    "Business-text digests and urgent scans",
                    "Digests business texts three times a day and scans for urgent ones every 15 minutes in the daytime.",
                    "Keeps communication follow-up moving.",
                  ],
                  [
                    "Lease renewal pipeline",
                    "Tracks renewals and next-step follow-up.",
                    "Turns lease timing into tasks before it becomes urgent.",
                  ],
                  [
                    "Tenant directory refresh",
                    "Refreshes tenant/contact context.",
                    "Helps agents find the right person and property context.",
                  ],
                  [
                    "Work-order history sync",
                    "Maintains longer work-order history.",
                    "Supports reporting, vendor review, and pattern detection.",
                  ],
                ] as const
              ).map(([family, what, why]) => (
                <tr key={family}>
                  <td>
                    <strong>{family}</strong>
                  </td>
                  <td>{what}</td>
                  <td>{why}</td>
                </tr>
              ))}
            </tbody>
          </TableWrap>
        </Section>

        <Section label="Always-on families" title="What LaunchAgents cover.">
          <Lead>Six Mac background services keep the always-on pieces running.</Lead>
          <Cards>
            <Card title="Gateway">
              <p>Keep the single Hermes gateway alive so every profile, tool, and Telegram lane can talk to each other.</p>
            </Card>
            <Card title="Inbox">
              <p>
                Poll Gmail every 5 minutes and run the leasing drafter so communication inputs keep moving into the
                operating loop.
              </p>
            </Card>
            <Card title="Property and Lyra sync">
              <p>Run the daily AppFolio pull and the weekly Lyra knowledge-base sync.</p>
            </Card>
            <Card title="Reliability">
              <p>
                Re-send failed Telegram deliveries and watch the wiki for changes. The other watchdogs (credentials,
                browser profile, backups, missed jobs) now run as Hermes scheduled jobs.
              </p>
            </Card>
          </Cards>
        </Section>

        <Section label="Lyra" title="Customer service is a workflow, not just a voice bot.">
          <Flow
            rows={[
              ["Call", "A prospect, resident, vendor, or other caller reaches the intake line."],
              [
                "Voice AI",
                "ElevenLabs gives Lyra a natural conversation layer. Lyra asks questions and identifies intent.",
              ],
              [
                "Tools",
                "Scoped backend tools check availability, property info, tenant lookup, tenant verification, emergency alerts, caller history, tour requests, and warm transfer; the call log is written automatically after the call.",
              ],
              [
                "Knowledge",
                "Maintained property notes and customer-service rules tell Lyra what she may say and what she must hand off.",
              ],
              ["Queue", "The call becomes a summary, queue item, alert, or follow-up request."],
              [
                "Human",
                "Maintenance dispatch, legal/payment/account issues, emergencies, uncertain answers, and sensitive follow-up stay human-owned.",
              ],
            ]}
          />
        </Section>

        <Section id="pieces" label="Parts list" title="The pieces, in plain English.">
          <TableWrap label="The pieces">
            <thead>
              <tr>
                <th scope="col">Piece</th>
                <th scope="col">Simple meaning</th>
                <th scope="col">Portfolio example</th>
                <th scope="col">How to build it</th>
              </tr>
            </thead>
            <tbody>
              {(
                [
                  [
                    "Input layer",
                    "All the places work arrives.",
                    "Tenant call, leasing email, owner question, vendor invoice, delinquency report.",
                    "Make one list of sources. For each source, name the owner and what proof should be captured.",
                  ],
                  [
                    "Router",
                    "The traffic controller.",
                    "A message gets classified as leasing, maintenance, finance, collections, or review.",
                    "Start with simple rules. Later add AI classification once the rules are clear.",
                  ],
                  [
                    "Operating lane",
                    "A named owner for a kind of work.",
                    "Leasing lane, work-order lane, finance lane, collections lane, executive-review lane.",
                    "Give each lane allowed tools, blocked actions, escalation rules, and a dashboard view.",
                  ],
                  [
                    "Agent job",
                    "A recurring task that needs judgment.",
                    "Summarize delinquency risk, prepare owner brief, review leasing follow-ups.",
                    "Run it on a schedule, but require a receipt and human review before action.",
                  ],
                  [
                    "System service",
                    "A boring background job.",
                    "Sync tasks, check inbox, rotate logs, verify backup, detect config drift.",
                    "Move repetitive checks outside the reasoning layer so the AI is used for judgment, not plumbing.",
                  ],
                  [
                    "Knowledge base",
                    "The written source of truth.",
                    "Property notes, leasing policies, emergency rules, vendor instructions, team runbooks.",
                    "Keep it in simple files or docs. Sync it into the tools that need it.",
                  ],
                  [
                    "Memory",
                    "The system's durable lessons.",
                    "“This vendor needs photos before dispatch” or “this report must reconcile to owner statement.”",
                    "After every important run, write the lesson in a place future runs can search.",
                  ],
                  [
                    "Tool connection",
                    "A narrow doorway into another system.",
                    "Property software, CRM, accounting, calendar, inbox, messaging, task manager.",
                    "Give each connection the least power it needs. Avoid broad admin access when read-only is enough.",
                  ],
                  [
                    "Approval gate",
                    "The stop sign before impact.",
                    "Work order dispatch, tenant message, owner update, payment action, legal escalation.",
                    "Define the exact approval phrase or button. Log who approved and what was approved.",
                  ],
                  [
                    "Verification receipt",
                    "Proof that a run did what it claimed.",
                    "Returned record count, screenshot, sync receipt, sent-message ID, dashboard link.",
                    "Do not call a workflow done until it leaves proof a person can inspect.",
                  ],
                  [
                    "Dashboard",
                    "A simple view of current state.",
                    "Open approvals, failed jobs, leasing follow-ups, unresolved work orders, cash-risk items.",
                    "Start with one page or table. Show what changed, what is blocked, and what needs a decision.",
                  ],
                  [
                    "Rollback path",
                    "The way back if something goes wrong.",
                    "Disable a new automation and return to manual review.",
                    "Before turning a workflow on, write down how to turn it off.",
                  ],
                ] as const
              ).map(([piece, meaning, example, how]) => (
                <tr key={piece}>
                  <td>
                    <strong>{piece}</strong>
                  </td>
                  <td>{meaning}</td>
                  <td>{example}</td>
                  <td>{how}</td>
                </tr>
              ))}
            </tbody>
          </TableWrap>
        </Section>

        <Section label="Rule of thumb" title="Use AI for judgment, not blind action.">
          <Cards>
            <Card title="Good AI work">
              <p>
                Classifying messages, summarizing context, drafting replies, comparing reports, finding exceptions,
                preparing decisions, and explaining what changed.
              </p>
            </Card>
            <Card title="Keep human-owned">
              <p>
                Sending sensitive messages, dispatching costly work, approving payments, changing legal status, deleting
                data, publishing externally, or overriding policy.
              </p>
            </Card>
          </Cards>
        </Section>

        <Section id="prompts" label="Battle-tested" title="The prompts I actually use.">
          <Lead>
            These are the ones that ship — pulled directly from my Claude behavioral file, the wiki schema, and the
            scheduled jobs that run every day. Copy what fits, adjust for your work.
          </Lead>
        </Section>

        <Section label="Operator behavior" title="Make Claude (or Codex) actually useful.">
          <Lead>
            This is the pattern I put at the top of any session that involves building something. It changes the AI
            from &ldquo;eager assistant&rdquo; to &ldquo;careful collaborator.&rdquo;
          </Lead>
          <Code label="Operator behavior prompt">{operatorPrompt}</Code>
          <Callout>
            <p>
              <strong>Why it works:</strong>{" "}AI assistants default to enthusiasm. This pattern reframes the work as
              collaborative problem-solving. The &ldquo;verify before claiming done&rdquo; line alone has caught dozens
              of false-positive completions for me.
            </p>
          </Callout>
        </Section>

        <Section label="Two-AI review" title="When you want a real second opinion.">
          <Lead>
            This is the prompt I use when Claude has just produced something I&apos;m about to ship — before sending it
            through Codex for review (or vice versa).
          </Lead>
          <Code label="Two-AI review prompt">{reviewPrompt}</Code>
          <Callout>
            <p>
              <strong>The trick:</strong>{" "}&ldquo;Don&apos;t validate it — review it.&rdquo; Most AI reviews default to
              &ldquo;looks good!&rdquo; because they&apos;re trained to be agreeable. Forcing the reviewer-mode framing
              surfaces real issues.
            </p>
          </Callout>
        </Section>

        <Section label="Weekly review" title="The Friday afternoon pattern.">
          <Lead>
            My memory agent runs this every Friday at 5 PM. The result lands in my Telegram thread and gets appended to
            the planning wiki.
          </Lead>
          <Code label="Weekly review prompt">{weeklyPrompt}</Code>
        </Section>

        <Section label="Wiki ingest" title="Turn raw notes into durable knowledge.">
          <Lead>
            When I dump a chunk of session transcripts or rough notes into my wiki&apos;s <code>raw/</code>{" "}folder, this
            prompt processes them into structured project pages.
          </Lead>
          <Code label="Wiki ingest prompt">{ingestPrompt}</Code>
        </Section>

        <Section label="Pre-commit safety" title="Keep the AI from doing something destructive.">
          <Lead>
            This is the explicit guardrail block I include in any session that has shell or git access. Pulled directly
            from my CLAUDE.md.
          </Lead>
          <Code label="Destructive action guardrails">{guardrailPrompt}</Code>
        </Section>

        <Section label="Project planning" title="Get to a real plan before you write a line of code.">
          <Lead>For anything bigger than a 30-minute task, I use this to force Claude into planning mode first.</Lead>
          <Code label="Project planning prompt">{planningPrompt}</Code>
          <Callout>
            <p>
              <strong>Why &ldquo;after I confirm&rdquo;:</strong>{" "}the explicit handoff prevents the AI from charging
              into work the moment the plan exists. It also gives you a clean cancel point if the plan reveals scope you
              didn&apos;t realize.
            </p>
          </Callout>
        </Section>

        <Section label="Lyra-style intake" title="The system prompt for a voice agent.">
          <Lead>A simplified version of what runs Lyra. Adapt the property-specific bits for your domain.</Lead>
          <Code label="Voice agent system prompt">{voicePrompt}</Code>
        </Section>

        <Section label="Original prompts (still useful)" title="Generic build prompts.">
          <Lead>
            The original generic prompts from earlier versions of this playbook — useful for setting up a new system
            from scratch.
          </Lead>
          <Code label="Generic build prompt">{genericPrompt}</Code>
        </Section>

        <Section label="Discovery" title="Map the current business.">
          <Cards>
            <PromptCard title="Input inventory">
              Interview me about every place work enters our portfolio management team. Build a table with: source,
              example message, owner, current system of record, urgency, privacy risk, and what proof would show the item
              was handled.
            </PromptCard>
            <PromptCard title="Workflow pain map">
              Help me find the 10 recurring workflows that waste the most time or create the most missed follow-up risk.
              Rank them by business value, automation risk, data availability, and ease of starting in dry-run mode.
            </PromptCard>
            <PromptCard title="Lane design">
              Turn our workflows into operating lanes. For each lane, define purpose, owner, allowed tools, blocked
              actions, approval rules, dashboard needs, and first three recurring checks.
            </PromptCard>
            <PromptCard title="Software map">
              Create a public-safe software map for our workflow OS. Separate systems of record, communication tools,
              task tools, AI/model tools, schedulers, dashboards, and documentation/memory.
            </PromptCard>
          </Cards>
        </Section>

        <Section label="Stack prompts" title="Ask for the real pieces.">
          <Cards>
            <PromptCard title="Model plan">
              Design our model layer using separate roles for coding, long-form reasoning, fast classification,
              extraction, retrieval/search, and final review. Explain where OpenAI/Codex-style tools and Claude-style
              tools fit.
            </PromptCard>
            <PromptCard title="Hermes-style control plane">
              Design a Hermes-style control plane for our team. Include agents, gateway/router, tools, approvals,
              Telegram or Slack handoff, dashboard, logs, memory, scheduled jobs, and background services.
            </PromptCard>
            <PromptCard title="API/software matrix">
              Build a matrix for Google Workspace, AppFolio or our property system, ElevenLabs or voice AI, Twilio or
              SMS, a task manager, a wiki, Telegram or approval channel, Vercel or public docs, and Cloudflare Workers or
              edge API glue.
            </PromptCard>
            <PromptCard title="Schedule split">
              Separate this workflow into scheduled jobs, LaunchAgents/system services, manual approvals, and
              dashboards. Explain why each piece belongs in that layer.
            </PromptCard>
          </Cards>
        </Section>

        <Section label="Build prompts" title="Design the first loop.">
          <Flow
            rows={[
              [
                "Dry run",
                <>
                  <code>Prompt:</code>{" "}Design a dry-run version of this workflow. It may read data, classify, summarize,
                  and draft next steps, but it may not send messages, dispatch work, change records, move money, or
                  delete anything.
                </>,
              ],
              [
                "Receipts",
                <>
                  <code>Prompt:</code>{" "}Define the receipt this workflow must produce. Include source records checked,
                  decision made, draft output, approval status, final action, and where the log should live.
                </>,
              ],
              [
                "Approval",
                <>
                  <code>Prompt:</code>{" "}Write a human approval policy for this workflow. Specify what needs approval, who
                  can approve, what phrase or button counts as approval, and what should happen if approval is missing.
                </>,
              ],
              [
                "Schedule",
                <>
                  <code>Prompt:</code>{" "}Decide whether this workflow belongs in an agent schedule or a background
                  service. If it needs judgment, keep it agent-owned. If it mostly checks or syncs, make it a boring
                  service.
                </>,
              ],
              [
                "Memory",
                <>
                  <code>Prompt:</code>{" "}After this run, write a short memory note: what changed, what was proven, what
                  failed, what should be checked next time, and what rule should be updated.
                </>,
              ],
            ]}
          />
        </Section>

        <Section label="API prompts" title="Connect software without making a mess.">
          <Cards>
            <PromptCard title="API boundary">
              For this software connection, define the minimum API access needed. Separate read-only lookup, draft
              creation, queue writing, official record changes, sends, and deletes. Recommend the safest starting
              permission.
            </PromptCard>
            <PromptCard title="System of record">
              Identify the system of record for this workflow. Tell me which fields should be read from it, which should
              never be overwritten automatically, and what human approval is required before any write.
            </PromptCard>
            <PromptCard title="Service choice">
              Decide whether this integration should use a direct API, browser automation, spreadsheet queue, webhook,
              or manual upload. Compare reliability, privacy risk, setup cost, and auditability.
            </PromptCard>
            <PromptCard title="Failure handling">
              Design failure handling for this API. Include timeout behavior, retry limits, stale-data warnings,
              fallback mode, human alert, and the receipt that proves no external action was taken.
            </PromptCard>
          </Cards>
        </Section>

        <Section label="Lyra-style prompt set" title="Build customer-service intake.">
          <Cards>
            <PromptCard title="Voice intake scope">
              Design an inbound customer-service agent for our portfolio team. It can answer common questions, collect
              context, classify intent, and create a handoff summary. It cannot make final promises, send sensitive
              account details, approve work, or make legal/financial decisions.
            </PromptCard>
            <PromptCard title="Handoff summary">
              Create the perfect human handoff summary for a customer call. Include caller, property/account, intent,
              urgency, facts collected, missing information, recommended next step, risk level, and whether approval is
              required.
            </PromptCard>
            <PromptCard title="Knowledge base">
              Build the first knowledge base outline for customer-service intake. Include property facts, policies,
              emergency rules, leasing answers, maintenance categories, escalation rules, and what the agent must never
              answer alone.
            </PromptCard>
            <PromptCard title="Safety review">
              Review this customer-service workflow for risks: privacy, wrong promises, legal exposure, payment/account
              sensitivity, emergency handling, unclear ownership, and missing logs. Return fixes before launch.
            </PromptCard>
          </Cards>
        </Section>
      </Playbook>
    </FieldManualChrome>
  );
}
