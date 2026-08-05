import { tjenester } from "@/lib/innhold";
import Avslor from "./Avslor";

export default function Tjenester() {
  return (
    <section id="tjenester" className="gutter border-t hairline py-20 sm:py-28">
      <Avslor as="header" className="mb-12 max-w-[60ch]">
        <p className="kicker mb-5 flex items-center gap-3">
          <span className="h-px w-8 bg-brass" aria-hidden="true" />
          {tjenester.merkelapp}
        </p>
        <h2 className="text-h2 text-paper">{tjenester.tittel}</h2>
        <p className="mt-5 text-lead text-ash">{tjenester.beskrivelse}</p>
      </Avslor>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {tjenester.kort.map((k, i) => (
          <Avslor key={k.navn} forsinkelse={i * 80}>
            <article
              className={`relative flex h-full flex-col rounded-xl border p-7 transition-colors duration-300 sm:p-8 ${
                k.fremhevet
                  ? "border-brass/40 bg-iron"
                  : "hairline bg-iron/50 hover:border-steel-2"
              }`}
            >
              {k.merke && (
                <span className="absolute right-6 top-6 rounded-full bg-brass px-3 py-1 font-mono text-[0.62rem] uppercase tracking-widest text-void">
                  {k.merke}
                </span>
              )}

              <h3 className="pr-24 font-display text-h3 text-paper">{k.navn}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ash">{k.beskrivelse}</p>

              <ul className="mt-6 flex flex-col gap-3 border-t hairline pt-6">
                {k.punkter.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm text-chrome">
                    <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0 text-brass" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="m20 6-11 11-5-5" />
                    </svg>
                    {p}
                  </li>
                ))}
              </ul>
            </article>
          </Avslor>
        ))}
      </div>
    </section>
  );
}
