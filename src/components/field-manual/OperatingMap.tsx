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
  finance: "No chat routines. This lane is paused.",
  tweeter: "No chat routines. This lane is paused.",
};

const emptyMac: Partial<Record<AgentId, string>> = {
  main: "No background jobs on this lane. Studio Mac health lives with Guardian Zero.",
  work: "No background jobs on this lane. Studio Mac health lives with Guardian Zero.",
  collections: "No background jobs on this lane. Studio Mac health lives with Guardian Zero.",
  finance: "No background jobs. This lane is paused.",
  tweeter: "No background jobs. This lane is paused.",
};

function JobList({ jobs, empty }: { jobs: Job[]; empty?: string }) {
  if (jobs.length === 0) {
    return <p className={styles.empty}>{empty}</p>;
  }

  return (
    <ol>
      {jobs.map((job) => (
        <li key={job.name}>
          <strong>{job.name}</strong>
          <em>{job.cadence}</em>
          <span>{job.detail}</span>
        </li>
      ))}
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
          <p>Chat schedules</p>
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
          <h1 id="systems-title">One Mac.<br />A conductor and eight specialists.</h1>
        </div>
        <p className={styles.lead}>
          One private chat, nine named lanes, and a human gate for money, leases, and legal.
          This page is the public map: what each specialist owns, when they check in, and
          which background jobs keep the studio Mac honest.
        </p>
      </header>

      <dl className={styles.stats} aria-label="Hermes public snapshot">
        <div><dt>{String(operatingStats.agents).padStart(2, "0")}</dt><dd>Specialized agents</dd></div>
        <div><dt>{operatingStats.routines}</dt><dd>Chat routines</dd></div>
        <div><dt>{String(operatingStats.macJobs).padStart(2, "0")}</dt><dd>Mac background jobs</dd></div>
        <div><dt>{String(operatingStats.chats).padStart(2, "0")}</dt><dd>Private chat workspace</dd></div>
      </dl>

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
