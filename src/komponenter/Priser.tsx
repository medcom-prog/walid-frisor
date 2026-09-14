import Image from "next/image";
import { priser } from "@/lib/innhold";
import Avslor from "./Avslor";
import Videoflate from "./Videoflate";

const storrelser = "(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 31vw";

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
              {/* Videoene er filmet stående, og 4:3 ville skåret bort mer enn
                  halve bildet. 4:5 viser klippet og holder kortene samlet. */}
              {k.video ? (
                <Videoflate
                  video={k.video}
                  alt={k.navn}
                  sizes={storrelser}
                  className="aspect-[4/5]"
                />
              ) : (
                <div className="relative aspect-[4/5] overflow-hidden bg-iron">
                  <Image
                    src={k.bilde}
                    alt={k.navn}
                    fill
                    sizes={storrelser}
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(.22,.61,.36,1)] group-hover:scale-105"
                  />
                </div>
              )}

              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-h3 text-paper">{k.navn}</h3>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-ash">{k.beskrivelse}</p>
                {"inkluderer" in k && (
                  <ul className="mt-4 space-y-1.5 text-sm text-paper">
                    {k.inkluderer.map((punkt) => (
                      <li key={punkt} className="flex items-start gap-2.5">
                        <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0 text-brass" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                          <path d="m5 12 5 5 9-10" />
                        </svg>
                        {punkt}
                      </li>
                    ))}
                  </ul>
                )}
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
