/**
 * Parent and student quotes (change brief F9). The first three are the ones
 * already published on webinar.finquo.ai; marketing will confirm city and grade
 * and may replace the text. Empty fields are simply not shown.
 */
export interface Testimonial {
  name: string;
  city: string;
  grade: string;
  quote: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Aditi",
    city: "",
    grade: "Grade 4",
    quote:
      "The class was really good, and I truly appreciate the effort you put into teaching him. The sessions were engaging and valuable. Finquo Junior is a great initiative, and I honestly couldn't find any negatives in the programme.",
  },
  {
    name: "Insha",
    city: "",
    grade: "Grade 10",
    quote:
      "I've learned a lot of interesting stuff: the 50-30-20 rule, budgeting, expenses, income, and more that I can actually use day to day. The classes make money stuff simple and interesting.",
  },
  {
    name: "Nishan",
    city: "",
    grade: "Grade 10",
    quote: "You'd rather they learn money skills from a mentor than from Instagram.",
  },
];

export const testimonialMeta = (t: Testimonial) => [t.name, t.city, t.grade].filter(Boolean).join(" · ");
