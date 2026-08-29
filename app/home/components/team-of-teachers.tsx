"use client";

import Image from "next/image";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

interface TeacherProfile {
  name: string;
  role: string;
  experience: string;
  imageSrc: string;
  applicantBadge?: string;
}

const teachersList: TeacherProfile[] = [
  {
    name: "James Kennedy",
    role: "Operations Director",
    experience: "15+ years of experience",
    imageSrc: "/teacher-avatar.png",
  },
  {
    name: "Samantha Liu",
    role: "China Relations Manager",
    experience: "10 years of experience",
    imageSrc: "/teacher-avatar.png",
  },
  {
    name: "Marcus Turing",
    role: "Sourcing Specialist",
    experience: "8 years of experience",
    imageSrc: "/teacher-avatar.png",
  },
  {
    name: "Emily Clark",
    role: "Logistics Coordinator",
    experience: "12 years of experience",
    imageSrc: "/teacher-avatar.png",
  },
  {
    name: "Rajesh Patel",
    role: "Marketing Manager",
    experience: "9 years of experience",
    imageSrc: "/teacher-avatar.png",
    applicantBadge: "26 applicant slot",
  },
];

export function TeamOfTeachersSection() {
  return (
    <section id="teachers" className="w-full bg-white py-10 sm:py-12 lg:py-14">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <ScrollReveal variant="fade-up" duration={600}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 text-center tracking-tight mb-8 sm:mb-10 font-sans">
            Team of Teachers
          </h2>
        </ScrollReveal>

        {/* 5-Column Teacher Cards Grid with Centered 5th Card on Mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-4.5">
          {teachersList.map((teacher, index) => (
            <ScrollReveal
              key={index}
              variant="zoom-in"
              duration={600}
              delay={index * 100}
              className="last:col-span-2 sm:last:col-span-1 last:w-full last:max-w-[200px] sm:last:max-w-none last:mx-auto"
            >
              <div
                className="relative w-full aspect-[3/4.2] rounded-2xl sm:rounded-[22px] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 group bg-gray-100 flex flex-col justify-between"
              >
                {/* Background Photo */}
                <Image
                  src={teacher.imageSrc}
                  alt={teacher.name}
                  fill
                  priority
                  quality={100}
                  sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover object-top group-hover:scale-108 transition-transform duration-500 select-none"
                />

                {/* Bottom Dark Gradient Overlay for Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none z-10" />

                {/* Top Row: Role Pill Badge & Optional Applicant Slot Badge */}
                <div className="relative z-20 p-2.5 sm:p-3 flex items-start justify-between gap-1.5 w-full">
                  {/* Role Pill */}
                  <div className="bg-black/80 backdrop-blur-md text-white text-[9px] sm:text-[10px] font-bold px-2.5 py-1 rounded-md tracking-tight leading-tight select-none">
                    {teacher.role}
                  </div>

                  {/* Optional Applicant Badge on Rajesh */}
                  {teacher.applicantBadge && (
                    <div className="bg-white/90 backdrop-blur-md text-gray-900 text-[8px] sm:text-[9px] font-extrabold px-1.5 py-0.5 rounded-md leading-tight text-center shadow-xs select-none">
                      <span className="block text-[10px] sm:text-[11px] font-black leading-none">
                        26
                      </span>
                      <span className="text-[7px] text-gray-500 uppercase tracking-tighter">
                        applicant slot
                      </span>
                    </div>
                  )}
                </div>

                {/* Bottom Info: Teacher Name & Experience */}
                <div className="relative z-20 p-3 sm:p-3.5 text-left">
                  <h3 className="text-sm sm:text-base font-extrabold text-white font-sans leading-tight drop-shadow-xs">
                    {teacher.name}
                  </h3>
                  <p className="text-[10px] sm:text-[11px] text-white/80 font-medium leading-tight mt-0.5">
                    {teacher.experience}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
