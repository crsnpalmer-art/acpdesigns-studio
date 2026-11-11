import { ArrowRightIcon } from "@phosphor-icons/react/ssr";
import styles from "./FieldManual.module.css";

const nav = [
  { id: "projects", home: "#projects", away: "/#projects", label: "Projects" },
  { id: "systems", home: "/systems", away: "/systems", label: "Systems" },
  { id: "case-studies", home: "#case-studies", away: "/#case-studies", label: "Case studies" },
  { id: "field-notes", home: "#field-notes", away: "/#field-notes", label: "What I've learned" },
  { id: "playbook", home: "/systems/playbook", away: "/systems/playbook", label: "Playbook" },
] as const;

const playbookLinks = [
  ["/systems/playbook", "Start"],
  ["/systems/playbook/build", "Build"],
  ["/systems/playbook/costs", "Costs"],
  ["/systems/playbook/reference", "Reference"],
] as const;

const contactHref = "mailto:crsnpalmer@gmail.com";

export type ChromePage = "home" | "systems" | "playbook" | "other";

type FieldManualChromeProps = {
  children: React.ReactNode;
  page: ChromePage;
  skipHref: string;
  skipLabel: string;
};

function Wordmark() {
  return (
    <span className={styles.wordmark}>
      <b aria-hidden="true">ACP</b>
      <span>
        ACP Designs Studio
        <small>Carson Palmer</small>
      </span>
    </span>
  );
}

export default function FieldManualChrome({
  children,
  page,
  skipHref,
  skipLabel,
}: FieldManualChromeProps) {
  const onHome = page === "home";

  return (
    <main id={onHome ? "top" : undefined} className={styles.manual}>
      <a className={styles.skipLink} href={skipHref}>
        {skipLabel}
      </a>

      <span className={styles.readingLine} aria-hidden="true" />

      <header className={styles.header}>
        <a href={onHome ? "#top" : "/"} className={styles.identity} aria-label="ACP Designs Studio home">
          <Wordmark />
        </a>
        <nav aria-label="Primary" className={styles.primaryNav}>
          <ul>
            {nav.map((item) => (
              <li key={item.id}>
                <a
                  href={onHome ? item.home : item.away}
                  aria-current={item.id === page ? "page" : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a className={styles.headerContact} href={onHome ? "#contact" : "/#contact"}>
          Contact
        </a>
      </header>

      {children}

      <footer id="contact" className={styles.footer}>
        <div className={styles.footerLead}>
          <p className={styles.sectionLabel}>Tell me about your work</p>
          <p className={styles.footerStatement}>Let&apos;s build something useful together.</p>
          <a className={styles.primaryButton} href={contactHref}>
            Start a conversation <ArrowRightIcon aria-hidden="true" />
          </a>
        </div>

        <div className={styles.footerColumns}>
          <div className={styles.footerBrand}>
            <Wordmark />
            <p>Property systems studio<br />Tuscaloosa, Alabama<br />33.2098° N · 87.5692° W</p>
          </div>
          <nav aria-label="Site">
            <p>Site</p>
            <ul>
              {nav.slice(0, 4).map((item) => (
                <li key={item.id}>
                  <a href={onHome ? item.home : item.away}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Playbook">
            <p>Playbook</p>
            <ul>
              {playbookLinks.map(([href, label]) => (
                <li key={href}>
                  <a href={href}>{label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Legal and contact">
            <p>Legal</p>
            <ul>
              <li><a href="/privacy">Privacy &amp; data use</a></li>
              <li><a href={contactHref}>Email Carson</a></li>
            </ul>
          </nav>
        </div>

        <div className={styles.footerRule}>
          <p>© {new Date().getFullYear()} ACP Designs Studio</p>
          <p>Built in Tuscaloosa. Working wherever better systems help.</p>
        </div>
      </footer>
    </main>
  );
}
