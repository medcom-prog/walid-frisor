import type { Metadata } from "next";
import JuridiskSide, { Bolk, Liste } from "@/komponenter/JuridiskSide";
import { salong } from "@/lib/innhold";

export const metadata: Metadata = {
  title: "Personvern",
  description:
    "Hvordan Walid Frisør behandler personopplysninger fra kontaktskjema, booking og bruk av nettsiden.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/personvern" },
};

export default function Personvern() {
  return (
    <JuridiskSide
      merkelapp="Personvern"
      tittel="Personvernerklæring"
      ingress="Her står det hvilke opplysninger vi samler inn, hvorfor, hvor lenge vi beholder dem, og hvilke rettigheter du har."
      oppdatert="5. august 2026"
    >
      <Bolk tittel="Hvem er behandlingsansvarlig">
        <p>
          <strong>{salong.navn}</strong>, {salong.gate}, {salong.postnr} {salong.by}, er
          ansvarlig for personopplysningene som behandles gjennom denne nettsiden.
          Du når oss på {salong.epost} eller {salong.telefon}.
        </p>
      </Bolk>

      <Bolk tittel="Hva vi samler inn">
        <p>Vi samler bare inn det du selv gir oss, og det serveren trenger for å levere siden.</p>
        <Liste
          punkter={[
            <>
              <strong>Kontaktskjemaet:</strong> navn, e-postadresse, eventuelt telefonnummer,
              og innholdet i meldingen din.
            </>,
            <>
              <strong>Serverlogger:</strong> IP-adresse, tidspunkt og nettlesertype logges
              automatisk av leverandøren som drifter siden. Dette er nødvendig for drift
              og sikkerhet.
            </>,
          ]}
        />
        <p>
          Vi bruker ingen analyseverktøy, ingen sporing og ingen annonsenettverk. Nettsiden
          setter ingen informasjonskapsler. Se{" "}
          <a href="/informasjonskapsler">informasjonskapsler</a> for detaljer.
        </p>
      </Bolk>

      <Bolk tittel="Hvorfor vi behandler opplysningene">
        <Liste
          punkter={[
            <>
              <strong>For å svare deg.</strong> Sender du skjemaet, bruker vi opplysningene
              til å ta kontakt. Grunnlaget er berettiget interesse i å besvare henvendelser
              du selv har tatt initiativ til.
            </>,
            <>
              <strong>For å drifte nettsiden.</strong> Serverlogger behandles med grunnlag i
              berettiget interesse i sikker og stabil drift.
            </>,
          ]}
        />
      </Bolk>

      <Bolk tittel="Hvem som får se opplysningene">
        <p>
          Vi selger ikke opplysninger videre, og deler dem ikke til markedsføring. For å
          drifte nettsiden bruker vi noen leverandører som behandler data på våre vegne:
        </p>
        <Liste
          punkter={[
            <>
              <strong>Vercel</strong> drifter nettsiden og lagrer serverlogger.
            </>,
            <>
              <strong>Resend</strong> sender meldingen fra kontaktskjemaet videre som e-post.
            </>,
            <>
              <strong>Google</strong> leverer e-postkontoen meldingene havner i, og kartet –
              men kartet lastes først når du selv trykker på det.
            </>,
          ]}
        />
        <p>
          Booking skjer hos <strong>Setmore</strong>, som er en egen tjeneste med egen
          personvernerklæring. Bestiller du time der, er det Setmore som behandler
          opplysningene dine i bookingen.
        </p>
      </Bolk>

      <Bolk tittel="Hvor lenge vi beholder dem">
        <p>
          Meldinger fra kontaktskjemaet beholdes så lenge det er nødvendig for å følge opp
          henvendelsen, og ryddes bort når saken er avsluttet. Serverlogger slettes
          automatisk av leverandøren etter kort tid.
        </p>
      </Bolk>

      <Bolk tittel="Dine rettigheter">
        <p>Etter personvernforordningen har du rett til å</p>
        <Liste
          punkter={[
            "få innsyn i hvilke opplysninger vi har om deg",
            "få rettet opplysninger som er feil",
            "få slettet opplysninger vi ikke lenger trenger",
            "protestere mot behandlingen, eller be om at den begrenses",
          ]}
        />
        <p>
          Ta kontakt på {salong.epost}, så ordner vi det. Mener du at vi behandler
          opplysningene dine feil, kan du klage til{" "}
          <a href="https://www.datatilsynet.no" target="_blank" rel="noopener">
            Datatilsynet
          </a>
          .
        </p>
      </Bolk>

      <Bolk tittel="Endringer">
        <p>
          Endrer vi hvordan nettsiden behandler opplysninger, oppdaterer vi denne siden og
          datoen øverst.
        </p>
      </Bolk>
    </JuridiskSide>
  );
}
