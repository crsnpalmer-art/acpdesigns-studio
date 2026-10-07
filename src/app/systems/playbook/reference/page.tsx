import type { Metadata } from "next";
import Link from "next/link";
import FieldManualChrome from "@/components/field-manual/FieldManualChrome";
import Playbook, { Faq, Lead, Section, TableWrap } from "@/components/field-manual/Playbook";

const description =
  "Questions friends always ask about the AI operating setup, a plain-language glossary, and ten things that broke along the way — with the lesson from each.";

export const metadata: Metadata = {
  title: "Playbook: Reference | ACP Designs Studio",
  description,
  alternates: {
    canonical: "/systems/playbook/reference",
  },
  openGraph: {
    title: "Playbook: Reference | ACP Designs Studio",
    description,
    url: "/systems/playbook/reference",
    siteName: "ACP Designs Studio",
    type: "article",
  },
};

const glossary = [
  [
    "AI model",
    "A computer helper that reads, writes, reasons, codes, or sorts information.",
    "OpenAI/Codex edits code. Claude helps reason through plans.",
    "Give each model a job. Do not make one model do everything.",
  ],
  [
    "Hermes",
    "The local control center that routes work to agents and tools.",
    "It receives a message, picks a lane, runs a tool, and asks for approval if needed.",
    "Build a central place where work enters and gets assigned.",
  ],
  [
    "Gateway",
    "The always-on doorway between the app, agents, tools, and messages.",
    "The local Hermes gateway keeps the system reachable on the laptop.",
    "Have one boring, reliable entrypoint.",
  ],
  [
    "Agent",
    "A named helper with one type of job.",
    "Lyra handles voice and text intake. Collections handles delinquency reports.",
    "Give each agent one clear lane.",
  ],
  [
    "Lane",
    "An ownership area.",
    "Leasing lane, maintenance lane, finance lane, collections lane.",
    "If nobody owns it, it will get lost.",
  ],
  [
    "API",
    "A safe doorway for one software tool to talk to another.",
    "Google APIs read inboxes or update Sheets. Twilio sends texts.",
    "Use the smallest permission that works.",
  ],
  [
    "Cron",
    "An alarm clock for recurring jobs.",
    "Run a daily property sync or weekly finance report.",
    "Use cron when the job happens on a schedule and needs an agent.",
  ],
  [
    "LaunchAgent",
    "A macOS background service that keeps a local job alive.",
    "Gmail polling, the AppFolio pull, and the gateway itself.",
    "Use it for boring always-on services.",
  ],
  [
    "Workflow",
    "The path work follows from start to finish.",
    "Call comes in, Lyra summarizes it, a human approves the follow-up, the result is logged.",
    "Draw the path before you automate it.",
  ],
  [
    "System of record",
    "The official place where truth lives.",
    "AppFolio for property records. Google Sheets for a queue. The wiki for runbooks.",
    "Know which tool is allowed to be the truth.",
  ],
  [
    "Approval gate",
    "A required human yes before a risky action.",
    "Do not dispatch a work order or send a sensitive message without approval.",
    "Put the gate in the workflow, not just in a prompt.",
  ],
  [
    "Receipt",
    "Proof that the workflow ran correctly.",
    "A log line, screenshot, returned record, message ID, or dashboard update.",
    "No receipt, no claim that it worked.",
  ],
  [
    "Memory",
    "The notebook of what the system learned.",
    "A weekly lesson, runbook update, or search index entry.",
    "Write down durable lessons so the next run improves.",
  ],
  [
    "Lyra",
    "The voice and text customer-service lane.",
    "Lyra answers calls and texts, collects context, checks safe tools, and hands off sensitive work.",
    "Start inbound-only. Let the agent gather facts before taking action.",
  ],
] as const;

function Broke({
  id,
  label,
  title,
  lead,
  happened,
  did,
  lesson,
}: {
  id?: string;
  label: string;
  title: string;
  lead: React.ReactNode;
  happened: React.ReactNode;
  did: React.ReactNode;
  lesson: React.ReactNode;
}) {
  return (
    <Section id={id} label={label} title={title} tone="warn">
      <Lead>{lead}</Lead>
      <p>
        <strong>What happened:</strong> {happened}
      </p>
      <p>
        <strong>What I did:</strong> {did}
      </p>
      <p>
        <strong>Lesson:</strong> {lesson}
      </p>
    </Section>
  );
}

