import Image from "next/image";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  CheckCircleIcon,
  ClipboardTextIcon,
  FlowArrowIcon,
  PhoneCallIcon,
  ShieldCheckIcon,
} from "@phosphor-icons/react/ssr";
import DayTimeline from "./DayTimeline";
import FieldManualChrome from "./FieldManualChrome";
import HermesExplainer from "./HermesExplainer";
import PropertyShowcase from "./PropertyShowcase";
import SystemField from "./SystemField";
import styles from "./FieldManual.module.css";

const projectGroups = [
  {
    label: "Property workflows",
    slug: "property-workflows",
    projects: [
      {
        name: "Sarah",
        detail: "Voice AI for leasing and maintenance intake.",
        status: "Live",
        href: "#hermes",
      },
      {
        name: "AppFolio Workflow",
        detail: "Work orders prepared for a person to approve.",
        status: "Live",
        href: "#hermes",
      },
      {
        name: "Kae",
        detail: "Personalized move-in pages with turn progress.",
        status: "Live",
        href: "#case-studies",
      },
      {
        name: "Lease Tracker",
        detail: "Occupancy, renewals, and the next action on every unit.",
        status: "Live",
        href: "#hermes",
      },
      {
        name: "Palmer Control Center",
        detail: "Private command center for daily property work.",
        status: "Private",
        href: "https://palmercontrolcenter.com",
      },
      {
        name: "Find Your Fit",
        detail: "Matches prospects to the right property.",
        status: "In review",
        href: "#field-notes",
      },
    ],
  },
  {
    label: "Side projects",
    slug: "side-projects",
    projects: [
      {
        name: "Transfer Portal",
        detail: "Every FBS transfer, in one quick scan.",
        status: "App Store",
        href: "https://apps.apple.com/us/app/the-portal-cfb-transfers/id6757326986",
      },
      {
        name: "HabitForge",
        detail: "Calm structure across four parts of a day.",
        status: "Web live",
        href: "https://habitforgeai.com",
      },
      {
        name: "TodoToNotes",
        detail: "Handwritten lists become useful Apple Notes.",
        status: "Prototype",
        href: "#field-notes",
      },
    ],
  },
];

const process = [
  ["01", "Observe", "Start in the real workflow."],
  ["02", "Clarify", "Find the friction and the handoff."],
  ["03", "Build", "Ship the smallest useful system."],
  ["04", "Prove", "Test it where the work happens."],
  ["05", "Improve", "Document, automate, and refine."],
];

const propertySites = [
  {
    name: "Palmer Construction Company",
    type: "Company + full portfolio",
    href: "https://www.palmerconstructioncompany.co/",
  },
  {
    name: "Pinnacle Park at Northriver",
    type: "Property website",
    href: "https://www.pinnacleparknr.com/",
  },
  {
    name: "First and Main",
    type: "Property website",
    href: "https://www.firstandmaincondos.com/",
  },
  {
    name: "The Station Townhomes",
    type: "Property website",
    href: "https://www.thestationonmainave.com/",
  },
  {
    name: "Forest Lake Homes",
    type: "Forest Lake + Rosemary Circle",
    href: "https://www.forestlakerentals.com/",
  },
];

