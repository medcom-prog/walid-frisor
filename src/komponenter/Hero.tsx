"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { hero } from "@/lib/innhold";

/** Teller opp til måltallet når heroen er i bildet. Viser sluttverdien uten JS. */
function Telleverk({ til, suffiks, desimaler }: { til: number; suffiks: string; desimaler: number }) {
  const [verdi, setVerdi] = useState(til);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const io = new IntersectionObserver(
      ([oppf]) => {
        if (!oppf.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const varighet = 1400;
        const steg = (na: number) => {
          const p = Math.min((na - start) / varighet, 1);
          const lettet = 1 - Math.pow(1 - p, 3);
          setVerdi(til * lettet);
          if (p < 1) requestAnimationFrame(steg);
          else setVerdi(til);
        };
        requestAnimationFrame(steg);
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [til]);

  return (
    <span ref={ref} className="tabular-nums">
      {verdi.toFixed(desimaler).replace(".", ",")}
      {verdi >= til ? suffiks : ""}
    </span>
  );
}

/**
 * Delt hero: tekst til venstre, bildet i egen ramme til høyre.
 * Bildet ligger ikke lenger bak teksten, så ingen gradienter er nødvendige
 * for å holde overskriften lesbar – og motivet vises i sin helhet.
 */
export default function Hero() {
  return (
    <section id="hjem" className="gutter pb-16 pt-28 sm:pb-24 sm:pt-36 lg:pb-28 lg:pt-40">
      <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div>
          <h1 className="stig max-w-[16ch] text-h1 font-medium text-paper">
            <span>
              <span style={{ animationDelay: ".08s" }}>{hero.tittel}</span>
            </span>
            <span>
              <span className="font-light text-brass" style={{ animationDelay: ".2s" }}>
                {hero.undertittel}
              </span>
            </span>
          </h1>

          <p
            className="mt-7 max-w-[54ch] text-lead text-ash"
            style={{ animation: "stig-opp .9s cubic-bezier(.22,.61,.36,1) .38s both" }}
          >
            {hero.beskrivelse}
          </p>

          <div
            className="mt-9 flex flex-wrap gap-3"
            style={{ animation: "stig-opp .9s cubic-bezier(.22,.61,.36,1) .5s both" }}
          >
            <a
              href="#book"
              className="group inline-flex items-center gap-2.5 rounded-full bg-paper px-7 py-4 font-medium text-void transition-colors hover:bg-brass-lit"
            >
              {hero.knapper.book}
              <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M5 12h14m-6-6 6 6-6 6" />
              </svg>
            </a>
            <a
              href="#priser"
              className="inline-flex items-center rounded-full border hairline px-7 py-4 font-medium text-paper transition-colors hover:border-brass hover:text-brass-lit"
            >
              {hero.knapper.priser}
            </a>
          </div>

          {/* På smal skjerm ligger tallene som rader. Merkelappene er versaler
              med sperring, og "Kundetilfredshet" er for bred til en tredjedels
              kolonne på 375 px – da kolliderer den med naboen. Fra sm er det
              plass til tre kolonner. */}
          <dl className="mt-12 border-t hairline pt-6 sm:grid sm:grid-cols-3 sm:gap-x-10 sm:pt-8">
            {hero.tall.map((t) => (
              <div
                key={t.merke}
                className="flex items-baseline justify-between gap-4 border-b hairline py-3 last:border-b-0 sm:block sm:border-b-0 sm:py-0"
              >
                <dt className="font-display text-3xl text-paper sm:text-4xl">
                  <Telleverk til={t.til} suffiks={t.suffiks} desimaler={t.desimaler} />
                </dt>
                <dd className="kicker text-right sm:mt-2 sm:text-left">{t.merke}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div
          className="relative aspect-[4/5] overflow-hidden rounded-2xl border hairline sm:aspect-[3/4] lg:aspect-[4/5]"
          style={{ animation: "stig-opp 1s cubic-bezier(.22,.61,.36,1) .28s both" }}
        >
          <Image
            src="/bilder/hero-portrait-1200.webp"
            alt="Alan i arbeid i salongen"
            fill
            priority
            sizes="(max-width: 1024px) 92vw, 44vw"
            className="object-cover object-[50%_30%]"
          />
        </div>
      </div>
    </section>
  );
}
