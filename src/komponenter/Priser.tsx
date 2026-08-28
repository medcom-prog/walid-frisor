import Image from "next/image";
import { priser } from "@/lib/innhold";
import Avslor from "./Avslor";

export default function Priser() {
  return (
    <section id="priser" className="gutter border-t hairline py-20 sm:py-28">
      <Avslor as="header" className="mb-12 max-w-[60ch]">
        <p className="kicker mb-5 flex items-center gap-3">
          <span className="h-px w-8 bg-brass" aria-hidden="true" />
          {priser.merkelapp}
        </p>
        <h2 className="text-h2 text-paper">{priser.tittel}</h2>
        {priser.beskrivelse && <p className="mt-5 text-lead text-ash">{priser.beskrivelse}</p>}
      </Avslor>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {priser.kort.map((k, i) => (
          <Avslor key={k.navn} forsinkelse={(i % 3) * 80}>
            <article className="group flex h-full flex-col overflow-hidden rounded-xl border hairline bg-iron/50 transition-colors duration-300 hover:border-steel-2">
              <div className="relative aspect-[4/3] overflow-hidden bg-iron">
                <Image
                  src={k.bilde}
                  alt={k.navn}
                  fill
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 31vw"
                  className="object-cover grayscale transition-transform duration-700 ease-[cubic-bezier(.22,.61,.36,1)] group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-h3 text-paper">{k.navn}</h3>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-ash">{k.beskrivelse}</p>
                {/* To priser der de finnes: booket time koster mer fordi
                    tiden settes av, drop-in tas når stolen er ledig. */}
                <div className="mt-5 border-t hairline pt-4">
                  <p className="flex items-baseline justify-between gap-3">
                    <span className="font-mono text-lg text-paper tabular-nums">{k.pris}</span>
                    {k.prisDropIn && (
                      <span className="font-mono text-[0.66rem] uppercase tracking-widest text-ash">
                        Booket
                      </span>
                    )}
                  </p>
                  {k.prisDropIn && (
                    <p className="mt-1.5 flex items-baseline justify-between gap-3">
                      <span className="font-mono text-base text-ash tabular-nums">{k.prisDropIn}</span>
                      <span className="font-mono text-[0.66rem] uppercase tracking-widest text-ash">
                        Drop-in
                      </span>
                    </p>
                  )}
                </div>
              </div>
            </article>
          </Avslor>
        ))}
      </div>
    </section>
  );
}
