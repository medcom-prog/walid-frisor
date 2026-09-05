"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { film } from "@/lib/innhold";
import Avslor from "./Avslor";

type Klipp = (typeof film.klipp)[number];

/**
 * Ett klipp.
 *
 * Videofila hentes ikke ned sammen med resten av siden. <video> står uten
 * src og med preload="none" til kortet faktisk er i bildet, så en besøkende
 * som aldri ruller hit betaler ingenting for seksjonen – og klippene
 * konkurrerer aldri med hero-bildet om båndbredden på første skjerm.
 *
 * Plakaten er et stillbilde på rundt 50 kB som vises hele veien, også mens
 * fila laster. Da hopper aldri layouten, og kortet ser likt ut uansett om
 * videoen får spille eller ikke.
 */
function Klipp({ klipp, forsinkelse }: { klipp: Klipp; forsinkelse: number }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [spiller, setSpiller] = useState(false);

  /** Setter src én gang. Etter det styrer nettleseren bufringen selv. */
  const hent = useCallback(() => {
    const el = ref.current;
    if (!el || el.src) return;
    el.src = klipp.fil;
  }, [klipp.fil]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Redusert bevegelse eller datasparing: da laster vi ingenting av oss
    // selv. Kortet blir stående som et stillbilde med en spill-knapp, og
    // den som vil se klippet trykker selv.
    const roligere = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nett = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (roligere || nett?.saveData || !("IntersectionObserver" in window)) return;

    const io = new IntersectionObserver(
      ([oppf]) => {
        if (oppf.isIntersecting) {
          hent();
          void el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      // Litt margin gjør at klippet rekker å bufre før kortet er framme.
      { threshold: 0.25, rootMargin: "200px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [hent]);

  const veksle = () => {
    const el = ref.current;
    if (!el) return;
    hent();
    if (el.paused) void el.play().catch(() => {});
    else el.pause();
  };

  return (
    <Avslor forsinkelse={forsinkelse}>
      <figure className="group relative overflow-hidden rounded-xl border hairline bg-iron">
        <video
          ref={ref}
          poster={klipp.plakat}
          preload="none"
          muted
          loop
          playsInline
          width={720}
          height={1280}
          aria-label={klipp.tekst}
          onPlay={() => setSpiller(true)}
          onPause={() => setSpiller(false)}
          className="block aspect-[9/16] w-full object-cover"
        >
          Nettleseren din kan ikke spille av video. Klippet viser {klipp.tekst.toLowerCase()}.
        </video>

        <button
          type="button"
          onClick={veksle}
          className="absolute inset-0 grid place-items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brass"
        >
          <span className="sr-only">
            {spiller ? `Sett ${klipp.tekst} på pause` : `Spill av ${klipp.tekst}`}
          </span>
          {/* Knappen ligger over hele kortet, men flaten er usynlig når
              klippet går. Da skal ikke et ikon ligge oppå bildet. */}
          <span
            aria-hidden="true"
            className={`grid h-14 w-14 place-items-center rounded-full bg-void/55 backdrop-blur-sm transition-opacity duration-300 ${
              spiller ? "opacity-0" : "opacity-100"
            }`}
          >
            <svg viewBox="0 0 24 24" className="ml-0.5 h-5 w-5 text-paper" fill="currentColor" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>

        <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-void/80 to-transparent px-5 pb-4 pt-10 font-mono text-[0.68rem] uppercase tracking-widest text-paper">
          {klipp.tekst}
        </figcaption>
      </figure>
    </Avslor>
  );
}

export default function Film() {
  return (
    <section id="film" className="gutter border-t hairline py-20 sm:py-28">
      <Avslor as="header" className="mb-12 max-w-[60ch]">
        <p className="kicker mb-5 flex items-center gap-3">
          <span className="h-px w-8 bg-brass" aria-hidden="true" />
          {film.merkelapp}
        </p>
        <h2 className="text-h2 text-paper">{film.tittel}</h2>
        <p className="mt-5 text-lead text-ash">{film.beskrivelse}</p>
      </Avslor>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {film.klipp.map((k, i) => (
          <Klipp key={k.fil} klipp={k} forsinkelse={i * 80} />
        ))}
      </div>
    </section>
  );
}
