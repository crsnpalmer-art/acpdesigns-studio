import {
  BrainIcon,
  BuildingsIcon,
  ChatCircleDotsIcon,
  CirclesThreePlusIcon,
  CurrencyDollarIcon,
  HardDrivesIcon,
  PhoneCallIcon,
  ShieldCheckIcon,
  TrendUpIcon,
  WrenchIcon,
  XLogoIcon,
} from "@phosphor-icons/react/ssr";
import {
  agents,
  operatingStats,
  snapshotDate,
  type Agent,
  type AgentId,
  type Job,
} from "@/content/operating-map";
import styles from "./OperatingMap.module.css";
import SystemsSections, { RequestLoop } from "./SystemsSections";

const icons = {
  main: CirclesThreePlusIcon,
  work: BuildingsIcon,
  lyra: PhoneCallIcon,
  maintenance: WrenchIcon,
  collections: CurrencyDollarIcon,
  finance: TrendUpIcon,
  ops: ShieldCheckIcon,
  memory: BrainIcon,
  tweeter: XLogoIcon,
} as const;

const emptyChat: Partial<Record<AgentId, string>> = {
  finance: "No scheduled jobs. Scans are paused; this lane works on request.",
  tweeter: "No scheduled jobs. Scans are paused; this lane works on request.",
};

const emptyMac: Partial<Record<AgentId, string>> = {
  main: "No background jobs on this lane. Studio Mac health lives with System Health.",
  work: "No background jobs on this lane. Studio Mac health lives with System Health.",
  collections: "No background jobs on this lane. Studio Mac health lives with System Health.",
  finance: "No background jobs.",
  tweeter: "No background jobs.",
};

function JobList({ jobs, empty }: { jobs: Job[]; empty?: string }) {
  if (jobs.length === 0) {
    return <p className={styles.empty}>{empty}</p>;
  }

  return (
    <ol>
      {jobs.map((job) =>
        job.guide ? (
          <li key={job.name} className={styles.jobItem}>
            <details className={styles.job}>
              <summary>
                <strong>{job.name}</strong>
                <em>{job.cadence}</em>
                <span>{job.detail}</span>
              </summary>
              <dl className={styles.guide}>
                <div><dt>Reads</dt><dd>{job.guide.reads}</dd></div>
                <div><dt>How it works</dt><dd>{job.guide.how}</dd></div>
                <div><dt>Result</dt><dd>{job.guide.result}</dd></div>
                <div><dt>Carson&rsquo;s part</dt><dd>{job.guide.you}</dd></div>
              </dl>
            </details>
          </li>
        ) : (
          <li key={job.name}>
            <strong>{job.name}</strong>
            <em>{job.cadence}</em>
            <span>{job.detail}</span>
          </li>
        ),
      )}
    </ol>
  );
}

function Dossier({ agent }: { agent: Agent }) {
  const Icon = icons[agent.id];

  return (
    <>
    {agent.id === "lyra" && <span id="sarah" aria-hidden="true" />}
    <article className={styles.dossier} id={agent.id} aria-labelledby={`${agent.id}-title`}>
      <header>
        <Icon aria-hidden="true" />
        <p>{agent.lane} lane</p>
        <h2 id={`${agent.id}-title`}>{agent.name}</h2>
        <strong>{agent.title}</strong>
        {agent.model && <small className={styles.model}>Runs on {agent.model}</small>}
      </header>

      <div className={styles.blocks}>
        <section>
          <p>Role</p>
          <span>{agent.detail}</span>
        </section>
        <section>
          <p>Owns</p>
          <ul>
            {agent.owns.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section>
          <p>Scheduled jobs · open one to see how it works</p>
          <JobList jobs={agent.chatRoutines} empty={emptyChat[agent.id]} />
        </section>
        <section>
          <p>Background jobs on the studio Mac</p>
          <JobList jobs={agent.macJobs} empty={emptyMac[agent.id]} />
        </section>
      </div>
    </article>
    </>
  );
}

export default function OperatingMap() {
  return (
    <section id="operating-map" className={styles.map} aria-labelledby="systems-title">
      <header className={styles.intro}>
        <div>
          <p>Operating map · Hermes</p>
          <h1 id="systems-title">One Mac.<br />Nine lanes.</h1>
        </div>
        <p className={styles.lead}>
          One private chat, a dispatcher and eight specialists, and a human gate for money,
          leases, and legal. This page is the public map: what each lane owns, what every
          scheduled job does and how, and the background jobs that keep the studio Mac honest.
        </p>
      </header>

      <dl className={styles.stats} aria-label="Hermes public snapshot">
        <div><dt>{String(operatingStats.agents).padStart(2, "0")}</dt><dd>Hermes lanes</dd></div>
        <div><dt>{operatingStats.routines}</dt><dd>Scheduled jobs</dd></div>
        <div><dt>{String(operatingStats.macJobs).padStart(2, "0")}</dt><dd>Mac services</dd></div>
        <div><dt>{String(operatingStats.chats).padStart(2, "0")}</dt><dd>Private chat workspace</dd></div>
      </dl>

      <RequestLoop />

      <div className={styles.layout}>
        <nav className={styles.laneNav} aria-label="Specialists">
          {agents.map((agent) => {
            const Icon = icons[agent.id];
            return (
              <a key={agent.id} href={`#${agent.id}`}>
                <Icon aria-hidden="true" />
                <span>{agent.lane}</span>
                <strong>{agent.name}</strong>
              </a>
            );
          })}
        </nav>

        <div className={styles.dossiers}>
          {agents.map((agent) => (
            <Dossier key={agent.id} agent={agent} />
          ))}
        </div>
      </div>

      <SystemsSections />

      <footer className={styles.note}>
        <ChatCircleDotsIcon aria-hidden="true" />
        <p>
          Snapshot verified {snapshotDate} against the live system. Public names only —
          private IDs, paths, and chat numbers stay off this page. Gmail handling is covered
          on the <a href="/privacy">privacy page</a>.
        </p>
        <HardDrivesIcon aria-hidden="true" />
      </footer>
    </section>
  );
}
