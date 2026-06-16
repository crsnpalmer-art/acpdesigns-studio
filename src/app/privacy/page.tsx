import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | OpenClaw Gmail Connect",
  description:
    "Privacy policy for OpenClaw Gmail Connect, a local Gmail OAuth app used for Carson Palmer's property operations.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "Privacy Policy | OpenClaw Gmail Connect",
    description:
      "How OpenClaw Gmail Connect uses Google account data for local property inbox automation.",
    url: "/privacy",
    siteName: "ACP Designs Studio",
    type: "article",
  },
};

const dataTypes = [
  "Google account identity and authorized Gmail account address.",
  "Gmail message metadata such as sender, recipient, date, labels, unread status, and message id.",
  "Gmail subjects, snippets, and message bodies when needed to classify property or operations mail.",
  "Draft or sent-message data only when Carson explicitly approves a send workflow.",
];

const uses = [
  "Poll property-management inboxes for unread operational mail.",
  "Route maintenance, leasing, payment, and owner-accounting messages to the correct private OpenClaw operator channel.",
  "Prepare review-only reply drafts or reminders that Carson can approve, edit, or skip.",
  "Detect expired or revoked Gmail access so Carson can re-authorize the affected account.",
];

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
            <p className="eyebrow">Privacy policy</p>
            <h1 className="mt-5 text-4xl font-semibold leading-tight text-white md:text-6xl">
              OpenClaw Gmail Connect
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/70">
              OpenClaw Gmail Connect is a local automation app used by Carson
              Palmer to help manage Gmail inboxes for property operations.
            </p>
            <p className="mt-6 text-sm text-white/50">
              Last updated: June 16, 2026
            </p>
          </div>

          <div className="space-y-10 text-base leading-7 text-white/74">
            <section>
              <h2 className="text-xl font-semibold text-white">
                What the app does
              </h2>
              <p className="mt-4">
                The app uses Google OAuth through the local <code>gog</code>{" "}
                tool on Carson&apos;s Mac. It watches authorized Gmail inboxes
                for property-management messages, helps route those messages to
                private OpenClaw operator channels, and supports
                approval-based reply workflows.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">
                Google user data accessed
              </h2>
              <ul className="mt-4 space-y-3">
                {dataTypes.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-white/55" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">
                How the data is used
              </h2>
              <ul className="mt-4 space-y-3">
                {uses.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-white/55" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">
                Storage and sharing
              </h2>
              <p className="mt-4">
                OAuth tokens, polling state, and operational logs are stored on
                Carson&apos;s local Mac, primarily under local OpenClaw state
                folders and the <code>gog</code> credential store. Sender and
                subject summaries may be posted to Carson&apos;s private
                OpenClaw/Telegram operator channels so he can review property
                work. Gmail data is not sold, used for ads, or shared for
                unrelated third-party marketing.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">
                Retention
              </h2>
              <p className="mt-4">
                Data is kept only as long as needed for local property
                operations, troubleshooting, and audit history. Carson can
                remove local logs or revoke Google access at any time.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">
                Revoke access
              </h2>
              <p className="mt-4">
                To revoke Google access, open{" "}
                <a
                  href="https://myaccount.google.com/permissions"
                  className="text-white underline decoration-white/35 underline-offset-4 hover:decoration-white"
                >
                  Google Account third-party access
                </a>{" "}
                and remove OpenClaw Gmail Connect. Carson can also delete the
                local <code>gog</code> credentials from his Mac.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">
                Contact
              </h2>
              <p className="mt-4">
                Questions about this policy or the app can be sent to{" "}
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
