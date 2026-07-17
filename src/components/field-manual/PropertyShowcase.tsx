"use client";

import Image from "next/image";
import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react";
import { useEffect, useRef, useState, type FocusEvent } from "react";
import styles from "./FieldManual.module.css";

const ROTATION_INTERVAL = 9000;

const properties = [
  {
    slug: "pinnacle-park",
    title: ["Pinnacle Park", "at Northriver"],
    meta: "Tuscaloosa, AL · 50 Palmer-managed units · Student living",
    description:
      "At Pinnacle Park, calls are answered around the clock, maintenance requests become organized work orders, and every resident-facing message waits for a person’s approval.",
    count: "50",
    countLabel: "Rental units",
    href: "https://www.pinnacleparknr.com/",
    linkLabel: "Visit Pinnacle Park",
    image: "/property-videos/pinnacle-park.jpg",
    imageAlt: "Entrance to Pinnacle Park at Northriver",
  },
  {
    slug: "first-and-main",
    title: ["First and Main", "Condominiums"],
    meta: "Northport, AL · 30 condominiums · Student living",
    description:
      "At First and Main, leasing questions, maintenance requests, and move-outs move through one shared workflow. A person reviews every message before it reaches a resident.",
    count: "30",
    countLabel: "Condominiums",
    href: "https://www.firstandmaincondos.com/",
    linkLabel: "Visit First and Main",
    image: "/property-videos/first-and-main.jpg",
    imageAlt: "First and Main condominium building in Northport",
  },
  {
    slug: "the-station",
    title: ["The Station", "Townhomes"],
    meta: "Northport, AL · 16 townhomes · Student living",
    description:
      "At The Station, a leasing inquiry can become a tour, a signed lease, and a prepared move-in checklist without losing the handoff between people.",
    count: "16",
    countLabel: "Townhomes",
    href: "https://www.thestationonmainave.com/",
    linkLabel: "Visit The Station",
    image: "/property-videos/the-station.jpg",
    imageAlt: "The Station townhomes in Northport",
  },
  {
    slug: "forest-lake",
    title: ["Forest Lake", "Homes"],
    meta: "Tuscaloosa, AL · 12 homes · Student living",
    description:
      "At Forest Lake, recurring questions, maintenance follow-up, and renewals stay organized across twelve homes—while a person still makes every final decision.",
    count: "12",
    countLabel: "Rental homes",
    href: "https://www.forestlakerentals.com/",
    linkLabel: "Visit Forest Lake",
    image: "/property-videos/forest-lake.jpg",
    imageAlt: "Forest Lake rental homes in Tuscaloosa",
  },
] as const;

export default function PropertyShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const sectionRef = useRef<HTMLElement>(null);
  const pausedRef = useRef(false);
  const manuallySelectedRef = useRef(false);
  const property = properties[activeIndex];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.25 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (event: MediaQueryListEvent) => setReduceMotion(event.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (!isVisible || reduceMotion) return;

    const interval = window.setInterval(() => {
      if (pausedRef.current || manuallySelectedRef.current || document.hidden) return;
      setActiveIndex((current) => (current + 1) % properties.length);
    }, ROTATION_INTERVAL);

    return () => window.clearInterval(interval);
  }, [isVisible, reduceMotion]);

  const selectProperty = (index: number) => {
    manuallySelectedRef.current = true;
    setActiveIndex(index);
  };

  const showPrevious = () => {
    selectProperty((activeIndex - 1 + properties.length) % properties.length);
  };

  const showNext = () => {
    selectProperty((activeIndex + 1) % properties.length);
  };

  const handleBlur = (event: FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      pausedRef.current = false;
    }
  };

  return (
    <section
      ref={sectionRef}
      id="control-center"
      className={styles.caseStudy}
      aria-labelledby="case-study-title"
      onPointerEnter={() => { pausedRef.current = true; }}
      onPointerLeave={() => { pausedRef.current = false; }}
      onFocusCapture={() => { pausedRef.current = true; }}
      onBlurCapture={handleBlur}
    >
      <div className={styles.caseCopy} key={property.slug}>
        <div className={styles.caseHeader}>
          <p className={styles.sectionLabel}>Case study · Property operations</p>
          <span aria-hidden="true">
            {String(activeIndex + 1).padStart(2, "0")} / {String(properties.length).padStart(2, "0")}
          </span>
        </div>
        <h2 id="case-study-title">
          {property.title[0]}<br />{property.title[1]}
        </h2>
        <p className={styles.caseMeta}>{property.meta}</p>
        <p>{property.description}</p>
        <dl>
          <div><dt>{property.count}</dt><dd>{property.countLabel}</dd></div>
          <div><dt>24/7</dt><dd>Calls answered</dd></div>
          <div><dt>100%</dt><dd>Human-reviewed</dd></div>
        </dl>
        <a href={property.href} target="_blank" rel="noreferrer">
          {property.linkLabel} <ArrowRightIcon aria-hidden="true" />
        </a>
      </div>

      <div className={styles.caseImage}>
        {properties.map((item, index) => (
          <div
            className={`${styles.casePhoto} ${index === activeIndex ? styles.casePhotoActive : ""}`}
            aria-hidden={index !== activeIndex}
            key={item.slug}
          >
            <Image
              src={item.image}
              alt={index === activeIndex ? item.imageAlt : ""}
              fill
              priority={index === 0}
              sizes="(max-width: 900px) 100vw, 62vw"
            />
          </div>
        ))}

        <button className={styles.casePrevious} type="button" onClick={showPrevious} aria-label="Show previous property">
          <ArrowLeftIcon aria-hidden="true" />
        </button>
        <button className={styles.caseNext} type="button" onClick={showNext} aria-label="Show next property">
          <ArrowRightIcon aria-hidden="true" />
        </button>

        <div className={styles.casePagination} aria-label="Choose a featured property">
          {properties.map((item, index) => (
            <button
              type="button"
              key={item.slug}
              aria-label={`Show ${item.title.join(" ")}`}
              aria-current={index === activeIndex ? "true" : undefined}
              onClick={() => selectProperty(index)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
