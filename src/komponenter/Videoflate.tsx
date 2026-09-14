"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Video } from "@/lib/innhold";

type Nett = { saveData?: boolean; effectiveType?: string };

/**
 * En stum, loopende video som oppfører seg som et bilde.
 *
 * Stillbildet er det egentlige innholdet. Det ligger under videoen som et
 * vanlig next/image, så det får srcset, riktig størrelse og – i heroen –
 * prioritet som LCP. Videoen legges oppå og tones inn først når den faktisk
 * spiller. Alt som stopper den underveis ender derfor i et pent stillbilde,
 * aldri i en svart boks:
 *
 *   - Datasparing, treg linje eller redusert bevegelse: ingenting lastes
 *     av seg selv. Den som vil se klippet trykker på knappen.
 *   - Strømsparingsmodus på iPhone blokkerer autoplay. play() avvises,
 *     og da vises knappen – et trykk er lov også i sparemodus.
 *   - Utenfor skjermen eller i en skjult fane: videoen settes på pause, så
 *     den ikke bruker prosessor og batteri på noe ingen ser.
 *
 * Fila hentes først når flaten nærmer seg skjermen. Mobil får en mindre fil
 * enn desktop, valgt i JS fordi <source media> ikke bytter etter lasting.
 * Med `prioritet` ventes det i tillegg til siden er ferdig lastet, så
 * videoen aldri konkurrerer med stillbildet om første skjerm.
 */
export default function Videoflate({
  video,
  alt,
  sizes,
  prioritet = false,
  className = "",
}: {
  video: Video;
  alt: string;
  sizes: string;
  prioritet?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [spiller, setSpiller] = useState(false);
  const [harSpilt, setHarSpilt] = useState(false);
  const [visKnapp, setVisKnapp] = useState(false);

  const hent = useCallback(() => {
    const el = ref.current;
    if (!el || el.getAttribute("src")) return;
    el.src = window.matchMedia("(max-width: 767px)").matches ? video.mobil : video.desktop;
  }, [video.mobil, video.desktop]);

  const spill = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    hent();
    el.play().catch(() => setVisKnapp(true));
  }, [hent]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const nett = (navigator as Navigator & { connection?: Nett }).connection;
    const manuell =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      nett?.saveData ||
      nett?.effectiveType === "2g" ||
      nett?.effectiveType === "slow-2g";

    if (!("IntersectionObserver" in window)) {
      const t = setTimeout(() => setVisKnapp(true), 0);
      return () => clearTimeout(t);
    }

    let iBildet = false;
    let klar = !prioritet || document.readyState === "complete";
    let tidsfrist: ReturnType<typeof setTimeout> | undefined;

    const oppdater = () => {
      if (!manuell && iBildet && klar && document.visibilityState === "visible") spill();
      else el.pause();
    };

    const naarLastet = () => {
      klar = true;
      oppdater();
    };
    if (!klar) window.addEventListener("load", naarLastet, { once: true });

    const io = new IntersectionObserver(
      ([oppf]) => {
        iBildet = oppf.isIntersecting;
        oppdater();
        // Står flaten fortsatt stille en stund etter at den kom i bildet –
        // av valg, sparemodus eller treg linje – får den besøkende knappen.
        if (iBildet && !tidsfrist) {
          tidsfrist = setTimeout(() => setVisKnapp(true), manuell ? 0 : 2500);
        }
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(el);
    document.addEventListener("visibilitychange", oppdater);

    return () => {
      io.disconnect();
      clearTimeout(tidsfrist);
      window.removeEventListener("load", naarLastet);
      document.removeEventListener("visibilitychange", oppdater);
    };
  }, [prioritet, spill]);

  const veksle = () => {
    const el = ref.current;
    if (!el) return;
    if (el.paused) spill();
    else el.pause();
  };

  return (
    <div className={`group/video relative overflow-hidden bg-iron ${className}`}>
      <Image src={video.plakat} alt={alt} fill priority={prioritet} sizes={sizes} className="object-cover" />

      <video
        ref={ref}
        preload="none"
        muted
        loop
        playsInline
        disablePictureInPicture
        disableRemotePlayback
        aria-hidden="true"
        tabIndex={-1}
        onPlaying={() => {
          setSpiller(true);
          setHarSpilt(true);
          setVisKnapp(true);
        }}
        onPause={() => setSpiller(false)}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
          harSpilt ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Knappen vises når videoen står stille av en grunn den besøkende
          ikke valgte selv, og som pauseknapp når den går – bevegelse som
          varer mer enn fem sekunder skal kunne stoppes. */}
      {visKnapp && (
        <button
          type="button"
          onClick={veksle}
          className={`absolute bottom-3 right-3 grid h-10 w-10 place-items-center rounded-full bg-void/55 text-paper backdrop-blur-sm transition-opacity duration-300 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass ${
            spiller ? "opacity-60 hover:opacity-100" : "opacity-100"
          }`}
        >
          <span className="sr-only">{spiller ? `Sett videoen på pause` : `Spill av video: ${alt}`}</span>
          <svg viewBox="0 0 24 24" className={`h-4 w-4 ${spiller ? "" : "ml-0.5"}`} fill="currentColor" aria-hidden="true">
            {spiller ? <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" /> : <path d="M8 5v14l11-7z" />}
          </svg>
        </button>
      )}
    </div>
  );
}
