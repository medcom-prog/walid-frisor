import type { ReactNode } from "react";
import Link from "next/link";
import { salong } from "@/lib/innhold";

/** Felles ramme for personvern, vilkår og informasjonskapsler. */
export default function JuridiskSide({
  merkelapp,
  tittel,
  ingress,
  oppdatert,
  children,
}: {
  merkelapp: string;
  tittel: string;
  ingress: string;
  oppdatert: string;
  children: ReactNode;
}) {
  return (
    <main id="hovedinnhold" className="gutter pb-24 pt-32 sm:pt-40">
      <div className="mx-auto max-w-[68ch]">
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-2 text-sm text-ash transition-colors hover:text-paper"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M19 12H5m6 6-6-6 6-6" />
          </svg>
          Tilbake til forsiden
        </Link>

        <p className="kicker mb-5 flex items-center gap-3">
          <span className="h-px w-8 bg-brass" aria-hidden="true" />
          {merkelapp}
        </p>
        <h1 className="text-h2 text-paper">{tittel}</h1>
        <p className="mt-6 text-lead text-ash">{ingress}</p>

        <p className="mt-8 border-t hairline pt-6 font-mono text-xs text-ash">
          Sist oppdatert {oppdatert}
        </p>

        <div className="mt-10 flex flex-col gap-10">{children}</div>

        <div className="mt-16 rounded-xl border hairline bg-iron/50 p-6">
          <h2 className="font-display text-lg text-paper">Spørsmål?</h2>
          <p className="mt-2 text-sm leading-relaxed text-ash">
            Ta kontakt på{" "}
            <a href={`mailto:${salong.epost}`} className="text-brass underline underline-offset-4 hover:text-brass-lit">
              {salong.epost}
            </a>{" "}
            eller ring{" "}
            <a href={`tel:${salong.telefonE164}`} className="text-brass underline underline-offset-4 hover:text-brass-lit">
              {salong.telefon}
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}

/** Avsnitt med overskrift, brukt av alle tre sidene. */
export function Bolk({ tittel, children }: { tittel: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-h3 text-paper">{tittel}</h2>
      <div className="mt-4 flex flex-col gap-4 leading-relaxed text-ash [&_a]:text-brass [&_a]:underline [&_a]:underline-offset-4 [&_li]:leading-relaxed [&_strong]:text-paper [&_strong]:font-semibold">
        {children}
      </div>
    </section>
  );
}

/** Punktliste med messingprikk. */
export function Liste({ punkter }: { punkter: ReactNode[] }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {punkter.map((p, i) => (
        <li key={i} className="flex gap-3">
          <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-brass" aria-hidden="true" />
          <span>{p}</span>
        </li>
      ))}
    </ul>
  );
}
