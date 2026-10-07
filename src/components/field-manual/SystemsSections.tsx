import {
  ArrowRightIcon,
  BookOpenTextIcon,
  BrainIcon,
  FlowArrowIcon,
  HandPalmIcon,
  LockKeyIcon,
  PhoneCallIcon,
  PlugsConnectedIcon,
} from "@phosphor-icons/react/ssr";
import {
  guardrails,
  knowledge,
  lyra,
  modelChainNote,
  models,
  offPage,
  requestLoop,
  requestPath,
  tools,
  workflows,
} from "@/content/hermes-sections";
import styles from "./SystemsSections.module.css";

// "lookup_tenant" -> "Look up tenant"
const toolLabel = (name: string) => {
  const words = name.replace(/^lookup/, "look_up").split("_");
  return words.map((w, i) => (i === 0 ? w.charAt(0).toUpperCase() + w.slice(1) : w)).join(" ");
};

function SectionHead({
  id,
  eyebrow,
  title,
  lead,
  icon: Icon,
}: {
  id: string;
  eyebrow: string;
  title: React.ReactNode;
  lead?: string;
  icon: React.ComponentType<{ "aria-hidden"?: boolean | "true" }>;
}) {
  return (
    <header className={styles.head}>
      <Icon aria-hidden="true" />
      <p>{eyebrow}</p>
      <h2 id={id}>{title}</h2>
      {lead && <span>{lead}</span>}
    </header>
  );
}

export function RequestLoop() {
  return (
    <section className={styles.loop} aria-labelledby="loop-title">
      <h2 id="loop-title" className={styles.srOnly}>
        One request, four moves
      </h2>
      <ol>
        {requestLoop.map((step) => (
          <li key={step.step}>
            <em>{step.step}</em>
            <strong>{step.title}</strong>
            <span>{step.detail}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default function SystemsSections() {
  return (
    <>
      <section id="models" className={styles.section} aria-labelledby="models-title">
        <SectionHead
          id="models-title"
          eyebrow="The reasoning layer"
          title="Four AI backends, one job each."
          lead="Hermes doesn't think on its own. Each lane borrows a model, and every lane has a fallback."
          icon={BrainIcon}
        />
        <div className={styles.cards}>
          {models.map((m) => (
            <article key={m.id} className={styles.card}>
              <p>{m.role}</p>
              <h3>{m.name}</h3>
              <strong>{m.model}</strong>
              <span>{m.blurb}</span>
              {m.lanes.length > 0 && (
                <ul className={styles.chips} aria-label={`Lanes on ${m.name}`}>
                  {m.lanes.map((lane) => (
                    <li key={lane}>{lane}</li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
        <p className={styles.note}>{modelChainNote}</p>
      </section>

      <section id="workflows" className={styles.section} aria-labelledby="workflows-title">
        <SectionHead
          id="workflows-title"
          eyebrow="Workflows"
          title="How a request actually moves."
          lead="Every request takes the same six steps. Below that, six real workflows that run every day."
          icon={FlowArrowIcon}
        />
        <ol className={styles.path}>
          {requestPath.map((step, i) => (
            <li key={step.id}>
              <em>{String(i + 1).padStart(2, "0")} · {step.label}</em>
              <strong>{step.headline}</strong>
              <span>{step.body}</span>
            </li>
          ))}
        </ol>
        <div className={`${styles.cards} ${styles.cardsThree}`}>
          {workflows.map((w) => (
            <article key={w.id} className={styles.card}>
              <h3>{w.label}</h3>
              <span>{w.summary}</span>
              <ol className={styles.chain} aria-label={`${w.label} steps`}>
                {w.steps.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </section>

      <section id="lyra-line" className={styles.section} aria-labelledby="lyra-line-title">
        <SectionHead
          id="lyra-line-title"
          eyebrow="Lyra"
          title="Lyra answers the leasing line."
          lead={lyra.intro}
          icon={PhoneCallIcon}
        />
        <div className={styles.split}>
          <div>
            <p className={styles.label}>Her tools</p>
            <dl className={styles.defs}>
              {lyra.tools.map((t) => (
                <div key={t.name}>
                  <dt>{toolLabel(t.name)}</dt>
                  <dd>{t.detail}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <p className={styles.label}>Where people stay in</p>
            <ul className={styles.bullets}>
              {lyra.boundaries.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <p className={styles.label}>Rollout</p>
            <dl className={styles.defs}>
              {lyra.phases.map((p) => (
                <div key={p.label}>
                  <dt>{p.label}</dt>
                  <dd>{p.detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section id="tools" className={styles.section} aria-labelledby="tools-title">
        <SectionHead
          id="tools-title"
          eyebrow="Connected apps"
          title="The tools Hermes drives."
          icon={PlugsConnectedIcon}
        />
        <dl className={styles.toolGrid}>
          {tools.map((t) => (
            <div key={t.name}>
              <dt>
                <small>{t.category}</small>
                {t.name}
              </dt>
              <dd>{t.blurb}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section id="knowledge" className={styles.section} aria-labelledby="knowledge-title">
        <SectionHead
          id="knowledge-title"
          eyebrow="The knowledge base"
          title="A shared notebook, in plain text."
          lead={knowledge.plainEnglish}
          icon={BookOpenTextIcon}
        />
        <div className={styles.cards}>
          {knowledge.parts.map((part) => (
            <article key={part.title} className={styles.card}>
              <p>{part.label}</p>
              <h3>{part.title}</h3>
              <span>{part.body}</span>
              <ul className={styles.chips}>
                {part.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <dl className={styles.defs}>
          {knowledge.why.map((w) => (
            <div key={w.title}>
              <dt>{w.title}</dt>
              <dd>{w.body}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section id="guardrails" className={styles.section} aria-labelledby="guardrails-title">
        <SectionHead
          id="guardrails-title"
          eyebrow="Human in the loop"
          title="A person still makes the calls that matter."
          icon={HandPalmIcon}
        />
        <ol className={styles.numbered}>
          {guardrails.map((g) => (
            <li key={g}>{g}</li>
          ))}
        </ol>
      </section>

      <section id="off-page" className={styles.section} aria-labelledby="off-page-title">
        <SectionHead
          id="off-page-title"
          eyebrow="The boundary"
          title="What stays off this page."
          lead="The shape of the system is public. The private wiring is not."
          icon={LockKeyIcon}
        />
        <dl className={styles.toolGrid}>
          {offPage.map((o) => (
            <div key={o.title}>
              <dt>{o.title}</dt>
              <dd>{o.detail}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section id="playbook" className={styles.section} aria-labelledby="playbook-title">
        <SectionHead
          id="playbook-title"
          eyebrow="Build your own"
          title="The playbook is for you."
          lead="Everything above is mine. The playbook is the generic version: the same shape, built with your own tools on your own machine."
          icon={BookOpenTextIcon}
        />
        <ul className={styles.links}>
          {[
            ["/systems/playbook", "Start", "What you're building, plus a 30-minute quickstart."],
            ["/systems/playbook/build", "Build", "The pattern, the stack, and copy-ready prompts."],
            ["/systems/playbook/costs", "Costs", "What it costs, the time it saves, and whether it's for you."],
            ["/systems/playbook/reference", "Reference", "FAQ, glossary, and what broke along the way."],
          ].map(([href, label, detail]) => (
            <li key={href}>
              <a href={href}>
                <strong>
                  {label} <ArrowRightIcon aria-hidden="true" />
                </strong>
                <span>{detail}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
