import { anmeldelser, salong } from "@/lib/innhold";
import Avslor from "./Avslor";

function Stjerner({ klasse = "h-3.5 w-3.5" }: { klasse?: string }) {
  return (
    <span className="flex gap-0.5" aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 24 24" className={`${klasse} fill-brass`}>
          <path d="m12 2.6 2.9 6 6.6.9-4.8 4.6 1.2 6.5-5.9-3.2-5.9 3.2 1.2-6.5L2.5 9.5l6.6-.9L12 2.6Z" />
        </svg>
      ))}
    </span>
  );
}

export default function Anmeldelser() {
  return (
    <section id="anmeldelser" className="gutter border-t hairline py-20 sm:py-28">
      <Avslor as="header" className="mb-12 flex flex-wrap items-end justify-between gap-8">
        <div className="max-w-[46ch]">
          <p className="kicker mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-brass" aria-hidden="true" />
            {anmeldelser.merkelapp}
          </p>
          <h2 className="text-h2 text-paper">{anmeldelser.tittel}</h2>
          <p className="mt-5 text-lead text-ash">{anmeldelser.beskrivelse}</p>
        </div>

        <div className="flex items-center gap-4 rounded-xl border hairline bg-iron/50 px-6 py-4">
          <span className="font-display text-4xl text-paper tabular-nums">
            {anmeldelser.snitt}
          </span>
          <span>
            <Stjerner />
            <span className="mt-1.5 block font-mono text-[0.68rem] uppercase tracking-widest text-ash">
              {anmeldelser.antall} anmeldelser
            </span>
          </span>
        </div>
      </Avslor>

      {/* Murverk-oppsett, så korte og lange omtaler kan ligge side om side
          uten at radene får ulik høyde. Faller til én kolonne på mobil. */}
      <ul className="gap-5 sm:columns-2 lg:columns-3 [&>li]:mb-5 [&>li]:break-inside-avoid">
        {anmeldelser.liste.map((a, i) => (
          <li key={a.navn}>
            <Avslor forsinkelse={(i % 3) * 70}>
              <figure className="rounded-xl border hairline bg-iron/50 p-6 transition-colors duration-300 hover:border-steel-2">
                <Stjerner />
                <blockquote className="mt-4 text-[0.95rem] leading-relaxed text-chrome">
                  {a.tekst}
                </blockquote>
                <figcaption className="mt-5 flex items-baseline justify-between gap-3 border-t hairline pt-4">
                  <span className="text-sm font-medium text-paper">{a.navn}</span>
                  <span className="shrink-0 font-mono text-[0.66rem] uppercase tracking-widest text-ash">
                    {a.nar}
                  </span>
                </figcaption>
              </figure>
            </Avslor>
          </li>
        ))}
      </ul>

      <Avslor as="p" className="mt-10 text-sm text-ash">
        Vil du legge igjen en omtale?{" "}
        <a
          href={salong.booking}
          target="_blank"
          rel="noopener"
          className="text-ash underline underline-offset-4 transition-colors hover:text-paper"
        >
          Du finner skjemaet på bookingsiden
        </a>
        .
      </Avslor>
    </section>
  );
}
