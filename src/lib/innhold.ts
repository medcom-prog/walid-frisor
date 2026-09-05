/**
 * Alt redaksjonelt innhold ett sted.
 * Teksten er hentet ordrett fra walidfrisør.no slik den står i dag.
 */

export const salong = {
  navn: "Walid Frisør",
  by: "Larvik",
  /** Gata heter "Olavs gate" i to ord, slik den også står i Setmore. */
  gate: "Olavs gate 3",
  postnr: "3256",
  telefon: "+47 45 85 74 00",
  telefonE164: "+4745857400",
  epost: "walidfrisor12@gmail.com",
  booking: "https://walidfrisor.setmore.com/",
  domene: "https://xn--walidfrisr-8cb.no",
} as const;

/**
 * Kartet søker på bedriftsnavnet slik det står registrert i Google
 * Business Profile, ikke bare på adressen. Da åpner kartet selve
 * profilen – med bilde, vurdering, åpningstider og veibeskrivelse –
 * i stedet for en anonym pin på et gatenummer.
 *
 * Adressen tas med i søket for å gjøre treffet entydig.
 */
export const googleBedrift = "Walid Frisør avd. Alan";
export const kartSok = `${googleBedrift}, ${salong.gate}, ${salong.postnr} ${salong.by}`;
export const kartLenke = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(kartSok)}`;
export const kartEmbed = `https://www.google.com/maps?q=${encodeURIComponent(kartSok)}&output=embed`;

/**
 * Kontaktskjemaet sendes til Formspree.
 *
 * Endepunktet er offentlig av design – det ligger i klientkoden uansett,
 * og gir ingen tilgang til noe. Derfor står det her og ikke som en
 * miljøvariabel: da kan det ikke bli glemt i Vercel og gjøre skjemaet
 * dødt uten at noen merker det.
 *
 * Hent det i Formspree under Forms → det aktuelle skjemaet → Integration.
 * Formatet er https://formspree.io/f/xxxxxxxx
 */
export const formspreeEndepunkt = "https://formspree.io/f/mjkoqgvn";

export const meta = {
  tittel: "Walid Frisør – Klipp, fade & barbering i Larvik",
  beskrivelse:
    "Walid Frisør i Larvik tilbyr klassisk herreklipp, moderne fades, skjegg/linjer og barbering. Enkelt å booke time – kvalitet uten kompromiss.",
} as const;

/** "Book" er utelatt med vilje – knappen "Book time her" dekker det. */
export const navigasjon = [
  { href: "#hjem", tekst: "Hjem" },
  { href: "#om-oss", tekst: "Om oss" },
  { href: "#tjenester", tekst: "Tjenester" },
  { href: "#priser", tekst: "Priser" },
  { href: "#anmeldelser", tekst: "Omtaler" },
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
  beskrivelse:
    "Booket time er satt av til deg alene. Drop-in tar vi når stolen er ledig, til lavere pris.",
  kort: [
    {
      navn: "Klassisk klipp",
      beskrivelse:
        "Klipp som graderes med saks, gir en mykere look på graderingen, og gir håret bedre volum.",
      pris: "kr 450",
      prisDropIn: "kr 350",
      bilde: "/bilder/klassisk-klipp-900.webp",
      bredde: 900,
      hoyde: 1200,
    },
    {
      navn: "Taper fade",
      beskrivelse:
        "Klipp som gir en god look, som varer. For deg som vil ha lengre hår på toppen, men samtidig få en fin overgang til kortere hår på sidene og nakken.",
      pris: "kr 450",
      prisDropIn: "kr 350",
      bilde: "/bilder/taper-fade-900.webp",
      bredde: 900,
      hoyde: 1259,
    },
    {
      navn: "Skin fade",
      beskrivelse:
        "Klipp som gir en skarp overgang fra huden, til den ønskede lengden på toppen. Tydelig og skarp overgang mellom kort og langt hår.",
      pris: "kr 450",
      prisDropIn: "kr 350",
      bilde: "/bilder/skin-fade-900.webp",
      bredde: 900,
      hoyde: 1200,
    },
    {
      navn: "Gradering",
      beskrivelse:
        "Håret klippes i ulike lengder. Overgangen er gradvis, fra kort til langt. Ingen skarpe overganger, alt ser jevnt ut.",
      pris: "kr 450",
      prisDropIn: "kr 350",
      bilde: "/bilder/gradering-900.webp",
      bredde: 900,
      hoyde: 1200,
    },
    {
      navn: "Skjegg trim",
      beskrivelse: "Trimming og styling av skjegg tilpasset ønsket stil og lengde.",
      pris: "fra kr 150",
      prisDropIn: null as string | null,
      bilde: "/bilder/beard-trim-500.webp",
      bredde: 500,
      hoyde: 333,
    },
    {
      navn: "Skreddersydd klipp",
      beskrivelse: "Fortell oss hva du ønsker – vi tilpasser klipp og finish til din stil.",
      pris: "Pris etter avtale",
      prisDropIn: null,
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
  apningstidLinje: "Man–ons 10–18 · Tor–fre 10–19 · Lør 10–18 · Søndag stengt.",
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
      href: kartLenke,
      notis: "Sentralt i Larvik",
      ekstern: true,
    },
  ],
  skjema: {
    /** Vanlig klipp bookes i kalenderen. Skjemaet er for alt annet. */
    tittel: "Noe utenom vanlig time?",
    ingress:
      "Skal du bare klippe deg, book time direkte – det går raskest. Skjemaet her er for det som ikke passer inn i kalenderen: klipp til bryllup eller konfirmasjon, større selskap, avtaler for bedrifter eller andre samarbeid.",
    navn: "Navn *",
    epost: "E-post *",
    telefon: "Telefon",
    melding: "Melding *",
    meldingPlassholder:
      "Fortell kort hva det gjelder – anledning, hvor mange dere er, og omtrent når.",
    send: "Send melding",
  },
} as const;

