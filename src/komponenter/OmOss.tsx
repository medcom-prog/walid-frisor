import Image from "next/image";
import { omOss } from "@/lib/innhold";
import Avslor from "./Avslor";

const ikoner = [
  <path key="s" d="M6 3a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm0 12a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM20 4 8.12 15.88M14.47 14.48 20 20M8.12 8.12 12 12" />,
  <path key="b" d="M4 14h16v3a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-3ZM7 14V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v8" />,
  <path key="k" d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3Z" />,
];

export default function OmOss() {
  return (
    <section id="om-oss" className="gutter border-t hairline py-20 sm:py-28">
      <Avslor as="header" className="mb-12">
        <p className="kicker mb-5 flex items-center gap-3">
          <span className="h-px w-8 bg-brass" aria-hidden="true" />
          {omOss.merkelapp}
        </p>
        <h2 className="max-w-[18ch] text-h2 text-paper">{omOss.tittel}</h2>
      </Avslor>

      <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <Avslor>
          {omOss.avsnitt.map((a) => (
            <p key={a} className="mb-4 max-w-[52ch] text-ash">
              {a}
            </p>
          ))}

          <ul className="mt-10 border-t hairline">
            {omOss.punkter.map((p, i) => (
              <li key={p.tittel} className="flex items-start gap-5 border-b hairline py-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border hairline text-brass">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {ikoner[i]}
                  </svg>
                </span>
                <span>
                  <span className="block font-display text-lg text-paper">{p.tittel}</span>
                  <span className="mt-1 block text-sm text-ash">{p.tekst}</span>
                </span>
              </li>
            ))}
          </ul>
        </Avslor>

        <Avslor forsinkelse={100}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl border hairline">
            <Image
              src="/bilder/classic-cut-1400.webp"
              alt="Frisørstol i salongen"
              fill
              sizes="(max-width: 1024px) 92vw, 46vw"
              className="object-cover"
            />
          </div>
        </Avslor>
      </div>
    </section>
  );
}
