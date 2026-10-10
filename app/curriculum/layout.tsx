import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Financial Literacy Curriculum for Grades 5 to 8",
  description:
    "What your child learns in 20 one-hour 1-on-1 sessions: money basics, budgeting, banking, safe spending, tax and the basics of investing.",
};

export default function CurriculumLayout({ children }: { children: React.ReactNode }) {
  return children;
}
