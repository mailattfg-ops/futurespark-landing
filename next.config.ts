import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets a verification build run into its own folder (NEXT_DIST_DIR=.next-verify next build)
  // instead of wiping the .next a running dev server is serving from.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    // WhatsApp template finquo_free_demo_marketing has button base URL "/pilot{{1}}",
    // so the suffix "claim-free-class" gets glued on. Fix the template base URL, then drop this.
    return [{ source: "/pilotclaim-free-class", destination: "/claim-free-class", permanent: false }];
  },
  async rewrites() {
    // Short, shareable brand-asset URLs. The artwork letters the name in white,
    // so /logo bakes in the brand navy ground it is designed for — otherwise
    // the name vanishes wherever a viewer paints transparency light (Chrome,
    // Google results, Docs). The untouched transparent file stays at /logo-transparent.
    return [
      { source: "/logo", destination: "/finquo-logo-brand.png" },
      { source: "/logo.png", destination: "/finquo-logo-brand.png" },
      { source: "/logo-transparent", destination: "/finquo-logo-full.png" },
      { source: "/logo-transparent.png", destination: "/finquo-logo-full.png" },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
