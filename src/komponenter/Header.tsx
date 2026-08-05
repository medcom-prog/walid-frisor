"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { navigasjon, salong } from "@/lib/innhold";

export default function Header() {
  const [apen, setApen] = useState(false);
  const [skjult, setSkjult] = useState(false);
  const [scrollet, setScrollet] = useState(false);
  const forrige = useRef(0);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let venter = false;
    const oppdater = () => {
      const y = window.scrollY;
      setScrollet(y > 12);
      setSkjult(!apen && y > 240 && y > forrige.current + 4);
      forrige.current = y;
      venter = false;
    };
    const onScroll = () => {
      if (venter) return;
      venter = true;
      requestAnimationFrame(oppdater);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    oppdater();
    return () => window.removeEventListener("scroll", onScroll);
  }, [apen]);

  useEffect(() => {
    if (!apen) return;
    const forrigeOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setApen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = forrigeOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [apen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-[cubic-bezier(.22,.61,.36,1)] ${
        skjult ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div
        className={`gutter flex h-20 items-center justify-between gap-6 border-b transition-colors duration-500 ${
          scrollet ? "hairline bg-void/85 backdrop-blur-xl" : "border-transparent bg-transparent"
        }`}
      >
        <a
          href="#hjem"
          className="flex shrink-0 items-center gap-2.5 sm:gap-3"
          aria-label={`${salong.navn} – til toppen`}
        >
          {/* Merket er svart med gjennomsiktig bakgrunn, så det trenger en lys
              flate for å synes. Fargene i logoen er urørt – den ligger bare på
              en hvit skive. Originalfila hadde mye tomrom, som er trimmet bort
              så merket kan vises stort uten å bli uskarpt. */}
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-paper ring-1 ring-white/15 sm:h-16 sm:w-16">
            <Image
              src="/bilder/merke-192.webp"
              alt=""
              width={192}
              height={192}
              className="h-11 w-11 sm:h-[3.25rem] sm:w-[3.25rem]"
              priority
            />
          </span>
          <span className="font-display text-lg tracking-tight text-paper sm:text-xl">
            Walid<span className="text-brass"> Frisør</span>
          </span>
        </a>

        <nav aria-label="Hovedmeny" className="hidden items-center gap-7 lg:flex">
          {navigasjon.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative py-1 text-sm text-ash transition-colors hover:text-paper"
            >
              {l.tekst}
              <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-brass transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#book"
            className="hidden rounded-full bg-paper px-5 py-2.5 text-sm font-medium text-void transition-colors hover:bg-brass-lit sm:inline-flex"
          >
            Book time her
          </a>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setApen((v) => !v)}
            aria-expanded={apen}
            aria-controls="mobilmeny"
            className="grid h-11 w-11 place-items-center text-paper lg:hidden"
          >
            <span className="sr-only">{apen ? "Lukk meny" : "Åpne meny"}</span>
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              {apen ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M3 7h18M3 17h18" />}
            </svg>
          </button>
        </div>
      </div>

      <div
        id="mobilmeny"
        hidden={!apen}
        className="gutter h-[calc(100dvh-5rem)] overflow-y-auto border-b hairline bg-void/98 backdrop-blur-xl lg:hidden"
      >
        <nav aria-label="Meny" className="flex flex-col pt-4 pb-10">
          {navigasjon.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setApen(false)}
              className="border-b hairline py-5 font-display text-2xl text-paper"
            >
              {l.tekst}
            </a>
          ))}
          <a
            href="#book"
            onClick={() => setApen(false)}
            className="mt-8 rounded-full bg-paper py-4 text-center font-medium text-void"
          >
            Book time her
          </a>
          <a href={`tel:${salong.telefonE164}`} className="mt-3 py-3 text-center font-mono text-sm text-ash">
            {salong.telefon}
          </a>
        </nav>
      </div>
    </header>
  );
}
