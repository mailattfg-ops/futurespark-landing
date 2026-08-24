import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Preloader } from "@/components/preloader";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://finquo.ai";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Finquo Junior | The Skills School Forgets to Teach",
    template: "%s | Finquo Junior",
  },
  description:
    "A 1-year weekly 1 on 1 mentorship program for ages 8 to 18. Financial literacy, entrepreneurship, public speaking, AI tools & smart digital habits taught by real mentors.",
  keywords: [
    "Finquo Junior",
    "Financial literacy for kids",
    "Money management for teens",
    "Kids entrepreneurship course",
    "1 on 1 mentorship for students",
    "Public speaking for kids",
    "AI tools for students",
    "Smart spending for teenagers",
    "Financial intelligence school",
  ],
  authors: [{ name: "Finquo Junior", url: siteUrl }],
  creator: "Finquo Junior",
  publisher: "Finquo Junior",
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
    siteName: "Finquo Junior",
    title: "Finquo Junior | The Skills School Forgets to Teach",
    description:
      "A 1-year weekly 1 on 1 mentorship program for ages 8 to 18. Financial literacy, entrepreneurship, public speaking, AI tools & smart digital habits taught by real mentors.",
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
      "A 1-year weekly 1 on 1 mentorship program for ages 8 to 18. Financial literacy, entrepreneurship, public speaking, AI tools & smart digital habits.",
    images: ["/og-image.jpg"],
    creator: "@finquojunior",
  },
  alternates: {
    canonical: siteUrl,
  },
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "EducationalOrganization",
      "@id": `${siteUrl}/#organization`,
      "name": "Finquo Junior",
      "url": siteUrl,
      "logo": `${siteUrl}/finquo-logo.png`,
      "description": "ISO-grade weekly 1 on 1 mentorship sessions in financial literacy, business, speaking, and digital skills for ages 8 to 18.",
      "sameAs": [
        "https://instagram.com/finquojunior",
        "https://youtube.com/@finquojunior"
      ]
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      "url": siteUrl,
      "name": "Finquo Junior",
      "publisher": {
        "@id": `${siteUrl}/#organization`
      }
    },
    {
      "@type": "Course",
      "@id": `${siteUrl}/#course`,
      "name": "Foundations of Wealth & Future Skills",
      "description": "40 interactive 1 on 1 sessions covering money foundations, budgeting, scam safety, economy, investing, public speaking, and AI tools.",
      "provider": {
        "@id": `${siteUrl}/#organization`
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-gray-900 selection:bg-[#4F46E5]/20 selection:text-[#4F46E5] overflow-x-hidden font-sans">
        <Preloader />
        {children}
      </body>
    </html>
  );
}