export type Anmeldelse = { navn: string; nar: string; tekst: string };

/** Ekte omtaler fra bookingsiden på Setmore. 5,0 av 5 på 10 vurderinger. */
export const anmeldelser = {
  merkelapp: "Anmeldelser",
  tittel: "Det kundene sier",
  beskrivelse: "Hentet fra bookingsiden vår. Ingen av dem er redigert.",
  snitt: "5,0",
  antall: 10,
  liste: [
    { navn: "Asbjørn Johannessen", nar: "I forgårs", tekst: "Meget effektiv, dyktig, nøyaktig og trivelig!!!! anbefales" },
    { navn: "Patrick Strand Larsen", nar: "Forrige måned", tekst: "Dette er den beste klippen jeg noensinne har hatt. Alan er utrolig hyggelig og flink til å stille spørsmål. Anbefaler ham på det sterkeste 👌" },
    { navn: "Zelim", nar: "Forrige måned", tekst: "5 stjerner fordi han liker Minecraft 👍 og gjør meg vakker" },
    { navn: "Jeanette Jensen", nar: "For 3 måneder siden", tekst: "Super service når jeg hadde rota med bestillingen! Rett og slett drit bra ifølge sønnen min som klipte seg. Han kommer garantert igjen! 👍" },
    { navn: "Sander Hobæk Larsen", nar: "For 3 måneder siden", tekst: "Hyggelig og syke skills, ble akkurat sånn jeg ville ha det. Anbefales 💯" },
    { navn: "Javier LLorens", nar: "For 4 måneder siden", tekst: "Veldig profesjonell service, rimelige priser og svært god kundebehandling. Jeg ser alltid yngre ut når jeg går derfra 😉 Anbefales!" },
    { navn: "Esben Gisle", nar: "For 4 måneder siden", tekst: "Rask og hyggelig, til en rimelig pris" },
    { navn: "Mohammad", nar: "For 5 måneder siden", tekst: "Den beste i hele Vestfold og Norge" },
    { navn: "Hassan Ayoub", nar: "For 5 måneder siden", tekst: "Numero uno" },
    { navn: "Samir Moutacim", nar: "For 6 måneder siden", tekst: "Beste faden i byen! Anbefales på det sterkeste 🤝" },
  ] as Anmeldelse[],
} as const;

/**
 * Salongens faktiske åpningstider, oppgitt av Walid.
 *
 * Merk at dette ikke er det samme som tidene i Setmore – de styrer kun
 * hvilke tider som kan bookes på nett, og skal ikke endres etter denne.
 */
export const apningstider = [
  { dag: "Mandag", tid: "10–18", stengt: false },
  { dag: "Tirsdag", tid: "10–18", stengt: false },
  { dag: "Onsdag", tid: "10–18", stengt: false },
  { dag: "Torsdag", tid: "10–19", stengt: false },
  { dag: "Fredag", tid: "10–19", stengt: false },
  { dag: "Lørdag", tid: "10–18", stengt: false },
  { dag: "Søndag", tid: "Stengt", stengt: true },
] as const;

/** Kortform til steder med lite plass. */
export const apningstiderKort = [
  { dag: "Man–ons", tid: "10–18" },
  { dag: "Tor–fre", tid: "10–19" },
  { dag: "Lørdag", tid: "10–18" },
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
  juridisk: [
    { tekst: "Personvern", href: "/personvern" },
    { tekst: "Vilkår", href: "/vilkar" },
    { tekst: "Informasjonskapsler", href: "/informasjonskapsler" },
  ],
} as const;
