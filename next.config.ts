import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    // WhatsApp template finquo_free_demo_marketing has button base URL "/pilot{{1}}",
    // so the suffix "claim-free-class" gets glued on. Fix the template base URL, then drop this.
    return [{ source: "/pilotclaim-free-class", destination: "/claim-free-class", permanent: false }];
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
