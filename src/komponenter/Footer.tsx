import { salong, footer, apningstider, kartLenke } from "@/lib/innhold";

export default function Footer() {
  return (
    <footer className="gutter border-t hairline pb-10 pt-16">
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="flex items-center gap-2.5 font-display text-2xl text-paper">
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-brass" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M6 3a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm0 12a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM20 4 8.12 15.88M14.47 14.48 20 20M8.12 8.12 12 12" />
            </svg>
            Walid Frisør
          </p>
          <p className="mt-4 max-w-[34ch] text-sm leading-relaxed text-ash">
            {footer.beskrivelse}
          </p>
        </div>

        <div>
          <h2 className="kicker mb-5">Tjenester</h2>
          <ul className="flex flex-col gap-3 text-sm">
            {footer.tjenester.map((t) => (
              <li key={t}>
                <a href="#tjenester" className="text-ash transition-colors hover:text-paper">
                  {t}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="kicker mb-5">Sider</h2>
          <ul className="flex flex-col gap-3 text-sm">
            {footer.sider.map((s) => (
              <li key={s.tekst}>
                <a href={s.href} className="text-ash transition-colors hover:text-paper">
                  {s.tekst}
                </a>
              </li>
            ))}
          </ul>
          <h2 className="kicker mb-4 mt-8">Åpningstider</h2>
          <ul className="flex flex-col gap-2.5 text-sm">
            {apningstider.map((a) => (
              <li key={a.dag} className="flex items-baseline justify-between gap-4">
                <span className="text-ash">{a.dag}</span>
                <span className="font-mono text-paper tabular-nums">{a.tid}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="kicker mb-5">Kontakt</h2>
          <ul className="flex flex-col gap-3 text-sm">
            <li>
              <a href={`tel:${salong.telefonE164}`} className="font-mono text-paper transition-colors hover:text-brass-lit">
                {salong.telefon}
              </a>
            </li>
            <li>
              <a href={`mailto:${salong.epost}`} className="break-words text-ash transition-colors hover:text-paper">
                {salong.epost}
              </a>
            </li>
            <li>
              <a href={kartLenke} target="_blank" rel="noopener" className="text-ash transition-colors hover:text-paper">
                {salong.gate}, {salong.postnr} {salong.by}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <p className="mt-14 text-center text-xs text-ash">
        {footer.kreditt}{" "}
        <a href="https://medcom.no" target="_blank" rel="noopener" className="underline transition-colors hover:text-ash">
          Medcom
        </a>
        .
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t hairline pt-6">
        <p className="font-mono text-xs text-ash">
          © {new Date().getFullYear()} {footer.rettigheter}
        </p>
        <ul className="flex gap-5">
          {footer.juridisk.map((j) => (
            <li key={j}>
              <span className="font-mono text-xs text-ash">{j}</span>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
