import type { MetadataRoute } from "next";
import { salong } from "@/lib/innhold";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${salong.domene}/`,
      lastModified: new Date("2026-08-03"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
