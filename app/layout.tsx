import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Suspense } from "react";
import MetaPixel from "@/components/MetaPixel";
import Clarity from "@/components/Clarity";
import { FAQS } from "@/lib/faq";
import { LEGAL_NAME, CONTACT } from "@/lib/site";
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

const DEFAULT_TITLE = "Finquo Junior | 1-on-1 Financial Literacy for Grades 5 to 8";
const DEFAULT_DESCRIPTION =
  "A 20-session, 1-on-1 financial literacy programme for children in Grades 5 to 8. One live hour a week with a dedicated mentor. Book a free demo class.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: DEFAULT_TITLE,
    template: "%s | Finquo Junior",
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    "Finquo Junior",
    "Financial literacy for kids",
    "Financial literacy for Grades 5 to 8",
    "Money skills for children",
    "1-on-1 mentorship for students",
    "Budgeting for kids",
    "Money management for children India",
    "Financial literacy classes UAE",
  ],
  authors: [{ name: "Finquo Junior", url: siteUrl }],
  creator: "Finquo Junior",
  publisher: LEGAL_NAME,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
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
    locale: "en_IN",
    url: siteUrl,
    siteName: "Finquo Junior",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Finquo Junior: 1-on-1 financial literacy for Grades 5 to 8" }],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: ["/og-image.jpg"],
    creator: "@finquojunior",
  },
  alternates: {
    // Relative, so every route canonicals to ITSELF against metadataBase.
    canonical: "./",
  },
  verification: {
    other: {
      "facebook-domain-verification": "v9m93wnlwouc74fqueatyyf08hn1jr",
    },
  },
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "EducationalOrganization",
      "@id": `${siteUrl}/#organization`,
      name: "Finquo Junior",
      legalName: LEGAL_NAME,
      url: siteUrl,
      logo: `${siteUrl}/finquo-logo-brand.png`,
      description: "A 20-session, 1-on-1 financial literacy programme for children in Grades 5 to 8.",
      email: CONTACT.email,
      telephone: CONTACT.phone,
      sameAs: [CONTACT.instagram, CONTACT.facebook],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Finquo Junior",
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "Course",
      "@id": `${siteUrl}/#course`,
      name: "Foundations of Wealth",
      description: "A 20-session, 1-on-1 financial literacy programme for children in Grades 5 to 8.",
      provider: { "@id": `${siteUrl}/#organization` },
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: "Online",
        courseWorkload: "PT20H",
      },
      offers: {
        "@type": "Offer",
        category: "Paid",
        priceSpecification: {
          "@type": "PriceSpecification",
          price: 29000,
          priceCurrency: "INR",
          valueAddedTaxIncluded: false,
        },
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/#faq`,
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} font-sans antialiased h-full text-[16px]`}>
      <head>
        <meta name="facebook-domain-verification" content="v9m93wnlwouc74fqueatyyf08hn1jr" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }} />
      </head>
      <body className="min-h-full flex flex-col bg-white text-gray-900 selection:bg-[#4F46E5]/20 selection:text-[#4F46E5] overflow-x-hidden font-sans">
        {children}
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
        <Suspense fallback={null}>
          <MetaPixel />
        </Suspense>
        <Clarity />
      </body>
    </html>
  );
}
