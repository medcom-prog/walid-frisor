"use client";

import { useEffect, useRef, useState } from "react";
import { salong, booking } from "@/lib/innhold";
import Avslor from "./Avslor";

export default function Booking() {
  const [feilet, setFeilet] = useState(false);
  const lastet = useRef(false);

  useEffect(() => {
    // Setmore kan blokkeres av utvidelser eller strenge personverninnstillinger.
    const t = setTimeout(() => {
      if (!lastet.current) setFeilet(true);
    }, 7000);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="book" className="gutter border-t hairline py-20 sm:py-28">
      <Avslor as="header" className="mb-10 max-w-[60ch]">
        <p className="kicker mb-5 flex items-center gap-3">
          <span className="h-px w-8 bg-brass" aria-hidden="true" />
          {booking.merkelapp}
        </p>
        <h2 className="text-h2 text-paper">{booking.tittel}</h2>
        <p className="mt-5 text-lead text-ash">{booking.beskrivelse}</p>
      </Avslor>

      <Avslor className="overflow-hidden rounded-xl border hairline bg-iron">
        {feilet ? (
          <div className="flex flex-col items-center gap-6 px-6 py-20 text-center">
            <a
              href={salong.booking}
              target="_blank"
              rel="noopener"
              className="rounded-full bg-paper px-7 py-4 font-medium text-void transition-colors hover:bg-brass-lit"
            >
              {booking.fallbackKnapp}
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

      <Avslor as="p" className="mt-5 max-w-[70ch] text-sm text-steel-2">
        {booking.notis}
      </Avslor>
    </section>
  );
}
