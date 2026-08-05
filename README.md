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
npm run dev
```

Prosjektet trenger **ingen miljøvariabler**.

## Kontaktskjema

Skjemaet sendes til **Formspree**. Endepunktet ligger som `formspreeEndepunkt`
i [`src/lib/innhold.ts`](src/lib/innhold.ts).

Det er offentlig av design — det står i klientkoden uansett og gir ingen
tilgang til noe. Derfor ligger det i koden og ikke som en miljøvariabel:
da kan det ikke bli glemt i Vercel og gjøre skjemaet dødt ubemerket.

Står feltet tomt, viser siden e-post og telefon i stedet for et skjema som
later som det virker.

Feltnavnene som sendes: `navn`, `epost`, `telefon`, `melding`. I tillegg
`_subject` for emnefeltet og `_gotcha` som Formspree sin egen honningkrukke
mot bot-spam.

## Innhold

Alt redaksjonelt innhold ligger i [`src/lib/innhold.ts`](src/lib/innhold.ts) —
tjenester, priser, åpningstider, kontaktinfo og anmeldelser. Tekst kan endres
der uten å røre komponentene.

Åpningstidene er salongens faktiske tider, oppgitt av Walid. De er ikke de
samme som tidene i Setmore, som kun styrer hvilke tider som kan bookes på nett.

## Personvern

Siden setter ingen informasjonskapsler og lagrer ingenting i nettleseren.
Google-kartet lastes først når besøkende trykker på det, så ingen data går
til tredjepart uten at brukeren ber om det. Endres dette — for eksempel ved
å legge til besøksstatistikk — må `/informasjonskapsler` oppdateres, og da
trengs sannsynligvis en ekte samtykkeløsning.

## Struktur

```
src/
├── app/
│   ├── layout.tsx             Fonter, metadata, schema.org
│   ├── page.tsx               Setter sammen seksjonene
│   ├── personvern/            Juridiske sider
│   ├── vilkar/
│   ├── informasjonskapsler/
│   ├── manifest.ts            PWA-manifest
│   ├── robots.ts / sitemap.ts
│   └── globals.css            Designtokens og hjelpeklasser
├── komponenter/               Én fil per seksjon
└── lib/innhold.ts             Alt innhold
```

## Bilder

Ligger ferdig skalert i `public/bilder/` som WebP. `next/image` tar seg av
resten. Originalene i full oppløsning ligger i det gamle repoet.
