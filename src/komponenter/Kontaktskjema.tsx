"use client";

import { useState } from "react";
import { kontakt, salong } from "@/lib/innhold";

type Felt = "navn" | "epost" | "telefon" | "melding";
type Feil = Partial<Record<Felt, string>>;

const regler: Record<Felt, (v: string) => string | null> = {
  navn: (v) => (v.trim().length >= 2 ? null : "Skriv inn navnet ditt."),
  epost: (v) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? null : "Skriv inn en gyldig e-postadresse.",
  telefon: (v) =>
    v.trim() === "" || /^[\d\s+()-]{8,}$/.test(v.trim())
      ? null
      : "Skriv inn et gyldig telefonnummer.",
  melding: (v) => (v.trim().length >= 10 ? null : "Skriv gjerne litt mer — minst 10 tegn."),
};

const feltStil =
  "w-full rounded-lg border hairline bg-void px-4 py-3.5 text-paper placeholder:text-steel-2 transition-colors focus:border-brass focus:outline-none";

export default function Kontaktskjema() {
  const [feil, setFeil] = useState<Feil>({});
  const [status, setStatus] = useState<"klar" | "sender" | "sendt" | "feilet">("klar");
  const s = kontakt.skjema;

  async function send(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const skjema = e.currentTarget;
    const data = Object.fromEntries(new FormData(skjema)) as Record<string, string>;

    const nyeFeil: Feil = {};
    (Object.keys(regler) as Felt[]).forEach((f) => {
      const m = regler[f](data[f] ?? "");
      if (m) nyeFeil[f] = m;
    });
    setFeil(nyeFeil);

    if (Object.keys(nyeFeil).length) {
      setStatus("klar");
      skjema.querySelector<HTMLElement>(`[name="${Object.keys(nyeFeil)[0]}"]`)?.focus();
      return;
    }

    setStatus("sender");
    try {
      const svar = await fetch("/api/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!svar.ok) throw new Error(String(svar.status));
      skjema.reset();
      setStatus("sendt");
    } catch {
      setStatus("feilet");
    }
  }

  if (status === "sendt") {
    return (
      <div className="flex min-h-[26rem] flex-col items-center justify-center gap-4 rounded-xl border hairline bg-iron/50 p-10 text-center">
        <span className="grid h-14 w-14 place-items-center rounded-full border border-brass">
          <svg viewBox="0 0 24 24" className="h-6 w-6 stroke-brass" fill="none" strokeWidth="1.6" aria-hidden="true">
            <path d="m20 6-11 11-5-5" />
          </svg>
        </span>
        <h3 className="font-display text-2xl text-paper">Meldingen er sendt</h3>
        <p className="max-w-[34ch] text-sm text-ash">
          Vi tar kontakt så snart vi kan. Haster det, ring {salong.telefon}.
        </p>
      </div>
    );
  }

  const tekstfelt = [
    { navn: "navn" as const, merke: s.navn, type: "text", auto: "name" },
    { navn: "epost" as const, merke: s.epost, type: "email", auto: "email" },
    { navn: "telefon" as const, merke: s.telefon, type: "tel", auto: "tel" },
  ];

  return (
    <form
      onSubmit={send}
      noValidate
      className="grid gap-5 rounded-xl border hairline bg-iron/50 p-6 sm:grid-cols-2 sm:p-8"
    >
      <div className="sm:col-span-2">
        <h3 className="font-display text-h3 text-paper">{s.tittel}</h3>
        <p className="mt-3 max-w-[52ch] text-sm leading-relaxed text-ash">{s.ingress}</p>
        <a
          href={salong.booking}
          target="_blank"
          rel="noopener"
          className="mt-4 inline-flex items-center gap-2 text-sm text-brass underline underline-offset-4 transition-colors hover:text-brass-lit"
        >
          Book vanlig time i stedet
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M14 4h6v6M20 4l-9 9" />
          </svg>
        </a>
        <hr className="mt-7 border-0 border-t hairline" />
      </div>

      {tekstfelt.map((f) => (
        <div key={f.navn}>
          <label htmlFor={f.navn} className="mb-2 block text-sm text-ash">
            {f.merke}
          </label>
          <input
            id={f.navn}
            name={f.navn}
            type={f.type}
            autoComplete={f.auto}
            aria-invalid={Boolean(feil[f.navn])}
            aria-describedby={feil[f.navn] ? `${f.navn}-feil` : undefined}
            className={`${feltStil} ${feil[f.navn] ? "border-red-400/70" : ""}`}
          />
          <p id={`${f.navn}-feil`} className="mt-1.5 min-h-[1rem] text-xs text-red-400">
            {feil[f.navn]}
          </p>
        </div>
      ))}

      <div className="sm:col-span-2">
        <label htmlFor="melding" className="mb-2 block text-sm text-ash">
          {s.melding}
        </label>
        <textarea
          id="melding"
          name="melding"
          rows={5}
          placeholder={s.meldingPlassholder}
          aria-invalid={Boolean(feil.melding)}
          aria-describedby={feil.melding ? "melding-feil" : undefined}
          className={`${feltStil} resize-y ${feil.melding ? "border-red-400/70" : ""}`}
        />
        <p id="melding-feil" className="mt-1.5 min-h-[1rem] text-xs text-red-400">
          {feil.melding}
        </p>
      </div>

      {/* Honningkrukke mot bot-spam */}
      <div aria-hidden="true" className="sr-only">
        <label htmlFor="firmanavn">La dette stå tomt</label>
        <input id="firmanavn" name="firmanavn" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button
          type="submit"
          disabled={status === "sender"}
          className="rounded-full bg-paper px-7 py-4 font-medium text-void transition-colors hover:bg-brass-lit disabled:opacity-60"
        >
          {status === "sender" ? "Sender …" : s.send}
        </button>
        <p role="status" aria-live="polite" className="text-sm text-red-400">
          {status === "feilet" &&
            `Meldingen gikk ikke gjennom. Ring oss gjerne på ${salong.telefon}.`}
        </p>
      </div>
    </form>
  );
}
