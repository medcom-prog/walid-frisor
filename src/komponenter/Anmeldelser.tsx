import { anmeldelser } from "@/lib/innhold";
import Avslor from "./Avslor";

function Stjerner() {
  return (
    <div className="flex gap-0.5" aria-label="5 av 5 stjerner">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-brass" aria-hidden="true">
          <path d="m12 2.6 2.9 6 6.6.9-4.8 4.6 1.2 6.5-5.9-3.2-5.9 3.2 1.2-6.5L2.5 9.5l6.6-.9L12 2.6Z" />
        </svg>
      ))}
    </div>
  );
}

function Kort({ navn, tekst, nar }: { navn: string; tekst: string; nar: string }) {
  return (
    <figure className="flex w-[19rem] shrink-0 flex-col justify-between gap-5 rounded-xl border hairline bg-iron/70 p-6 sm:w-[22rem]">
      <div>
        <Stjerner />
        <blockquote className="mt-4 text-[0.95rem] leading-relaxed text-chrome">
          {tekst}
        </blockquote>
      </div>
      <figcaption className="flex items-baseline justify-between gap-3 border-t hairline pt-4">
        <span className="text-sm font-medium text-paper">{navn}</span>
        <span className="font-mono text-[0.68rem] uppercase tracking-widest text-steel-2">
          {nar}
        </span>
      </figcaption>
    </figure>
  );
}

export default function Anmeldelser() {
  const rad1 = anmeldelser.slice(0, 5);
  const rad2 = anmeldelser.slice(5);

  return (
    <section id="anmeldelser" className="overflow-hidden border-t hairline py-24 sm:py-32">
      <Avslor as="header" className="gutter mb-14">
        <p className="kicker mb-5 flex items-center gap-3">
          <span className="h-px w-8 bg-brass" aria-hidden="true" />
          Omtaler
        </p>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-[15ch] text-h2 text-paper">
            Ti av ti gir <span className="text-brass">full pott</span>
          </h2>
          <p className="max-w-[36ch] text-ash">
            Hentet fra bookingsiden vår. Ingen av dem er redigert.
          </p>
        </div>
      </Avslor>

      {/* To rader som glir hver sin vei. Pauser når man holder musen over. */}
      <div className="flex flex-col gap-4 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        {[
          { rad: rad1, retning: "normal", fart: "58s" },
          { rad: rad2, retning: "reverse", fart: "68s" },
        ].map(({ rad, retning, fart }, i) => (
          <div key={i} className="group flex overflow-hidden">
            {[0, 1].map((dup) => (
              <div
                key={dup}
                aria-hidden={dup === 1}
                className="flex shrink-0 gap-4 pr-4 group-hover:[animation-play-state:paused] motion-reduce:animate-none"
                style={{
                  animation: `gli ${fart} linear infinite`,
                  animationDirection: retning as "normal" | "reverse",
                }}
              >
                {rad.map((a) => (
                  <Kort key={`${dup}-${a.navn}`} {...a} />
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes gli {
          from { transform: translateX(0); }
          to   { transform: translateX(-100%); }
        }
      `}</style>
    </section>
  );
}
