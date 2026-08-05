import type { Metadata } from "next";
import JuridiskSide, { Bolk, Liste } from "@/komponenter/JuridiskSide";

export const metadata: Metadata = {
  title: "Informasjonskapsler",
  description:
    "Walid Frisør sin nettside setter ingen informasjonskapsler. Her står det hva det innebærer, og hva som skjer når du åpner kartet.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/informasjonskapsler" },
};

export default function Informasjonskapsler() {
  return (
    <JuridiskSide
      merkelapp="Informasjonskapsler"
      tittel="Informasjonskapsler"
      ingress="Kort fortalt: denne nettsiden setter ingen. Derfor finnes det heller ingen samtykkeboks du må klikke bort."
      oppdatert="5. august 2026"
    >
      <Bolk tittel="Vi setter ingen">
        <p>
          Nettsiden bruker ingen informasjonskapsler, og lagrer ingenting i nettleseren din
          – verken <em>localStorage</em> eller <em>sessionStorage</em>. Vi har ingen
          analyseverktøy, ingen besøksstatistikk og ingen annonsesporing.
        </p>
        <p>
          Skriftene lastes fra vår egen server, ikke fra Google Fonts. Det betyr at ingen
          data om deg går til Google bare fordi du åpner siden.
        </p>
      </Bolk>

      <Bolk tittel="Unntaket: kartet">
        <p>
          Kartet på kontaktsiden kommer fra Google Maps. Google setter sine egne
          informasjonskapsler og mottar IP-adressen din når kartet lastes.
        </p>
        <p>
          Derfor laster vi det <strong>ikke</strong> automatisk. Du ser en grå flate med
          knappen «Vis kart», og først når du trykker på den, kontaktes Google. Velger du
          å la være, sendes ingenting.
        </p>
        <p>
          Vil du se hvor vi ligger uten å laste kartet inn på siden, kan du åpne adressen
          direkte i Google Maps i en egen fane i stedet.
        </p>
      </Bolk>

      <Bolk tittel="Når du går videre til booking">
        <p>
          Trykker du «Book time», sendes du til bookingsiden vår hos Setmore. Det er en
          annen tjeneste på et annet domene, og de bruker informasjonskapsler for å få
          bookingen til å fungere.
        </p>
        <Liste
          punkter={[
            "Setmore har sin egen erklæring om informasjonskapsler, som gjelder når du er der.",
            "Vi har ingen kontroll over hva Setmore lagrer i nettleseren din.",
          ]}
        />
      </Bolk>

      <Bolk tittel="Serverlogger">
        <p>
          Nettsiden driftes hos Vercel, som logger IP-adresse, tidspunkt og nettlesertype
          for hver forespørsel. Dette er ikke informasjonskapsler, men det er data om deg.
          Det brukes til drift og sikkerhet, og slettes automatisk etter kort tid. Se{" "}
          <a href="/personvern">personvernerklæringen</a> for mer om dette.
        </p>
      </Bolk>
    </JuridiskSide>
  );
}
