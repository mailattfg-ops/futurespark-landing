import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "About Finquo Junior | 1-on-1 Financial Literacy for Children" },
  description:
    "Finquo Junior gives children financial literacy before their first financial decisions: a 20-session, 1-on-1 programme built by finance professionals and taught by dedicated mentors.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
