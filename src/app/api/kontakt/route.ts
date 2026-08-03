import { NextResponse } from "next/server";

/**
 * POST /api/kontakt
 * Tar imot kontaktskjemaet og videresender det som e-post via Resend.
 *
 * Miljøvariabler:
 *   RESEND_API_KEY  påkrevd – API-nøkkel fra Resend
 *   KONTAKT_TIL     valgfri – mottaker, standard walidfrisor12@gmail.com
 *   KONTAKT_FRA     valgfri – avsender, må ligge på et domene verifisert i Resend
 */

const TIL = process.env.KONTAKT_TIL ?? "walidfrisor12@gmail.com";
const FRA = process.env.KONTAKT_FRA ?? "Walid Frisør <noreply@medcom.no>";

const MAKS = {
  navn: 100,
  epost: 150,
  telefon: 40,
  tjeneste: 60,
  melding: 4000,
} as const;

type Felt = keyof typeof MAKS;

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

export async function POST(request: Request) {
  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY mangler i miljøvariablene.");
    return NextResponse.json({ feil: "Skjemaet er ikke satt opp riktig." }, { status: 500 });
  }

  let kropp: Record<string, unknown>;
  try {
    kropp = await request.json();
  } catch {
    return NextResponse.json({ feil: "Ugyldig innhold." }, { status: 400 });
  }

  // Honningkrukke: er den fylt ut, er det en bot. Svar 200 så den ikke lærer noe.
  if (String(kropp.firmanavn ?? "").trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const felt = {} as Record<Felt, string>;
  for (const [navn, maks] of Object.entries(MAKS) as [Felt, number][]) {
    felt[navn] = String(kropp[navn] ?? "").trim().slice(0, maks);
  }

  const feil: Felt[] = [];
  if (felt.navn.length < 2) feil.push("navn");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(felt.epost)) feil.push("epost");
  if (felt.melding.length < 10) feil.push("melding");
  if (felt.telefon && !/^[\d\s+()-]{8,}$/.test(felt.telefon)) feil.push("telefon");

  if (feil.length) {
    return NextResponse.json({ feil: `Ugyldige felt: ${feil.join(", ")}` }, { status: 400 });
  }

  const rader: [string, string][] = [
    ["Navn", felt.navn],
    ["E-post", felt.epost],
    ["Telefon", felt.telefon || "—"],
    ["Tjeneste", felt.tjeneste || "—"],
  ];

  const html = `
    <div style="font-family:-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;line-height:1.6;color:#14110F;max-width:600px">
      <h2 style="font-weight:600;font-size:20px;margin:0 0 4px">Ny melding fra nettsiden</h2>
      <p style="margin:0 0 22px;color:#83878E;font-size:13px">walidfrisør.no</p>
      <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;margin-bottom:20px">
        ${rader
          .map(
            ([k, v]) => `<tr>
              <td style="padding:9px 0;border-bottom:1px solid #E4E4E4;color:#83878E;width:110px;font-size:13px">${k}</td>
              <td style="padding:9px 0;border-bottom:1px solid #E4E4E4;font-weight:600">${escapeHtml(v)}</td>
            </tr>`,
          )
          .join("")}
      </table>
      <p style="margin:0 0 6px;color:#83878E;font-size:13px">Melding</p>
      <div style="background:#F6F6F6;border-left:3px solid #B08D57;padding:14px 16px;white-space:pre-wrap">${escapeHtml(felt.melding)}</div>
      <p style="margin-top:22px;font-size:13px;color:#83878E">Svar direkte på denne e-posten for å nå kunden.</p>
    </div>`;

  const tekst = [
    "Ny melding fra walidfrisør.no",
    "",
    ...rader.map(([k, v]) => `${k}: ${v}`),
    "",
    "Melding:",
    felt.melding,
  ].join("\n");

  try {
    const svar = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FRA,
        to: [TIL],
        reply_to: felt.epost,
        subject: `Ny henvendelse fra ${felt.navn}${felt.tjeneste ? ` – ${felt.tjeneste}` : ""}`,
        html,
        text: tekst,
      }),
    });

    if (!svar.ok) {
      console.error("Resend svarte", svar.status, await svar.text().catch(() => ""));
      return NextResponse.json({ feil: "E-posttjenesten svarte ikke." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Kunne ikke kontakte Resend:", err);
    return NextResponse.json({ feil: "Kunne ikke sende meldingen." }, { status: 502 });
  }
}
