import { salong, booking } from "@/lib/innhold";
import Avslor from "./Avslor";

/**
 * Kalenderen er en iframe fra Setmore.
 *
 * Bevisste valg her, alle for at den alltid skal være synlig:
 *  - Ingen tilstand som bytter den ut. En tidsstyrt "fallback" gjorde at
 *    kalenderen kunne forsvinne etter at den faktisk hadde lastet.
 *  - Ingen avsløringsanimasjon på selve rammen. Opacity- og transform-
 *    overganger på en forelder tvinger iframen til å komponeres på nytt,
 *    og det er det som ga glitching.
 *  - Laster med én gang, ikke lazy, så den ikke popper inn ved scroll.
 *  - Lenken under står permanent, slik at det finnes en vei videre selv
 *    om iframen blir blokkert av utvidelser eller personverninnstillinger.
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
        <p className="mt-5 text-lead text-ash">{booking.beskrivelse}</p>
      </Avslor>

      <div className="overflow-hidden rounded-xl border hairline bg-paper">
        <iframe
          src={salong.booking}
          title={`Book time hos ${salong.navn}`}
          referrerPolicy="no-referrer-when-downgrade"
          className="block h-[42rem] w-full border-0 sm:h-[48rem] lg:h-[54rem]"
        />
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <p className="max-w-[62ch] text-sm text-steel-2">{booking.notis}</p>
        <a
          href={salong.booking}
          target="_blank"
          rel="noopener"
          className="inline-flex shrink-0 items-center gap-2 rounded-full border hairline px-5 py-3 text-sm text-paper transition-colors hover:border-brass hover:text-brass-lit"
        >
          {booking.fallbackKnapp}
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
          </svg>
        </a>
      </div>
    </section>
  );
}
