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

export default function Hero() {
  return (
    <section id="hjem" className="relative isolate flex min-h-[100dvh] flex-col justify-end overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/bilder/hero-portrait-1200.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="panorer object-cover object-[50%_28%] grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/75 to-void/30" />
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-void/85 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-void/80 via-void/30 to-transparent lg:w-3/4" />
      </div>

      <div className="gutter pb-14 pt-32 sm:pb-20">
        <h1 className="stig max-w-[18ch] text-h1 font-medium text-paper">
          <span>
            <span style={{ animationDelay: ".12s" }}>{hero.tittel}</span>
          </span>
          <span>
            <span className="font-light text-brass" style={{ animationDelay: ".24s" }}>
              {hero.undertittel}
            </span>
          </span>
        </h1>

        <p
          className="mt-7 max-w-[58ch] text-lead text-chrome"
          style={{ animation: "stig-opp .9s cubic-bezier(.22,.61,.36,1) .42s both" }}
        >
          {hero.beskrivelse}
        </p>

        <div
          className="mt-9 flex flex-wrap gap-3"
          style={{ animation: "stig-opp .9s cubic-bezier(.22,.61,.36,1) .54s both" }}
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

        <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-8 border-t hairline pt-8 sm:grid-cols-3 sm:gap-x-12">
          {hero.tall.map((t) => (
            <div key={t.merke}>
              <dt className="font-display text-4xl text-paper">
                <Telleverk til={t.til} suffiks={t.suffiks} desimaler={t.desimaler} />
              </dt>
              <dd className="kicker mt-2">{t.merke}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
