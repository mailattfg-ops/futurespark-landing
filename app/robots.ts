import { MetadataRoute } from "next";

/**
 * The site answers on the apex now — junior.finquo.ai 308s here — so every
 * crawler-facing URL must name finquo.ai, or Google keeps the old host in
 * the index and follows a redirect on every fetch.
 */
export const BASE_URL = "https://finquo.ai";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/under-construction"],
      },
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "PerplexityBot",
          "ClaudeBot",
          "Claude-Web",
          "Google-Extended",
          "Applebot-Extended",
          "CCBot",
          "ByteSpider",
        ],
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
