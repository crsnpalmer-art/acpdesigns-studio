import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy | ACP Designs Studio",
  description:
    "How ACP Designs Studio handles website analytics, contact messages, and Gmail data used by the OpenClaw Gmail Connect integration.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "Privacy | ACP Designs Studio",
    description:
      "How ACP Designs Studio handles website analytics, contact messages, and Gmail integration data.",
    url: "/privacy",
    siteName: "ACP Designs Studio",
    type: "article",
  },
};

const websiteMeasurements = [
  "The page or route visited and the site that referred the visit.",
  "General browser, device, operating-system, and country-level information.",
  "Anonymous performance measurements such as page speed and Core Web Vitals.",
];

const gmailDataTypes = [
  "Google account identity and the authorized Gmail address.",
  "Message details such as sender, recipient, date, labels, unread status, and message ID.",
  "Gmail subjects, snippets, and message bodies when needed to sort property or operations mail.",
  "Draft or sent-message data only when Carson explicitly approves a send workflow.",
];

const gmailUses = [
  "Check property-management inboxes for unread operations mail.",
  "Route maintenance, leasing, payment, and owner-accounting messages to the correct private review area.",
  "Prepare reply drafts or reminders that Carson can approve, edit, or skip.",
  "Detect expired or revoked Gmail access so Carson can reconnect the affected account.",
];

function PolicyList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-4 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-white/55" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="px-6 py-6 md:px-12 lg:px-16">
        <nav className="mx-auto flex max-w-5xl items-center justify-between gap-6 text-sm text-white/70">
          <Link
            href="/"
            className="font-semibold tracking-[0.18em] text-white uppercase"
          >
            ACP Designs Studio
          </Link>
          <a
            href="mailto:crsnpalmer@gmail.com"
            className="rounded-full border border-white/15 px-4 py-2 text-white transition hover:border-white/35"
          >
            Contact
          </a>
        </nav>
      </section>

      <section className="px-6 pb-20 pt-12 md:px-12 md:pt-20 lg:px-16">
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow">Privacy</p>
            <h1 className="mt-5 text-4xl font-semibold leading-tight text-white md:text-6xl">
              Privacy and data use
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/70">
              ACP Designs Studio is a public portfolio. It has no user accounts,
              payment forms, or resident-information forms.
            </p>
            <p className="mt-6 text-sm text-white/50">
              Last updated: July 17, 2026
            </p>
          </div>

          <div className="space-y-12 text-base leading-7 text-white/74">
            <section>
              <p className="text-xs font-semibold tracking-[0.18em] text-orange-500 uppercase">
                This website
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-white">
                A small, privacy-minded measurement setup
              </h2>
              <p className="mt-4">
                This site uses Vercel Web Analytics and Speed Insights to understand
                which pages are useful and whether the site performs well. Vercel
                describes Web Analytics as anonymous and cookie-free, and Speed
                Insights as anonymous performance measurement that is not tied to an
                individual visitor or IP address.
              </p>
              <PolicyList items={websiteMeasurements} />
              <p className="mt-4 text-sm text-white/58">
                Read Vercel&apos;s separate privacy notes for{" "}
                <a
                  href="https://vercel.com/docs/analytics/privacy-policy"
                  className="text-white underline decoration-white/35 underline-offset-4 hover:decoration-white"
                >
                  Web Analytics
                </a>{" "}
                and{" "}
                <a
                  href="https://vercel.com/docs/speed-insights/privacy-policy"
                  className="text-white underline decoration-white/35 underline-offset-4 hover:decoration-white"
                >
                  Speed Insights
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">
                Contact and outside links
              </h2>
              <p className="mt-4">
                The contact link opens your email app. If you send a message, your
                email provider and Carson&apos;s provider handle it under their own
                policies. Links to property websites, app stores, and other projects
                lead to separate services with their own privacy practices.
              </p>
            </section>

            <div className="border-t border-white/15 pt-12">
              <p className="text-xs font-semibold tracking-[0.18em] text-orange-500 uppercase">
                Private Gmail integration
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-white">
                OpenClaw Gmail Connect
              </h2>
              <p className="mt-4">
                This URL is also the privacy policy for the Google OAuth app named
                OpenClaw Gmail Connect. The name stays here so it matches the name
                Google shows during account connection. The current workflow runs
                inside Carson&apos;s private Hermes setup.
              </p>
            </div>

            <section>
              <h2 className="text-xl font-semibold text-white">
                What the integration does
              </h2>
              <p className="mt-4">
                The integration uses Google OAuth on Carson&apos;s Mac. It checks
                authorized Gmail inboxes for property-management messages, routes
                useful summaries to a private review workspace, and supports
                approval-based reply drafts.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">
                Google user data accessed
              </h2>
              <PolicyList items={gmailDataTypes} />
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">
                How Gmail data is used
              </h2>
              <PolicyList items={gmailUses} />
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">
                Storage, sharing, and human approval
              </h2>
              <p className="mt-4">
                OAuth tokens, polling state, and operations logs are kept on
                Carson&apos;s local Mac and in its local credential store. Sender and
                subject summaries may be posted to Carson&apos;s private Hermes and
                Telegram review workspace. Gmail data is not sold, used for ads, or
                shared for unrelated marketing.
              </p>
              <p className="mt-4">
                The integration may prepare drafts. It does not send resident or
                business messages unless Carson explicitly approves them.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">
                Retention and access removal
              </h2>
              <p className="mt-4">
                Data is kept only as long as needed for property operations,
                troubleshooting, and an audit history. Local logs can be removed at
                any time.
              </p>
              <p className="mt-4">
                To remove Google access, open{" "}
                <a
                  href="https://myaccount.google.com/permissions"
                  className="text-white underline decoration-white/35 underline-offset-4 hover:decoration-white"
                >
                  Google Account third-party access
                </a>{" "}
                and remove OpenClaw Gmail Connect. Carson can also remove the local
                credentials from his Mac.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">Contact</h2>
              <p className="mt-4">
                Questions about this policy or the Gmail integration can be sent to{" "}
                <a
                  href="mailto:crsnpalmer@gmail.com"
                  className="text-white underline decoration-white/35 underline-offset-4 hover:decoration-white"
                >
                  crsnpalmer@gmail.com
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
