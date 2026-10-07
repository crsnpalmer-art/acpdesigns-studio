import type { Metadata } from "next";
import Link from "next/link";
import FieldManualChrome from "@/components/field-manual/FieldManualChrome";
import Playbook, {
  Callout,
  Card,
  Cards,
  Checklist,
  Code,
  Download,
  Flow,
  Lead,
  Section,
} from "@/components/field-manual/Playbook";

const description =
  "The teaching version of Carson's AI operating setup: the pattern in plain English, a 30-minute quickstart, a starter pack, and a vault template you can copy.";

export const metadata: Metadata = {
  title: "Playbook: Start | ACP Designs Studio",
  description,
  alternates: {
    canonical: "/systems/playbook",
  },
  openGraph: {
    title: "Playbook: Start | ACP Designs Studio",
    description,
    url: "/systems/playbook",
    siteName: "ACP Designs Studio",
    type: "article",
  },
};

const scriptSource = `#!/usr/bin/env python3
import os, sys, json
from urllib import request as http

ANTHROPIC_KEY = os.environ["ANTHROPIC_API_KEY"]
TG_TOKEN      = os.environ["TG_BOT_TOKEN"]
TG_CHAT_ID    = os.environ["TG_CHAT_ID"]

# --- 1. Ask Claude for the morning summary
prompt = "Give me a 5-bullet morning brief. Today is " \\
         + __import__('datetime').date.today().isoformat() + ". " \\
         + "Cover: top news for property managers in Alabama, weather, " \\
         + "one thing worth thinking about today. Be specific, no fluff."

req = http.Request(
    "https://api.anthropic.com/v1/messages",
    data=json.dumps({
        "model": "claude-haiku-4-5",
        "max_tokens": 600,
        "messages": [{"role": "user", "content": prompt}],
    }).encode(),
    headers={
        "x-api-key": ANTHROPIC_KEY,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
    },
)
data = json.loads(http.urlopen(req).read())
text = data["content"][0]["text"]

# --- 2. Send it to Telegram
http.urlopen(http.Request(
    f"https://api.telegram.org/bot{TG_TOKEN}/sendMessage",
    data=json.dumps({
        "chat_id": int(TG_CHAT_ID),
        "text": "*Morning brief*\\n" + text,
        "parse_mode": "Markdown",
    }).encode(),
    headers={"content-type": "application/json"},
))
print("sent.")`;

const testCommand = `ANTHROPIC_API_KEY=sk-ant-... \\
TG_BOT_TOKEN=123456:ABC... \\
TG_CHAT_ID=12345678 \\
python3 ~/morning-brief.py`;

const cronLine = `0 8 * * * ANTHROPIC_API_KEY=sk-ant-... TG_BOT_TOKEN=123456:ABC... TG_CHAT_ID=12345678 /usr/bin/python3 /path/to/morning-brief.py >> /tmp/brief.log 2>&1`;

