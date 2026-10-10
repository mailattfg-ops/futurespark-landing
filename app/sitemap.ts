import { MetadataRoute } from "next";
import { BASE_URL } from "./robots";

/**
 * The 8 live pages, on the apex domain (change brief F7). /home renders
 * the same component as "/", so it is not listed; /admin and /api are private.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  const pages: Array<{
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }> = [
    { path: "", changeFrequency: "weekly", priority: 1.0 },
    { path: "/curriculum", changeFrequency: "weekly", priority: 0.8 },
    { path: "/mentors", changeFrequency: "monthly", priority: 0.7 },
    { path: "/about-us", changeFrequency: "monthly", priority: 0.7 },
    { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
    { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
    { path: "/refund-policy", changeFrequency: "yearly", priority: 0.3 },
    { path: "/shipping-policy", changeFrequency: "yearly", priority: 0.3 },
  ];

  return pages.map(({ path, changeFrequency, priority }) => ({
    url: `${BASE_URL}${path}`,
    lastModified: currentDate,
    changeFrequency,
    priority,
  }));
}
