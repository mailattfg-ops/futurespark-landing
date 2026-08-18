import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Finquo Junior | The skills school forgets to teach",
  description:
    "A one-year mentorship for ages 8 to 18. Money, business, speaking, tech, and the internet, taught weekly by mentors who actually teach it well.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} font-sans antialiased h-full`}>
      <body className="min-h-full flex flex-col bg-white text-gray-900 selection:bg-[#4F46E5]/20 selection:text-[#4F46E5] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
