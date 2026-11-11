import type { Metadata } from "next";
import Link from "next/link";
import { numberWord, operatingStats } from "@/content/operating-map";
import FieldManualChrome from "@/components/field-manual/FieldManualChrome";
import Playbook, { Faq, Lead, Section, TableWrap } from "@/components/field-manual/Playbook";

const description =
  "Questions friends always ask about the AI setup, a plain-language glossary, and ten things that broke along the way, with the lesson from each.";

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
    "A computer helper that reads, writes, summarizes, and sorts.",
    "Claude and ChatGPT are both AI models.",
    "Give each one a job. Do not make one do everything.",
  ],
  [
    "Hermes",
    "The program on Carson's Mac that receives work and hands it to the right specialist.",
    "It gets a message, picks who handles it, and asks for approval if needed.",
    "Have one central place where work comes in and gets assigned.",
  ],
  [
    "Specialist (or agent)",
    "An AI helper with one kind of job.",
    "Lyra answers calls and texts. Collections prepares the late-rent report.",
    "Give each one a single clear job.",
  ],
  [
    "Lane",
    "One area of responsibility, with one owner.",
    "Leasing, maintenance, finance, collections.",
    "If nobody owns it, it gets lost.",
  ],
  [
    "API",
    "A doorway that lets one piece of software talk to another.",
    "One reads the inbox. Another sends a text.",
    "Give it the least access that still works.",
  ],
  [
    "API key",
    "A private password that lets your script use a service.",
    "The key that lets your morning script ask the AI a question.",
    "Keep it in a password manager and never share it.",
  ],
  [
    "Scheduled job (cron)",
    "An alarm clock for repeating work.",
    "A daily download of property records, or a weekly money report.",
    "Use it for anything that should happen whether you remember or not.",
  ],
  [
    "Background helper",
    "A small program that keeps running all the time.",
    "Checking email every five minutes.",
    "Use it for simple checks that never stop.",
  ],
  [
    "Workflow",
    "The path a piece of work follows from start to finish.",
    "A call comes in, Lyra sums it up, a person approves the follow-up, the result is saved.",
    "Draw the path before you automate it.",
  ],
  [
    "Official record",
    "The one place where the true answer lives.",
    "AppFolio for residents and work orders. A spreadsheet for a to-do list.",
    "Decide which tool is the truth, and stick to it.",
  ],
  [
    "Approval step",
    "A required yes from a person before anything risky happens.",
    "No repair is sent out and no sensitive message goes without approval.",
    "Build the stop into the workflow itself, not just into the AI's instructions.",
  ],
  [
    "Record of the run",
    "Proof that a job did what it said.",
    "A log entry, a screenshot, a copy of the message sent.",
    "No proof, no claim that it worked.",
  ],
  [
    "Notebook (or memory)",
    "The written notes of what the system has learned.",
    "A weekly lesson, or an updated how-to guide.",
    "Write down what you learn so the next run is better.",
  ],
  [
    "Prompt",
    "The instructions you give an AI.",
    "\"Give me a five-line summary of today's email.\"",
    "Better instructions beat more tools.",
  ],
  [
    "Lyra",
    "The AI that answers the leasing line by voice and text.",
    "She answers, gathers the details, looks things up, and hands off anything sensitive.",
    "Start with answering only. Let it gather facts before it acts.",
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
      page="playbook"
      skipHref="#playbook-content"
      skipLabel="Skip to the playbook"
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
        <Section label="Building it" title="Getting started.">
          <Faq question="How long did this take to build?">
            <p>
              Evenings and weekends since March 2026 to get to what&apos;s on the Systems page today. The first useful
              version (one scheduled job that waits for my approval in chat) took about a weekend. Lyra (then called
              Sarah) took maybe three weeks. The shared notebook took a few weeks to get right. The rest was added
              a little at a time.
            </p>
            <p>
              Don&apos;t budget six months for yourself. Budget one weekend for the first useful version, then add a
              workflow per week as you notice patterns.
            </p>
          </Faq>
          <Faq question="Do I need to be a programmer to build this?">
            <p>
              No, but you need to be comfortable pasting text into a file, typing a few commands, and reading an
              error message without panicking. An AI assistant can explain each step as you go.
            </p>
            <p>
              If you have never opened the Terminal app on your computer, spend an hour learning the basics first. Then do the{" "}
              <Link href="/systems/playbook#quickstart">30-minute quickstart</Link>.
            </p>
          </Faq>
          <Faq question="What if I don't have a Mac?">
            <p>
              A Linux computer works the same way. Windows is harder, because many of the tools involved were made
              for Mac and Linux.
            </p>
            <p>
              On Windows, look at an online tool like n8n instead, or rent a small Linux computer online for about
              $5 a month to run the schedule.
            </p>
          </Faq>
          <Faq question="Can I use ChatGPT instead of Claude?">
            <p>
              Yes. The approach works with any AI. In the script, swap Anthropic for OpenAI and change the model
              name from <code>claude-haiku-5-5</code>{" "}to OpenAI&apos;s current small model. The request is worded
              slightly differently, and an AI assistant can make that change for you.
            </p>
            <p>
              That said, I use both Claude and OpenAI because they catch each other&apos;s mistakes. Two are better
              than one. Pick either for night one and consider adding the other later.
            </p>
          </Faq>
          <Faq question="Why Telegram and not Slack / Discord / iMessage?">
            <p>
              Three reasons: a chat bot takes five minutes to set up with nobody&apos;s permission, it is reliable,
              and its threads let me organize {numberWord(operatingStats.agents)} agent lanes inside one app instead of {numberWord(operatingStats.agents)} different inboxes.
            </p>
            <p>
              Slack works well for a team. iMessage does not allow bots. Discord works but is more than one person
              needs.
            </p>
          </Faq>
        </Section>

        <Section label="Safety & trust" title="What happens when things go wrong.">
          <Faq question="What happens when the AI makes something up?">
            <p>
              This is the single most important question, and the answer is:{" "}
              <strong>the system is built so a made-up answer cannot do real damage</strong>. Anything risky
              (account or money questions, legal issues, work orders, moving money) stops and waits for my approval
              in chat, and scheduled jobs cannot take risky actions at all. Simple factual replies (property facts,
              prices, how-tos) can go out automatically, but only after a safety check that holds anything
              uncertain for me.
            </p>
            <p>
              The mistakes that do slip through are small ones: a wrong date in a summary, a message sorted into
              the wrong pile. I catch those in the morning review. They&apos;re embarrassing, not dangerous.
            </p>
          </Faq>
          <Faq question="What if the system crashes overnight?">
            <p>
              The Mac restarts it automatically. Any scheduled job that was missed is run again within 20 minutes.
              Logins are checked several times a day, and I get a message if one stops working.
            </p>
            <p>
              Net result: I&apos;ve had maybe one outage I noticed in the first 6 months, and the system told me about it before I
              noticed it myself.
            </p>
          </Faq>
          <Faq question="Is my information safe? Where does it go?">
            <p>
              Honest answer: it goes to the companies whose services I use. Anthropic, OpenAI, xAI, ElevenLabs,
              Twilio, Cloudflare, Google. You have to decide whether you trust each one, and each has its own terms.
            </p>
            <p>
              What I keep <em>off</em>{" "}this website: passwords, resident information, addresses, and financial
              details. What I keep away from those companies: anything I would not want made public. There is a{" "}
              <Link href="/systems#off-page">clear line</Link>{" "}I hold on every workflow.
            </p>
            <p>
              If your information is legally protected (medical records, attorney-client material), this setup is
              wrong for you. You need AI that runs entirely on machines you own.
            </p>
          </Faq>
          <Faq question="What if I miss a message and an emergency goes unhandled?">
            <p>
              Emergencies take a fast lane: an alert in a chat thread reserved for emergencies and a text message to
              my phone, both at once. If I miss both, I have bigger problems than the AI.
            </p>
            <p>
              For non-emergencies, the answer is: nothing terrible happens. The work waits. I review it the next
              time I check the chat. Only routine, fact-only replies go out on their own; anything that needs
              judgment waits for me.
            </p>
          </Faq>
          <Faq question="How do I undo it if I hate it?">
            <p>
              That is the whole point of building it this way. Every scheduled job can be switched off with one line.
              Every background helper can be stopped. The notebook is just a folder of text files, and it stays put
              when you remove everything else.
            </p>
            <p>
              Undoing it means stopping the helpers, clearing the schedule, and cancelling the subscriptions. Your
              information and your notes stay yours.
            </p>
          </Faq>
        </Section>

        <Section label="Time & money" title="Budget, time, and upkeep.">
          <Faq question="Be honest — how much time per week does upkeep take?">
            <p>
              For me, ~1-2 hours/week. Some weeks zero, some weeks four when something breaks or I&apos;m tuning a new
              workflow. Average is ~90 minutes.
            </p>
            <p>
              Most of that is reading the morning messages, catching anything odd, and now and then improving an
              instruction. It is less &ldquo;fixing the system&rdquo; and more &ldquo;running the system.&rdquo;
            </p>
          </Faq>
          <Faq question="What if I just want the cheap version?">
            <p>
              The 30-minute quickstart costs about $20/month total. That is a real, useful automation: a daily AI
              summary, your approval in chat, one scheduled job. You can stop there and most people probably should.
            </p>
            <p>
              The <Link href="/systems/playbook/costs">full setup</Link>{" "}(its AI plans alone run about
              $400/month) makes sense if you run a real business with work that repeats. If you&apos;re an
              individual, the cheap version is probably enough.
            </p>
          </Faq>
          <Faq question="Did this actually save you money or just shift it?">
            <p>
              For me running a property business: it&apos;s saved money. The alternative would have been hiring a
              part-time assistant (~$2,000/month at minimum) or accepting more things falling through. Roughly $400 and up a month
              for a system that answers the phone and sorts the inbox around the clock is a clear win.
            </p>
            <p>
              If I were running it just for myself with no business behind it, I&apos;d probably break
              even on the cheap version and lose money on the full version. Be honest about the math for your
              situation.
            </p>
          </Faq>
        </Section>

        <Section label="Comparison" title="Why not just use…?">
          <Faq question="Why not Zapier or Make?">
            <p>
              Both are great for &ldquo;when this happens in one app, do that in another.&rdquo; They struggle
              wherever the work needs thinking: sorting, drafting, judgment, decisions with several steps. They also
              charge per task, which gets expensive as you grow.
            </p>
            <p>
              This approach fits best where the work needs <em>judgment</em>{" "}in the middle, not just moving
              information from one place to another. If your workflow is &ldquo;when X happens, do Y&rdquo; with no thinking
              required, Zapier is probably easier.
            </p>
          </Faq>
          <Faq question="Why not n8n?">
            <p>
              A closer fit. n8n is a free tool like Zapier that can also use AI. It is a real alternative if you
              would rather draw a workflow on screen than write scripts.
            </p>
            <p>
              What you give up is simplicity. Here everything is text files and a folder of small scripts. n8n adds
              its own software that you have to keep running. Pick based on whether you would rather click through
              a screen or edit a text file.
            </p>
          </Faq>
          <Faq question="Why not just open ChatGPT and ask it stuff?">
            <p>
              That is a great starting point, and I still do it every day for one-off questions. This
              system does not replace chat. It is a way to make AI work happen{" "}
              <em>without you starting it every time</em>.
            </p>
            <p>
              If your workflow is &ldquo;I think to ask Claude something whenever I remember,&rdquo; chat is fine. If
              your workflow is &ldquo;this needs to happen every Tuesday at 9 AM whether I remember or not,&rdquo; you
              need a schedule and an approval step.
            </p>
          </Faq>
          <Faq question="Why not hire a virtual assistant instead?">
            <p>
              Honestly? For some work, a virtual assistant is cheaper and more reliable. The system shines when the
              work happens many times a day and is simple (like answering Lyra&apos;s calls), or when it needs
              background a new assistant would not have (the shared notebook).
            </p>
            <p>
              The best answer is probably both: an assistant for what needs a person, and an AI system for the
              repeating work that benefits from speed. Don&apos;t think of it as either/or.
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
                <th scope="col">What it means</th>
                <th scope="col">Example</th>
                <th scope="col">Rule of thumb</th>
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
            label="№ 01 · Fighting the tool"
            title={"The custom fix that kept getting erased."}
            lead={"I put it back twice. The third time I stopped."}
            happened={"I had added my own small change to how the dispatcher program starts up. Every time that program updated itself, my change was erased. I put it back. It was erased again."}
            did={"The third time, instead of putting it back, I asked why this kept happening. It turned out the program already had an approved way to do what I wanted. I switched to that, deleted my change for good, and now I check the setup after every update."}
            lesson={"If a tool keeps undoing your change, it is telling you something. Stop putting it back and find the way the tool was meant to be used. The answer was already in the instructions. I just had not read them carefully."}
          />
          <Broke
            label="№ 02 · Passwords"
            title={"The password that lived in two places."}
            lead={"Lyra's daily call review stopped for half a day before I noticed."}
            happened={"I changed the password for the voice service as routine housekeeping, and updated it where I thought it lived. The next morning the daily review of Lyra's calls (she was called Sarah then) failed. A second script was reading that password from another spot I had forgotten about."}
            did={"I updated both places, wrote a note that this password lives in two spots, and added it to my checklist for changing passwords."}
            lesson={"Passwords get copied. Before you change one, list every place it is used. If you cannot list them, you do not fully know your own system."}
          />
          <Broke
            label="№ 03 · Rules and tone"
            title={"The permission question that made Lyra sound like a robot."}
            lead={"Added at 9 AM. Removed by 5 PM the same day."}
            happened={"I had Lyra ask every caller out loud for permission before sending a text, because I thought a texting rule required it. It worked, but when I listened to the calls she sounded like a script, not a person. Callers got annoyed."}
            did={"I removed it the same day. When I looked closer, the texting service already handled permission on its own, with the standard reply-STOP wording. The spoken question was unnecessary and it spoiled the conversation."}
            lesson={"Do not make the AI recite rules that another part of the system already enforces. Let each part do one job."}
          />
          <Broke
            label="№ 04 · Time limits"
            title={"The download that quit at exactly 30 seconds."}
            lead={"The daily property download would start, look fine, and come back empty."}
            happened={"The daily download of property records ran on an online service. Small downloads worked. Bigger ones came back empty with no error. After a long search I learned the service quietly stops any job after about 30 seconds."}
            did={"First I moved the job to a kind of scheduled run that is allowed more time. Later I moved the download onto my own Mac, where there is no time limit at all."}
            lesson={"Learn a service's limits before you build on it. \"It works on small tests\" is one of the most expensive mistakes there is."}
          />
          <Broke
            label="№ 05 · Auto-fix buttons"
            title={"The auto-repair that made things worse."}
            lead={"A tool that promised to fix the problem created a bigger one."}
            happened={"The dispatcher program looked wrong, so I ran its built-in auto-repair. It changed files it should not have touched. The next update noticed and broke even harder."}
            did={"My permanent rule now is to never run the auto-repair. I follow the written recovery steps by hand instead."}
            lesson={"Auto-fix tools are built for common problems. Yours is probably uncommon, which is why you are stuck. Read what a fix is going to do before you let it run."}
          />
          <Broke
            label="№ 06 · Robot browser"
            title={"Downloads that never arrived."}
            lead={"The browser said \"done.\" The file did not exist."}
            happened={"A robot browser was downloading a spreadsheet from the property software. It worked for some files and failed for others, with no error and no file."}
            did={"I switched to a more direct, lower-level way of catching downloads. It takes more setup, but it does not miss files."}
            lesson={"When a simple tool quietly fails some of the time, use the more basic tool underneath it. It is more work and more honest."}
          />
          <Broke
            label="№ 07 · AI reports vs reality"
            title={"The report that was wrong, politely."}
            lead={"An AI told me a script did one thing. It was doing something else."}
            happened={"I asked an AI to review a folder of scheduled scripts and tell me what each one did. It wrote a confident 1,500-word summary, and I started planning changes from it. Halfway through I checked one claim against the real file. It was wrong. I checked another. Also wrong, in a different way."}
            did={"I built a habit. An AI's report says what the AI understood, not necessarily what is true. I now check any important claim against the real files before I change or delete anything because of it."}
            lesson={"AI summaries are very confident and only fairly accurate. Trust the real files over the summary, especially when the summary says everything looks good."}
          />
          <Broke
            label="№ 08 · Forgotten copies"
            title={"The forgotten copy that carried private details where they should not go."}
            lead={"A \"harmless\" folder turned out to be a leak."}
            happened={"For an old experiment, I had a folder that kept a copy of part of the system's notes. Long after the experiment ended, a forgotten job was still updating it. When I added a new feature, that feature read from the old copy and pulled in private details I thought were locked away."}
            did={"I archived the old folder, checked every other in-between folder the system had, and wrote a permanent note that copies do not clean themselves up."}
            lesson={"Every temporary folder becomes permanent. When you set up a copy, write down when it should be deleted and what might still depend on it."}
          />
          <Broke
            label="№ 09 · Right tool for the job"
            title={"I tried a hosted service to run my jobs. It did not fit."}
            lead={"I spent a month on it, then took it all down."}
            happened={"A company offers a service that runs AI jobs for you on their computers. I moved a good part of my automation onto it because that sounded easier than running my own schedule. Over time it was slow, hard to troubleshoot, and hard to see what had just run."}
            did={"I moved everything back to my own Mac's built-in scheduler. It has been around for 20 years, writes a simple log I can read, and starts instantly. I gave up the convenience and gained speed and the ability to see what is happening."}
            lesson={"A hosted service is great when the job fits it. If your jobs need your own files on your own computer, run them on your own computer."}
          />
          <Broke
            label="№ 10 · Time zones"
            title={"My scheduled jobs ran at the wrong hour for a week while I was traveling."}
            lead={"Your computer's clock follows you. Your schedule may not."}
            happened={"I traveled for a week and my Mac switched time zones on its own. My 8 AM morning summary started arriving at 6 AM. Other jobs kept their old times. It was chaos for a few days."}
            did={"I checked which clock every scheduled job uses and set each one to Central time on purpose, instead of trusting the computer's clock."}
            lesson={"If you travel, your schedule travels with you in ways you will not expect. Set the time zone on purpose in every scheduled job."}
          />
      </Playbook>
    </FieldManualChrome>
  );
}
