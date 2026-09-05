"use client";

import { useState } from "react";
import { kartEmbed, kartLenke, salong } from "@/lib/innhold";

/**
 * Kartet lastes først når besøkende klikker.
 *
 * En Google Maps-ramme sender IP-adresse og nettleserdata til Google i det
 * siden åpnes, og det skjer før noen har samtykket til noe. Ved å vente på
 * et klikk går det ingen data til tredjepart med mindre brukeren selv ber
 * om kartet – og siden slipper å be om samtykke for noe den ikke gjør.
 */
export default function Kart() {
  const [lastet, setLastet] = useState(false);

  if (lastet) {
    return (
      <div className="overflow-hidden rounded-xl border hairline">
        <iframe
          title={`Kart til ${salong.navn}`}
          src={kartEmbed}
          referrerPolicy="no-referrer-when-downgrade"
          className="block h-64 w-full border-0"
        />
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border hairline bg-iron/50">
      <button
        type="button"
        onClick={() => setLastet(true)}
        className="group flex h-64 w-full flex-col items-center justify-center gap-3 px-6 text-center transition-colors hover:bg-iron"
      >
        <span className="grid h-12 w-12 place-items-center rounded-full border border-brass/40 text-brass transition-colors group-hover:border-brass group-hover:bg-brass group-hover:text-void">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </span>
        <span className="font-display text-lg text-paper">Vis kart</span>
        <span className="max-w-[38ch] text-xs leading-relaxed text-ash">
          Kartet kommer fra Google. Trykker du her, sendes IP-adressen din til
          Google Maps.
        </span>
      </button>

      <p className="border-t hairline px-6 py-3 text-center text-xs text-ash">
        Vil du heller åpne det direkte?{" "}
        <a
          href={kartLenke}
          target="_blank"
          rel="noopener"
          className="text-brass underline underline-offset-4 transition-colors hover:text-brass-lit"
        >
          Åpne i Google Maps
        </a>
      </p>
    </div>
  );
}
