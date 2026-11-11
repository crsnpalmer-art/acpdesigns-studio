import type { Metadata } from "next";
import FieldManualChrome from "@/components/field-manual/FieldManualChrome";
import { numberWord, operatingStats } from "@/content/operating-map";
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
      page="playbook"
      skipHref="#playbook-content"
      skipLabel="Skip to the playbook"
    >
      <Playbook
        current="build"
        eyebrow="How to build it"
        meta="4 min read"
        title="Build one workflow first."
        lead={
          <p>
            The safest way to copy this system is not to automate everything. Pick one task that wears you out, make
            it easy to see, check that it works, and only then add the next.
          </p>
        }
      >
        <Section label="The order to build in" title="Seven steps, one at a time.">
          <Checklist
            items={[
              <>
                <strong>Make a list.</strong>{" "}Write down where work comes in, where your records live, which reports
                you repeat, and where a person has to say yes.
              </>,
              <>
                <strong>Choose one workflow.</strong>{" "}Good first choices: following up with leads, sorting the
                day&apos;s repair requests, preparing an owner update, or checking who is late on rent.
              </>,
              <>
                <strong>Practice first.</strong>{" "}Let the system sort and draft, but do not let it send, pay, delete,
                or change your records.
              </>,
              <>
                <strong>Keep a record.</strong>{" "}Every run should show what it looked at, what it drafted, who
                approved it, and what finally happened.
              </>,
              <>
                <strong>Put it on a schedule.</strong>{" "}Once it works when you run it by hand, have it run on its own
                every day or every week.
              </>,
              <>
                <strong>Write down what you learn.</strong>{" "}Add each lesson to the notebook, so the next run uses
                today&apos;s facts instead of old guesses.
              </>,
              <>
                <strong>Then add the next one.</strong>{" "}Start a second workflow only after the first is boring,
                easy to see, and easy to switch off.
              </>,
            ]}
          />
        </Section>

        <Section label="The smallest useful version" title="What to build first." tone="dark">
          <p>
            Start with one daily summary, one area of the business, one job that runs in practice mode, one approval
            rule, and one page of notes. That is enough to prove the idea without building something fragile.
          </p>
        </Section>

        <Section label="Rule of thumb" title="Let AI prepare. Let people decide.">
          <Cards>
            <Card title="Good AI work">
              <p>
                Sorting messages, summarizing, drafting replies, comparing reports, spotting what looks off, and
                explaining what changed.
              </p>
            </Card>
            <Card title="Keep with a person">
              <p>
                Sending sensitive messages, sending out costly repairs, approving payments, anything legal, deleting
                data, and anything published to the public.
              </p>
            </Card>
          </Cards>
        </Section>

        <Section id="pieces" label="Parts list" title="The pieces, in plain English.">
          <TableWrap label="The pieces">
            <thead>
              <tr>
                <th scope="col">Piece</th>
                <th scope="col">Simple meaning</th>
                <th scope="col">Property example</th>
                <th scope="col">How to build it</th>
              </tr>
            </thead>
            <tbody>
              {(
                [
                  [
                    "Inputs",
                    "All the places work arrives.",
                    "Tenant call, leasing email, owner question, vendor invoice, delinquency report.",
                    "Make one list of sources. For each source, name the owner and what proof should be captured.",
                  ],
                  [
                    "Dispatcher",
                    "The traffic controller.",
                    "A message gets sorted as leasing, maintenance, finance, collections, or needs-a-person.",
                    "Start with simple rules. Let the AI do the sorting once the rules are clear.",
                  ],
                  [
                    "Lane",
                    "A named owner for a kind of work.",
                    "Leasing lane, work-order lane, finance lane, collections lane, executive-review lane.",
                    "For each lane, write down what it may do, what it may not do, and when it hands off to a person.",
                  ],
                  [
                    "Scheduled job",
                    "A repeating task that takes some thinking.",
                    "Summarize delinquency risk, prepare owner brief, review leasing follow-ups.",
                    "Run it on a schedule, but have a person review the result before anything is sent.",
                  ],
                  [
                    "Background helper",
                    "A simple job that just keeps running.",
                    "Check the inbox, download the day's records, make a backup.",
                    "Use plain scripts for simple repeating checks. Save the AI for work that takes judgment.",
                  ],
                  [
                    "Notebook",
                    "The written facts everyone works from.",
                    "Property notes, leasing policies, emergency rules, vendor instructions, team runbooks.",
                    "Keep it in simple files or documents. Share it with every tool that needs it.",
                  ],
                  [
                    "Memory",
                    "What the system has learned.",
                    "“This vendor needs photos before dispatch” or “this report must reconcile to owner statement.”",
                    "After every important run, write the lesson in a place future runs can search.",
                  ],
                  [
                    "Connection",
                    "A narrow doorway into another piece of software.",
                    "Property software, CRM, accounting, calendar, inbox, messaging, task manager.",
                    "Give each connection the least power it needs. If reading is enough, do not let it change anything.",
                  ],
                  [
                    "Approval step",
                    "The stop sign before impact.",
                    "Work order dispatch, tenant message, owner update, payment action, legal escalation.",
                    "Decide the exact word or button that means yes. Record who approved and what they approved.",
                  ],
                  [
                    "Record of the run",
                    "Proof that a job did what it said.",
                    "How many records it read, a screenshot, a copy of the message that was sent.",
                    "Do not call a workflow done until it leaves proof a person can inspect.",
                  ],
                  [
                    "Daily summary",
                    "A simple view of where things stand.",
                    "Open approvals, failed jobs, leasing follow-ups, unresolved work orders, cash-risk items.",
                    "Start with one page or table. Show what changed, what is blocked, and what needs a decision.",
                  ],
                  [
                    "Off switch",
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

        <Section label="Worksheets" title="Fill these in for each workflow.">
          <Cards>
            <Card title="Workflow card">
              <p>
                <code>Starts with:</code>{" "}Where does this work come from?
              </p>
              <p>
                <code>Owner:</code>{" "}Who handles the next step?
              </p>
              <p>
                <code>Needs:</code>{" "}What information is needed?
              </p>
              <p>
                <code>Draft:</code>{" "}What should the system prepare?
              </p>
              <p>
                <code>Proof:</code>{" "}What shows it worked?
              </p>
              <p>
                <code>Approve:</code>{" "}Who must say yes?
              </p>
              <p>
                <code>Record:</code>{" "}Where is the result saved?
              </p>
            </Card>
            <Card title="Risk card">
              <p>
                <code>Other people:</code>{" "}Could this message or action affect someone else?
              </p>
              <p>
                <code>Money:</code>{" "}Could this move cash, invoices, charges, or owner reporting?
              </p>
              <p>
                <code>Legal:</code>{" "}Could this affect notices, lease status, collections, or compliance?
              </p>
              <p>
                <code>Privacy:</code>{" "}Could this expose private records?
              </p>
              <p>
                <code>Off switch:</code>{" "}How do we turn it off?
              </p>
            </Card>
          </Cards>
        </Section>

        <Section label="Lyra" title="Customer service is a workflow, not just a voice.">
          <Flow
            rows={[
              ["The call", "A prospect, resident, or vendor calls or texts the line."],
              ["The conversation", "Lyra answers in a natural voice, asks questions, and works out what the person needs."],
              [
                "The lookups",
                "She can check availability, look up a resident, confirm who is calling, see earlier calls, take a tour request, raise an emergency, or transfer to a person. The call is logged automatically afterward.",
              ],
              ["The rules", "Written property notes and service rules tell her what she may say and what she must hand off."],
              ["The handoff", "The call becomes a summary, a to-do, an alert, or a follow-up request."],
              [
                "The person",
                "Sending out repairs, legal and payment questions, emergencies, and anything uncertain stay with a person.",
              ],
            ]}
          />
        </Section>

        <Section id="stack" label="How Carson&apos;s is put together" title="The pieces, in the order he added them.">
          <Lead>
            The rest of this page describes Carson&apos;s own setup and gets more detailed. Skim it for ideas. You do not
            need any of it to start.
          </Lead>
          <Flow
            rows={[
              ["The AI", "Pick which AI does which kind of work: one for careful thinking, one for quick sorting, one for building things."],
              ["The dispatcher", "Add one program that receives every request, sends it to the right specialist, and keeps the logs. Carson uses one called Hermes."],
              ["The records", "Connect the software your business already runs on: your property software, spreadsheets, and accounting reports."],
              ["The messages", "Connect how people reach you: a chat app for approvals, email, and a phone line if you want one."],
              ["The schedule", "Put repeating work on a schedule, and keep the simple always-on checks separate from the work that takes judgment."],
              ["The proof", "Make every job leave something a person can check: a log, a screenshot, a copy of what was sent."],
            ]}
          />
        </Section>

        <Section label="Which AI does what" title="Different AIs for different jobs.">
          <TableWrap label="Which AI does what">
            <thead>
              <tr>
                <th scope="col">Kind of work</th>
                <th scope="col">What it covers</th>
                <th scope="col">What to copy</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>Careful thinking</strong>
                </td>
                <td>Planning, reviewing, and anything where the right answer takes judgment.</td>
                <td>Use your strongest AI for unclear business questions and reviews.</td>
              </tr>
              <tr>
                <td>
                  <strong>Building and fixing</strong>
                </td>
                <td>Writing and repairing the scripts and web pages the system runs on.</td>
                <td>Use an AI made for coding when you need something built or changed.</td>
              </tr>
              <tr>
                <td>
                  <strong>Quick sorting</strong>
                </td>
                <td>Sorting messages, pulling out details, and short summaries, many times a day.</td>
                <td>Use a cheaper, faster AI for simple work that repeats all day.</td>
              </tr>
              <tr>
                <td>
                  <strong>Looking things up</strong>
                </td>
                <td>Finding earlier decisions, how-to guides, and past lessons before a job acts.</td>
                <td>Make your notes searchable before you automate anything. The system should remember what it learned.</td>
              </tr>
            </tbody>
          </TableWrap>
          <Callout>
            <p>
              <strong>In Carson&apos;s setup today:</strong>{" "}Claude handles the dispatcher, leasing, collections, Lyra&apos;s
              text replies, and record-keeping. OpenAI handles maintenance and system upkeep. Grok handles quick research.
              ElevenLabs gives Lyra her voice.
            </p>
          </Callout>
        </Section>

        <Section label="The dispatcher" title="One program runs the team.">
          <Cards>
            <Card title="Always listening">
              <p>One program stays on all the time. It receives every message and starts every scheduled job.</p>
            </Card>
            <Card title="The specialists">
              <p>
                {numberWord(operatingStats.agents, true)} of them: a dispatcher, leasing, Lyra on the phone line,
                maintenance, collections, system upkeep, record-keeping, market research, and quick research.
              </p>
            </Card>
            <Card title="What they can touch">
              <p>Each specialist can reach only the files and software its own work needs.</p>
            </Card>
            <Card title="Approvals">
              <p>
                Approvals happen in the chat. Work orders, sensitive messages, anything legal or financial, and anything
                that deletes data wait for a person.
              </p>
            </Card>
          </Cards>
        </Section>

        <Section label="The software around it" title="What the system connects to.">
          <TableWrap label="Connected software">
            <thead>
              <tr>
                <th scope="col">Software</th>
                <th scope="col">What it is used for</th>
                <th scope="col">What to copy</th>
              </tr>
            </thead>
            <tbody>
              {(
                [
                  ["Telegram", "The chat where alerts arrive and approvals happen.", "Start with one chat everyone can see. Every risky job needs one clear place to approve it."],
                  ["Google Workspace", "Email, spreadsheets, documents, and the calendar.", "If your team already lives here, use it as your first to-do list and record."],
                  ["AppFolio", "The property records: residents, work orders, vendors, occupancy, and late rent.", "Connect your main records. Read first, draft second, approve before anything is changed."],
                  ["ElevenLabs", "Lyra's voice on the phone line.", "Start with answering calls only. Let it gather details and hand off before it promises anything."],
                  ["Twilio", "The phone number and two-way texting.", "Keep opt-in and legal rules in the phone service itself, not in the AI."],
                  ["iMessage", "A digest of business texts and a watch for urgent ones.", "Keep message checkers separate, so one failing does not stop the rest."],
                  ["A handoff board", "A shared list for passing work from one specialist to another.", "Give every handoff an owner, so nothing falls between two people."],
                  ["Vercel and Cloudflare", "Where this website and Lyra's text service are hosted.", "Use public pages to explain how it works, never to show private details."],
                  ["A robot browser", "Clicks through a website the way a person would, when there is no better way in.", "Use a proper connection when one exists. Use this for older websites and for screenshots as proof."],
                  ["Small scripts", "Short programs that download, sort, and report.", "Keep each one small, named, logged, and easy to run by hand before you schedule it."],
                ] as const
              ).map(([name, role, copy]) => (
                <tr key={name}>
                  <td>
                    <strong>{name}</strong>
                  </td>
                  <td>{role}</td>
                  <td>{copy}</td>
                </tr>
              ))}
            </tbody>
          </TableWrap>
        </Section>

        <Section label="Schedules" title="Two kinds of scheduled work.">
          <Cards>
            <Card title="Jobs that take judgment">
              <p>
                The morning digest, occupancy, the tenant directory, lease renewals, the daily rent roll, the weekly
                late-rent report and collections snapshot, the unit turn board, text digests, reviews of Lyra&apos;s
                calls, tidying the notebook, daily logs, weekly reviews, backups, and a morning newsletter.
              </p>
            </Card>
            <Card title="Helpers that just keep running">
              <p>
                Only a handful: the dispatcher itself, checking email every five minutes, the daily download from
                AppFolio, the weekly update of what Lyra knows, re-sending messages that failed, and collecting new
                notes.
              </p>
            </Card>
          </Cards>
          <p>
            The rule is simple. If a job takes judgment, give it to an AI specialist on a schedule. If it only checks,
            downloads, or keeps something alive, make it a plain script.
          </p>
        </Section>

        <Section label="The scheduled jobs" title="What the repeating work covers.">
          <Lead>
            The real setup has {operatingStats.routines} scheduled jobs. They fall into these groups.
          </Lead>
          <TableWrap label="Scheduled job families">
            <thead>
              <tr>
                <th scope="col">Group</th>
                <th scope="col">What it does</th>
                <th scope="col">Why it exists</th>
              </tr>
            </thead>
            <tbody>
              {(
                [
                  [
                    "Notebook upkeep",
                    "Files new notes into the shared notebook and keeps recent decisions easy to find.",
                    "Stops the AI from working from old notes.",
                  ],
                  [
                    "Lyra call review (twice daily)",
                    "Reviews calls and texts and flags anything that was handled poorly.",
                    "Keeps the phone line useful and accountable.",
                  ],
                  ["Daily log", "Writes down what happened today.", "Tomorrow's work starts from the facts."],
                  [
                    "Weekly fix-it review",
                    "Looks for repeated failures and turns them into rules or fixes.",
                    "Prevents the same mistake from repeating quietly.",
                  ],
                  [
                    "Property records download",
                    "Brings over work orders, occupancy, and resident updates from the property software.",
                    "Keeps every summary and follow-up based on current records.",
                  ],
                  [
                    "Work-order sheets",
                    "Turns the day's open work orders into one sheet for each vendor.",
                    "Every vendor sees exactly what is theirs.",
                  ],
                  ["Morning digest", "Summarizes the properties and the open work.", "One message to start the day."],
                  [
                    "Occupancy report",
                    "Shows which units are leased, empty, or about to change.",
                    "Helps leasing and keeps owners informed.",
                  ],
                  [
                    "Weekly collections snapshot",
                    "Sums up late rent for the week.",
                    "Turns the accounting numbers into something you can read in a minute.",
                  ],
                  [
                    "Weekly late-rent report and daily rent roll",
                    "Tracks who is past due and who needs a follow-up.",
                    "Keeps late rent from slipping through.",
                  ],
                  [
                    "Text digests and urgent-text watch",
                    "Summarizes business texts three times a day and watches for urgent ones every 15 minutes in the daytime.",
                    "Nothing important sits unanswered.",
                  ],
                  [
                    "Lease renewal list",
                    "Tracks upcoming renewals and the next step on each.",
                    "Turns lease timing into tasks before it becomes urgent.",
                  ],
                  [
                    "Tenant directory refresh",
                    "Keeps resident contact details current.",
                    "The system can always find the right person and unit.",
                  ],
                  [
                    "Work-order history",
                    "Keeps a longer record of past work orders.",
                    "Helps with reports, vendor reviews, and spotting repeat problems.",
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

        <Section label="Always running" title="The helpers that never stop.">
          <Lead>{numberWord(operatingStats.macJobs, true)} small helpers run all the time on the studio Mac.</Lead>
          <Cards>
            <Card title="The dispatcher">
              <p>Stays on so every specialist and the chat can reach each other.</p>
            </Card>
            <Card title="The inbox">
              <p>Checks email every five minutes and drafts leasing replies, so messages keep moving.</p>
            </Card>
            <Card title="Property records and Lyra">
              <p>Runs the daily download from AppFolio and the weekly update of what Lyra knows.</p>
            </Card>
            <Card title="Safety nets">
              <p>Re-sends messages that failed and collects new notes. Login checks, backups, and missed-job catch-up run on the schedule.</p>
            </Card>
          </Cards>
        </Section>

        <Section id="prompts" label="Ready to paste" title="The instructions I actually use.">
          <Lead>
            A prompt is just the instructions you give an AI. These are the ones I use every day, copied straight from
            my own setup. Paste what fits and change the details for your work. Some are written for people building
            software, so skip any that do not apply to you.
          </Lead>
        </Section>

        <Section label="Ground rules" title="Make the AI careful instead of eager.">
          <Lead>
            I put this at the top of any conversation where the AI is building something. It turns an eager
            assistant into a careful partner.
          </Lead>
          <Code label="Operator behavior prompt">{operatorPrompt}</Code>
          <Callout>
            <p>
              <strong>Why it works:</strong>{" "}AI assistants are eager to please. These rules make it slow down and
              check its work. The &ldquo;verify before claiming done&rdquo; line alone has caught dozens of times
              it said something was finished when it was not.
            </p>
          </Callout>
        </Section>

        <Section label="A second opinion" title="When you want a real second opinion.">
          <Lead>
            I use this when one AI has just produced something I am about to use. I hand the result to a different
            AI and ask it to find the problems.
          </Lead>
          <Code label="Two-AI review prompt">{reviewPrompt}</Code>
          <Callout>
            <p>
              <strong>The trick:</strong>{" "}&ldquo;Don&apos;t validate it — review it.&rdquo; Left alone, most AI
              reviews say &ldquo;looks good!&rdquo; because the AI wants to be agreeable. Asking it to act as a
              reviewer brings out the real problems.
            </p>
          </Callout>
        </Section>

        <Section label="Weekly review" title="The Friday afternoon review.">
          <Lead>
            This runs by itself every Friday at 5 PM. The result arrives in my chat and is added to the notebook.
          </Lead>
          <Code label="Weekly review prompt">{weeklyPrompt}</Code>
        </Section>

        <Section label="Filing notes" title="Turn rough notes into pages you can use.">
          <Lead>
            When I drop rough notes into the notebook&apos;s <code>raw/</code>{" "}folder, this turns them into tidy
            project pages.
          </Lead>
          <Code label="Wiki ingest prompt">{ingestPrompt}</Code>
        </Section>

        <Section label="Safety rules" title="Keep the AI from doing something destructive.">
          <Lead>
            I include these rules whenever an AI is allowed to change files on my computer. They are written for
            software work, so the wording is technical.
          </Lead>
          <Code label="Destructive action guardrails">{guardrailPrompt}</Code>
        </Section>

        <Section label="Project planning" title="Get a real plan before any work starts.">
          <Lead>For anything bigger than a 30-minute task, I use this so the AI plans first and builds second.</Lead>
          <Code label="Project planning prompt">{planningPrompt}</Code>
          <Callout>
            <p>
              <strong>Why &ldquo;after I confirm&rdquo;:</strong>{" "}it stops the AI from starting the moment a plan
              exists. It also gives you a clean chance to cancel if the plan turns out bigger than you expected.
            </p>
          </Callout>
        </Section>

        <Section label="A phone assistant" title="The instructions behind a phone assistant.">
          <Lead>A simplified version of what Lyra runs on. Change the property details to fit your business.</Lead>
          <Code label="Voice agent system prompt">{voicePrompt}</Code>
        </Section>

        <Section label="Starting from zero" title="One prompt to plan the whole thing.">
          <Lead>
            Paste this into an AI when you are starting from nothing. It will interview you and produce a plan.
          </Lead>
          <Code label="Generic build prompt">{genericPrompt}</Code>
        </Section>

        <Section label="Discovery" title="Map how your business works today.">
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

        <Section label="Build prompts" title="Design the first workflow.">
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

        <Section label="A phone assistant" title="Plan your own phone assistant.">
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

        <Section label="For the technical builder" title="Ask the AI to design the pieces.">
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

        <Section label="For the technical builder" title="Connect software without making a mess.">
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
      </Playbook>
    </FieldManualChrome>
  );
}
