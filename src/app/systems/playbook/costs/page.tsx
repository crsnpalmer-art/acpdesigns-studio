import type { Metadata } from "next";
import Link from "next/link";
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
      page="systems"
      skipHref="#playbook-content"
      skipLabel="Skip to the playbook"
      rail={["v1.0", "Playbook", "Costs"]}
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
              pays per month at his volume (property portfolio, 24/7 voice and text agent, 32 enabled scheduled jobs,
              and nine Hermes profiles), and what the cheapest possible version costs if you&apos;re starting tonight.
            </p>
            <p>
              These are honest estimates, not invoices. Your actual bill depends on call volume, message volume, model
              choice, and how aggressive you get with caching.
            </p>
            <p>
              <small>Counts verified 2026-10-01 · some prices still being confirmed</small>
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
              ["Anthropic API", "One Claude Haiku call per day for the morning brief.", "~$3"],
              ["Telegram", "Bot for notifications + approvals.", "$0 (free)"],
              ["Your Mac", "cron runs locally. No server needed.", "$0"],
              ["Buffer for ad-hoc Claude calls", "Asking Claude questions throughout the day from the same key.", "~$15"],
            ]}
            total={<strong>~$18 / month</strong>}
          />
          <Callout>
            <p>
              <strong>Stays under $20 if</strong>{" "}you stick to Haiku for routine work and only reach for Sonnet/Opus
              when you need real reasoning. Most days, Haiku is fine.
            </p>
          </Callout>
        </Section>

        <Section label="Mid-tier version" title="~$60–$135 / month.">
          <Lead>
            If you add a few real workflows (scheduled jobs, a Notion dashboard, automated inbox triage), but still no
            voice agent:
          </Lead>
          <CostTable
            label="Mid-tier costs"
            head={["Service", "Role", "Monthly cost"]}
            rows={[
              ["Anthropic API", "Daily briefs + ~10 scheduled jobs + interactive use.", "$30–60"],
              ["OpenAI API (Codex)", "Code/script work, second-opinion reviews.", "$20–40"],
              ["Notion", "Dashboards, databases, the planning surface.", "$10 (Plus plan)"],
              ["Vercel", "A public site on the free hobby tier, paid only if you exceed limits.", "$0–20"],
              ["Cloudflare Workers", "If you're doing edge automation. Free tier is generous.", "$0–5"],
              ["Domain name", "Optional but nice.", "~$1 (amortized)"],
            ]}
            total={<strong>~$60–135 / month</strong>}
          />
        </Section>

        <Section label="Carson's full setup" title="$400+ / month.">
          <Lead>
            The real bill for the system on the <Link href="/systems">operating map</Link>{" "}— 24/7 voice and text agent,
            property operations, 32 enabled scheduled jobs, and 6 Mac background services. The two AI model plans alone
            are about $400/month; the usage-based items below are being re-tallied, so no grand total is shown until
            that&apos;s done:
          </Lead>
          <CostTable
            label="Full setup costs"
            head={["Service", "Role", "Monthly cost"]}
            rows={[
              [
                "OpenAI / Codex",
                "Codex Pro plan — three specialist lanes (finance, ops, maintenance on GPT-6.1), backup for the Claude lanes, and all helper tasks (vision, compression, titles).",
                "~$200 (plan)",
              ],
              [
                "Anthropic Claude",
                "Claude Max plan — the Dispatcher plus the work, collections, Lyra, and memory lanes (Claude Opus 5.5).",
                "~$200 (plan)",
              ],
              ["Anthropic API", "Lyra's text-reply drafts.", "Pay-as-you-go (usage-based)"],
              ["xAI / Grok", "The tweeter lane (Grok 4.7), web search, and X search.", "Subscription plan (price to confirm)"],
              ["ElevenLabs", "Lyra's voice; cost scales with call minutes.", "Subscription (tier to confirm)"],
              [
                "Twilio",
                "Phone number, two-way texting, emergency SMS. Pay-as-you-go credit reloads.",
                "Usage-based",
              ],
              [
                "AppFolio",
                "Property management software. Per-unit pricing.",
                "$$$ (separate business cost; not really “AI cost”)",
              ],
              ["Vercel", "Multi-site hosting (this site and other projects).", "Plan (to confirm)"],
              ["Cloudflare Workers", "Lyra's worker: phone webhooks, texts, and signed approval links.", "Plan (to confirm)"],
              ["Google Workspace", "6 Gmail accounts.", "Per-seat (to confirm)"],
              ["Cursor", "AI code editor for building and editing scripts.", "Subscription (to confirm)"],
            ]}
            total={
              <>
                <strong>$400+ / month</strong>{" "}in model plans, plus the usage-based items above (fresh total pending;
                excludes AppFolio)
              </>
            }
          />
          <Callout>
            <p>
              <strong>Important context:</strong>{" "}Carson is running this for a real property-management business. The
              cost replaces (or augments) what would otherwise be hours of his time per week + a part-time admin. The
              math works because the alternative isn&apos;t $0 — it&apos;s more headcount or more chaos.
            </p>
          </Callout>
        </Section>

        <Section label="How to keep it cheap" title="Where the money goes.">
          <Cards>
            <Card title="Use the cheap path by default">
              <p>
                Routine summarization, classification, and extraction should run on cheaper/default model paths. Save
                the heavyweight reasoning pass for ambiguous business logic, audits, and real judgment calls.
              </p>
            </Card>
            <Card title="Cache aggressively">
              <p>
                If your system prompt and wiki context are mostly the same across scheduled runs, cache or reuse that
                context aggressively. Re-sending the same giant setup note every time is how a good idea turns into a
                stupid bill.
              </p>
            </Card>
            <Card title="Don't run expensive models on a schedule">
              <p>
                Big reasoning models are too expensive for &ldquo;just check this every 15 minutes&rdquo; jobs. Use
                cheaper/default paths for routine schedules and save the expensive model passes for real reviews.
              </p>
            </Card>
            <Card title="Voice is the wildcard">
              <p>
                ElevenLabs cost scales with call minutes. If your business doesn&apos;t get many calls, voice is cheap.
                If you&apos;re answering 50+ calls a day, Pro plan + per-minute charges add up fast.
              </p>
            </Card>
          </Cards>
        </Section>

        <Section label="The honest math" title="Compare to the alternative." tone="dark">
          <p>
            If this system saves you 8 hours a week (a conservative estimate at Carson&apos;s full scale) and your time is
            worth $50/hr, that&apos;s $1,600/month of recovered time against a bill that starts around $400/month in
            model plans. The hard part is being honest with yourself about whether you&apos;d actually <em>do</em>{" "}
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
                  ["Inbox triage across 6 accounts", "3.0", "0.5", "2.5 hr"],
                  ["Daily property/occupancy/work-order check-in", "1.5", "0.25", "1.25 hr"],
                  ["Weekly P&L review prep", "1.5", "0.5", "1.0 hr"],
                  ["Monthly delinquency sweep", "0.75", "0.1", "0.65 hr"],
                  ["Vendor follow-ups", "1.0", "0.4", "0.6 hr"],
                  ["Lease renewal pipeline", "0.5", "0.1", "0.4 hr"],
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
            If you only build the top two from the table above (phone intake + inbox triage), you capture{" "}
            <strong>75% of the total savings</strong>. The rest is incremental.
          </Lead>
          <Cards>
            <Card title="1. Lyra (phone + text intake) — biggest single win">
              <p>
                Before: every leasing inquiry, every maintenance call, every vendor question went to my phone. I&apos;d
                answer, take notes, remember to follow up later, often forget.
              </p>
              <p>
                After: Lyra answers calls and texts 24/7. Tour requests get queued automatically. Maintenance issues get
                logged with the transcript. Emergencies hit my phone immediately. Vendor calls become structured
                records. I review what happened in the morning instead of being interrupted all day.
              </p>
              <p>
                <strong>Real value</strong>: not the saved hours — the <em>uninterrupted focus blocks</em>. Hard to put
                a number on, but it&apos;s the thing I&apos;d miss most if it broke.
              </p>
            </Card>
            <Card title="2. Inbox triage — second biggest">
              <p>
                Before: six Gmail accounts, hundreds of messages a day, most of it noise but all of it had to be skimmed
                in case something mattered.
              </p>
              <p>
                After: a 5-minute polling job classifies new mail, surfaces what needs my attention, and silently
                archives the rest. I open Gmail twice a day instead of constantly.
              </p>
              <p>
                <strong>Real value</strong>: getting &ldquo;did I miss anything?&rdquo; anxiety down to near zero.
              </p>
            </Card>
          </Cards>
        </Section>

        <Section label="Where it didn't help much" title="Workflows where automation was a wash.">
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
                    "4× daily ops check-in",
                    "Pinged me 4 times a day with a status snapshot. Created notification fatigue. Reduced to 1× daily.",
                  ],
                  [
                    "Auto-drafted vendor emails",
                    "The drafts needed enough editing that writing from scratch was almost as fast. Kept the structured-data part, dropped the auto-draft.",
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

        <Section label="Where the saved time goes" title="The honest answer: it gets reabsorbed.">
          <Lead>
            If you&apos;re picturing 8 hours of free time appearing in your week — manage your expectations. Some of it
            gets eaten by:
          </Lead>
          <Cards>
            <Card title="Higher-leverage work">
              <p>
                The work I always wanted to do — building more, planning more, talking to tenants instead of triaging
                tenants — but didn&apos;t have time for. This is the good reabsorption.
              </p>
            </Card>
            <Card title="System maintenance">
              <p>
                Roughly 1-2 hr/week. Fixing things that broke, tuning prompts, archiving old logs, updating the wiki.
                Pure overhead, but small.
              </p>
            </Card>
            <Card title="New experiments">
              <p>
                Once you have a working system, you start having ideas for new workflows. Each one takes a few hours to
                design + ship. This is the bad reabsorption — it can balloon if you don&apos;t discipline yourself.
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
                <th scope="col">vs. the ~$400/mo model-plan floor (upper bound)</th>
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
              The whole point of the system is automating <em>repeated</em>{" "}patterns. If your work is bespoke — every
              project different, every conversation new — the cost of building the pattern exceeds the cost of just
              doing the work.
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
              you try to put them in an &ldquo;agent lane,&rdquo; you&apos;ve added complexity without earning much.
            </>
          }
        >
          What you probably want instead: a Notion database, a calendar, and one weekly review session. Maybe a Claude
          tab open during prep. Don&apos;t build a 30-job system to manage three clients.
        </DontBuild>

        <DontBuild
          title="You don't have a Mac (or a Linux machine you control)."
          lead={
            <>
              The &ldquo;local-first&rdquo; part of &ldquo;local-first automation&rdquo; assumes a machine you can
              install background services on, run scheduled jobs on, and trust to be powered on. If your only computer
              is a work laptop with locked-down IT policies, this pattern doesn&apos;t apply.
            </>
          }
        >
          Cloud-only alternatives exist (Zapier, Make, n8n) — they have different tradeoffs. The patterns from this
          playbook still apply, but the implementation will look very different.
        </DontBuild>

        <DontBuild
          title="You expect to never look at the system again after building it."
          lead={
            <>
              &ldquo;Set and forget&rdquo; is a fantasy. APIs change, tokens expire, edge cases break things, models get
              deprecated. Carson&apos;s system needs about 1-2 hours/week of maintenance to stay healthy.
            </>
          }
        >
          If you don&apos;t enjoy occasional debugging sessions, this isn&apos;t for you. Pay someone to do your tasks
          instead. The cheapest virtual assistant is more reliable than an unmaintained agent system.
        </DontBuild>

        <DontBuild
          title={"Your data is so sensitive that “local-ish” isn't local enough."}
          lead={
            <>
              This system sends data to Anthropic, OpenAI, ElevenLabs, Cloudflare, Google, etc. Each one is a vendor
              with terms of service and a privacy posture, but each one is also data leaving your machine.
            </>
          }
        >
          If you&apos;re handling regulated data (HIPAA, attorney-client privilege, certain financial categories), you
          need a different architecture — likely on-prem inference with audited models. Don&apos;t build the home-grown
          version above the line where compliance bites.
        </DontBuild>

        <DontBuild
          title="You're trying to automate a person's job to avoid hiring."
          lead={
            <>
              This pattern works for <em>your own</em>{" "}repetitive work — the stuff a competent operator can describe
              step-by-step but doesn&apos;t have time to do consistently.
            </>
          }
        >
          It does <em>not</em>{" "}replace a real human in a role that requires judgment, accountability, or relationship
          maintenance. If you&apos;re shopping for &ldquo;the AI version of an admin assistant&rdquo; because you
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
            <Card title="You have a Mac (or Linux box) you control">
              <p>Always-on, always-trusted, where you can install services without asking IT.</p>
            </Card>
            <Card title="Your time is worth more than $50/hr to you">
              <p>The cost math works out. Below that hourly rate, paying a VA is often cheaper and more reliable.</p>
            </Card>
            <Card title="You're willing to start small">
              <p>
                Build the <Link href="/systems/playbook#quickstart">30-minute quickstart</Link>{" "}first. Run it for a
                week. Add the next piece only when the first one is boring. Resist the urge to design the whole thing on
                day one.
              </p>
            </Card>
            <Card title="You have data you want to keep visible to yourself">
              <p>
                The Obsidian vault + plain markdown approach is the part most people skip. If you like having your own
                notes in your own files, this resonates. If you prefer everything in cloud apps, this approach will feel
                weird.
              </p>
            </Card>
          </Cards>
        </Section>

        <Section id="team" label="Lane map" title="A portfolio team version.">
          <TableWrap label="Portfolio team lane map">
            <thead>
              <tr>
                <th scope="col">Lane</th>
                <th scope="col">Owns</th>
                <th scope="col">Common inputs</th>
                <th scope="col">Approval gate</th>
              </tr>
            </thead>
            <tbody>
              {(
                [
                  [
                    "Control lane",
                    "Daily coordination, routing, final review.",
                    "Operator requests, cross-team questions, escalations.",
                    "Anything that changes rules, systems, or priorities.",
                  ],
                  [
                    "Leasing lane",
                    "Availability, tours, applications, follow-up.",
                    "Calls, emails, forms, lead sources, calendar requests.",
                    "Pricing changes, lease terms, sensitive applicant decisions.",
                  ],
                  [
                    "Maintenance lane",
                    "Work orders, vendor coordination, emergencies.",
                    "Tenant reports, inspections, vendor updates, photos.",
                    "Dispatch, spend approval, emergency escalation, tenant-impacting messages.",
                  ],
                  [
                    "Finance lane",
                    "Reports, owner statements, invoices, cash review.",
                    "Bank data, accounting exports, invoices, budgets.",
                    "Payments, owner-facing numbers, material adjustments.",
                  ],
                  [
                    "Collections lane",
                    "Delinquency review and follow-up preparation.",
                    "Aged receivables, payment plans, tenant history.",
                    "Notices, legal escalation, payment-plan commitments.",
                  ],
                  [
                    "Customer intake lane",
                    "Calls, messages, FAQs, first-pass triage.",
                    "Phone, SMS, website forms, email.",
                    "Outbound messages, sensitive identity or account questions.",
                  ],
                  [
                    "Reliability lane",
                    "Health checks, syncs, backups, logs, cleanup.",
                    "Failed jobs, stale queues, drift warnings, missing receipts.",
                    "Any repair that changes production systems or credentials.",
                  ],
                  [
                    "Memory lane",
                    "Runbooks, lessons, decision history, procedures.",
                    "After-action notes, repeated errors, policy changes.",
                    "Public docs, durable policy changes, sensitive context.",
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

        <Section label="Manager view" title="What leaders should ask every week.">
          <Cards>
            <Card title="What arrived?">
              <p>
                Count new leads, work orders, owner questions, finance exceptions, delinquency items, and support
                requests.
              </p>
            </Card>
            <Card title="What moved?">
              <p>Show the work that was routed, drafted, verified, approved, sent, closed, or escalated.</p>
            </Card>
            <Card title="What is blocked?">
              <p>List approvals waiting on a human, broken syncs, stale follow-ups, and missing data.</p>
            </Card>
            <Card title="What should change?">
              <p>Turn repeated confusion into a playbook update, dashboard change, or automation improvement.</p>
            </Card>
          </Cards>
        </Section>
      </Playbook>
    </FieldManualChrome>
  );
}
