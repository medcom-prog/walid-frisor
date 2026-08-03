"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { tjenester, salong } from "@/lib/innhold";
import Avslor from "./Avslor";

export default function Tjenester() {
  const [aktiv, setAktiv] = useState<number | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const listeRef = useRef<HTMLDivElement>(null);

  // Previewet følger pekeren, slik at det aldri legger seg oppå prisene.
  function flytt(e: React.MouseEvent) {
    const boks = listeRef.current?.getBoundingClientRect();
    if (!boks) return;
    setPos({ x: e.clientX - boks.left, y: e.clientY - boks.top });
  }

  return (
    <section id="tjenester" className="gutter border-t hairline py-24 sm:py-32">
      <Avslor as="header" className="mb-14 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="kicker mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-brass" aria-hidden="true" />
            Tjenester
          </p>
          <h2 className="max-w-[13ch] text-h2 text-paper">Én stol, seks måter</h2>
        </div>
        <p className="max-w-[38ch] text-ash">
          Alle timer settes av til 30 minutter. Betaling skjer i salongen — kort eller kontant.
        </p>
      </Avslor>

      {/* Redaksjonell liste framfor kort: lettere å skumme, og prisene stiller opp under hverandre */}
      <div
        ref={listeRef}
        className="relative border-t hairline"
        onMouseMove={flytt}
        onMouseLeave={() => setAktiv(null)}
      >
        {tjenester.map((t, i) => (
          <Avslor key={t.nr} forsinkelse={i * 60}>
            <a
              href={salong.booking}
              target="_blank"
              rel="noopener"
              onMouseEnter={() => setAktiv(i)}
              onFocus={() => setAktiv(null)}
              className="group grid grid-cols-[auto_1fr_auto] items-center gap-x-5 gap-y-3 border-b hairline py-7 transition-colors duration-300 hover:bg-iron/60 sm:gap-x-9 sm:py-9"
            >
              <span className="self-start font-mono text-xs text-steel-2 transition-colors duration-300 group-hover:text-brass sm:self-center">
                {t.nr}
              </span>

              <span className="min-w-0">
                <span className="block font-display text-h3 text-paper transition-transform duration-500 ease-[cubic-bezier(.22,.61,.36,1)] group-hover:translate-x-1.5">
                  {t.navn}
                </span>
                <span className="mt-2 block max-w-[52ch] text-sm leading-relaxed text-ash">
                  {t.beskrivelse}
                </span>
                {/* Bildet vises inline der svevepreview ikke gir mening */}
                <span className="mt-4 block overflow-hidden rounded-lg lg:hidden">
                  <Image
                    src={t.bilde}
                    alt=""
                    width={t.bredde}
                    height={t.hoyde}
                    sizes="(max-width: 640px) 92vw, 45vw"
                    className="h-44 w-full object-cover grayscale"
                  />
                </span>
              </span>

              <span className="self-start text-right sm:self-center">
                <span className="block whitespace-nowrap font-mono text-base text-paper tabular-nums">
                  {t.pris === "Etter avtale" ? t.pris : `${t.pris},–`}
                </span>
                <span className="mt-1 block font-mono text-[0.68rem] uppercase tracking-widest text-steel-2">
                  {t.varighet}
                </span>
              </span>
            </a>
          </Avslor>
        ))}

        {/* Svevepreview som følger pekeren – kun store skjermer, skjult for skjermlesere */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 z-10 hidden h-72 w-56 overflow-hidden rounded-xl lg:block"
          style={{
            transform: `translate3d(${pos.x + 28}px, ${pos.y - 144}px, 0) scale(${aktiv === null ? 0.92 : 1})`,
            opacity: aktiv === null ? 0 : 1,
            transition:
              "opacity .4s cubic-bezier(.22,.61,.36,1), scale .4s cubic-bezier(.22,.61,.36,1)",
          }}
        >
          {tjenester.map((t, i) => (
            <Image
              key={t.nr}
              src={t.bilde}
              alt=""
              fill
              sizes="224px"
              className="object-cover grayscale transition-opacity duration-500"
              style={{ opacity: aktiv === i ? 1 : 0 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
