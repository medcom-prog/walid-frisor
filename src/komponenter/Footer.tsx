import Image from "next/image";
import { salong, footer, apningstiderKort, kartLenke } from "@/lib/innhold";

export default function Footer() {
  return (
    <footer className="gutter border-t hairline pb-10 pt-16">
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="flex items-center gap-3 font-display text-2xl text-paper">
            {/* Samme merke og lyse skive som i headeren – merket er svart
                og trenger lys flate for å synes mot bakgrunnen. */}
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-paper p-[3px]">
              <Image
                src="/bilder/merke-192.webp"
                alt=""
                width={192}
                height={192}
                className="h-full w-full object-contain"
              />
            </span>
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
            {apningstiderKort.map((a) => (
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
            <li key={j.href}>
              <a href={j.href} className="font-mono text-xs text-ash underline underline-offset-4 transition-colors hover:text-paper">
                {j.tekst}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
