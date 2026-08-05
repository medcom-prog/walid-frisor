import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { salong, meta, priser } from "@/lib/innhold";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const plex = IBM_Plex_Sans({
  variable: "--font-plex",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(salong.domene),
  title: {
    default: meta.tittel,
    template: "%s · Walid Frisør",
  },
  description: meta.beskrivelse,
  keywords: ["frisør Larvik", "barbershop Larvik", "skin fade", "herreklipp", "skjeggtrim"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "nb_NO",
    url: salong.domene,
    siteName: salong.navn,
    title: meta.tittel,
    description: meta.beskrivelse,
    images: [{ url: "/walid-og-1200x630.jpg", width: 1200, height: 630, alt: salong.navn }],
  },
  twitter: {
    card: "summary_large_image",
    title: meta.tittel,
    description: meta.beskrivelse,
    images: ["/walid-og-1200x630.jpg"],
  },
  icons: {
    icon: "/ikoner/favicon.ico",
    apple: "/ikoner/walid-180.png",
  },
  manifest: "/manifest.webmanifest",
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0B0B0C",
  colorScheme: "dark",
};

/** Strukturerte data slik at Google kan vise åpningstider, priser og bookinglenke. */
function StrukturerteData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    name: salong.navn,
    url: salong.domene,
    image: `${salong.domene}/walid-og-1200x630.jpg`,
    telephone: salong.telefonE164,
    email: salong.epost,
    priceRange: "kr 150 – kr 350",
    currenciesAccepted: "NOK",
    address: {
      "@type": "PostalAddress",
      streetAddress: salong.gate,
      addressLocality: salong.by,
      postalCode: salong.postnr,
      addressRegion: "Vestfold",
      addressCountry: "NO",
    },
    hasMap: salong.kart,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "10:00",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "10:00",
        closes: "16:00",
      },
    ],
    makesOffer: priser.kort
      .filter((k) => /^kr|^fra kr/.test(k.pris))
      .map((k) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: k.navn },
        price: k.pris.replace(/[^0-9]/g, ""),
        priceCurrency: "NOK",
      })),
    potentialAction: {
      "@type": "ReserveAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: salong.booking,
        inLanguage: "nb-NO",
        actionPlatform: [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform",
        ],
      },
      result: { "@type": "Reservation", name: "Frisørtime" },
    },
  };

  return (
    <script
      type="application/ld+json"
      // Innholdet er vår egen statiske konstant, ikke brukerdata.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="nb"
      className={`${bricolage.variable} ${plex.variable} ${plexMono.variable} h-full`}
    >
      <head>
        {/* Uten JavaScript kjører aldri avsløringen – da skal alt vises med én gang */}
        <noscript>
          <style>{`.avslor{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
      </head>
      <body className="min-h-full">
        {children}
        <StrukturerteData />
      </body>
    </html>
  );
}