export default function FieldManualPage() {
  return (
    <FieldManualChrome
      page="home"
      skipHref="#main-content"
      skipLabel="Skip to the work"
      rail={["v1.0", "Field Manual", "Real Property Operations"]}
    >
      <section id="main-content" className={styles.hero} aria-labelledby="hero-title">
        <SystemField />
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>ACP Designs Studio</p>
          <h1 id="hero-title">Real work.<br />Better systems<span>.</span></h1>
          <p className={styles.heroLead}>
            I go into the messy parts of property operations and come back with calm,
            useful systems—built for people, not dashboards.
          </p>
          <div className={styles.heroActions}>
            <a className={styles.primaryButton} href="#projects">
              See the work <ArrowRightIcon aria-hidden="true" />
            </a>
            <p><strong>Proof, not promises.</strong><span>109 rental units · 5 communities · human approval built in</span></p>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <Image
            src="/editorial/field-system-collage.png"
            width={1536}
            height={1024}
            priority
            sizes="(max-width: 900px) 100vw, 60vw"
            alt="Editorial field diagram connecting a phone call, work order, checklist, property, and operator"
          />
          <div className={styles.approvalStamp}>
            <ShieldCheckIcon aria-hidden="true" />
            <span>Approved<br />by human</span>
          </div>
        </div>
        <div className={styles.scaleNote} aria-hidden="true">Scale 1:100</div>
      </section>

      <section id="work-stats" className={styles.workStats} aria-labelledby="work-stats-title">
        <div className={styles.workStatsIntro}>
          <p className={styles.sectionLabel}>Work in numbers</p>
          <h2 id="work-stats-title">What the work<br />supports.</h2>
          <p>Real properties, real calls, and useful side projects.</p>
        </div>
        <div className={styles.workStatsBody}>
          <dl className={styles.workStatsGrid}>
            <div>
              <dt>109</dt>
              <dd>Rental units</dd>
              <p>Across five communities where these systems do real work.</p>
            </div>
            <div>
              <dt>24/7</dt>
              <dd>Service</dd>
              <p>Leasing and maintenance calls across five communities.</p>
            </div>
            <div>
              <dt>03</dt>
              <dd>Side projects</dd>
              <p>Transfer Portal, HabitForge, and TodoToNotes.</p>
            </div>
          </dl>
          <div className={styles.buildTrail}>
            <p>Build trail</p>
            <dl>
              <div><dt>1,833</dt><dd>Commits</dd></div>
              <div><dt>≈564</dt><dd>Logged build hours</dd></div>
            </dl>
          </div>
          <p className={styles.workStatsMethod}>
            Build snapshot through July 17, 2026. Commits cover 16 active repositories.
            Hours use unique 15-minute windows from human-directed AI sessions and Git history.
            August field work is in the systems below, not in this count.
          </p>
        </div>
      </section>

      <section className={styles.chapterMap} aria-labelledby="chapter-map-title">
        {/* The map is the index, not a chapter — the spacer keeps the two-column
            grid while the numbered chapters below match the page's own stamps. */}
        <div aria-hidden="true" />
        <div>
          <p className={styles.sectionLabel} id="chapter-map-title">Chapters</p>
          <ol>
            <li><span>01</span><a href="#projects"><strong>Projects</strong><small>Live work, real impact.</small></a></li>
            <li><span>02</span><a href="/systems"><strong>Systems</strong><small>Eight specialists, one private system.</small></a></li>
            <li><span>03</span><a href="#systems"><strong>How I work</strong><small>Operations become systems.</small></a></li>
            <li><span>04</span><a href="#field-notes"><strong>What I&apos;ve learned</strong><small>Patterns worth keeping.</small></a></li>
          </ol>
        </div>
      </section>

      <section id="projects" className={styles.projectIndex} aria-labelledby="project-index-title">
        <p className={styles.sectionLabel} id="project-index-title">Featured projects</p>
        <div className={styles.projectGroups}>
          {projectGroups.map((group) => (
            <section className={styles.projectGroup} key={group.slug} aria-labelledby={`${group.slug}-title`}>
              <h3 id={`${group.slug}-title`}>{group.label}</h3>
              <div className={styles.projectRail}>
                {group.projects.map((project) => {
                  const external = project.href.startsWith("http");
                  return (
                    <a
                      href={project.href}
                      key={project.name}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noreferrer" : undefined}
                    >
                      <span className={styles.projectName}>{project.name}</span>
                      <ArrowRightIcon aria-hidden="true" />
                      <span className={styles.projectDetail}>{project.detail}</span>
                      <em>{project.status}</em>
                    </a>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </section>

      <HermesExplainer />

      <DayTimeline />

      <PropertyShowcase />

      <nav className={styles.propertyDirectory} aria-labelledby="property-directory-title">
        <div className={styles.propertyDirectoryIntro}>
          <p className={styles.sectionLabel}>Property websites</p>
          <h2 id="property-directory-title">Visit the full portfolio.</h2>
        </div>
        <ol>
          {propertySites.map((property, index) => (
            <li key={property.name}>
              <a href={property.href} target="_blank" rel="noreferrer">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{property.name}</strong>
                <small>{property.type}</small>
                <ArrowUpRightIcon aria-hidden="true" />
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <section id="systems" className={styles.processSection} aria-labelledby="process-title">
        <div className={styles.chapterNumber}>03</div>
        <div className={styles.processIntro}>
          <p className={styles.sectionLabel}>How I work</p>
          <h2 id="process-title">Field-tested.<br />Iterate. Ship.<br />Repeat.</h2>
        </div>
        <ol className={styles.processList}>
          {process.map(([number, title, detail]) => (
            <li key={number}>
              <span>{number}</span>
              <strong>{title}</strong>
              <p>{detail}</p>
              <i aria-hidden="true" />
            </li>
          ))}
        </ol>
      </section>

      <section id="field-notes" className={styles.manifesto} aria-labelledby="manifesto-title">
        <div className={styles.chapterNumber}>04</div>
        <div className={styles.manifestoCopy}>
          <p className={styles.sectionLabel}>What I&apos;ve learned</p>
          <h2 id="manifesto-title">I build systems that respect people and <em>reality.</em></h2>
          <p>
            Real property is people work. Technology should make it lighter, clearer,
            and more accountable—not hide it behind another screen.
          </p>
          <ul>
            <li><CheckCircleIcon aria-hidden="true" />Human approval is the foundation.</li>
            <li><CheckCircleIcon aria-hidden="true" />Useful beats clever.</li>
            <li><CheckCircleIcon aria-hidden="true" />Document the process, then improve it.</li>
            <li><CheckCircleIcon aria-hidden="true" />Measure what matters, then do better.</li>
          </ul>
        </div>
        <div className={styles.towerArt}>
          <Image
            src="/editorial/tuscaloosa-water-tower-blueprint.png"
            width={1024}
            height={1024}
            sizes="(max-width: 800px) 80vw, 34vw"
            alt="Blueprint-style illustration of a classic Tuscaloosa water tower"
          />
        </div>
      </section>

      <section className={styles.systemNotes} aria-labelledby="system-notes-title">
        <div className={styles.notesLead}>
          <p className={styles.sectionLabel}>The operating principles</p>
          <h2 id="system-notes-title">Three signals I keep in every build.</h2>
        </div>
        <article>
          <PhoneCallIcon aria-hidden="true" />
          <span>Signal 01</span>
          <h3>Meet people where they already are.</h3>
          <p>Phone, email, text, forms, and handwritten notes can all be good inputs.</p>
        </article>
        <article>
          <FlowArrowIcon aria-hidden="true" />
          <span>Signal 02</span>
          <h3>Make the handoff visible.</h3>
          <p>A system earns trust when everyone can see what happens next.</p>
        </article>
        <article>
          <ClipboardTextIcon aria-hidden="true" />
          <span>Signal 03</span>
          <h3>Keep judgment in the loop.</h3>
          <p>Automation prepares the work. A person owns the decision.</p>
        </article>
      </section>

    </FieldManualChrome>
  );
}
