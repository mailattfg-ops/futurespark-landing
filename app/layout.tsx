import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Preloader } from "@/components/preloader";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Suspense } from "react";
import MetaPixel from "@/components/MetaPixel";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

// The apex is the live host — junior.finquo.ai 308s here. Canonical, OG and
// metadataBase must name it, or every page claims an address that redirects
// away and Google keeps indexing the old subdomain.
const siteUrl = "https://finquo.ai";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Finquo Junior | The Skills School Forgets to Teach",
    template: "%s | Finquo Junior",
  },
  description:
    "A 1-year weekly 1-on-1 mentorship program for ages 8 to 18. Financial literacy, entrepreneurship, public speaking, AI tools & smart digital habits taught by real mentors.",
  keywords: [
    "Finquo Junior",
    "Financial literacy for kids",
    "Money management for teens",
    "Kids entrepreneurship course",
    "1-on-1 mentorship for students",
    "Public speaking for kids",
    "AI tools for students",
    "Smart spending for teenagers",
    "Financial intelligence school",
  ],
  authors: [{ name: "Finquo Junior", url: siteUrl }],
  creator: "Finquo Junior",
  publisher: "Finquo Junior",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    // The SITE is FinQuo; "Finquo Junior" is the programme. Google reads this
    // (with WebSite.name below) for the site name it prints above a result.
    siteName: "FinQuo",
    title: "Finquo Junior | The Skills School Forgets to Teach",
    description:
      "A 1-year weekly 1-on-1 mentorship program for ages 8 to 18. Financial literacy, entrepreneurship, public speaking, AI tools & smart digital habits taught by real mentors.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Finquo Junior - Financial Literacy & Essential Skills Mentorship",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Finquo Junior | The Skills School Forgets to Teach",
    description:
      "A 1-year weekly 1-on-1 mentorship program for ages 8 to 18. Financial literacy, entrepreneurship, public speaking, AI tools & smart digital habits.",
    images: ["/og-image.jpg"],
    creator: "@finquojunior",
  },
  alternates: {
    // Relative, so every route canonicals to ITSELF against metadataBase.
    // A literal siteUrl here pointed every page at the homepage, which is why
    // Search Console dropped them as "Alternate page with proper canonical".
    canonical: "./",
  },
  verification: {
    other: {
      "facebook-domain-verification": "v9m93wnlwouc74fqueatyyf08hn1jr",
    },
  },
};

/* The organisation and the website are FinQuo, on the apex domain. "Finquo
 * Junior" is the programme FinQuo runs — it belongs on the Course node below,
 * never on the Organization or WebSite node, which is what Google reads for
 * the site name it prints in results. */
const brandUrl = "https://finquo.ai";

const jsonLdData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "EducationalOrganization",
      "@id": `${brandUrl}/#organization`,
      "name": "FinQuo",
      "url": brandUrl,
      // The wordmark, not the bare mark: this is what Google shows beside the
      // brand, always on a white ground, so the navy-lettered file is the one.
      "logo": `${brandUrl}/finquo-logo-on-white.png`,
      "description": "ISO-grade weekly 1-on-1 mentorship sessions in financial literacy, business, speaking, and digital skills for ages 8 to 18.",
      "sameAs": [
        "https://instagram.com/finquojunior",
        "https://youtube.com/@finquojunior"
      ]
    },
    {
      "@type": "WebSite",
      "@id": `${brandUrl}/#website`,
      "url": brandUrl,
      "name": "FinQuo",
      "publisher": {
        "@id": `${brandUrl}/#organization`
      }
    },
    {
      "@type": "Course",
      "@id": `${brandUrl}/#course`,
      "name": "Foundations of Wealth & Future Skills",
      "description": "40 interactive 1-on-1 sessions covering money foundations, budgeting, scam safety, economy, investing, public speaking, and AI tools.",
      "alternateName": "Finquo Junior",
      "provider": {
        "@id": `${brandUrl}/#organization`
      }
    }
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} font-sans antialiased h-full text-[16px]`}
    >
      <head>
        <meta name="facebook-domain-verification" content="v9m93wnlwouc74fqueatyyf08hn1jr" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-gray-900 selection:bg-[#4F46E5]/20 selection:text-[#4F46E5] overflow-x-hidden font-sans">
        <Preloader />
        {children}
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
        <Suspense fallback={null}>
          <MetaPixel />
        </Suspense>
      </body>
    </html>
  );
}
