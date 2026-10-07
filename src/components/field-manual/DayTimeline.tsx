import styles from "./FieldManual.module.css";

const moments = [
  {
    when: "Before I wake",
    title: "Property data syncs",
    detail: "AppFolio numbers land on the Mac before the workday starts.",
  },
  {
    when: "Morning",
    title: "The digest waits",
    detail: "One chat message: occupancy, work orders, money, anything overdue.",
  },
  {
    when: "Morning",
    title: "The occupancy board",
    detail: "Lease Tracker shows which units are open, who's renewing, and what to do next.",
  },
  {
    when: "Every 5 min",
    title: "Email triage",
    detail: "Gmail is sorted; leasing inquiries get a drafted reply. Routine ones can send when they pass a checker.",
  },
  {
    when: "All day",
    title: "Lyra answers the phone",
    detail: "Leasing and maintenance calls and texts become organized requests, day or night.",
  },
  {
    when: "Morning",
    title: "The turn board lands",
    detail: "Each turning unit's checklist, printed for the crew.",
  },
  {
    when: "All day",
    title: "Approvals, not busywork",
    detail: "Drafts queue up. Routine answers can send. Money, leases, and legal wait for APPROVE.",
  },
  {
    when: "Evening",
    title: "Follow-up sweep",
    detail: "Calls and texts get quality-checked, and missed jobs get re-run.",
  },
  {
    when: "Overnight",
    title: "The system tends itself",
    detail: "Memory logs write, the shared wiki is filed and saved; weekly backups run.",
  },
  {
    when: "Weekly",
    title: "The ledger lands",
    detail: "Late rent, renewals, occupancy, and the weekly collections snapshot arrive in chat.",
  },
] as const;

export default function DayTimeline() {
  return (
    <section id="day" className={styles.dayTimeline} aria-labelledby="day-title">
      <header className={styles.dayIntro}>
        <p className={styles.sectionLabel}>Around the clock</p>
        <h2 id="day-title">One day,<br />on the clock.</h2>
        <p className={styles.dayLead}>
          The same day, every day. The systems run the routine so a person only
          handles the judgment calls.
        </p>
      </header>
      <ol className={styles.dayTrack}>
        {moments.map((moment, index) => (
          <li key={`${moment.when}-${moment.title}`} className={styles.dayMoment}>
            <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <time>{moment.when}</time>
            <strong>{moment.title}</strong>
            <p>{moment.detail}</p>
          </li>
        ))}
      </ol>
      <p className={styles.dayNote}>
        Pulled from the live schedule above, rounded to the rhythm of the day.
        A person still owns money, leases, and legal. Routine replies can send
        when they pass a checker.
      </p>
    </section>
  );
}
