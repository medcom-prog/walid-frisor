import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Walid Frisør",
    short_name: "Walid Frisør",
    description: "Barbershop i Larvik. Fades, klassisk klipp og skjegg.",
    lang: "nb-NO",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#0B0B0C",
    theme_color: "#0B0B0C",
    icons: [
      { src: "/ikoner/walid-192.png", sizes: "192x192", type: "image/png" },
      { src: "/ikoner/walid-512.png", sizes: "512x512", type: "image/png" },
      { src: "/ikoner/walid-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
