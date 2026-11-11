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
  "The teaching version of Carson's AI setup: the idea in plain English, a 30-minute quickstart, a starter pack, and a notebook template you can copy.";

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
        "model": "claude-haiku-5-5",
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

const cronLine = `0 8 * * * ANTHROPIC_API_KEY=sk-ant-... TG_BOT_TOKEN=123456:ABC... TG_CHAT_ID=12345678 /usr/bin/python3 /path/to/morning-brief.py >> /tmp/morning-brief.log 2>&1`;

export default function PlaybookStartPage() {
  return (
    <FieldManualChrome
      page="playbook"
      skipHref="#playbook-content"
      skipLabel="Skip to the playbook"
    >
      <Playbook
        current="start"
        eyebrow="Playbook"
        title="Build your own version."
        lead={
          <>
            <p>
              This is the teaching version of Carson&apos;s setup. It explains the idea in plain English so you can
              copy it for your own work, whether that is a property portfolio, a client list, or just your own to-do
              list. You do not need his tools or his data.
            </p>
            <p>
              Four habits are what matter: everything that comes in goes to the right place, every repeating job has
              an owner, anything risky waits for a person, and every job leaves a record. Copy those. Skip the parts
              that don&apos;t fit.
            </p>
            <p>
              <strong>Looking for the actual setup?</strong>{" "}The <Link href="/systems">Systems page</Link>{" "}shows
              what Carson&apos;s system does every day. This playbook is the general version for
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
                Six situations where you should not build this, plus a 5-minute test. Read it first so you
                don&apos;t spend an evening on the wrong tool.
              </p>
            </Card>
            <Card
              marker="2"
              title={<Link href="/systems/playbook/costs">What it costs</Link>}
              meta="5 min read · honest bill"
            >
              <p>
                Three sizes: about $20 a month, about $60–$135, and $400+ for the full setup, with what each
                dollar pays for. Know the bill before you start.
              </p>
            </Card>
            <Card
              marker="3"
              title={<Link href="/systems/playbook#quickstart">30-minute quickstart</Link>}
              meta="6 min read · build tonight"
            >
              <p>
                The smallest version that really works: every morning an AI sends one useful summary to your
                phone. Everything you need is included. Build it tonight, decide tomorrow whether to go further.
              </p>
            </Card>
          </Cards>
          <Callout>
            <p>
              <strong>If you have 30 more minutes:</strong>{" "}the{" "}
              <Link href="/systems/playbook/reference#broke">Things that broke</Link>{" "}and{" "}
              <Link href="/systems/playbook/reference">FAQ</Link>{" "}sections on the Reference page cover the next 90% of
              common questions. The glossary, also on Reference, explains any term you don&apos;t know, and the{" "}
              <Link href="/systems/playbook/build">Build</Link>{" "}page goes deeper when you are ready.
            </p>
          </Callout>
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
            <Card marker="2" title="Send it to the right place">
              <p>
                One AI acts like the front desk. It decides who should handle the work: leasing, maintenance,
                collections, bookkeeping, or you.
              </p>
            </Card>
            <Card marker="3" title="Use the right helper">
              <p>
                AI is good at reading, writing, summarizing, sorting, and checking. It does the legwork. It does
                not get the final say on anything risky.
              </p>
            </Card>
            <Card marker="4" title="Look in the real records">
              <p>
                The system checks where the facts actually live: your property software for residents and work
                orders, your inbox for email, your spreadsheets for lists. It does not guess.
              </p>
            </Card>
            <Card marker="5" title="Make a draft or task">
              <p>
                The system prepares the next step for you: a call summary, a repair note, a follow-up email, a
                weekly money report.
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
                Every result is saved in a shared notebook. That is how the system gets better next time without
                guessing.
              </p>
            </Card>
          </Cards>
        </Section>

        <Section label="The tiny first version" title="Start with one workflow.">
          <Lead>Do not copy the whole setup on day one. Build one tiny loop first.</Lead>
          <Cards>
            <Card title="Good first workflow">
              <p>
                Pick one thing you already repeat every week: following up with leads, sorting the day&apos;s
                repair requests, checking who is late on rent, or preparing an owner update.
              </p>
            </Card>
            <Card title="First safe rule">
              <p>
                Let the system read, sort, summarize, and draft. Do not let it send, pay, delete, or change your
                records until a person says yes.
              </p>
            </Card>
          </Cards>
          <Callout>
            <p>
              <strong>The short version:</strong>{" "}the AI can fill out the worksheet, but a trusted person signs it
              before it leaves the room.
            </p>
          </Callout>
        </Section>

        <Section label="What to copy" title="Six pieces to copy.">
          <Cards columns={3}>
            <Card marker="01" title="Inputs">
              <p>
                Where work comes in: phone calls, email, texts, forms, your calendar, your property software, and
                things you ask for directly.
              </p>
            </Card>
            <Card marker="02" title="Lanes">
              <p>A lane is one area of responsibility with one owner, like leasing or maintenance. It says who handles the work and when to hand it to a person.</p>
            </Card>
            <Card marker="03" title="Schedules">
              <p>
                Jobs that run on a rhythm without being asked: a daily check, a weekly report, a monthly review.
              </p>
            </Card>
            <Card marker="04" title="Guardrails">
              <p>
                Rules that stop the automation from acting on its own: practice runs, a record of every action,
                a word you type to approve, and a way to undo.
              </p>
            </Card>
            <Card marker="05" title="Memory">
              <p>
                The system writes down what it learned, what went wrong, and what works, so the same mistake is
                not made twice.
              </p>
            </Card>
            <Card marker="06" title="A daily summary">
              <p>
                One short message that shows what happened, what is stuck, what needs your approval, and what
                changed since yesterday.
              </p>
            </Card>
          </Cards>
        </Section>

        <Section label="What you need" title="Five kinds of tools, not a shopping list.">
          <Lead>
            Carson&apos;s setup uses a long list of software. You do not need his list. You need one of each of these:
          </Lead>
          <Flow
            rows={[
              ["An AI", "Something to read, write, and summarize. Claude and ChatGPT both work."],
              ["A place to talk to it", "A chat app where it can message you and you can answer. Carson uses Telegram."],
              ["Your records", "The software you already run the business on: property software, email, spreadsheets."],
              ["A schedule", "Something that starts a job at a set time. Every computer has one built in."],
              ["A notebook", "A folder of plain notes the AI reads before it works and writes in when it finishes."],
            ]}
          />
        </Section>

        <Section id="quickstart" label="30-minute quickstart" title="One real automation, running every morning.">
          <Lead>
            At the end you will have a short AI-written summary of one thing that matters to you, sent to your phone at
            8 AM every day. Nothing else happens until you reply APPROVE. You will paste a few commands into your
            computer&apos;s Terminal app. If that is new to you, an AI assistant can walk you through each one.
          </Lead>
          <Cards>
            <Card title="Concrete examples">
              <p>
                &ldquo;Read my last 24 hours of inbox and tell me what needs a reply&rdquo; → a 5-line message at 8 AM
                → I reply APPROVE 1 and it drafts a reply to the first one.
              </p>
              <p>
                &ldquo;Check yesterday&apos;s calendar and tell me what didn&apos;t get done&rdquo; → a list of what carried
                over → I reply APPROVE and it goes on today&apos;s plan.
              </p>
              <p>
                &ldquo;Read the property news for my market&rdquo; → three bullets → I reply APPROVE 2 and the
                second one is saved to my notes.
              </p>
            </Card>
            <Card title="What you skip on night one">
              <p>
                The phone line, the team of specialists, the property-software connection, the notebook. All of
                it.
              </p>
              <p>
                You build those later, only after this first one feels obvious. Most people quit because they try to
                skip to the end.
              </p>
            </Card>
          </Cards>
        </Section>

        <Section label="Step 1 · 5 minutes" title="Get a key for the AI.">
          <p>
            Sign up at <code>console.anthropic.com</code>{" "}(Anthropic makes Claude). Add $5 of credit. Create an
            API key, which is a private password that lets your script use the AI, and save it somewhere safe (a
            password manager, not a notes app).
          </p>
          <Callout>
            <p>
              <strong>Why Anthropic specifically:</strong>{" "}it is what Carson uses. You can switch to ChatGPT or
              Gemini later and everything else stays the same. Pick one for tonight.
            </p>
          </Callout>
        </Section>

        <Section label="Step 2 · 5 minutes" title="Make a chat bot to message you.">
          <Checklist
            items={[
              <>
                Open Telegram, search for <code>@BotFather</code>, start a chat.
              </>,
              <>
                Send <code>/newbot</code>. Pick a name and a username (must end in <code>bot</code>).
              </>,
              <>
                BotFather sends you a token, the bot&apos;s private password. It looks like <code>123456:ABC...</code>. Save it.
              </>,
              <>Open a chat with your new bot and send any message (&ldquo;hi&rdquo;). This activates it.</>,
              <>
                Visit <code>https://api.telegram.org/bot&lt;YOUR_TOKEN&gt;/getUpdates</code>{" "}{" "}in your browser and find
                the number after <code>chat.id</code>. That number is your chat&apos;s address.
              </>,
            ]}
          />
        </Section>

        <Section label="Step 3 · 15 minutes" title="Save the script.">
          <p>
            Save this as <code>~/morning-brief.py</code>. It asks the AI for a summary, then sends the answer to your
            chat. It is about 40 lines, and you do not need to understand every one. (The copy in the starter pack
            does the same thing with more safety checks.)
          </p>
          <Code label="morning-brief.py">{scriptSource}</Code>
          <Callout>
            <p>
              <strong>Let your computer run it:</strong> <code>chmod +x ~/morning-brief.py</code>
            </p>
            <p>
              <strong>Test it now:</strong>
            </p>
            <Code label="Test command">{testCommand}</Code>
            <p>If you see &ldquo;sent.&rdquo; and a message arrives on your phone, it works.</p>
          </Callout>
        </Section>

        <Section label="Step 4 · 5 minutes" title="Schedule it for 8 AM tomorrow.">
          <p>
            On Mac or Linux, type <code>crontab -e</code>{" "}in Terminal. That opens your computer&apos;s built-in list of
            scheduled jobs. Add this one line (use the full path to your script):
          </p>
          <Code label="Crontab line">{cronLine}</Code>
          <p>
            Save and close. Your computer will run it tomorrow at 8 AM and every day after. If something goes wrong,
            the error is written to <code>/tmp/morning-brief.log</code>.
          </p>
          <Callout>
            <p>
              <strong>That&apos;s it.</strong>{" "}You now have something useful arriving on a schedule, in a place you
              actually look. The rest of the playbook is the same idea repeated: more things to read, more jobs, more
              approvals, and a notebook that remembers.
            </p>
          </Callout>
        </Section>

        <Section label="Step 5 · ongoing" title="What to do next.">
          <Cards>
            <Card marker="1" title="Read your morning brief for a week.">
              <p>
                Notice what&apos;s useful and what&apos;s noise. Change the instructions in your script. The system gets better
                when you ask better questions, not when you add more tools.
              </p>
            </Card>
            <Card marker="2" title="Teach it to wait for your yes.">
              <p>
                Right now the bot only sends. Next, make it listen. When you reply &ldquo;APPROVE 1,&rdquo; it
                does the follow-up: drafts a reply, saves a note, books a tour. This is the approval step Carson
                uses everywhere.
              </p>
            </Card>
            <Card marker="3" title="Add a second automation.">
              <p>
                Pick another recurring thing — following up with leads, checking in with vendors, a weekly money
                report. Copy the script, change the instructions, schedule it for a different time.
              </p>
            </Card>
            <Card marker="4" title="Get organized when it gets messy.">
              <p>
                Once you have four or five scripts that need to share information, it is time for the fuller
                setup on the Build page. Not before.
              </p>
            </Card>
          </Cards>
        </Section>

        <Section label="Skip the blank page" title="Starter pack: everything for night one.">
          <Lead>
            Most people stall the first time they sit down to build, because the blank page is the hardest part. The
            starter pack is a download with the finished script from the quickstart, step-by-step setup notes, and
            the scheduling lines ready to paste.
          </Lead>
          <Cards>
            <Card title="What's in the zip">
              <p>
                <code>morning-brief.py</code>{" "}— the finished script. It sends a daily AI summary to your phone.
              </p>
              <p>
                <code>README.md</code>{" "}— what each file is and the order to use them.
              </p>
              <p>
                <code>setup-telegram-bot.md</code>{" "}— a 5-minute walkthrough for setting up the chat bot.
              </p>
              <p>
                <code>.env.example</code>{" "}— a fill-in-the-blanks file for your three private keys.
              </p>
              <p>
                <code>crontab.example</code>{" "}— the one line that schedules it for 8 AM every day.
              </p>
              <p>
                <code>com.you.morning-brief.plist.example</code>{" "}— the same schedule in the Mac&apos;s own format, if you prefer.
              </p>
              <p>
                <code>expand-recipes.md</code>{" "}— three more automations to try once the first one works.
              </p>
            </Card>
            <Card title="How to use it">
              <ol>
                <li>Download the zip below. Unzip it somewhere.</li>
                <li>
                  Open <code>setup-telegram-bot.md</code>{" "}and follow it to set up your chat bot. (5 min)
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
                <li>Schedule it using either of the two schedule files. Done.</li>
              </ol>
              <Download href="/downloads/workflow-starter-pack.zip">Download starter pack (zip)</Download>
            </Card>
          </Cards>
          <Callout>
            <p>
              <strong>The starter pack handles night one.</strong>{" "}The notebook template (below) handles month one and
              beyond. Together they cover the two hardest moments: the blank page on day one, and the &ldquo;where do I
              write this down?&rdquo; problem on day thirty.
            </p>
          </Callout>
        </Section>

        <Section label="The level-up" title="Start your own notebook.">
          <Lead>
            The most valuable thing in Carson&apos;s whole setup is a shared notebook: a folder of plain text notes
            that holds what the system has learned, which every AI reads before it works. To save you from
            designing one from scratch, here is a starter notebook laid out the way his is.
          </Lead>
          <Cards>
            <Card title="What's in the notebook template">
              <p>
                <code>projects/</code>{" "}— one page for each project you are tracking: where it stands, what
                was decided, what could go wrong, and what is next.
              </p>
              <p>
                <code>playbooks/</code>{" "}— step-by-step guides for things that keep coming up (&ldquo;when X
                happens, do these steps&rdquo;).
              </p>
              <p>
                <code>plans/</code>{" "}— dated plan documents for specific work.
              </p>
              <p>
                <code>summary.md</code>, <code>index.md</code>, <code>log.md</code>{" "}— a summary, a table of contents,
                and a running diary.
              </p>
              <p>
                <code>CLAUDE.md</code>{" "}— instructions that tell an AI assistant how to use the notebook.
              </p>
              <p>
                <code>_template.*.md</code>{" "}— blank pages to copy and fill in.
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
                  (a free notes app) and open the folder.
                </li>
                <li>
                  Optional: if you know Git, run <code>git init</code>{" "}in the folder to keep a history of changes.
                </li>
                <li>
                  Read <code>CLAUDE.md</code>{" "}and <code>README.md</code>{" "}first. They explain how the notebook is laid out.
                </li>
                <li>
                  Copy <code>_template.project.md</code>{" "}to <code>projects/&lt;your-thing&gt;.md</code>. Start writing.
                </li>
              </ol>
              <Download href="/downloads/workflow-vault-template.zip">Download notebook template (zip)</Download>
            </Card>
          </Cards>
          <Callout>
            <p>
              <strong>Why bother:</strong>{" "}the notebook is what makes the system get better over time.
              Without it, the AI starts from zero every time. With it, decisions stick, lessons add up, and you stop
              answering the same question every week.
            </p>
          </Callout>
        </Section>

        <Section label="If you share yours" title="Explain how it works, not what is inside." tone="dark">
          <p>
            If you ever write about your own setup, never publish passwords or keys, resident or customer records,
            phone numbers, or exact schedules. Show how the system thinks. Keep the private details private.
          </p>
        </Section>
      </Playbook>
    </FieldManualChrome>
  );
}
