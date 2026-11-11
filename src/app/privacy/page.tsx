import type { Metadata } from "next";
import FieldManualChrome from "@/components/field-manual/FieldManualChrome";
import Playbook, { Section } from "@/components/field-manual/Playbook";

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
    <ul>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default function PrivacyPage() {
  return (
    <FieldManualChrome page="other" skipHref="#playbook-content" skipLabel="Skip to the policy">
      <Playbook
        back={{ href: "/", label: "Home" }}
        eyebrow="Privacy"
        meta="Last updated: October 1, 2026"
        title="Privacy and data use"
        lead={
          <p>
            ACP Designs Studio is a public portfolio. It has no user accounts,
            payment forms, or resident-information forms.
          </p>
        }
      >
        <Section label="This website" title="A small, privacy-minded measurement setup">
          <p>
            This site uses Vercel Web Analytics and Speed Insights to understand
            which pages are useful and whether the site performs well. Vercel
            describes Web Analytics as anonymous and cookie-free, and Speed
            Insights as anonymous performance measurement that is not tied to an
            individual visitor or IP address.
          </p>
          <PolicyList items={websiteMeasurements} />
          <p>
            Read Vercel&apos;s separate privacy notes for{" "}
            <a href="https://vercel.com/docs/analytics/privacy-policy">Web Analytics</a>{" "}
            and{" "}
            <a href="https://vercel.com/docs/speed-insights/privacy-policy">Speed Insights</a>.
          </p>
          <h3>Contact and outside links</h3>
          <p>
            The contact link opens your email app. If you send a message, your
            email provider and Carson&apos;s provider handle it under their own
            policies. Links to property websites, app stores, and other projects
            lead to separate services with their own privacy practices.
          </p>
        </Section>

        <Section label="Private Gmail integration" title="OpenClaw Gmail Connect">
          <p>
            This URL is also the privacy policy for the Google OAuth app named
            OpenClaw Gmail Connect. The name stays here so it matches the name
            Google shows during account connection. The current workflow runs
            inside Carson&apos;s private Hermes setup.
          </p>

          <h3>What the integration does</h3>
          <p>
            The integration uses Google OAuth on Carson&apos;s Mac. It checks
            authorized Gmail inboxes for property-management messages, routes
            useful summaries to a private review workspace, and supports
            approval-based reply drafts.
          </p>

          <h3>Google user data accessed</h3>
          <PolicyList items={gmailDataTypes} />

          <h3>How Gmail data is used</h3>
          <PolicyList items={gmailUses} />

          <h3>Storage, sharing, and human approval</h3>
          <p>
            OAuth tokens, polling state, and operations logs are kept on
            Carson&apos;s local Mac and in its local credential store. Sender and
            subject summaries may be posted to Carson&apos;s private Hermes and
            Telegram review workspace. Gmail data is not sold, used for ads, or
            shared for unrelated marketing.
          </p>
          <p>
            The integration may prepare drafts. It sends only through workflows
            Carson has approved: routine leasing replies that pass an automatic
            checker, and drafts he approves one by one. Messages about money,
            leases, or legal matters always wait for him.
          </p>

          <h3>Retention and access removal</h3>
          <p>
            Data is kept only as long as needed for property operations,
            troubleshooting, and an audit history. Local logs can be removed at
            any time.
          </p>
          <p>
            To remove Google access, open{" "}
            <a href="https://myaccount.google.com/permissions">
              Google Account third-party access
            </a>{" "}
            and remove OpenClaw Gmail Connect. Carson can also remove the local
            credentials from his Mac.
          </p>

          <h3>Contact</h3>
          <p>
            Questions about this policy or the Gmail integration can be sent to{" "}
            <a href="mailto:crsnpalmer@gmail.com">crsnpalmer@gmail.com</a>.
          </p>
        </Section>
      </Playbook>
    </FieldManualChrome>
  );
}
