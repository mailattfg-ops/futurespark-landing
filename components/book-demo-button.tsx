import { ArrowRight } from "lucide-react";
import { demoUrl, webinarUrl, DEMO_LABEL, WEBINAR_LABEL, Placement } from "@/lib/site";

/**
 * The one primary button on the site (change brief F12): one colour, white text
 * at 6.3:1 contrast, 44 px tall. Every booking link goes through here so the
 * label and the campaign tag can never drift between sections.
 */
const BASE =
  "inline-flex items-center justify-center gap-2 min-h-[44px] rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white font-bold shadow-md shadow-indigo-500/25 transition-[background-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/30 cursor-pointer";

const SIZES = {
  sm: "px-4 py-2 text-xs sm:text-sm",
  md: "px-6 py-3 text-sm sm:text-base",
  lg: "px-7 py-3.5 text-sm sm:text-base",
};

interface Props {
  placement: Placement;
  size?: keyof typeof SIZES;
  className?: string;
  arrow?: boolean;
  /** Only the header uses a shorter label on narrow screens. */
  children?: React.ReactNode;
}

export function BookDemoButton({ placement, size = "md", className = "", arrow = false, children }: Props) {
  return (
    <a href={demoUrl(placement)} className={`${BASE} ${SIZES[size]} ${className}`}>
      {children ?? DEMO_LABEL}
      {arrow && <ArrowRight className="w-4 h-4" aria-hidden="true" />}
    </a>
  );
}

export function WebinarButton({ placement, size = "md", className = "", arrow = false }: Omit<Props, "children">) {
  return (
    <a href={webinarUrl(placement)} target="_blank" rel="noopener noreferrer" className={`${BASE} ${SIZES[size]} ${className}`}>
      {WEBINAR_LABEL}
      {arrow && <ArrowRight className="w-4 h-4" aria-hidden="true" />}
    </a>
  );
}
