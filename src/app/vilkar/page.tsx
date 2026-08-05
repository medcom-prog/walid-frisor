import type { Metadata } from "next";
import JuridiskSide, { Bolk, Liste } from "@/komponenter/JuridiskSide";
import { salong } from "@/lib/innhold";

export const metadata: Metadata = {
  title: "Vilkår",
  description:
    "Vilkår for booking, avbestilling og manglende oppmøte hos Walid Frisør i Larvik.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/vilkar" },
};

export default function Vilkar() {
  return (
    <JuridiskSide
      merkelapp="Vilkår"
      tittel="Vilkår for time hos oss"
      ingress="Kort om hva som gjelder når du booker, endrer eller ikke møter opp til en time."
      oppdatert="5. august 2026"
    >
      <Bolk tittel="Booking">
        <p>
          Timer bestilles på bookingsiden vår, på telefon {salong.telefon}, eller ved å
          stikke innom. Du får en bekreftelse på e-post når timen er satt opp.
        </p>
        <p>
          Vi tar også drop-in når stolen er ledig, men da kan vi ikke garantere at det er
          plass.
        </p>
      </Bolk>

      <Bolk tittel="Påminnelser">
        <p>
          Har du booket på nett, sender vi to påminnelser på e-post: én dagen før, og én
          en time før timen starter. Begge har lenker for å endre eller avbestille.
        </p>
      </Bolk>

      <Bolk tittel="Avbestilling og endring">
        <p>
          Du kan endre eller avbestille timen inntil <strong>1 time</strong> før avtalt
          tid, enten via lenken i bekreftelsen eller ved å ringe oss.
        </p>
      </Bolk>

      <Bolk tittel="Manglende oppmøte">
        <p>
          Møter du ikke opp uten å gi beskjed, påløper et gebyr på{" "}
          <strong>100 kr</strong>. En uteblitt time er en time vi ikke kunne gitt til noen
          andre.
        </p>
        <p>
          Gi oss heller en beskjed – da finner vi et nytt tidspunkt, og det koster deg
          ingenting.
        </p>
      </Bolk>

      <Bolk tittel="Priser og betaling">
        <p>
          Prisene på nettsiden er veiledende, og oppgitt i norske kroner inkludert
          merverdiavgift. Betaling skjer i salongen. Tar en behandling vesentlig lengre tid
          enn normalt, sier vi fra om det før vi begynner.
        </p>
      </Bolk>

      <Bolk tittel="Er du ikke fornøyd">
        <p>
          Si fra med én gang, helst før du forlater salongen. Da retter vi opp i det. Er
          det noe vi ikke blir enige om, kan du bringe saken inn for{" "}
          <a href="https://www.forbrukertilsynet.no" target="_blank" rel="noopener">
            Forbrukertilsynet
          </a>
          .
        </p>
      </Bolk>

      <Bolk tittel="Kontaktskjemaet">
        <p>
          Skjemaet på kontaktsiden er ment for henvendelser som ikke passer i kalenderen –
          bryllup, konfirmasjon, større selskap eller samarbeid.
        </p>
        <Liste
          punkter={[
            "En melding gjennom skjemaet er ikke en bekreftet time.",
            "Vanlige klipp bør bookes i kalenderen, som går raskere for begge.",
          ]}
        />
      </Bolk>

      <Bolk tittel="Innholdet på siden">
        <p>
          Bildene på nettsiden viser arbeid gjort i salongen. Resultatet varierer med
          hårtype og hodeform, så et bilde er en illustrasjon og ikke en garanti for
          nøyaktig samme resultat.
        </p>
      </Bolk>
    </JuridiskSide>
  );
}
