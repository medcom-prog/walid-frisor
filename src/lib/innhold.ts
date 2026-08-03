/**
 * Alt redaksjonelt innhold ett sted, så teksten kan endres uten å røre komponentene.
 */

export const salong = {
  navn: 'Walid Frisør',
  by: 'Larvik',
  gate: 'Olavs gate 3',
  postnr: '3256',
  telefon: '45 85 74 00',
  telefonE164: '+4745857400',
  epost: 'walidfrisor12@gmail.com',
  booking: 'https://walidfrisor.setmore.com/',
  kart: 'https://maps.google.com/?q=Olavs+gate+3,+3256+Larvik',
  domene: 'https://xn--walidfrisr-8cb.no',
  barberer: 'Alan',
} as const;

/** Hentet fra Setmore 3. august 2026. Bør bekreftes mot faktiske tider. */
export const apningstider = [
  { dag: 'Mandag – onsdag', tid: '10–17' },
  { dag: 'Torsdag – søndag', tid: '08–17' },
] as const;

export type Tjeneste = {
  nr: string;
  navn: string;
  beskrivelse: string;
  pris: string;
  varighet: string;
  bilde: string;
  bredde: number;
  hoyde: number;
};

export const tjenester: Tjeneste[] = [
  {
    nr: '01',
    navn: 'Klassisk klipp',
    beskrivelse:
      'Graderes med saks for en mykere overgang. Gir håret volum og en form som vokser pent ut.',
    pris: '350',
    varighet: '30 min',
    bilde: '/bilder/classic-cut-900.webp',
    bredde: 900,
    hoyde: 1200,
  },
  {
    nr: '02',
    navn: 'Taper fade',
    beskrivelse:
      'Lengre på toppen, med en gradvis overgang ned mot sidene og nakken. Den mest forlatende faden.',
    pris: '350',
    varighet: '30 min',
    bilde: '/bilder/taper-fade-900.webp',
    bredde: 900,
    hoyde: 1259,
  },
  {
    nr: '03',
    navn: 'Skin fade',
    beskrivelse:
      'Skarp overgang fra bar hud opp til ønsket lengde. Krever presisjon – og jevnlig vedlikehold.',
    pris: '350',
    varighet: '30 min',
    bilde: '/bilder/skin-fade-900.webp',
    bredde: 900,
    hoyde: 1200,
  },
  {
    nr: '04',
    navn: 'Gradering',
    beskrivelse:
      'Håret klippes i ulike lengder med jevn overgang fra kort til langt. Ingen skarpe skiller.',
    pris: '350',
    varighet: '30 min',
    bilde: '/bilder/gradering-900.webp',
    bredde: 900,
    hoyde: 1200,
  },
  {
    nr: '05',
    navn: 'Skjeggtrim',
    beskrivelse:
      'Form, konturer og lengde tilpasset ansiktet. Avsluttes med barberkniv langs linjene.',
    pris: '150',
    varighet: '30 min',
    bilde: '/bilder/beard-trim-500.webp',
    bredde: 500,
    hoyde: 333,
  },
  {
    nr: '06',
    navn: 'Skreddersydd',
    beskrivelse:
      'Vet du ikke helt hva du vil ha? Vi ser på hårtype og hodeform, og finner ut av det sammen.',
    pris: 'Etter avtale',
    varighet: '30 min',
    bilde: '/bilder/hero-bg-900.webp',
    bredde: 900,
    hoyde: 1125,
  },
];

export type Anmeldelse = { navn: string; tekst: string; nar: string };

/** Ekte anmeldelser fra Setmore – 5,0 av 5 på 10 vurderinger. */
export const anmeldelser: Anmeldelse[] = [
  { navn: 'Asbjørn Johannessen', nar: 'I forgårs', tekst: 'Meget effektiv, dyktig, nøyaktig og trivelig!!!! anbefales' },
  { navn: 'Patrick Strand Larsen', nar: 'Forrige måned', tekst: 'Dette er den beste klippen jeg noensinne har hatt. Alan er utrolig hyggelig og flink til å stille spørsmål. Anbefaler ham på det sterkeste 👌' },
  { navn: 'Samir Moutacim', nar: 'For 6 måneder siden', tekst: 'Beste faden i byen! Anbefales på det sterkeste 🤝' },
  { navn: 'Javier LLorens', nar: 'For 4 måneder siden', tekst: 'Veldig profesjonell service, rimelige priser og svært god kundebehandling. Jeg ser alltid yngre ut når jeg går derfra 😉 Anbefales!' },
  { navn: 'Sander Hobæk Larsen', nar: 'For 3 måneder siden', tekst: 'Hyggelig og syke skills, ble akkurat sånn jeg ville ha det. Anbefales 💯' },
  { navn: 'Jeanette Jensen', nar: 'For 3 måneder siden', tekst: 'Super service når jeg hadde rota med bestillingen! Rett og slett drit bra ifølge sønnen min som klipte seg. Han kommer garantert igjen! 👍' },
  { navn: 'Mohammad', nar: 'For 5 måneder siden', tekst: 'Den beste i hele Vestfold og Norge' },
  { navn: 'Esben Gisle', nar: 'For 4 måneder siden', tekst: 'Rask og hyggelig, til en rimelig pris' },
  { navn: 'Zelim', nar: 'Forrige måned', tekst: '5 stjerner fordi han liker Minecraft 👍 og gjør meg vakker' },
  { navn: 'Hassan Ayoub', nar: 'For 5 måneder siden', tekst: 'Numero uno' },
];

export const navigasjon = [
  { href: '#tjenester', tekst: 'Tjenester' },
  { href: '#anmeldelser', tekst: 'Omtaler' },
  { href: '#book', tekst: 'Book time' },
  { href: '#kontakt', tekst: 'Kontakt' },
] as const;
