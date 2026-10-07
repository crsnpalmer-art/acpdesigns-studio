"use client";

import { useEffect, useRef } from "react";
import styles from "./FieldManual.module.css";

const scenes = [
  {
    id: "call",
    number: "01",
    title: "The call",
    detail: "A leasing or maintenance call comes in.",
    src: "/workflow-film/call.mp4",
    poster: "/workflow-film/call.jpg",
  },
  {
    id: "gate",
    number: "02",
    title: "The gate",
    detail: "Money, leases, and legal still need a person’s yes.",
    src: "/workflow-film/gate.mp4",
    poster: "/workflow-film/gate.jpg",
  },
  {
    id: "unit",
    number: "03",
    title: "The unit",
    detail: "The work reaches a real home.",
    src: "/workflow-film/unit.mp4",
    poster: "/workflow-film/unit.jpg",
  },
  {
    id: "handoff",
    number: "04",
    title: "The handoff",
    detail: "Systems keep the next step moving.",
    src: "/workflow-film/handoff.mp4",
    poster: "/workflow-film/handoff.jpg",
  },
] as const;

export default function WorkflowFilm() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const videos = [...root.querySelectorAll("video")];

    if (reduce) {
      for (const video of videos) {
        video.pause();
        video.removeAttribute("autoplay");
      }
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const video = entry.target;
          if (!(video instanceof HTMLVideoElement)) {
            continue;
          }
          if (entry.isIntersecting) {
            void video.play().catch(() => {});
          } else {
            video.pause();
          }
        }
      },
      { threshold: 0.35 },
    );

    for (const video of videos) {
      observer.observe(video);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={rootRef}
      id="workflow"
      className={styles.workflowFilm}
      aria-labelledby="workflow-title"
    >
      <header className={styles.workflowIntro}>
        <p className={styles.sectionLabel}>The work</p>
        <h2 id="workflow-title">Call in. Human gate. Unit. Next step.</h2>
        <p>Four loops from the live operating path. Routine answers move on their own. Money, leases, and legal wait for a person.</p>
      </header>

      <ol className={styles.workflowScenes}>
        {scenes.map((scene) => (
          <li key={scene.id} className={styles.workflowScene}>
            <div className={styles.workflowFrame}>
              <video
                className={styles.workflowVideo}
                poster={scene.poster}
                src={scene.src}
                muted
                loop
                playsInline
                preload="metadata"
                aria-hidden="true"
              />
            </div>
            <div className={styles.workflowCopy}>
              <p className={styles.sectionLabel}>
                {scene.number} · {scene.title}
              </p>
              <p>{scene.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
