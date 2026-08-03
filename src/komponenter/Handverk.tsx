import Image from "next/image";
import { salong } from "@/lib/innhold";
import Avslor from "./Avslor";

const punkter = [
  {
    tittel: "Vi spør før vi klipper",
    tekst: "Hårtype, hodeform og hvor mye stell du faktisk orker. Klippen skal fungere også i uke tre.",
  },
  {
    tittel: "Maskin og saks",
    tekst: "Overgangene bygges lag for lag, ikke i én omgang. Det er der forskjellen ligger.",
  },
  {
    tittel: "Kniv langs linjene",
    tekst: "Nakke, kinn og tinning avsluttes med barberkniv. Rene kanter, ingen uklare skiller.",
  },
];

export default function Handverk() {
  return (
    <section id="handverk" className="gutter border-t hairline py-24 sm:py-32">
      <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-20">
        <Avslor className="order-2 lg:order-1">
          <p className="kicker mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-brass" aria-hidden="true" />
            Håndverket
          </p>
          <h2 className="max-w-[15ch] text-h2 text-paper">
            Tretti minutter, gjort ordentlig
          </h2>
          <p className="mt-6 max-w-[46ch] text-lead text-ash">
            {salong.barberer} tar én kunde av gangen. Ingen dobbeltbooking, ingen stress —
            og ingen som blir sendt ut med en klipp de ikke ba om.
          </p>

          <ul className="mt-10 border-t hairline">
            {punkter.map((p, i) => (
              <li key={p.tittel} className="flex gap-6 border-b hairline py-6">
                <span className="font-mono text-xs text-brass">{`0${i + 1}`}</span>
                <div>
                  <h3 className="font-display text-lg text-paper">{p.tittel}</h3>
                  <p className="mt-2 max-w-[44ch] text-sm leading-relaxed text-ash">{p.tekst}</p>
                </div>
              </li>
            ))}
          </ul>
        </Avslor>

        <Avslor className="order-1 lg:order-2" forsinkelse={100}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
            <Image
              src="/bilder/classic-cut-1400.webp"
              alt="Klipp under arbeid i salongen"
              fill
              sizes="(max-width: 1024px) 92vw, 46vw"
              className="object-cover grayscale"
            />
            {/* Sitat lagt over bildet, forankret i en ekte omtale */}
            <figure className="absolute inset-x-4 bottom-4 rounded-lg border hairline bg-void/85 p-5 backdrop-blur-sm sm:inset-x-6 sm:bottom-6 sm:p-6">
              <blockquote className="text-sm leading-relaxed text-chrome">
                «Dette er den beste klippen jeg noensinne har hatt.»
              </blockquote>
              <figcaption className="mt-3 font-mono text-[0.68rem] uppercase tracking-widest text-steel-2">
                Patrick Strand Larsen
              </figcaption>
            </figure>
          </div>
        </Avslor>
      </div>
    </section>
  );
}
