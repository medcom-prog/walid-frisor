import { kontakt } from "@/lib/innhold";
import Avslor from "./Avslor";
import Kontaktskjema from "./Kontaktskjema";
import Kart from "./Kart";

const ikoner = [
  <path key="t" d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.1a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />,
  <g key="e">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m2 7 10 6 10-6" />
  </g>,
  <g key="a">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </g>,
];

export default function Kontakt() {
  return (
    <section id="kontakt" className="gutter border-t hairline py-20 sm:py-28">
      <Avslor as="header" className="mb-12 max-w-[60ch]">
        <p className="kicker mb-5 flex items-center gap-3">
          <span className="h-px w-8 bg-brass" aria-hidden="true" />
          {kontakt.merkelapp}
        </p>
        <h2 className="text-h2 text-paper">{kontakt.tittel}</h2>
        <p className="mt-5 text-lead text-ash">{kontakt.apningstidLinje}</p>
      </Avslor>

      <div className="grid gap-10 lg:grid-cols-[minmax(280px,0.85fr)_1.15fr] lg:gap-14">
        <Avslor className="flex flex-col gap-4">
          {kontakt.kort.map((k, i) => (
            <div
              key={k.tittel}
              className="flex items-start gap-4 rounded-xl border hairline bg-iron/50 p-5 transition-colors hover:border-steel-2"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border hairline text-brass">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {ikoner[i]}
                </svg>
              </span>
              <div className="min-w-0">
                <h3 className="font-display text-base text-paper">{k.tittel}</h3>
                <p className="mt-1 break-words">
                  <a
                    href={k.href}
                    {...(k.ekstern ? { target: "_blank", rel: "noopener" } : {})}
                    className="text-chrome transition-colors hover:text-brass-lit"
                  >
                    {k.verdi}
                  </a>
                </p>
                {k.notis && <p className="mt-1 text-xs text-ash">{k.notis}</p>}
              </div>
            </div>
          ))}

          <div className="mt-2">
            <Kart />
          </div>
        </Avslor>

        <Avslor forsinkelse={100}>
          <Kontaktskjema />
        </Avslor>
      </div>
    </section>
  );
}
