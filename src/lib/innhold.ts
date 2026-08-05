/**
 * Alt redaksjonelt innhold ett sted.
 * Teksten er hentet ordrett fra walidfrisør.no slik den står i dag.
 */

export const salong = {
  navn: "Walid Frisør",
  by: "Larvik",
  gate: "Olavsgate 3",
  postnr: "3256",
  telefon: "+47 45 85 74 00",
  telefonE164: "+4745857400",
  epost: "walidfrisor12@gmail.com",
  booking: "https://walidfrisor.setmore.com/",
  kart: "https://maps.google.com/?q=Olavsgate+3,+3256+Larvik",
  domene: "https://xn--walidfrisr-8cb.no",
} as const;

export const meta = {
  tittel: "Walid Frisør – Klipp, fade & barbering i Larvik",
  beskrivelse:
    "Walid Frisør i Larvik tilbyr klassisk herreklipp, moderne fades, skjegg/linjer og barbering. Enkelt å booke time – kvalitet uten kompromiss.",
} as const;

export const navigasjon = [
  { href: "#hjem", tekst: "Hjem" },
  { href: "#om-oss", tekst: "Om oss" },
  { href: "#tjenester", tekst: "Tjenester" },
  { href: "#priser", tekst: "Priser" },
  { href: "#book", tekst: "Book" },
  { href: "#kontakt", tekst: "Kontakt" },
] as const;

export const hero = {
  tittel: "Alltid velkommen hos Walid Frisør",
  undertittel: "- med eller uten avtale",
  beskrivelse:
    "Klassisk herreklipp, moderne fades, presis skjeggforming og barbering. Hos Walid Frisør i Larvik handler alt om detaljer – og at du går ut døren med selvtillit.",
  knapper: { book: "Book time", priser: "Se priser" },
  tall: [
    { til: 10, suffiks: "+", desimaler: 0, merke: "År erfaring" },
    { til: 4.9, suffiks: "", desimaler: 1, merke: "Kundetilfredshet" },
    { til: 1000, suffiks: "+", desimaler: 0, merke: "Fornøyde kunder" },
  ],
} as const;

export const omOss = {
  merkelapp: "Om Walid Frisør",
  tittel: "Klassisk håndverk i moderne stil",
  avsnitt: [
    "Vi tror på kvalitet, presisjon og god service. Enten du vil ha en klassisk klipp, skin fade eller skjeggform – vi tar oss tid til detaljene.",
    "Book time på nett, ring oss eller kom innom. Vi gir deg ærlig rådgivning og en frisyre som passer deg – hver dag.",
  ],
  punkter: [
    { tittel: "Presis klipp", tekst: "Fra klassisk til moderne – alltid rene linjer" },
    { tittel: "Barbering", tekst: "Varme håndklær og skarp finish" },
    { tittel: "Kundefokus", tekst: "Ryddig, ærlig og profesjonelt – alltid" },
  ],
} as const;

export const tjenester = {
  merkelapp: "Tjenester",
  tittel: "Alt du trenger – i en stol",
  beskrivelse:
    "Klipp, fades, skjegg, barbering og styling. Vi tilbyr også maskinklipp, barneklipp og farging/toning.",
  kort: [
    {
      navn: "Herreklipp",
      beskrivelse: "Klassisk eller moderne – vi tilpasser etter hår og hodeform.",
      punkter: ["Vask & styling inkludert", "Konsultasjon før klipp", "Produkttips for din frisyre"],
      fremhevet: false,
      merke: null as string | null,
    },
    {
      navn: "Skin fade & taper",
      beskrivelse: "Skarpe overganger, rene linjer og nøyaktig finish.",
      punkter: ["Maskin & saks", "Linjer & konturer", "Valgfri styling"],
      fremhevet: true,
      merke: "Mest populær",
    },
    {
      navn: "Skjegg & barbering",
      beskrivelse: "Form, konturer og klassisk barbering med varme håndklær.",
      punkter: ["Skjeggform & linjer", "Barberkniv/blad", "Aftercare & tips"],
      fremhevet: false,
      merke: null,
    },
  ],
} as const;

