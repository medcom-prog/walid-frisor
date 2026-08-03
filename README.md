# Walid Frisør

Nettsted for Walid Frisør, barbershop i Olavs gate 3, Larvik.

## Stack

- Next.js 16 (App Router) + React 19
- Tailwind CSS 4
- TypeScript
- Deploy på Vercel

## Kom i gang

```bash
npm install
cp .env.example .env.local   # fyll inn RESEND_API_KEY
npm run dev
```

## Miljøvariabler

| Variabel | Påkrevd | Beskrivelse |
|---|---|---|
| `RESEND_API_KEY` | Ja | API-nøkkel fra Resend. Uten den svarer kontaktskjemaet 500. |
| `KONTAKT_TIL` | Nei | Mottaker for skjemaet. Standard: `walidfrisor12@gmail.com` |
| `KONTAKT_FRA` | Nei | Avsender. Må ligge på et domene som er verifisert i Resend. |

Settes i Vercel under **Settings → Environment Variables**.

## Innhold

Alt redaksjonelt innhold ligger i [`src/lib/innhold.ts`](src/lib/innhold.ts) —
tjenester, priser, åpningstider, kontaktinfo og anmeldelser. Tekst kan endres
der uten å røre komponentene.

Åpningstidene er hentet fra Setmore 3. august 2026 og bør bekreftes mot
faktiske tider før de står lenge.

## Struktur

```
src/
├── app/
│   ├── api/kontakt/route.ts   Tar imot skjemaet, sender via Resend
│   ├── layout.tsx             Fonter, metadata, schema.org
│   ├── page.tsx               Setter sammen seksjonene
│   ├── manifest.ts            PWA-manifest
│   ├── robots.ts / sitemap.ts
│   └── globals.css            Designtokens og hjelpeklasser
├── komponenter/               Én fil per seksjon
└── lib/innhold.ts             Alt innhold
```

## Bilder

Ligger ferdig skalert i `public/bilder/` som WebP. `next/image` tar seg av
resten. Originalene i full oppløsning ligger i det gamle repoet.
