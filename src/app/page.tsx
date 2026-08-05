import Header from "@/komponenter/Header";
import Hero from "@/komponenter/Hero";
import OmOss from "@/komponenter/OmOss";
import Tjenester from "@/komponenter/Tjenester";
import Priser from "@/komponenter/Priser";
import Anmeldelser from "@/komponenter/Anmeldelser";
import Booking from "@/komponenter/Booking";
import Kontakt from "@/komponenter/Kontakt";
import Footer from "@/komponenter/Footer";

export default function Forside() {
  return (
    <>
      <a
        href="#hovedinnhold"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-paper focus:px-4 focus:py-3 focus:text-void"
      >
        Hopp til innhold
      </a>

      <Header />

      <main id="hovedinnhold">
        <Hero />
        <OmOss />
        <Tjenester />
        <Priser />
        <Anmeldelser />
        <Booking />
        <Kontakt />
      </main>

      <Footer />
    </>
  );
}