export const priser = {
  merkelapp: "Priser",
  tittel: "Rettferdige priser – tydelig oppsett",
  beskrivelse: "Eksempler – oppdater med dine faktiske priser og bilder.",
  kort: [
    {
      navn: "Klassisk klipp",
      beskrivelse:
        "Klipp som graderes med saks, gir en mykere look på graderingen, og gir håret bedre volum.",
      pris: "kr 350",
      bilde: "/bilder/classic-cut-900.webp",
      bredde: 900,
      hoyde: 1200,
    },
    {
      navn: "Taper fade",
      beskrivelse:
        "Klipp som gir en god look, som varer. For deg som vil ha lengre hår på toppen, men samtidig få en fin overgang til kortere hår på sidene og nakken.",
      pris: "kr 350",
      bilde: "/bilder/taper-fade-900.webp",
      bredde: 900,
      hoyde: 1259,
    },
    {
      navn: "Skin fade",
      beskrivelse:
        "Klipp som gir en skarp overgang fra huden, til den ønskede lengden på toppen. Tydelig og skarp overgang mellom kort og langt hår.",
      pris: "kr 350",
      bilde: "/bilder/skin-fade-900.webp",
      bredde: 900,
      hoyde: 1200,
    },
    {
      navn: "Gradering",
      beskrivelse:
        "Håret klippes i ulike lengder. Overgangen er gradvis, fra kort til langt. Ingen skarpe overganger, alt ser jevnt ut.",
      pris: "kr 350",
      bilde: "/bilder/gradering-900.webp",
      bredde: 900,
      hoyde: 1200,
    },
    {
      navn: "Skjegg trim",
      beskrivelse: "Trimming og styling av skjegg tilpasset ønsket stil og lengde.",
      pris: "fra kr 150",
      bilde: "/bilder/beard-trim-500.webp",
      bredde: 500,
      hoyde: 333,
    },
    {
      navn: "Skreddersydd klipp",
      beskrivelse: "Fortell oss hva du ønsker – vi tilpasser klipp og finish til din stil.",
      pris: "Pris etter avtale",
      bilde: "/bilder/hero-bg-900.webp",
      bredde: 900,
      hoyde: 1125,
    },
  ],
} as const;

export const booking = {
  merkelapp: "Book time",
  tittel: "Se ledige tider og book",
  beskrivelse: "Kalenderen vises under. Hvis den ikke lastes, åpne booking i ny fane.",
  fallbackKnapp: "Åpne booking i ny fane",
  notis:
    "Trenger du klipp etter kl. 17? Vi tar ofte drop-in til ca. 18–19 ved kapasitet. Ring for rask avklaring.",
} as const;

export const kontakt = {
  merkelapp: "Kontakt oss",
  tittel: "Finn veien til oss",
  apningstidLinje: "Åpningstider (eksempel): Man–fre 10–19 · Lør 10–16 · Søn stengt.",
  kort: [
    {
      tittel: "Ring oss",
      verdi: salong.telefon,
      href: `tel:${salong.telefonE164}`,
      notis: "Telefon besvares også etter bookingstid ved kapasitet",
      ekstern: false,
    },
    {
      tittel: "E-post",
      verdi: salong.epost,
      href: `mailto:${salong.epost}`,
      notis: null as string | null,
      ekstern: false,
    },
    {
      tittel: "Besøk oss",
      verdi: `${salong.gate}, ${salong.postnr} ${salong.by}`,
      href: salong.kart,
      notis: "Sentralt i Larvik",
      ekstern: true,
    },
  ],
  skjema: {
    navn: "Navn *",
    epost: "E-post *",
    telefon: "Telefon",
    tjeneste: "Tjeneste",
    tjenesteValg: ["Velg tjeneste", "Herreklipp", "Skin fade", "Skjegg & barbering", "Annet"],
    melding: "Melding *",
    meldingPlassholder: "Når passer det, og hva ønsker du?",
    send: "Send melding",
  },
} as const;

export const apningstider = [
  { dag: "Man–fre", tid: "10–19" },
  { dag: "Lørdag", tid: "10–16" },
  { dag: "Søndag", tid: "Stengt" },
] as const;

export const footer = {
  beskrivelse: "Kvalitet, presisjon og god service – hver gang.",
  tjenester: ["Herreklipp", "Skin fade", "Skjegg & barbering"],
  sider: [
    { tekst: "Book time her", href: "#book" },
    { tekst: "Priser", href: "#priser" },
    { tekst: "Kontakt", href: "#kontakt" },
  ],
  kreditt: "Denne nettsiden er utviklet i samarbeid med",
  rettigheter: "Walid Frisør. Alle rettigheter reservert.",
  juridisk: ["Personvern", "Vilkår", "Cookies"],
} as const;
