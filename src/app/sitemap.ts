import type { MetadataRoute } from "next";
import { salong } from "@/lib/innhold";

const sider = [
  { sti: "/", prioritet: 1 },
  { sti: "/personvern", prioritet: 0.3 },
  { sti: "/vilkar", prioritet: 0.3 },
  { sti: "/informasjonskapsler", prioritet: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return sider.map(({ sti, prioritet }) => ({
    url: `${salong.domene}${sti}`,
    lastModified: new Date("2026-08-05"),
    changeFrequency: "monthly",
    priority: prioritet,
  }));
}
