import Image from "next/image";
import {
  ArrowRightIcon,
  BuildingsIcon,
  CirclesThreePlusIcon,
  GlobeHemisphereWestIcon,
  MapPinIcon,
} from "@phosphor-icons/react/ssr";
import styles from "./FieldManual.module.css";

const nav = [
  { id: "projects", home: "#projects", away: "/#projects", label: "Projects" },
  { id: "systems", home: "/systems", away: "/systems", label: "Systems" },
  { id: "case-studies", home: "#case-studies", away: "/#case-studies", label: "Case studies" },
  { id: "field-notes", home: "#field-notes", away: "/#field-notes", label: "What I've learned" },
  { id: "contact", home: "#contact", away: "/#contact", label: "Contact" },
] as const;

type ChromePage = "home" | "systems";

type FieldManualChromeProps = {
  children: React.ReactNode;
  page: ChromePage;
  skipHref: string;
  skipLabel: string;
  rail: readonly [string, string, string];
};

export default function FieldManualChrome({
  children,
  page,
  skipHref,
  skipLabel,
  rail,
}: FieldManualChromeProps) {
  const onHome = page === "home";

  return (
    <main id={onHome ? "top" : undefined} className={`${styles.manual}${onHome ? "" : ` ${styles.manualScroll}`}`}>
      <a className={styles.skipLink} href={skipHref}>
        {skipLabel}
      </a>

      <span className={styles.readingLine} aria-hidden="true" />

      <header className={styles.header}>
        <a href={onHome ? "#top" : "/"} className={styles.identity} aria-label="ACP Designs Studio home">
          <Image src="/apple-icon" width={36} height={36} alt="" className={styles.mark} />
          <span>
            <strong>ACP Designs Studio</strong>
            <small>Carson Palmer</small>
          </span>
        </a>
        <nav aria-label="Primary" className={styles.primaryNav}>
          <ul className={styles.scrollSpy}>
            {nav.map((item) => {
              const current = item.id === "systems" && page === "systems";
              return (
                <li key={item.id}>
                  <a href={onHome ? item.home : item.away} aria-current={current ? "page" : undefined}>
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
        <p className={styles.location}>Tuscaloosa, AL<br />Property systems studio</p>
      </header>

      <aside className={styles.marginRail} aria-hidden="true">
        {rail.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </aside>

      {children}

      <footer id="contact" className={styles.footer}>
        <div className={styles.footerBrand}>
          <Image src="/apple-icon" width={54} height={54} alt="" />
          <p>ACP Designs Studio<small>Carson Palmer</small></p>
        </div>
        <div className={styles.footerStatement}>
          <p>Let&apos;s build something<br />useful together.</p>
        </div>
        <div className={styles.footerContact}>
          <p className={styles.sectionLabel}>Tell me about your work.</p>
          <a href="mailto:crsnpalmer@gmail.com">
            Start a conversation <ArrowRightIcon aria-hidden="true" />
          </a>
        </div>
        <div className={styles.footerLocation}>
          <MapPinIcon aria-hidden="true" />
          <p>33.2098° N<br />87.5692° W</p>
        </div>
        <div className={styles.footerRule}>
          <p>© 2026 ACP Designs Studio</p>
          <p>Built in Tuscaloosa. Working wherever better systems help.</p>
          <a href="/privacy">Privacy &amp; data use</a>
        </div>
      </footer>

      {onHome ? (
        <div className={styles.decorativeIcons} aria-hidden="true">
          <BuildingsIcon /><CirclesThreePlusIcon /><GlobeHemisphereWestIcon />
        </div>
      ) : null}
    </main>
  );
}
