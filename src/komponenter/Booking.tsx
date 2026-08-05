import { salong, booking, apningstider } from "@/lib/innhold";
import Avslor from "./Avslor";

/**
 * Ingen innebygd kalender lenger. Setmore lastes i egen fane i stedet,
 * noe som fjerner både glitchingen og ventetiden på en tung iframe.
 */
export default function Booking() {
  return (
    <section id="book" className="gutter border-t hairline py-20 sm:py-28">
      <Avslor as="header" className="mb-10 max-w-[60ch]">
        <p className="kicker mb-5 flex items-center gap-3">
          <span className="h-px w-8 bg-brass" aria-hidden="true" />
          {booking.merkelapp}
        </p>
        <h2 className="text-h2 text-paper">{booking.tittel}</h2>
      </Avslor>

      <Avslor>
        <a
          href={salong.booking}
          target="_blank"
          rel="noopener"
          className="group relative block overflow-hidden rounded-2xl border border-brass/30 bg-iron transition-colors duration-300 hover:border-brass"
        >
          {/* Messingskjær som brer seg fra venstre når man peker på flaten */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-brass/12 to-transparent transition-transform duration-700 ease-[cubic-bezier(.22,.61,.36,1)] group-hover:scale-x-100"
          />

          <span className="relative flex flex-col gap-8 p-8 sm:flex-row sm:items-center sm:justify-between sm:gap-10 sm:p-12">
            <span className="min-w-0">
              <span className="block font-display text-[clamp(1.75rem,1.2rem+2.2vw,3rem)] leading-[1.05] tracking-tight text-paper">
                Bestill time hos
                <br />
                Walid Frisør
              </span>
              <span className="mt-4 block max-w-[46ch] text-sm leading-relaxed text-ash">
                Du sendes til bookingsiden vår, der du velger tjeneste og
                tidspunkt. Det tar under ett minutt.
              </span>

              <span className="mt-6 flex flex-wrap gap-x-7 gap-y-2">
                {apningstider.map((a) => (
                  <span key={a.dag} className="font-mono text-xs text-ash">
                    {a.dag} <span className="text-ash">{a.tid}</span>
                  </span>
                ))}
              </span>
            </span>

            <span className="flex shrink-0 items-center gap-4">
              <span className="rounded-full bg-paper px-7 py-4 font-medium text-void transition-colors duration-300 group-hover:bg-brass-lit">
                Book time
              </span>
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-brass/40 text-brass transition-all duration-300 group-hover:border-brass group-hover:bg-brass group-hover:text-void">
                <svg viewBox="0 0 24 24" className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14m-6-6 6 6-6 6" />
                </svg>
              </span>
            </span>
          </span>
        </a>
      </Avslor>

      <Avslor as="p" className="mt-6 max-w-[70ch] text-sm text-ash">
        {booking.notis}
      </Avslor>
    </section>
  );
}