export default function PlaybookStartPage() {
  return (
    <FieldManualChrome
      page="systems"
      skipHref="#playbook-content"
      skipLabel="Skip to the playbook"
      rail={["v1.0", "Playbook", "Start"]}
    >
      <Playbook
        current="start"
        eyebrow="Playbook"
        title="Build your own version."
        lead={
          <>
            <p>
              This is the teaching version of Carson&apos;s setup. It explains the pattern in plain English so you can
              copy it for your own work — your own portfolio, your own clients, your own to-do list — without needing
              his tools, his routes, or his data.
            </p>
            <p>
              The shape is what travels: every input gets routed, every recurring job has an owner, every risky action
              has a human approval gate, and every run leaves proof. Copy that. Skip the parts that don&apos;t fit.
            </p>
            <p>
              <strong>Looking for the actual setup?</strong>{" "}The <Link href="/systems">operating map</Link>{" "}shows
              Carson&apos;s real agents, real schedules, and real software. This playbook is the generic version for
              friends and colleagues building their own.
            </p>
          </>
        }
      >
        <Section label="If you only read 3 things" title="The shortest path through the playbook.">
          <Lead>
            The whole playbook is four pages — Start, Build, Costs, and Reference. If you can only spare 15 minutes
            today, read these three in order. They answer &ldquo;is this for me?&rdquo;, &ldquo;what does it
            cost?&rdquo;, and &ldquo;how do I start?&rdquo;. Everything else is detail you can pick up later.
          </Lead>
          <Cards columns={3}>
            <Card
              marker="1"
              title={<Link href="/systems/playbook/costs#honest">Will this help me?</Link>}
              meta="4 min read · honest answer"
            >
              <p>
                Six &ldquo;don&apos;t build this if…&rdquo; cases plus the 5-minute decision test. Read this first so
                you don&apos;t waste the next two reads if it&apos;s the wrong tool for you.
              </p>
            </Card>
            <Card
              marker="2"
              title={<Link href="/systems/playbook/costs">What it costs</Link>}
              meta="5 min read · honest bill"
            >
              <p>
                Three tiers (~$20, ~$80–$150, and $400+/month for the full setup). Real per-vendor breakdown at each
                level. Tells you what you&apos;re signing up for before you sign up.
              </p>
            </Card>
            <Card
              marker="3"
              title={<Link href="/systems/playbook#quickstart">30-minute quickstart</Link>}
              meta="6 min read · build tonight"
            >
              <p>
                Smallest possible working version: one Anthropic key, one Telegram bot, one Python script, one
                scheduled job. Code included. Build it tonight, decide tomorrow whether to expand.
              </p>
            </Card>
          </Cards>
          <Callout>
            <p>
              <strong>If you have 30 more minutes:</strong>{" "}the{" "}
              <Link href="/systems/playbook/reference#broke">Things that broke</Link>{" "}and{" "}
              <Link href="/systems/playbook/reference">FAQ</Link>{" "}sections on the Reference page cover the next 90% of
              common questions. The glossary (also on Reference) plus the pieces and stack on the{" "}
              <Link href="/systems/playbook/build">Build</Link>{" "}page are there for when you hit a specific term.
            </p>
          </Callout>
        </Section>

        <Section label="Plain-English model" title="The system has one job.">
          <Lead>Turn scattered work into a visible loop.</Lead>
          <Flow
            rows={[
              ["Capture", "A call, email, report, task, calendar item, or operator request enters the system."],
              [
                "Route",
                "The system decides which lane owns it: leasing, maintenance, finance, collections, reporting, reliability, or executive review.",
              ],
              ["Prepare", "The lane gathers context, drafts the next step, and checks the right source of truth."],
              ["Verify", "The run produces proof: a log, receipt, screenshot, returned record, or dashboard check."],
              [
                "Approve",
                "A person approves anything that affects tenants, owners, money, vendors, legal status, or customer trust.",
              ],
              [
                "Remember",
                "The lesson goes into a playbook, memory file, daily log, or wiki so the next run starts smarter.",
              ],
            ]}
          />
        </Section>

        <Section label="What to copy" title="Copy the operating shape.">
          <Cards columns={3}>
            <Card marker="01" title="Inputs">
              <p>
                Where work enters: phone, email, forms, texts, calendars, dashboards, accounting systems, property
                systems, and direct requests.
              </p>
            </Card>
            <Card marker="02" title="Lanes">
              <p>Named ownership areas. A lane says who handles the work, what tools are allowed, and when to escalate.</p>
            </Card>
            <Card marker="03" title="Schedulers">
              <p>
                Recurring jobs that run on a rhythm: daily checks, weekly reports, monthly reviews, and always-on
                watchers.
              </p>
            </Card>
            <Card marker="04" title="Guardrails">
              <p>
                Rules that keep automation from acting too freely: dry runs, receipts, approval words, rollback paths,
                and private data boundaries.
              </p>
            </Card>
            <Card marker="05" title="Memory">
              <p>
                The system writes down lessons, exceptions, and proven procedures so future work is faster and less
                fragile.
              </p>
            </Card>
            <Card marker="06" title="Dashboards">
              <p>
                Simple views that show what happened, what is blocked, what needs approval, and what changed since the
                last run.
              </p>
            </Card>
          </Cards>
        </Section>

        <Section label="Actual ingredients" title="The build uses real software.">
          <Lead>
            The reference system combines OpenAI Codex, Anthropic Claude, xAI Grok, Hermes, Telegram, Google Workspace
            APIs, AppFolio, ElevenLabs, Twilio, iMessage, Vercel, Cloudflare Workers, macOS LaunchAgents, Hermes
            schedules, browser automation, Node.js, Python, and local memory/search.
          </Lead>
          <p>
            Your team does not need this exact stack. You need the same categories: a model layer, a control plane,
            systems of record, communication channels, schedulers, background services, memory, dashboards, and
            approval gates.
          </p>
        </Section>

        <Section label="Skip the blank page" title="Starter pack — working code, ready to run.">
          <Lead>
            Most people stall the first time they sit down to build because the blank page is the hardest part. The
            starter pack is a zip with the working Python script from the quickstart, a step-by-step Telegram bot
            setup, an example .env, and ready-to-paste cron and LaunchAgent configs.
          </Lead>
          <Cards>
            <Card title="What's in the zip">
              <p>
                <code>morning-brief.py</code>{" "}— the working script. ~80 lines. Sends a daily AI brief to your
                Telegram.
              </p>
              <p>
                <code>setup-telegram-bot.md</code>{" "}— 5-minute walkthrough for getting a bot token + chat ID.
              </p>
              <p>
                <code>.env.example</code>{" "}— template for the three secrets you fill in.
              </p>
              <p>
                <code>crontab.example</code>{" "}— exact cron line for daily 8 AM scheduling.
              </p>
              <p>
                <code>com.you.morning-brief.plist.example</code>{" "}— macOS LaunchAgent version if you prefer launchd.
              </p>
              <p>
                <code>expand-recipes.md</code>{" "}— three more workflow recipes for after the morning brief works.
              </p>
            </Card>
            <Card title="How to use it">
              <ol>
                <li>Download the zip below. Unzip it somewhere.</li>
                <li>
                  Read <code>setup-telegram-bot.md</code>. Make a bot, get the chat ID. (5 min)
                </li>
                <li>
                  Sign up at <code>console.anthropic.com</code>, add $5 of credit. (5 min)
                </li>
                <li>
                  Copy <code>.env.example</code>{" "}to <code>.env</code>, fill in the three values.
                </li>
                <li>
                  Test: <code>set -a; source .env; set +a; python3 morning-brief.py</code>
                </li>
                <li>Schedule it via crontab or LaunchAgent. Done.</li>
              </ol>
              <Download href="/downloads/workflow-starter-pack.zip">Download starter pack (zip)</Download>
            </Card>
          </Cards>
          <Callout>
            <p>
              <strong>The starter pack handles night one.</strong>{" "}The vault template (below) handles month one and
              beyond. Together they cover the two hardest moments: the blank page on day one, and the &ldquo;where do I
              write this down?&rdquo; problem on day thirty.
            </p>
          </Callout>
        </Section>

        <Section label="The level-up" title="Start your own knowledge base.">
          <Lead>
            The single most leveraged thing in Carson&apos;s whole setup is the Obsidian vault — plain markdown files
            that hold the system&apos;s durable memory and that both AIs read before working. To save you from
            rebuilding the structure from scratch, here&apos;s a starter vault matching his schema.
          </Lead>
          <Cards>
            <Card title="What's in the vault template">
              <p>
                <code>projects/</code>{" "}— one page per system or project you&apos;re tracking, with current state,
                decisions log, risks, and next checkpoint.
              </p>
              <p>
                <code>playbooks/</code>{" "}— reusable recipes for recurring tasks (&ldquo;when X happens, do these
                steps&rdquo;).
              </p>
              <p>
                <code>plans/</code>{" "}— dated plan documents for specific work.
              </p>
              <p>
                <code>summary.md</code>, <code>index.md</code>, <code>log.md</code>{" "}— the navigation + chronological
                layer.
              </p>
              <p>
                <code>CLAUDE.md</code>{" "}— instructions for AI assistants working with the vault, so they follow the
                schema.
              </p>
              <p>
                <code>_template.*.md</code>{" "}— copy-and-fill templates for each page type.
              </p>
            </Card>
            <Card title="How to use it">
              <ol>
                <li>
                  Download the zip below. Unzip it somewhere — your <code>Documents</code>{" "}folder is fine.
                </li>
                <li>
                  Install{" "}
                  <a href="https://obsidian.md/" target="_blank" rel="noreferrer">
                    Obsidian
                  </a>{" "}
                  (free) and open the vault folder.
                </li>
                <li>
                  <code>cd</code>{" "}into the folder and run <code>git init</code>{" "}if you want version history.
                </li>
                <li>
                  Read <code>CLAUDE.md</code>{" "}and <code>README.md</code>{" "}first — they explain the schema.
                </li>
                <li>
                  Copy <code>_template.project.md</code>{" "}to <code>projects/&lt;your-thing&gt;.md</code>. Start writing.
                </li>
              </ol>
              <Download href="/downloads/workflow-vault-template.zip">Download vault template (zip)</Download>
            </Card>
          </Cards>
          <Callout>
            <p>
              <strong>Why bother:</strong>{" "}the wiki is what makes the AIs in your system actually compound over time.
              Without it, every session starts from zero. With it, decisions stick, lessons stack, and you stop
              re-deriving the same answers every week.
            </p>
          </Callout>
        </Section>

        <Section label="Public safety rule" title="Explain the pattern, not the private machine." tone="dark">
          <p>
            A public version should never expose credentials, private chat IDs, exact sensitive schedules, tenant
            records, customer records, internal dashboards, local file paths, or secret routing. Show how the system
            thinks. Keep the private wiring private.
          </p>
        </Section>

        <Section id="quickstart" label="What you'll have at the end" title="One real loop, running on a real schedule.">
          <Lead>
            A daily AI-generated summary of one thing that matters to you, delivered to Telegram at 8 AM, requiring your
            APPROVE before any follow-up action runs.
          </Lead>
          <Cards>
            <Card title="Concrete examples">
              <p>
                &ldquo;Read my last 24 hours of inbox and tell me what needs a reply&rdquo; → DM at 8 AM with a 5-line
                summary → I reply APPROVE 1 to draft replies for #1.
              </p>
              <p>
                &ldquo;Check yesterday&apos;s calendar and tell me what didn&apos;t get done&rdquo; → DM with carryover
                list → I reply APPROVE to add to today&apos;s plan.
              </p>
              <p>
                &ldquo;Read the property news for my market&rdquo; → DM with 3 bullets → I reply APPROVE 2 to save
                bullet #2 to my notes.
              </p>
            </Card>
            <Card title="What you skip on night one">
              <p>
                Hermes, agent lanes, ElevenLabs, Twilio, AppFolio, LaunchAgents, Obsidian, the wiki, Cloudflare
                Workers. All of it.
              </p>
              <p>
                You build those later, only after the basic loop feels obvious. Most people quit because they try to
                skip to the end.
              </p>
            </Card>
          </Cards>
        </Section>

        <Section label="Step 1 · 5 minutes" title="Get the API key.">
          <p>
            Sign up for an Anthropic API account at <code>console.anthropic.com</code>. Add $5 of credit. Generate an
            API key and copy it somewhere safe (a password manager, not a Notes doc).
          </p>
          <Callout>
            <p>
              <strong>Why Anthropic specifically:</strong>{" "}Claude is what Carson uses for the planning side. You can
              swap in OpenAI, Gemini, etc. later — the pattern is identical. Pick one for tonight.
            </p>
          </Callout>
        </Section>

        <Section label="Step 2 · 5 minutes" title="Make a Telegram bot.">
          <Checklist
            items={[
              <>
                Open Telegram, search for <code>@BotFather</code>, start a chat.
              </>,
              <>
                Send <code>/newbot</code>. Pick a name and a username (must end in <code>bot</code>).
              </>,
              <>
                BotFather sends you a token — looks like <code>123456:ABC...</code>. Save it.
              </>,
              <>Open a chat with your new bot and send any message (&ldquo;hi&rdquo;). This activates it.</>,
              <>
                Visit <code>https://api.telegram.org/bot&lt;YOUR_TOKEN&gt;/getUpdates</code>{" "}— note the{" "}
                <code>chat.id</code>{" "}number from the JSON response. That&apos;s where DMs will go.
              </>,
            ]}
          />
        </Section>

        <Section label="Step 3 · 15 minutes" title="Write the script.">
          <p>
            Save this as <code>~/morning-brief.py</code>. It&apos;s intentionally tiny — under 40 lines.
          </p>
          <Code label="morning-brief.py">{scriptSource}</Code>
          <Callout>
            <p>
              <strong>Make it executable:</strong> <code>chmod +x ~/morning-brief.py</code>
            </p>
            <p>
              <strong>Test it now:</strong>
            </p>
            <Code label="Test command">{testCommand}</Code>
            <p>If you see &ldquo;sent.&rdquo; and a Telegram DM arrives, it works.</p>
          </Callout>
        </Section>

        <Section label="Step 4 · 5 minutes" title="Schedule it for 8 AM tomorrow.">
          <p>
            On Mac or Linux, type <code>crontab -e</code>{" "}and add this one line (use the full path to your script):
          </p>
          <Code label="Crontab line">{cronLine}</Code>
          <p>
            Save and exit. The cron daemon will run it tomorrow at 8 AM and every day after. Logs go to{" "}
            <code>/tmp/brief.log</code>{" "}if anything breaks.
          </p>
          <Callout>
            <p>
              <strong>That&apos;s it.</strong>{" "}You now have an AI-generated thing arriving on a schedule, in a place you
              actually look. The whole rest of the playbook is variations on this same loop with more sources, more
              tools, more approvals, and a real memory layer.
            </p>
          </Callout>
        </Section>

        <Section label="Step 5 · ongoing" title="What to do next.">
          <Cards>
            <Card marker="1" title="Read your morning brief for a week.">
              <p>
                Notice what&apos;s useful and what&apos;s noise. Edit the prompt in your script. The system gets better
                when you write better prompts, not when you add more tools.
              </p>
            </Card>
            <Card marker="2" title="Add an APPROVE handler.">
              <p>
                Right now the bot only sends. Make it listen for replies. When you reply &ldquo;APPROVE 1,&rdquo; have
                it run a follow-up action (draft a reply, save a note, schedule a tour). This is the real &ldquo;human
                gate&rdquo; pattern Carson uses everywhere.
              </p>
            </Card>
            <Card marker="3" title="Add a second loop.">
              <p>
                Pick another recurring thing — leasing follow-up, vendor check-ins, weekly P&amp;L. Copy the script,
                change the prompt, schedule it for a different time.
              </p>
            </Card>
            <Card marker="4" title="Move to Hermes when scripts get messy.">
              <p>
                When you have 4-5 scripts and they start needing to share state, that&apos;s when the Hermes pattern
                earns its keep. Don&apos;t adopt it sooner.
              </p>
            </Card>
          </Cards>
        </Section>

        <Section id="start" label="The whole idea" title="Seven simple jobs.">
          <Cards>
            <Card marker="1" title="Catch the work">
              <p>A call, email, form, task, report, or question comes in.</p>
              <p>
                <strong>Example:</strong>{" "}A resident calls about a leak. A prospect asks for a tour. An owner asks for
                numbers.
              </p>
            </Card>
            <Card marker="2" title="Send it to the right lane">
              <p>
                Hermes acts like the front desk. It decides whether the work belongs to Lyra, property ops, maintenance,
                finance, collections, reliability, memory, or the main operator.
              </p>
            </Card>
            <Card marker="3" title="Use the right helper">
              <p>
                AI models help with reading, writing, coding, summarizing, classifying, checking, and planning. They do
                not get to be the final boss for risky actions.
              </p>
            </Card>
            <Card marker="4" title="Look in the right software">
              <p>
                The system checks the correct tool: AppFolio for property records, Gmail for inboxes, Google Sheets for
                queues, the wiki for notes, and Telegram for approvals.
              </p>
            </Card>
            <Card marker="5" title="Make a draft or task">
              <p>
                The system prepares the next step: a call summary, a work-order note, a leasing follow-up, a finance
                brief, a task, or a dashboard update.
              </p>
            </Card>
            <Card marker="6" title="Ask a human before risky action">
              <p>
                If it affects a resident, owner, vendor, money, legal status, private data, or a public message, a
                person must approve it.
              </p>
            </Card>
            <Card marker="7" title="Write down what happened">
              <p>
                The result becomes a log, receipt, dashboard note, memory entry, or playbook update. That is how the
                system learns without guessing.
              </p>
            </Card>
          </Cards>
        </Section>

        <Section label="The tiny first version" title="Start with one workflow.">
          <Lead>Do not copy the whole setup on day one. Build one tiny loop first.</Lead>
          <Cards>
            <Card title="Good first workflow">
              <p>
                Pick one repeated thing your team already does every week, like leasing follow-up, daily maintenance
                triage, delinquency review, or owner brief prep.
              </p>
            </Card>
            <Card title="First safe rule">
              <p>
                Let the system read, sort, summarize, and draft. Do not let it send, dispatch, pay, delete, or change
                official records until a person approves.
              </p>
            </Card>
          </Cards>
          <Callout>
            <p>
              <strong>Fifth-grade version:</strong>{" "}the AI can fill out the worksheet, but a trusted person signs it
              before it leaves the room.
            </p>
          </Callout>
          <p>
            Public playbook for portfolio teams. Built from a real local-first workflow system, generalized for safe
            reuse.
          </p>
        </Section>
      </Playbook>
    </FieldManualChrome>
  );
}
