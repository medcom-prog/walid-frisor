import type { MetadataRoute } from "next";
import { salong } from "@/lib/innhold";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${salong.domene}/sitemap.xml`,
  };
}
