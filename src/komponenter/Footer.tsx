import { salong, navigasjon, apningstider } from "@/lib/innhold";

export default function Footer() {
  return (
    <footer className="gutter border-t hairline pb-10 pt-20">
      <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <p className="font-display text-3xl text-paper">
            Walid<span className="text-brass"> Frisør</span>
          </p>
          <p className="mt-4 max-w-[36ch] text-sm leading-relaxed text-ash">
            Barbershop i {salong.gate}, {salong.by}. Fades, klassisk klipp og skjegg —
            med eller uten avtale.
          </p>
          <a
            href={salong.booking}
            target="_blank"
            rel="noopener"
            className="mt-7 inline-flex rounded-full bg-paper px-6 py-3 text-sm font-medium text-void transition-colors hover:bg-brass-lit"
          >
            Book time
          </a>
        </div>

        <nav aria-label="Bunnmeny">
          <h2 className="kicker mb-5">Sider</h2>
          <ul className="flex flex-col gap-3 text-sm">
            {navigasjon.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-ash transition-colors hover:text-paper">
                  {l.tekst}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="kicker mb-5">Åpent</h2>
          <ul className="flex flex-col gap-3 text-sm">
            {apningstider.map((a) => (
              <li key={a.dag} className="flex items-baseline justify-between gap-4">
                <span className="text-ash">{a.dag}</span>
                <span className="font-mono text-paper tabular-nums">{a.tid}</span>
              </li>
            ))}
          </ul>
          <ul className="mt-6 flex flex-col gap-3 text-sm">
            <li>
              <a href={`tel:${salong.telefonE164}`} className="font-mono text-paper transition-colors hover:text-brass-lit">
                {salong.telefon}
              </a>
            </li>
            <li>
              <a href={`mailto:${salong.epost}`} className="text-ash transition-colors hover:text-paper">
                {salong.epost}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t hairline pt-6">
        <p className="font-mono text-xs text-steel-2">
          © {new Date().getFullYear()} {salong.navn}
        </p>
        <p className="font-mono text-xs text-steel-2">
          Utviklet med{" "}
          <a href="https://medcom.no" target="_blank" rel="noopener" className="text-ash transition-colors hover:text-paper">
            Medcom
          </a>
        </p>
      </div>
    </footer>
  );
}
