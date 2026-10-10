import { CourseDetailsCard } from "./course-details-card";

export function FoundationsOfWealthSection() {
  return (
    <section id="course-details" className="w-full bg-white py-10 sm:py-12 lg:py-14">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 text-center tracking-tight mb-10 sm:mb-12 font-sans">Course Details</h2>
        <CourseDetailsCard placement="course_card" />
      </div>
    </section>
  );
}
