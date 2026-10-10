import Image from "next/image";
import { BookOpen, UserCheck, FolderCheck, Printer, Award, Sparkles, IndianRupee } from "lucide-react";
import { BookDemoButton } from "@/components/book-demo-button";
import { PRICE, Placement } from "@/lib/site";
import { PROGRAMME_NAME } from "@/lib/syllabus";

const ICON = "w-5 h-5 text-[#4F46E5] stroke-[2]";

const lines = [
  { icon: <BookOpen className={ICON} />, label: "20 live 1-on-1 sessions, one hour each" },
  { icon: <UserCheck className={ICON} />, label: "One session a week with the same mentor" },
  { icon: <FolderCheck className={ICON} />, label: "A capstone project your child presents" },
  { icon: <Printer className={ICON} />, label: "Printed worksheets and a sticker pack for every session" },
  { icon: <Award className={ICON} />, label: "Finquo Junior completion certificate" },
  { icon: <Sparkles className={ICON} />, label: "5 free bonus sessions: AI, Public Speaking and Cyber Awareness" },
  { icon: <IndianRupee className={ICON} />, label: `${PRICE} for the full programme` },
];

/** Replace with the thumbnail from creative that carries the rupee symbol (brief F2 row 17). */
const THUMBNAIL = { src: "/course-thumbnail.jpg", alt: "Foundations of Wealth course cover" };

/** The programme card. The homepage and the curriculum page show the same one (brief F2 rows 14–17, F3 row 3). */
export function CourseDetailsCard({ placement }: { placement: Placement }) {
  return (
    <div className="bg-white border border-gray-200/90 rounded-3xl p-6 sm:p-8 shadow-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-center">
        <div className="flex flex-col justify-between h-full space-y-4">
          <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-[#F8F5EE] border border-[#E9DAC6]">
            <Image src={THUMBNAIL.src} alt={THUMBNAIL.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover object-center" />
          </div>
          <div className="pt-1 border-t border-gray-100">
            <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 font-sans tracking-tight">{PROGRAMME_NAME}</h3>
            <p className="text-[11px] sm:text-xs text-gray-500 font-normal leading-relaxed mt-1">Financial literacy for Grades 5 to 8.</p>
          </div>
        </div>

        <ul className="flex flex-col justify-center space-y-2.5 sm:space-y-3 h-full list-none m-0 p-0">
          {lines.map((item) => (
            <li key={item.label} className="flex items-center gap-3.5 bg-[#FAFAFA] p-3 sm:p-3.5 rounded-2xl border border-gray-100">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                {item.icon}
              </div>
              <span className="text-xs sm:text-[14px] font-bold text-gray-800 font-sans">{item.label}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 pt-2">
        <BookDemoButton placement={placement} size="lg" className="w-full" />
      </div>
    </div>
  );
}
