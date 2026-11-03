import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://dummy-tickets-nextjs.vercel.app"; // APNA DOMAIN DAALEIN

  const routes = [
    "",
    "/about",
    "/contact",
    "/faq",
    "/flight-reservation",
    "/onward-ticket",
    "/flight-itinerary",
    "/dummy-ticket-sample",
    "/terms",
    "/privacy-policy",
    "/refund-policy",
    "/blog",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  return [...routes];
}
