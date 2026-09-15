import { MetadataRoute } from "next";
import { BASE_URL } from "./robots";

/**
 * Every public page, on the apex domain. Deliberately absent:
 * /home (renders the same component as "/", so listing both is duplicate
 * content), /admin/*, /under-construction, and /demo-class/[leadId], which is
 * one family's booking and must never be indexed.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  const pages: Array<{
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }> = [
    { path: "", changeFrequency: "weekly", priority: 1.0 },
    { path: "/pilot", changeFrequency: "daily", priority: 0.9 },
    { path: "/claim-free-class", changeFrequency: "weekly", priority: 0.9 },
    { path: "/curriculum", changeFrequency: "weekly", priority: 0.8 },
    { path: "/confirm-your-seat", changeFrequency: "weekly", priority: 0.7 },
    { path: "/teachers", changeFrequency: "monthly", priority: 0.7 },
    { path: "/about-us", changeFrequency: "monthly", priority: 0.7 },
    { path: "/demo-class", changeFrequency: "weekly", priority: 0.6 },
    { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
  ];

  return pages.map(({ path, changeFrequency, priority }) => ({
    url: `${BASE_URL}${path}`,
    lastModified: currentDate,
    changeFrequency,
    priority,
  }));
}
