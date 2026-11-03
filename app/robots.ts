import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: "https://dummy-tickets-nextjs.vercel.app/sitemap.xml", // APNA DOMAIN DAALEIN
  };
}
