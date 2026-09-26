export const WEBINAR_URL = "https://webinar.finquo.ai/"; // navbar link
const BANNER_URL = "https://webinar.finquo.ai/register"; // fixed registration page

// The poster is the banner, exactly as webinar.finquo.ai shows it: one plain <img>,
// full width, no cropping or optimizer pass — that is what keeps it sharp.
// Swap /public/webinar-poster.jpg for the next webinar.
export function WebinarBannerSection() {
  return (
    <section className="w-full bg-[#F4F3FB] py-12 sm:py-16 lg:py-20">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="whitespace-nowrap text-[clamp(1.6rem,6vw,3.75rem)] font-extrabold tracking-tight text-[#0A0F3C]">
            Upcoming Live Webinar
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mt-3 font-medium">
            Free for parents &amp; kids · Hosted by our mentors · Seats are limited
          </p>
        </div>
        <a
          href={BANNER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="block overflow-hidden rounded-2xl sm:rounded-[28px] shadow-xl shadow-indigo-900/10 ring-1 ring-indigo-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-900/15"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/webinar-poster.jpg"
            alt="Free live webinar: What Would Your Child Do With ₹1,000? Thursday, 1 October 2026, 9:00 PM IST — reserve your free seat"
            className="aspect-video w-full object-cover"
          />
        </a>
      </div>
    </section>
  );
}
