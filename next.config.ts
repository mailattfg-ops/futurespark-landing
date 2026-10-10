import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets a verification build run into its own folder (NEXT_DIST_DIR=.next-verify next build)
  // instead of wiping the .next a running dev server is serving from.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    // Every demo booking happens on demo.finquo.ai; the forms this site used
    // to host are gone (change brief F6). /teachers became /mentors.
    const demo = "https://demo.finquo.ai/";
    return [
      { source: "/pilot", destination: demo, permanent: true },
      { source: "/pilot/:path*", destination: demo, permanent: true },
      // The WhatsApp template finquo_free_demo_marketing glues "claim-free-class" onto "/pilot".
      { source: "/pilotclaim-free-class", destination: demo, permanent: true },
      { source: "/confirm-your-seat", destination: demo, permanent: true },
      { source: "/claim-free-class", destination: demo, permanent: true },
      { source: "/demo-class", destination: demo, permanent: true },
      { source: "/demo-class/:path*", destination: demo, permanent: true },
      { source: "/teachers", destination: "/mentors", permanent: true },
    ];
  },
  async rewrites() {
    // Short, shareable brand-asset URLs. The artwork letters the name in white,
    // so /logo bakes in the neutral dark ground it is designed for — otherwise
    // the name vanishes wherever a viewer paints transparency light (Chrome,
    // Google results, Docs). The untouched transparent file stays at /logo-transparent.
    return [
      { source: "/logo", destination: "/finquo-logo-brand.png" },
      { source: "/logo.png", destination: "/finquo-logo-brand.png" },
      { source: "/logo-transparent", destination: "/finquo-logo-full.png" },
      { source: "/logo-transparent.png", destination: "/finquo-logo-full.png" },
      // current webinar poster, shareable as finquo.ai/webinar-thumbnail
      { source: "/webinar-thumbnail", destination: "/webinar-poster.jpg" },
      { source: "/webinar-thumbnail.jpg", destination: "/webinar-poster.jpg" },
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
