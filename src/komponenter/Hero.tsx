import Image from "next/image";
import { salong } from "@/lib/innhold";

const linjer = ["Skarpe linjer.", "Rolig stol.", "Larvik."];

export default function Hero() {
  return (
    <section id="topp" className="relative isolate flex min-h-[100dvh] flex-col justify-end overflow-hidden">
      {/* Bakgrunnsbilde med sakte panorering */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/bilder/hero-portrait-1200.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="panorer object-cover object-[50%_28%] grayscale"
        />
        {/* To lag: ett som løfter bunnen, ett som demper toppen bak headeren */}
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/70 to-void/25" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-void/80 to-transparent" />
      </div>

      <div className="gutter pb-14 pt-32 sm:pb-20">
        <p
          className="kicker mb-7 flex items-center gap-3"
          style={{ animation: "stig-opp .8s cubic-bezier(.22,.61,.36,1) .1s both" }}
        >
          <span className="h-px w-8 bg-brass" aria-hidden="true" />
          Barbershop siden 2019
        </p>

        <h1 className="stig max-w-[16ch] text-mega font-medium text-paper">
          {linjer.map((linje, i) => (
            <span key={linje}>
              <span style={{ animationDelay: `${0.15 + i * 0.11}s` }}>
                {i === 2 ? <em className="not-italic text-brass">{linje}</em> : linje}
              </span>
            </span>
          ))}
        </h1>

        <div
          className="mt-10 flex flex-col gap-8 border-t hairline pt-8 sm:flex-row sm:items-end sm:justify-between"
          style={{ animation: "stig-opp .9s cubic-bezier(.22,.61,.36,1) .55s both" }}
        >
          <p className="max-w-[46ch] text-lead text-ash">
            Fades, klassisk klipp og skjeggforming hos {salong.barberer} i {salong.gate}.
            Book på nett, eller stikk innom — vi tar drop-in når stolen er ledig.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={salong.booking}
              target="_blank"
              rel="noopener"
              className="group inline-flex items-center gap-2.5 rounded-full bg-paper px-7 py-4 font-medium text-void transition-colors hover:bg-brass-lit"
            >
              Book time
              <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M5 12h14m-6-6 6 6-6 6" />
              </svg>
            </a>
            <a
              href={`tel:${salong.telefonE164}`}
              className="inline-flex items-center gap-2.5 rounded-full border hairline px-7 py-4 font-mono text-sm text-paper transition-colors hover:border-brass hover:text-brass-lit"
            >
              {salong.telefon}
            </a>
          </div>
        </div>

        {/* Sosialt bevis rett under folden – ekte tall fra Setmore */}
        <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 border-t hairline pt-8 sm:grid-cols-4">
          {[
            { t: "5,0", e: "av 5 i snitt" },
            { t: "10", e: "omtaler" },
            { t: "30", e: "minutter per time" },
            { t: "350", e: "kroner for klipp" },
          ].map((s) => (
            <div key={s.e}>
              <dt className="font-display text-4xl text-paper tabular-nums">{s.t}</dt>
              <dd className="kicker mt-2">{s.e}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
