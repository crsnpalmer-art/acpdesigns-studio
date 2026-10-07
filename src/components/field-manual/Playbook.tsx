import Link from "next/link";
import styles from "./Playbook.module.css";

export type PlaybookPage = "start" | "build" | "costs" | "reference";

const pages: readonly { id: PlaybookPage; href: string; label: string; note: string }[] = [
  { id: "start", href: "/systems/playbook", label: "Start", note: "Quickstart" },
  { id: "build", href: "/systems/playbook/build", label: "Build", note: "Pattern + prompts" },
  { id: "costs", href: "/systems/playbook/costs", label: "Costs", note: "Bill + honest take" },
  { id: "reference", href: "/systems/playbook/reference", label: "Reference", note: "FAQ + glossary" },
];

type PlaybookProps = {
  current: PlaybookPage;
  eyebrow: string;
  title: string;
  lead: React.ReactNode;
  meta?: string;
  children: React.ReactNode;
};

export default function Playbook({ current, eyebrow, title, lead, meta, children }: PlaybookProps) {
  return (
    <article className={styles.playbook} aria-labelledby="playbook-title">
      <header className={styles.intro}>
        <Link href="/systems" className={styles.back}>
          <span aria-hidden="true">←</span> Operating map
        </Link>
        <p className={styles.eyebrow}>
          {eyebrow}
          {meta ? <span className={styles.meta}>{meta}</span> : null}
        </p>
        <h1 id="playbook-title">{title}</h1>
        <div className={styles.lead}>{lead}</div>
      </header>

      <nav aria-label="Playbook pages" className={styles.subNav}>
        <ol>
          {pages.map((page, index) => (
            <li key={page.id}>
              <Link href={page.href} aria-current={page.id === current ? "page" : undefined}>
                <span className={styles.subNavIndex}>0{index + 1}</span>
                <strong>{page.label}</strong>
                <small>{page.note}</small>
              </Link>
            </li>
          ))}
        </ol>
      </nav>

      <div id="playbook-content" className={styles.body} tabIndex={-1}>
        {children}
      </div>
    </article>
  );
}

type SectionProps = {
  id?: string;
  label: string;
  title: string;
  tone?: "default" | "dark" | "warn";
  children?: React.ReactNode;
};

export function Section({ id, label, title, tone = "default", children }: SectionProps) {
  const toneClass = tone === "dark" ? ` ${styles.dark}` : tone === "warn" ? ` ${styles.warn}` : "";
  return (
    <section id={id} className={`${styles.section}${toneClass}`}>
      <p className={styles.label}>{label}</p>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export function Lead({ children }: { children: React.ReactNode }) {
  return <p className={styles.sectionLead}>{children}</p>;
}

export function Callout({ children }: { children: React.ReactNode }) {
  return <aside className={styles.callout}>{children}</aside>;
}

export function Cards({ children, columns = 2 }: { children: React.ReactNode; columns?: 2 | 3 }) {
  return <div className={`${styles.cards}${columns === 3 ? ` ${styles.cardsThree}` : ""}`}>{children}</div>;
}

export function Card({
  title,
  marker,
  meta,
  children,
}: {
  title: React.ReactNode;
  marker?: string;
  meta?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.card}>
      {marker ? <span className={styles.cardMarker}>{marker}</span> : null}
      <h3>{title}</h3>
      {meta ? <p className={styles.cardMeta}>{meta}</p> : null}
      {children}
    </div>
  );
}

export function Flow({ rows }: { rows: readonly (readonly [string, React.ReactNode])[] }) {
  return (
    <dl className={styles.flow}>
      {rows.map(([term, detail]) => (
        <div key={term}>
          <dt>{term}</dt>
          <dd>{detail}</dd>
        </div>
      ))}
    </dl>
  );
}

export function Checklist({ items }: { items: readonly React.ReactNode[] }) {
  return (
    <ol className={styles.checklist}>
      {items.map((item, index) => (
        <li key={index}>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  );
}

export function TableWrap({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className={styles.tableWrap} role="region" aria-label={label} tabIndex={0}>
      <table>{children}</table>
    </div>
  );
}

export function Code({ children, label }: { children: string; label?: string }) {
  return (
    <pre className={styles.pre} aria-label={label} tabIndex={0}>
      <code>{children}</code>
    </pre>
  );
}

export function Faq({ question, children }: { question: string; children: React.ReactNode }) {
  return (
    <details className={styles.faq}>
      <summary>{question}</summary>
      <div>{children}</div>
    </details>
  );
}

export function Download({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a className={styles.download} href={href} download>
      {children} <span aria-hidden="true">↓</span>
    </a>
  );
}
