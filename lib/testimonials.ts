/**
 * Parent and student quotes, as published on webinar.finquo.ai (names, grades,
 * photos and wording taken from there, 10 Oct 2026). Empty fields are simply
 * not shown.
 */
export interface Testimonial {
  name: string;
  city: string;
  grade: string;
  quote: string;
  /** The student's own photo, in /public/testimonials. */
  photo?: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Nishan KP",
    city: "",
    grade: "Grade 10",
    photo: "/testimonials/nishan-kp.jpg",
    quote:
      "Of course, the class was really good, and I truly appreciate the effort you put into teaching him. You have done your maximum to make the sessions engaging and valuable for him. Please continue this wonderful work. Finquo Junior is a great initiative, and I honestly couldn’t find any negatives in the program. Thank you for giving my child this valuable opportunity to learn about financial literacy. Wishing Finquo Junior all the very best for the future! ❤️",
  },
  {
    name: "Aditi Satheesh",
    city: "",
    grade: "Grade 4",
    photo: "/testimonials/aditi-satheesh.webp",
    quote:
      "I've been attending Finquo Junior's financial literacy classes, and honestly, I've learned a lot of interesting stuff. We've covered the 50-30-20 rule, budgeting, expenses, income, and more that I can actually use day to day. I really enjoy the classes because they make money stuff simple and interesting.",
  },
  {
    name: "Insha Kadeeja",
    city: "",
    grade: "Grade 10",
    photo: "/testimonials/insha-kadeeja.jpg",
    quote:
      "The online classes were very informative and engaging. The teacher explained each topic clearly and made the sessions interesting and easy to understand. I learned many new and useful things throughout the course. Overall, it was a wonderful and enriching learning experience.",
  },
];

export const testimonialMeta = (t: Testimonial) => [t.name, t.city, t.grade].filter(Boolean).join(" · ");
