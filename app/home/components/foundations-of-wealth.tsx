import { CourseDetailsCard } from "./course-details-card";

export function FoundationsOfWealthSection() {
  return (
    <section id="course-details" className="w-full bg-white py-14 sm:py-20">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-[#0F1035] text-center tracking-[-0.03em] mb-10 sm:mb-12 font-sans">Course <span className="text-[#3B6CFF]">Details</span></h2>
        <CourseDetailsCard placement="course_card" />
      </div>
    </section>
  );
}
