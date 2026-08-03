"use client";

import { useEffect, useRef, useState } from "react";
import { salong, apningstider } from "@/lib/innhold";
import Avslor from "./Avslor";

export default function Booking() {
  const [feilet, setFeilet] = useState(false);
  const lastet = useRef(false);

  useEffect(() => {
    // Setmore kan blokkeres av utvidelser eller strenge personverninnstillinger.
    // Da viser vi en lenke i stedet for en tom ramme.
    const t = setTimeout(() => {
      if (!lastet.current) setFeilet(true);
    }, 7000);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="book" className="gutter border-t hairline py-24 sm:py-32">
      <Avslor as="header" className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="kicker mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-brass" aria-hidden="true" />
            Book time
          </p>
          <h2 className="max-w-[14ch] text-h2 text-paper">Finn en ledig stol</h2>
        </div>

        <dl className="flex flex-col gap-2 text-sm">
          {apningstider.map((a) => (
            <div key={a.dag} className="flex items-baseline justify-between gap-8">
              <dt className="text-ash">{a.dag}</dt>
              <dd className="font-mono text-paper tabular-nums">{a.tid}</dd>
            </div>
          ))}
        </dl>
      </Avslor>

      <Avslor className="overflow-hidden rounded-xl border hairline bg-iron">
        {feilet ? (
          <div className="flex flex-col items-center gap-6 px-6 py-20 text-center">
            <p className="max-w-[40ch] text-ash">
              Kalenderen lot seg ikke vise her. Den fungerer som normalt i en egen fane.
            </p>
            <a
              href={salong.booking}
              target="_blank"
              rel="noopener"
              className="rounded-full bg-paper px-7 py-4 font-medium text-void transition-colors hover:bg-brass-lit"
            >
              Åpne booking
            </a>
          </div>
        ) : (
          <iframe
            src={salong.booking}
            title={`Book time hos ${salong.navn}`}
            loading="lazy"
            onLoad={() => {
              lastet.current = true;
            }}
            className="block h-[52rem] w-full border-0 bg-paper"
          />
        )}
      </Avslor>

      <Avslor as="p" className="mt-5 text-center text-sm text-steel-2">
        Rekker du ikke en ledig tid? Ring {salong.telefon} — vi tar drop-in når stolen er ledig.
      </Avslor>
    </section>
  );
}
