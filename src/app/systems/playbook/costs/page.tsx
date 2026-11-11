import type { Metadata } from "next";
import Link from "next/link";
import { numberWord, operatingStats, snapshotDate } from "@/content/operating-map";
import FieldManualChrome from "@/components/field-manual/FieldManualChrome";
import Playbook, { Callout, Card, Cards, Lead, Section, TableWrap } from "@/components/field-manual/Playbook";

const description =
  "The honest monthly bill for an AI operating setup — from a ~$20 starter to the $400+ full stack — plus time saved, what didn't pay off, and who shouldn't build this.";

export const metadata: Metadata = {
  title: "Playbook: Costs | ACP Designs Studio",
  description,
  alternates: {
    canonical: "/systems/playbook/costs",
  },
  openGraph: {
    title: "Playbook: Costs | ACP Designs Studio",
    description,
    url: "/systems/playbook/costs",
    siteName: "ACP Designs Studio",
    type: "article",
  },
};

type Row = readonly [string, string, string];

function CostTable({ label, head, rows, total }: { label: string; head: Row; rows: readonly Row[]; total: React.ReactNode }) {
  return (
    <TableWrap label={label}>
      <thead>
        <tr>
          {head.map((cell) => (
            <th scope="col" key={cell}>
              {cell}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map(([service, role, cost]) => (
          <tr key={service}>
            <td>
              <strong>{service}</strong>
            </td>
            <td>{role}</td>
            <td>{cost}</td>
          </tr>
        ))}
        <tr>
          <td colSpan={2}>
            <strong>Total</strong>
          </td>
          <td>{total}</td>
        </tr>
      </tbody>
    </TableWrap>
  );
}

function DontBuild({ id, title, lead, children }: { id?: string; title: string; lead: React.ReactNode; children: React.ReactNode }) {
  return (
    <Section id={id} label="Don't build this if" title={title} tone="warn">
      <Lead>{lead}</Lead>
      <p>{children}</p>
    </Section>
  );
}

export default function PlaybookCostsPage() {
  return (
    <FieldManualChrome
      page="playbook"
      skipHref="#playbook-content"
      skipLabel="Skip to the playbook"
    >
      <Playbook
        current="costs"
        eyebrow="What it actually costs"
        meta="5 min read"
        title="The honest monthly bill."
        lead={
          <>
            <p>
              Most &ldquo;AI agent&rdquo; sites are vague about money. Here&apos;s the real picture: roughly what Carson
              pays per month at his volume (property portfolio, 24/7 voice and text agent, {operatingStats.routines} scheduled
              jobs, and {numberWord(operatingStats.agents)} AI specialists), and what the cheapest possible version costs if you&apos;re starting tonight.
            </p>
            <p>
              These are honest estimates, not invoices. Your actual bill depends on call volume, message volume, model
              choice, and how aggressive you get with caching.
            </p>
            <p>
              <small>Counts verified {snapshotDate} · some prices still being confirmed</small>
            </p>
          </>
        }
      >
        <Section label="Cheapest possible version" title="~$20 / month.">
          <Lead>If you only build the 30-minute quickstart, here&apos;s what it costs:</Lead>
          <CostTable
            label="Cheapest version costs"
            head={["Service", "What you use it for", "Monthly cost"]}
            rows={[
              ["Claude (the AI)", "One short summary every morning.", "~$3"],
              ["Telegram", "The chat where it messages you and you approve.", "$0 (free)"],
              ["Your computer", "Runs the schedule itself. No rented server needed.", "$0"],
              ["Room for extra questions", "Asking the AI things through the day on the same account.", "~$15"],
            ]}
            total={<strong>~$18 / month</strong>}
          />
          <Callout>
            <p>
              <strong>Stays under $20 if</strong>{" "}you use the smallest, cheapest Claude model for everyday work and
              only use the bigger ones when a question is truly hard. Most days, the small one is fine.
            </p>
          </Callout>
        </Section>

        <Section label="Mid-tier version" title="~$60–$135 / month.">
          <Lead>
            If you add a few real workflows (scheduled jobs, a shared dashboard, automatic inbox sorting) but still no
            phone line:
          </Lead>
          <CostTable
            label="Mid-tier costs"
            head={["Service", "Role", "Monthly cost"]}
            rows={[
              ["Claude (the AI)", "Daily summaries, about ten scheduled jobs, and your own questions.", "$30–60"],
              ["OpenAI (a second AI)", "Building scripts and giving second opinions.", "$20–40"],
              ["Notion", "Dashboards and shared lists.", "$10 (Plus plan)"],
              ["Vercel", "Hosting for a website. Free until it gets busy.", "$0–20"],
              ["Cloudflare", "Only if you need a small always-on web service. The free tier is generous.", "$0–5"],
              ["Domain name", "Optional but nice.", "~$1 (amortized)"],
            ]}
            total={<strong>~$60–135 / month</strong>}
          />
        </Section>

        <Section label="Carson's full setup" title="$400+ / month.">
          <Lead>
            The real bill for the system on the <Link href="/systems">Systems page</Link>{" "}— 24/7 voice and text agent,
            property operations, {operatingStats.routines} scheduled jobs, and {operatingStats.macJobs} Mac background services. The two AI plans alone
            are about $400/month. The pay-as-you-go items below are still being added up, so no grand total is shown
            yet:
          </Lead>
          <CostTable
            label="Full setup costs"
            head={["Service", "Role", "Monthly cost"]}
            rows={[
              [
                "OpenAI / Codex",
                "The OpenAI plan. Runs maintenance, system upkeep, and market research, and is the backup if Claude is unavailable.",
                "~$200 (plan)",
              ],
              [
                "Anthropic Claude",
                "The Claude plan. Runs the dispatcher, leasing, collections, Lyra, and record-keeping.",
                "~$200 (plan)",
              ],
              ["Claude, pay-as-you-go", "Drafting Lyra's text replies.", "Based on use"],
              ["xAI Grok", "Quick research and web searches.", "Subscription (price to confirm)"],
              ["ElevenLabs", "Lyra's voice. Cost rises with call minutes.", "Subscription (tier to confirm)"],
              [
                "Twilio",
                "The phone number, two-way texting, and emergency texts.",
                "Based on use",
              ],
              [
                "AppFolio",
                "Property management software. Per-unit pricing.",
                "$$$ (separate business cost; not really “AI cost”)",
              ],
              ["Vercel", "Hosting for this website and others.", "Plan (to confirm)"],
              ["Cloudflare", "The small web service behind Lyra's texting and approval links.", "Plan (to confirm)"],
              ["Google Workspace", "Six email accounts.", "Per account (to confirm)"],
              ["Cursor", "An AI tool for building and changing the scripts.", "Subscription (to confirm)"],
            ]}
            total={
              <>
                <strong>$400+ / month</strong>{" "}for the two AI plans, plus the pay-as-you-go items above (a fresh total is
                still being added up; AppFolio not included)
              </>
            }
          />
          <Callout>
            <p>
              <strong>Important context:</strong>{" "}Carson is running this for a real property-management business. The
              cost takes the place of hours of his own time each week plus a part-time assistant. The math works
              because the alternative is not $0. It is another hire, or more things falling through.
            </p>
          </Callout>
        </Section>

        <Section label="How to keep it cheap" title="Where the money goes.">
          <Cards>
            <Card title="Use the cheap AI by default">
              <p>
                Everyday summarizing and sorting should run on a small, cheap AI. Save the big expensive one for
                unclear questions, reviews, and real judgment calls.
              </p>
            </Card>
            <Card title="Don't pay twice for the same reading">
              <p>
                If every job starts by reading the same long background notes, set it up so those notes are reused
                instead of re-read at full price each time. Paying for the same reading over and over is how a good
                idea turns into a big bill.
              </p>
            </Card>
            <Card title="Keep the expensive AI off the schedule">
              <p>
                The biggest AI models cost too much for &ldquo;just check this every 15 minutes&rdquo; jobs. Use a
                cheap one for routine schedules and save the expensive one for real reviews.
              </p>
            </Card>
            <Card title="The phone line is the wildcard">
              <p>
                The voice service charges by the minute. If your business gets few calls, it is cheap. At 50 or
                more calls a day, the monthly plan plus per-minute charges add up fast.
              </p>
            </Card>
          </Cards>
        </Section>

        <Section label="The honest math" title="Compare to the alternative." tone="dark">
          <p>
            If this system saves you 8 hours a week (a conservative estimate at Carson&apos;s full scale) and your time is
            worth $50/hr, that&apos;s about $1,740/month of recovered time against a bill that starts around $400/month for
            the AI plans. The hard part is being honest with yourself about whether you&apos;d actually <em>do</em>{" "}
            something productive with the recovered hours.
          </p>
        </Section>

        <Section id="impact" label="The headline" title="~8 hours per week, recovered.">
          <Lead>
            Across all workflows combined, the system replaces about 8 hours of weekly work for me at property-portfolio
            scale. Not all of that is &ldquo;time off&rdquo; — most of it gets reabsorbed by higher-leverage work I
            couldn&apos;t get to before.
          </Lead>
          <TableWrap label="Weekly time saved by workflow">
            <thead>
              <tr>
                <th scope="col">Workflow</th>
                <th scope="col">Before (hr/wk)</th>
                <th scope="col">After (hr/wk)</th>
                <th scope="col">Saved</th>
              </tr>
            </thead>
            <tbody>
              {(
                [
                  ["Phone intake (leasing, maintenance, vendor)", "4.0", "0.5", "3.5 hr"],
                  ["Sorting six inboxes", "3.0", "0.5", "2.5 hr"],
                  ["Daily property/occupancy/work-order check-in", "1.5", "0.25", "1.25 hr"],
                  ["Weekly collections and rent review prep", "1.5", "0.5", "1.0 hr"],
                  ["Weekly late-rent report", "0.75", "0.1", "0.65 hr"],
                  ["Vendor follow-ups", "1.0", "0.4", "0.6 hr"],
                  ["Tracking lease renewals", "0.5", "0.1", "0.4 hr"],
                ] as const
              ).map(([workflow, before, after, saved]) => (
                <tr key={workflow}>
                  <td>
                    <strong>{workflow}</strong>
                  </td>
                  <td>{before}</td>
                  <td>{after}</td>
                  <td>
                    <strong>{saved}</strong>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan={3}>
                  <strong>Total weekly saving</strong>
                </td>
                <td>
                  <strong>~9.9 hr</strong>
                </td>
              </tr>
            </tbody>
          </TableWrap>
          <Callout>
            <p>
              <strong>Caveat:</strong>{" "}~2 hr/wk of new work appeared — keeping the system tuned, fixing things that
              broke, reviewing logs. So net is roughly 8 hours/wk, not 10.
            </p>
          </Callout>
        </Section>

        <Section label="Where the wins came from" title="Two workflows do most of the work.">
          <Lead>
            If you only build the top two from the table above (phone intake and inbox sorting), you capture{" "}
            <strong>about 60% of the total savings</strong>. The rest is incremental.
          </Lead>
          <Cards>
            <Card title="1. Lyra (phone + text intake) — biggest single win">
              <p>
                Before: every leasing inquiry, every maintenance call, every vendor question went to my phone. I&apos;d
                answer, take notes, remember to follow up later, often forget.
              </p>
              <p>
                After: Lyra answers calls and texts 24/7. Tour requests are saved for me automatically. Maintenance issues are
                written up with the full conversation. Emergencies reach my phone right away. Vendor calls become
                tidy notes. I review what happened in the morning instead of being interrupted all day.
              </p>
              <p>
                <strong>Real value</strong>: not the saved hours — the <em>uninterrupted focus blocks</em>. Hard to put
                a number on, but it&apos;s the thing I&apos;d miss most if it broke.
              </p>
            </Card>
            <Card title="2. Inbox sorting — second biggest">
              <p>
                Before: six Gmail accounts, hundreds of messages a day, most of it noise but all of it had to be skimmed
                in case something mattered.
              </p>
              <p>
                After: every five minutes the system sorts new mail, shows me what needs my attention, and quietly
                files the rest. I open Gmail twice a day instead of constantly.
              </p>
              <p>
                <strong>Real value</strong>: getting &ldquo;did I miss anything?&rdquo; anxiety down to near zero.
              </p>
            </Card>
          </Cards>
        </Section>

        <Section label="Where it didn't help much" title="Where automation was not worth it.">
          <Lead>Honest counter: not every workflow benefited. A few I built, ran for a month, and turned off.</Lead>
          <TableWrap label="Workflows that did not pay off">
            <thead>
              <tr>
                <th scope="col">Workflow</th>
                <th scope="col">Why it didn&apos;t pay off</th>
              </tr>
            </thead>
            <tbody>
              {(
                [
                  [
                    "The first “morning newsletter” agent",
                    "Generated a daily digest of property news. Pretty. Useful for two days. After that I stopped reading it. Disabled. A later, shorter personal newsletter stuck.",
                  ],
                  [
                    "“Evening wrap-up” job",
                    "Sent me a summary of the day's events at 6 PM. The events were already in my Telegram thread; the summary was redundant. Disabled.",
                  ],
                  [
                    "Status update four times a day",
                    "Messaged me four times a day with a status update. I started ignoring them. Cut to once a day.",
                  ],
                  [
                    "Auto-drafted vendor emails",
                    "The drafts needed enough editing that writing from scratch was almost as fast. Kept the part that gathers the facts, dropped the automatic draft.",
                  ],
                ] as const
              ).map(([workflow, why]) => (
                <tr key={workflow}>
                  <td>
                    <strong>{workflow}</strong>
                  </td>
                  <td>{why}</td>
                </tr>
              ))}
            </tbody>
          </TableWrap>
          <Callout>
            <p>
              <strong>Pattern:</strong>{" "}jobs that produce <em>more</em>{" "}things to read tend to fail. Jobs that produce{" "}
              <em>fewer</em>{" "}things to do tend to succeed. Default to &ldquo;this should reduce my inbox by N
              items,&rdquo; not &ldquo;this should add a daily report.&rdquo;
            </p>
          </Callout>
        </Section>

        <Section label="Where the saved time goes" title="The honest answer: other work fills it.">
          <Lead>
            If you&apos;re picturing 8 hours of free time appearing in your week — manage your expectations. Some of it
            gets eaten by:
          </Lead>
          <Cards>
            <Card title="More valuable work">
              <p>
                The work I always wanted to do — building more, planning more, talking with residents instead of sorting
                their messages — but didn&apos;t have time for. This is the good kind.
              </p>
            </Card>
            <Card title="Looking after the system">
              <p>
                Roughly 1-2 hr/week. Fixing things that broke, improving instructions, tidying the notebook.
                It is overhead, but small.
              </p>
            </Card>
            <Card title="New experiments">
              <p>
                Once you have a working system, you start having ideas for new workflows. Each one takes a few hours to
                design and build. This is the bad kind. It can swallow your time if you let it.
              </p>
            </Card>
            <Card title="Actual time off">
              <p>
                The thing I underestimated: just being able to <em>not check Telegram every 20 minutes</em>.
                Unmeasurable. Most valuable.
              </p>
            </Card>
          </Cards>
        </Section>

        <Section label="The honest dollar math" title="Time × hourly value vs. monthly bill.">
          <Lead>If your time is worth $X/hour and the system saves you 8 hours/week, the rough math:</Lead>
          <TableWrap label="Return on time saved">
            <thead>
              <tr>
                <th scope="col">If your hour is worth…</th>
                <th scope="col">Monthly value of 8 hr/wk</th>
                <th scope="col">Compared with the ~$400/month for AI plans</th>
              </tr>
            </thead>
            <tbody>
              {(
                [
                  ["$25 (admin time)", "$870", "~2x return"],
                  ["$50 (skilled professional)", "$1,740", "~4x return"],
                  ["$100 (your time on real work)", "$3,480", "~9x return"],
                  ["$200 (founder/owner doing $200/hr work)", "$6,960", "~17x return"],
                ] as const
              ).map(([rate, value, ret]) => (
                <tr key={rate}>
                  <td>{rate}</td>
                  <td>{value}</td>
                  <td>{ret}</td>
                </tr>
              ))}
            </tbody>
          </TableWrap>
          <Callout>
            <p>
              <strong>The honest catch:</strong>{" "}these returns only matter if you actually <em>do</em>{" "}something with
              the recovered time. If you&apos;d just spend it on Twitter, your effective hourly rate during the saved
              hours is $0, and the math collapses to &ldquo;this is an expensive way to read more news.&rdquo;
            </p>
            <p>
              Be honest with yourself about what you&apos;d actually do with the time before deciding whether the bill
              is worth it.
            </p>
          </Callout>
        </Section>

        <DontBuild
          id="honest"
          title="You don't have recurring work."
          lead={
            <>
              The whole point of the system is automating things you do <em>over and over</em>. If every project and
              every conversation is different, building the system costs more than just doing the work.
            </>
          }
        >
          Examples: solo creative work, one-off consulting projects, deal-making where every deal is its own beast. Save
          your money. Use a notes app and a calendar.
        </DontBuild>

        <DontBuild
          title="You're a solo freelancer with 1-3 clients."
          lead={
            <>
              At that scale, the system&apos;s overhead exceeds its benefit. Three clients fits in your head. The minute
              you build a system around them, you have added complexity without gaining much.
            </>
          }
        >
          What you probably want instead: a Notion database, a calendar, and one weekly review session. Maybe a Claude
          tab open during prep. Don&apos;t build a 30-job system to look after three clients.
        </DontBuild>

        <DontBuild
          title="You don't have a computer you control."
          lead={
            <>
              This approach runs on your own computer: a Mac or Linux machine that stays on, where you are allowed to
              install things and schedule jobs. If your only computer is a locked-down work laptop, it will not
              work.
            </>
          }
        >
          Online tools like Zapier, Make, and n8n do similar things without your own computer. The ideas in this
          playbook still apply, but the setup will look very different.
        </DontBuild>

        <DontBuild
          title="You expect to never look at the system again after building it."
          lead={
            <>
              &ldquo;Set and forget&rdquo; is a fantasy. Software changes, logins expire, odd cases break things, and AI
              models get retired. Carson&apos;s system needs about 1-2 hours/week of maintenance to stay healthy.
            </>
          }
        >
          If you don&apos;t enjoy the occasional evening of fixing things, this isn&apos;t for you. Pay someone to do the
          tasks instead. The cheapest virtual assistant is more reliable than a system nobody looks after.
        </DontBuild>

        <DontBuild
          title={"Your information is too sensitive to leave your building."}
          lead={
            <>
              This system sends data to Anthropic, OpenAI, ElevenLabs, Cloudflare, Google, etc. Each company has
              its own privacy rules, but each one is also your information leaving your computer.
            </>
          }
        >
          If you handle legally protected information (medical records, attorney-client material, some financial
          data), you need a different setup, one where the AI runs entirely on machines you own and has been
          audited. Don&apos;t build the home-made version for that kind of work.
        </DontBuild>

        <DontBuild
          title="You're trying to automate a person's job to avoid hiring."
          lead={
            <>
              This pattern works for <em>your own</em>{" "}repetitive work — the things you could describe
              step by step but don&apos;t have time to do every time.
            </>
          }
        >
          It does <em>not</em>{" "}replace a real person in a role that needs judgment, accountability, or
          relationships. If you&apos;re shopping for &ldquo;the AI version of an admin assistant&rdquo; because you
          don&apos;t want to pay for one, you&apos;re going to be disappointed and probably annoyed.
        </DontBuild>

        <Section label="Build this if" title="You DO fit this profile.">
          <Lead>The honest description of who this works for:</Lead>
          <Cards>
            <Card title="You run a small operation with recurring patterns">
              <p>
                Property management, small e-commerce, consulting practice with 10+ clients, freelance shop with similar
                deliverables every month, a side business with predictable workflows.
              </p>
            </Card>
            <Card title="You enjoy tinkering">
              <p>
                You don&apos;t need to be a developer, but you need to enjoy the act of building. The system gets better
                the more attention you give it.
              </p>
            </Card>
            <Card title="You have a computer you control">
              <p>A Mac or Linux machine that stays on, where you can install things without asking anyone.</p>
            </Card>
            <Card title="Your time is worth more than $50/hr to you">
              <p>The cost math works out. Below that hourly rate, paying a virtual assistant is often cheaper and more reliable.</p>
            </Card>
            <Card title="You're willing to start small">
              <p>
                Build the <Link href="/systems/playbook#quickstart">30-minute quickstart</Link>{" "}first. Run it for a
                week. Add the next piece only when the first one is boring. Resist the urge to design the whole thing on
                day one.
              </p>
            </Card>
            <Card title="You like keeping your own notes">
              <p>
                The shared notebook of plain text files is the part most people skip. If you like having your own
                notes in your own files, this will suit you. If you prefer everything in online apps, it will feel
                strange.
              </p>
            </Card>
          </Cards>
        </Section>

        <Section id="team" label="For a team" title="Who covers what on a property team.">
          <TableWrap label="Portfolio team lane map">
            <thead>
              <tr>
                <th scope="col">Lane</th>
                <th scope="col">Covers</th>
                <th scope="col">What comes in</th>
                <th scope="col">Needs a person&apos;s yes</th>
              </tr>
            </thead>
            <tbody>
              {(
                [
                  [
                    "Front desk",
                    "Daily coordination, sending work to the right place, final review.",
                    "Requests from the team, questions that cross areas, problems passed up.",
                    "Anything that changes rules, systems, or priorities.",
                  ],
                  [
                    "Leasing",
                    "Availability, tours, applications, follow-up.",
                    "Calls, emails, forms, lead sources, calendar requests.",
                    "Pricing changes, lease terms, sensitive applicant decisions.",
                  ],
                  [
                    "Maintenance",
                    "Work orders, vendor coordination, emergencies.",
                    "Tenant reports, inspections, vendor updates, photos.",
                    "Sending someone out, approving spending, emergencies, messages that affect residents.",
                  ],
                  [
                    "Finance",
                    "Reports, owner statements, invoices, cash review.",
                    "Bank data, accounting exports, invoices, budgets.",
                    "Payments, owner-facing numbers, material adjustments.",
                  ],
                  [
                    "Collections",
                    "Reviewing late rent and preparing follow-ups.",
                    "Past-due balances, payment plans, resident history.",
                    "Notices, legal escalation, payment-plan commitments.",
                  ],
                  [
                    "Phone and messages",
                    "Calls, messages, common questions, first sorting.",
                    "Phone, SMS, website forms, email.",
                    "Outbound messages, sensitive identity or account questions.",
                  ],
                  [
                    "Upkeep",
                    "Health checks, downloads, backups, cleanup.",
                    "Failed jobs, stuck lists, missing records.",
                    "Any repair that changes the live system or its logins.",
                  ],
                  [
                    "Record-keeping",
                    "How-to guides, lessons, and the history of decisions.",
                    "Notes after a job, repeated mistakes, policy changes.",
                    "Anything published, lasting policy changes, sensitive details.",
                  ],
                ] as const
              ).map(([lane, owns, inputs, gate]) => (
                <tr key={lane}>
                  <td>
                    <strong>{lane}</strong>
                  </td>
                  <td>{owns}</td>
                  <td>{inputs}</td>
                  <td>{gate}</td>
                </tr>
              ))}
            </tbody>
          </TableWrap>
        </Section>

        <Section label="For a manager" title="Four questions to ask every week.">
          <Cards>
            <Card title="What arrived?">
              <p>
                Count the new leads, work orders, owner questions, money problems, late-rent cases, and support
                requests.
              </p>
            </Card>
            <Card title="What moved?">
              <p>Show the work that was handed off, drafted, checked, approved, sent, finished, or passed up.</p>
            </Card>
            <Card title="What is blocked?">
              <p>List the approvals waiting on a person, downloads that failed, overdue follow-ups, and missing information.</p>
            </Card>
            <Card title="What should change?">
              <p>Turn anything that keeps causing confusion into a written guide or a fix to the automation.</p>
            </Card>
          </Cards>
        </Section>
      </Playbook>
    </FieldManualChrome>
  );
}
