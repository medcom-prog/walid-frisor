import { salong, apningstider } from "@/lib/innhold";
import Avslor from "./Avslor";
import Kontaktskjema from "./Kontaktskjema";

const punkter = [
  { merke: "Adresse", verdi: `${salong.gate}, ${salong.postnr} ${salong.by}`, href: salong.kart, ekstern: true },
  { merke: "Telefon", verdi: salong.telefon, href: `tel:${salong.telefonE164}`, ekstern: false },
  { merke: "E-post", verdi: salong.epost, href: `mailto:${salong.epost}`, ekstern: false },
];

export default function Kontakt() {
  return (
    <section id="kontakt" className="gutter border-t hairline py-24 sm:py-32">
      <Avslor as="header" className="mb-14">
        <p className="kicker mb-5 flex items-center gap-3">
          <span className="h-px w-8 bg-brass" aria-hidden="true" />
          Kontakt
        </p>
        <h2 className="max-w-[16ch] text-h2 text-paper">Midt i Larvik sentrum</h2>
      </Avslor>

      <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <Avslor className="flex flex-col gap-10">
          <dl className="border-t hairline">
            {punkter.map((p) => (
              <div key={p.merke} className="border-b hairline py-5">
                <dt className="kicker mb-2">{p.merke}</dt>
                <dd>
                  <a
                    href={p.href}
                    {...(p.ekstern ? { target: "_blank", rel: "noopener" } : {})}
                    className="text-lead text-paper transition-colors hover:text-brass-lit"
                  >
                    {p.verdi}
                  </a>
                </dd>
              </div>
            ))}
            <div className="border-b hairline py-5">
              <dt className="kicker mb-3">Åpningstider</dt>
              <dd className="flex flex-col gap-2">
                {apningstider.map((a) => (
                  <span key={a.dag} className="flex items-baseline justify-between gap-6">
                    <span className="text-ash">{a.dag}</span>
                    <span className="font-mono text-paper tabular-nums">{a.tid}</span>
                  </span>
                ))}
              </dd>
            </div>
          </dl>

          <div className="overflow-hidden rounded-xl border hairline">
            <iframe
              title={`Kart til ${salong.navn}`}
              src={`https://www.google.com/maps?q=${encodeURIComponent(`${salong.gate}, ${salong.postnr} ${salong.by}`)}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-72 w-full border-0 grayscale"
            />
          </div>
        </Avslor>

        <Avslor forsinkelse={120}>
          <Kontaktskjema />
        </Avslor>
      </div>
    </section>
  );
}