export default function PlaybookReferencePage() {
  return (
    <FieldManualChrome
      page="systems"
      skipHref="#playbook-content"
      skipLabel="Skip to the playbook"
      rail={["v1.0", "Playbook", "Reference"]}
    >
      <Playbook
        current="reference"
        eyebrow="Common questions"
        meta="6 min read"
        title="Things friends always ask."
        lead={
          <p>
            Click a question to expand. If you have one that&apos;s not here, the answer is probably: I&apos;m still
            figuring it out, or I&apos;d love to hear how you&apos;d handle it.
          </p>
        }
      >
        <Section label="Building it" title="Build & scope.">
          <Faq question="How long did this take to build?">
            <p>
              Roughly 6 months of evenings + weekends to get to what&apos;s on the operating map today. The first usable
              version (one scheduled job + Telegram approvals) was about a weekend. Lyra (then called Sarah) took maybe
              three weeks. The Obsidian wiki layer was a few weeks of refining. Most of the rest was incremental.
            </p>
            <p>
              Don&apos;t budget six months for yourself. Budget one weekend for the first useful version, then add a
              workflow per week as you notice patterns.
            </p>
          </Faq>
          <Faq question="Do I need to be a developer to build this?">
            <p>
              No, but you need to be comfortable copying code into a file, running shell commands, and reading error
              messages. If you&apos;ve ever set up a scheduled job or written a Python script, you&apos;re qualified.
            </p>
            <p>
              If you&apos;ve never opened a terminal: spend an hour learning the basics first. Then do the{" "}
              <Link href="/systems/playbook#quickstart">30-minute quickstart</Link>.
            </p>
          </Faq>
          <Faq question="What if I don't have a Mac?">
            <p>
              Linux works the same way (LaunchAgents become systemd units, but the pattern is identical). Windows is
              harder — you&apos;d want WSL2 + native cron alternatives, and a lot of the Hermes-specific tooling assumes
              Unix.
            </p>
            <p>
              For a Windows-first experience, look at cloud-based alternatives like n8n on a small VPS, or just run the
              AI parts locally and the scheduling parts on a Linux droplet for $5/month.
            </p>
          </Faq>
          <Faq question="Can I use ChatGPT instead of Claude?">
            <p>
              Yes. The pattern doesn&apos;t care which model you use. Substitute the OpenAI API where you see Anthropic.
              Switch the model name from <code>claude-haiku-4-5</code>{" "}to <code>gpt-5-mini</code>. Adjust the request
              body for OpenAI&apos;s slightly different format.
            </p>
            <p>
              That said: the reason I use both Claude and Codex (OpenAI) is because they catch each other&apos;s
              mistakes. Two AI vendors &gt; one. Pick whichever for night one; consider adding the other later.
            </p>
          </Faq>
          <Faq question="Why Telegram and not Slack / Discord / iMessage?">
            <p>
              Three reasons: bots are dead-simple to set up (no admin approval, no app review), the API is excellent,
              and topic-channels let me organize nine agent lanes inside one app instead of nine different inboxes.
            </p>
            <p>
              Slack works for team setups. iMessage doesn&apos;t have a usable bot API. Discord is fine but feels
              overbuilt for a 1-person operations channel.
            </p>
          </Faq>
        </Section>

        <Section label="Safety & trust" title="What happens when things go wrong.">
          <Faq question="What happens when an AI hallucinates a tool call or makes something up?">
            <p>
              This is the single most important question, and the answer is:{" "}
              <strong>the system is built so a hallucination can&apos;t actually do damage</strong>. Risky tools
              (account or money questions, legal issues, posting work orders, moving money) all stop at a Telegram
              approval gate, and scheduled jobs can&apos;t run risky commands at all. Routine, fact-only replies
              (property facts, prices, how-tos) can go out automatically, but only behind safety filters that hold
              anything uncertain for me.
            </p>
            <p>
              The hallucinations that DO sneak through are the small ones: a wrong date in a summary, a misclassified
              intent. Those I catch on the morning review. They&apos;re embarrassing, not dangerous.
            </p>
          </Faq>
          <Faq question="What if the gateway crashes overnight?">
            <p>
              launchd restarts the gateway; a Hermes job re-fires missed scheduled runs every 20 minutes; ops monitors
              check credentials and the browser profile daily and alert the ops lane.
            </p>
            <p>
              Net result: I&apos;ve had maybe one outage I noticed in 6 months, and the system told me about it before I
              noticed it organically.
            </p>
          </Faq>
          <Faq question="Is my data safe? Where does it go?">
            <p>
              Honest answer: it goes to whatever vendors I&apos;m calling. Anthropic, OpenAI, xAI, ElevenLabs, Twilio,
              Cloudflare, Google. Each one is a separate trust decision with separate ToS.
            </p>
            <p>
              What I keep <em>off</em>{" "}the page on this site: tokens, chat IDs, tenant data, addresses, financial info.
              What I keep <em>off</em>{" "}vendor APIs: anything I wouldn&apos;t want public. There&apos;s a{" "}
              <Link href="/systems">public-safety boundary</Link>{" "}I respect on every workflow.
            </p>
            <p>
              If your data is regulated (HIPAA, attorney-client, etc.), this architecture is wrong for you. Use on-prem
              inference instead.
            </p>
          </Faq>
          <Faq question="What if I don't notice a Telegram message and an emergency goes unhandled?">
            <p>
              Emergency-class events fire on a fast-path: dedicated Telegram channel + SMS to my personal number, in
              parallel. If I don&apos;t notice both, I have bigger problems than the AI system.
            </p>
            <p>
              For non-emergencies, the answer is: nothing terrible happens. The work sits in a queue. I review it next
              time I check the channel. Only routine, fact-only replies go out on their own; anything that needs
              judgment waits for me.
            </p>
          </Faq>
          <Faq question="How do I undo it if I hate it?">
            <p>
              That&apos;s actually the whole point of the architecture. Every scheduled job can be disabled with one
              line. Every LaunchAgent can be unloaded. The Obsidian vault is just a folder of markdown files — they
              don&apos;t go away when you uninstall anything.
            </p>
            <p>
              The reverse migration looks like: <code>launchctl unload ~/Library/LaunchAgents/*.plist</code>, comment
              out your crontab, cancel your subscriptions. The data and the notes stay yours.
            </p>
          </Faq>
        </Section>

        <Section label="Time & money" title="Budget, time, and ongoing maintenance.">
          <Faq question="Be honest — how much time per week does maintenance take?">
            <p>
              For me, ~1-2 hours/week. Some weeks zero, some weeks four when something breaks or I&apos;m tuning a new
              workflow. Average is ~90 minutes.
            </p>
            <p>
              Most of that is reading the morning Telegram thread, catching anything weird, and occasionally tightening
              a prompt. Not &ldquo;fixing the system&rdquo; — more like &ldquo;operating the system.&rdquo;
            </p>
          </Faq>
          <Faq question="What if I just want the cheap version?">
            <p>
              The 30-minute quickstart costs about $20/month total. That&apos;s a real, useful loop — daily AI brief,
              Telegram approval, one scheduled job. You can stop there and most people probably should.
            </p>
            <p>
              The <Link href="/systems/playbook/costs">full setup</Link>{" "}(its AI model plans alone run about
              $400/month) makes sense if you&apos;re running a real business with recurring operations. If you&apos;re an
              individual, the cheap version is probably enough.
            </p>
          </Faq>
          <Faq question="Did this actually save you money or just shift it?">
            <p>
              For me running a property business: it&apos;s saved money. The alternative would have been hiring a
              part-time admin (~$2,000/month at minimum) or accepting more dropped balls. A few hundred dollars a month
              for a system that handles intake 24/7 is a clear win.
            </p>
            <p>
              If I were running it as a personal productivity setup with no business behind it, I&apos;d probably break
              even on the cheap version and lose money on the full version. Be honest about the math for your
              situation.
            </p>
          </Faq>
        </Section>

        <Section label="Comparison" title="Why not just use…?">
          <Faq question="Why not Zapier or Make?">
            <p>
              Both are great for &ldquo;API A → API B&rdquo; pipelines. Where they fall down is anywhere you need real
              reasoning — classification, drafting, judgment, multi-step decisions. They also charge per-task at scale,
              which gets expensive fast.
            </p>
            <p>
              The sweet spot for the Hermes-style pattern is where you need <em>judgment</em>{" "}in the middle of the
              pipeline, not just data movement. If your workflow is &ldquo;when X happens, do Y&rdquo; with no thinking
              required, Zapier is probably easier.
            </p>
          </Faq>
          <Faq question="Why not n8n?">
            <p>
              Closer fit. n8n is the open-source Zapier and supports calling LLMs as nodes. It&apos;s a legitimate
              alternative if you prefer a visual workflow builder over writing scripts.
            </p>
            <p>
              What you give up: the &ldquo;everything is plain markdown + cron + a folder of scripts&rdquo; simplicity.
              n8n adds a database and a UI you have to maintain. Pick based on whether you&apos;d rather edit JSON nodes
              in a UI or edit Python scripts in a text editor.
            </p>
          </Faq>
          <Faq question="Why not just open ChatGPT and ask it stuff?">
            <p>
              That&apos;s actually a great starting point and I still do it daily for ad-hoc questions. The Hermes-style
              system isn&apos;t a replacement for chat — it&apos;s a way to make AI work happen{" "}
              <em>without you starting it every time</em>.
            </p>
            <p>
              If your workflow is &ldquo;I think to ask Claude something whenever I remember,&rdquo; chat is fine. If
              your workflow is &ldquo;this needs to happen every Tuesday at 9 AM whether I remember or not,&rdquo; you
              need the cron + approval pattern.
            </p>
          </Faq>
          <Faq question="Why not hire a virtual assistant instead?">
            <p>
              Honestly? For some workflows, a VA is cheaper and more reliable. The system shines when the work is
              high-frequency, low-judgment (Lyra&apos;s call intake), or needs context the VA wouldn&apos;t have (the
              wiki + memory layer).
            </p>
            <p>
              Best case is probably both: a VA for the things that need a person + an AI system for the patterns that
              benefit from machine speed. Don&apos;t think of it as either/or.
            </p>
          </Faq>
        </Section>

        <Section label="Have a question that's not here?" title="Ask me." tone="dark">
          <p>
            I&apos;ll add it. The whole point of this playbook is to compress the lessons so other people don&apos;t
            have to relearn them. If you hit a wall the playbook didn&apos;t help with, that&apos;s a gap worth fixing.
          </p>
        </Section>

        <Section id="glossary" label="Glossary" title="Terms in plain language.">
          <TableWrap label="Glossary">
            <thead>
              <tr>
                <th scope="col">Term</th>
                <th scope="col">Simple meaning</th>
                <th scope="col">Example</th>
                <th scope="col">Copy-it rule</th>
              </tr>
            </thead>
            <tbody>
              {glossary.map(([term, meaning, example, rule]) => (
                <tr key={term}>
                  <td>
                    <strong>
                      <dfn>{term}</dfn>
                    </strong>
                  </td>
                  <td>{meaning}</td>
                  <td>{example}</td>
                  <td>{rule}</td>
                </tr>
              ))}
            </tbody>
          </TableWrap>
        </Section>

          <Broke
            id="broke"
            label="№ 01 · Architecture"
            title="The gateway wrapper that wouldn't die."
            lead="Restored twice. Retired the third time."
            happened="Hermes ships a managed startup script for its gateway. I added a custom wrapper on top of it for some env-loading I wanted. Every time the framework auto-updated, it stripped my wrapper. I restored it. It got stripped again. I restored it again — different way this time. Stripped again."
            did={
              <>
                On the third strip, instead of restoring, I asked: <em>why does the framework keep doing this?</em>{" "}
                Turns out there was a sanctioned way to inject env that didn&apos;t fight the install flow. I moved my
                env keys to Hermes&apos;s own env file, deleted the wrapper for good, and now re-check the gateway
                service definition after every Hermes update.
              </>
            }
            lesson="If the framework keeps undoing your customization, the framework is telling you something. Stop restoring; start understanding the install path. The “right” answer was already in the docs — I just hadn't read them carefully enough."
          />

          <Broke
            label="№ 02 · Secrets"
            title="The API key that lived in two places."
            lead="A 401 took down Lyra's (then called Sarah) daily QA for half a day before I noticed."
            happened={
              <>
                I rotated the ElevenLabs API key as a routine hygiene step. Updated it in the main secrets store, where
                I thought it lived. The next morning, the daily QA review for Lyra (then called Sarah) failed with HTTP
                401. I dug in: a separate Python script was reading the key from a <em>second</em>{" "}location I&apos;d
                forgotten about — a leftover from an earlier setup.
              </>
            }
            did="Updated both stores. Added a memory note: “ELEVENLABS_API_KEY lives in TWO places. Rotation must update both.” Also added it to my routine rotation playbook so future me doesn't trip on it."
            lesson="Secrets duplicate. Every rotation needs an explicit list of every place the secret lives. If you can't list them, you don't really know your own system."
          />

          <Broke
            label="№ 03 · Compliance"
            title="The verbal consent gate that made Lyra (then called Sarah) sound robotic."
            lead="Shipped at 9 AM. Reverted by 5 PM the same day."
            happened="I added a verbal SMS-consent script to her prompt — “Before I send a text, can I confirm you consent…” — to satisfy what I thought was a CTIA requirement. It worked technically, but listening to the calls back, she sounded like a customer service script, not a person. Callers got annoyed. Quality dropped."
            did={
              <>
                Reverted same-day. Looked closer at the actual compliance requirements: SMS consent is already handled
                by the Twilio layer&apos;s footer + STOP/HELP machinery. The verbal gate was redundant <em>and</em>{" "}
                ruined the experience.
              </>
            }
            lesson="Don't put compliance scripts in the conversation layer when the layer below (Twilio, your CRM, your platform) already handles them. Layered systems mean each layer should do one job — letting compliance leak into the AI's mouth makes the whole thing sound canned."
          />

          <Broke
            label="№ 04 · Infrastructure"
            title="The Cloudflare Worker that kept timing out at exactly 30 seconds."
            lead="My AppFolio sync would start, look fine, and then return zero records."
            happened={
              <>
                I had a Cloudflare Worker that triggered an AppFolio Excel pull via Puppeteer, parsed it with SheetJS,
                wrote to KV. Worked fine for short pulls. Started failing on bigger ones with no error — just empty
                results. After a long debug, I learned: Cloudflare&apos;s <code>fetch</code>{" "}handler has a hard ~30s
                budget for the response. <code>waitUntil</code>{" "}doesn&apos;t extend it for fetch handlers — only for{" "}
                <em>scheduled</em>{" "}handlers.
              </>
            }
            did={
              <>
                Moved the long sync from a <code>/run</code>{" "}fetch endpoint to a Cloudflare scheduled trigger. Scheduled
                handlers have a much longer budget. Sync stopped failing. (Later I moved the AppFolio sync off Cloudflare
                entirely — it now runs locally on the Mac via Playwright, which sidesteps Worker timeouts altogether.)
              </>
            }
            lesson="Read the runtime limits before you architect. “It works for small inputs” is the most expensive false-positive in software. Cloudflare Workers, Vercel functions, AWS Lambda all have different timeout models — know which one applies to your handler shape."
          />

          <Broke
            label="№ 05 · Tooling"
            title="“Doctor --fix” mutated my install outside the install flow."
            lead="An auto-recovery tool made the situation worse."
            happened={
              <>
                Gateway looked weird. I ran <code>hermes doctor --fix</code>{" "}figuring it&apos;d auto-repair. It
                &ldquo;fixed&rdquo; things by mutating files outside the official install path. The next framework
                update detected the drift and broke harder.
              </>
            }
            did={
              <>
                Permanent rule: <strong>never</strong>{" "}run <code>doctor --fix</code>{" "}or <code>doctor --repair</code>.
                Use the documented recovery playbook instead. Even when the framework&apos;s own tooling offers an
                &ldquo;auto-fix&rdquo; button, default to manual.
              </>
            }
            lesson="Auto-fix tools optimize for common cases. Your case is probably uncommon (that's why you're debugging it). Always read what an auto-fix is about to do before you run it. If you can't find that documented, treat the tool as off-limits."
          />

          <Broke
            label="№ 06 · Browser automation"
            title="Downloads that silently never arrived."
            lead="Playwright said “navigation complete.” The file never existed."
            happened={
              <>
                I was using Playwright&apos;s <code>page.on(&apos;response&apos;)</code>{" "}to intercept an Excel download
                from AppFolio. It worked locally for some files, failed silently for others — no error, just no file.
                The page reported success, the response handler never fired.
              </>
            }
            did="Switched to Chrome DevTools Protocol (CDP) directly via the Fetch domain instead of the higher-level page event. The Fetch domain catches downloads the page-event API misses (especially when downloads are triggered by JavaScript that doesn't go through the normal navigation flow)."
            lesson="When a high-level abstraction silently fails on a subset of inputs, drop one level deeper. Browser automation is a leaky abstraction; the underlying CDP is more verbose but more honest."
          />

          <Broke
            label="№ 07 · AI reports vs reality"
            title="The audit that lied (politely)."
            lead="A subagent told me a script did one thing. The script was doing something else."
            happened="I asked an AI subagent to audit a directory of cron scripts and tell me which ones were active, what they did, and what they touched. It produced a beautiful 1,500-word summary. I started designing fixes from it. Halfway through, I checked one of its claims against the actual file — wrong. Checked another — also wrong but in a different way."
            did={
              <>
                Built a habit: subagent audit reports describe what the agent <em>understood</em>{" "}the code to do, not
                necessarily what it <em>does</em>. I now re-verify any size, path, or behavior claim from a subagent
                against live state (<code>du</code>, <code>ls</code>, <code>lsof</code>, actual file reads) before
                designing destructive actions on top of it.
              </>
            }
            lesson="AI summaries are excellent at confidence and average at correctness. Trust the user's stated numbers, trust the live filesystem, distrust the narrative summary. This applies double for anything with an “everything looks good!” tone."
          />

          <Broke
            label="№ 08 · Bridge directories"
            title="The forgotten mirror that quietly carried secrets across boundaries."
            lead="A “harmless” sync directory turned out to be a leak vector."
            happened="I had a workspace-cron directory that mirrored part of my memory store for an experiment. Long after the experiment ended, the mirror was still being written to by a forgotten launchd job. When I added a new wiki-bridge feature, the bridge auto-imported from the mirror — pulling in secrets I'd thought were quarantined."
            did="Quarantined the workspace-cron directory (1.1 MB / 185 files moved to an archive). Audited every “intermediate” or “bridge” directory the system had. Wrote a permanent note: bridge directories don't auto-prune; orphaned mirrors are silent leak vectors."
            lesson="Every “temporary” directory becomes permanent. When you add a sync, write down when it should die — and what other systems might assume it still exists. Old mirrors are the IT equivalent of a wallet you left in a coat pocket."
          />

          <Broke
            label="№ 09 · Right tool for the job"
            title="I tried to use a managed-cloud agent platform. It was the wrong shape."
            lead="Spent a month on Claude Managed Agents. Tore it all down."
            happened="Anthropic offers a managed-cloud agent service (CMA — name has changed since). I built a chunk of my recurring automation on it because “managed” sounded easier than running my own scheduler. Over time the latency, the debugging difficulty, the cold-start behavior, and the “how do I see what just ran?” friction all added up."
            did={
              <>
                Migrated everything to local <code>launchd</code>{" "}jobs and direct Anthropic API calls. macOS
                LaunchAgents have been around for 20 years, log to a file you can <code>tail</code>, and never have a
                cold start. Lost the &ldquo;managed&rdquo; promise; gained debuggability and 10x speed.
              </>
            }
            lesson="“Managed” is great when the job fits the platform. If your jobs need to run on your local data, touch your local files, or be debugged on your local machine — local is usually the right answer. Don't reach for cloud just because cloud is fashionable."
          />

          <Broke
            label="№ 10 · Time zones"
            title="My scheduled jobs ran at the wrong hour for a week while I was traveling."
            lead="macOS time zone tracks your physical location. Cron does not care."
            happened="I was in California for a week. macOS auto-detected the new time zone. My morning brief, scheduled for 8 AM Central, started firing at 6 AM Pacific (which it thought was 8 AM Central) — except some jobs used UTC, some used local TZ, and some had been hardcoded to Central in their scripts. Total chaos for a few days."
            did={
              <>
                Audited every cron and LaunchAgent for which TZ it implicitly assumes. Standardized on Central in the
                script (with explicit conversion) instead of relying on system TZ. Added a check at the top of{" "}
                <code>crontab -e</code>{" "}reminding me: &ldquo;system TZ travels; jobs should be explicit.&rdquo;
              </>
            }
            lesson="If you travel, your cron schedule travels with you in unpredictable ways. Make TZ explicit in every scheduled script. Trust nothing implicit about wall-clock time."
          />
      </Playbook>
    </FieldManualChrome>
  );
}
