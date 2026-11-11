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
  numberWord,
  operatingStats,
  snapshotDate,
  type Agent,
  type Job,
} from "@/content/operating-map";
import styles from "./OperatingMap.module.css";
import SystemsSections, { RequestLoop, Workflows } from "./SystemsSections";

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

const emptyChat = "Nothing scheduled. This specialist works when I ask.";
const emptyMac = "Nothing always-on here.";

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
                <div><dt>Looks at</dt><dd>{job.guide.reads}</dd></div>
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
    <article className={styles.dossier} id={agent.id} aria-labelledby={`${agent.id}-title`}>
      <header>
        <Icon aria-hidden="true" />
        <p>{agent.lane}</p>
        <h2 id={`${agent.id}-title`}>{agent.name}</h2>
        <strong>{agent.title}</strong>
      </header>

      <div className={styles.blocks}>
        <section>
          <p>What it does</p>
          <span>{agent.detail}</span>
        </section>
        <section>
          <p>Responsible for</p>
          <ul>
            {agent.owns.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section>
          <p>On a schedule · open one to see how it works</p>
          <JobList jobs={agent.chatRoutines} empty={emptyChat} />
        </section>
        <section>
          <p>Always running</p>
          <JobList jobs={agent.macJobs} empty={emptyMac} />
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
          <p>Systems · Hermes</p>
          <h1 id="systems-title">{numberWord(operatingStats.agents, true)} specialists.<br />One chat.</h1>
        </div>
        <p className={styles.lead}>
          Hermes is the AI team that helps me run the property business. This page shows
          what it does in plain words: the work that runs on its own, who handles what, and
          where a person still makes the call on money, leases, and legal.
        </p>
      </header>

      <dl className={styles.stats} aria-label="Hermes public snapshot">
        <div><dt>{String(operatingStats.agents).padStart(2, "0")}</dt><dd>AI specialists</dd></div>
        <div><dt>{operatingStats.routines}</dt><dd>Scheduled jobs</dd></div>
        <div><dt>{String(operatingStats.macJobs).padStart(2, "0")}</dt><dd>Always-on helpers</dd></div>
        <div><dt>{String(operatingStats.chats).padStart(2, "0")}</dt><dd>Chat to run it all</dd></div>
      </dl>

      <RequestLoop />

      <Workflows />

      <header className={styles.teamHead}>
        <p>The team</p>
        <h2>Who handles what.</h2>
        <span>Each specialist covers one part of the business. Open any scheduled job to see what it looks at, what it produces, and what is left for me.</span>
      </header>

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
          Checked against the live system on {snapshotDate}. Public names only —
          resident details, addresses, and logins stay off this page. Gmail handling is covered
          on the <a href="/privacy">privacy page</a>.
        </p>
        <HardDrivesIcon aria-hidden="true" />
      </footer>
    </section>
  );
}
