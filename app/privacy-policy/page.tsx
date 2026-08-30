import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Lock, Mail, Phone, ArrowLeft, CheckCircle2, FileText, Globe, Bell } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Finquo Junior",
  description:
    "Finquo Junior Privacy Policy. Learn how we collect, protect, and handle personal information for students and parents enrolled in our 1-on-1 financial literacy & life skills mentorship programs.",
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "August 30, 2026";

  return (
    <div className="min-h-screen bg-[#0a0f1d] text-slate-100 font-sans selection:bg-purple-500 selection:text-white relative overflow-hidden">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header Bar */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0a0f1d]/80 border-b border-slate-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 p-0.5 shadow-lg group-hover:shadow-purple-500/25 transition-all">
              <div className="w-full h-full bg-[#0a0f1d] rounded-[10px] flex items-center justify-center">
                <span className="font-extrabold text-lg text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
                  FJ
                </span>
              </div>
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-white block">
                Finquo<span className="text-purple-400">Junior</span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium block">
                Essential Life & Money Skills
              </span>
            </div>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 text-xs font-semibold text-slate-300 hover:text-white transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </header>

      {/* Content Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-10 relative z-10">
        
        {/* Banner Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-purple-950/40 border border-slate-800 shadow-2xl relative overflow-hidden backdrop-blur-xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-bold">
            <ShieldCheck className="w-4 h-4 text-purple-400" />
            <span>Official Legal Document</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Privacy Policy
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            At Finquo Junior, we prioritize the protection of student and parent privacy. This Privacy Policy outlines how we collect, use, safeguard, and process personal data when you interact with our website, book demo sessions, or enroll in our 1-on-1 mentorship programs.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-slate-400 border-t border-slate-800/80">
            <span className="flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-purple-400" />
              Last Updated: <strong className="text-slate-200">{lastUpdated}</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-indigo-400" />
              Applies to: <strong className="text-slate-200">junior.finquo.ai & Services</strong>
            </span>
          </div>
        </div>

        {/* Policy Body Content */}
        <div className="space-y-12 text-slate-300 text-sm leading-relaxed">
          
          {/* Section 1: Overview */}
          <section className="space-y-4 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-sm">
                1
              </div>
              <h2 className="text-xl font-bold text-white">Introduction & Scope</h2>
            </div>
            <p>
              Finquo Junior ("we", "us", or "our") operates the 1-on-1 mentorship platform for students aged 8 to 18. This policy applies to all visitors, parents, legal guardians, and students accessing our platform at <strong className="text-purple-300">junior.finquo.ai</strong> or using our associated mobile/web applications and communication channels.
            </p>
          </section>

          {/* Section 2: Information We Collect */}
          <section className="space-y-4 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-sm">
                2
              </div>
              <h2 className="text-xl font-bold text-white">Information We Collect</h2>
            </div>
            <p>
              We collect information that you voluntarily provide to us when scheduling a demo session, enrolling in a pilot program, or contacting our support team:
            </p>

            <ul className="space-y-3 pt-2">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Parent & Student Personal Details:</strong>
                  Parent/Guardian full name, email address, contact phone number, student name, grade level, and preferred timezone.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Mentorship & Booking Preferences:</strong>
                  Selected date and time slots for demo classes, learning goals, and session progress reports.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Communication History:</strong>
                  Messages, session feedback, and automated notifications exchanged via email, SMS, or WhatsApp.
                </div>
              </li>
            </ul>
          </section>

          {/* Section 3: WhatsApp & Communication Consent */}
          <section className="space-y-4 bg-gradient-to-br from-emerald-950/30 to-slate-900/60 border border-emerald-500/30 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
                3
              </div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span>WhatsApp Messaging & Communications</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                  Meta API Compliant
                </span>
              </h2>
            </div>
            <p>
              When you submit your contact phone number to request a demo class or enroll in our programs, you consent to receive transactional and operational communications from Finquo Junior via Meta’s WhatsApp Cloud API, Email, or SMS:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                <Bell className="w-4 h-4 text-emerald-400" />
                <h3 className="text-xs font-bold text-white">Class Reminders & Links</h3>
                <p className="text-xs text-slate-400">
                  Automated Zoom meeting links, schedule updates, and reminder notifications for upcoming 1-on-1 sessions.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <h3 className="text-xs font-bold text-white">Student Progress Reports</h3>
                <p className="text-xs text-slate-400">
                  Weekly progress reports, mentor feedback, and milestone achievements delivered directly to parents.
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 pt-2 border-t border-slate-800/80">
              <strong className="text-slate-200">Opt-Out & Privacy Guarantee:</strong> We do not send unsolicited marketing SPAM. You may opt out of WhatsApp communications at any time by replying <code className="bg-slate-800 px-1.5 py-0.5 rounded text-emerald-300">STOP</code> or contacting support. Your phone number is never sold, shared, or leased to third-party advertisers.
            </p>
          </section>

          {/* Section 4: Children's Privacy */}
          <section className="space-y-4 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-sm">
                4
              </div>
              <h2 className="text-xl font-bold text-white">Children's Privacy Protection (COPPA & GDPR-K)</h2>
            </div>
            <p>
              Finquo Junior provides educational mentorship to minors (ages 8 to 18). We adhere strictly to applicable children's privacy protection standards:
            </p>
            <ul className="space-y-2 list-disc list-inside text-slate-300 pt-1">
              <li>Verified Parental/Guardian consent is required for all student demo bookings and enrollments.</li>
              <li>We do not publicly disclose minor students' personal identities, full contact details, or financial information.</li>
              <li>Parents and legal guardians retain the right to inspect, edit, or request complete deletion of their child's account records.</li>
            </ul>
          </section>

          {/* Section 5: Data Security & Retention */}
          <section className="space-y-4 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-sm">
                5
              </div>
              <h2 className="text-xl font-bold text-white">Data Security & Encryption</h2>
            </div>
            <p>
              We implement industry-standard administrative, physical, and technical safeguards to protect data against unauthorized access, loss, or alteration. All web traffic is encrypted using <strong className="text-white">TLS/SSL (HTTPS)</strong>, and sensitive operational databases are protected with access controls and row-level encryption.
            </p>
          </section>

          {/* Section 6: Contact Us */}
          <section className="space-y-4 bg-gradient-to-br from-purple-950/30 via-slate-900/60 to-slate-900/80 border border-purple-500/30 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-sm">
                6
              </div>
              <h2 className="text-xl font-bold text-white">Contact & Privacy Inquiries</h2>
            </div>
            <p>
              If you have any questions, wish to update your details, or desire to exercise your data privacy rights, please contact our Privacy Team:
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="mailto:privacy@finquo.ai"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs transition-all shadow-md"
              >
                <Mail className="w-4 h-4" />
                <span>privacy@finquo.ai</span>
              </a>

              <a
                href="mailto:support@finquo.ai"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-xs transition-all"
              >
                <Mail className="w-4 h-4 text-purple-400" />
                <span>support@finquo.ai</span>
              </a>
            </div>
          </section>

        </div>

      </main>

      {/* Simple Footer */}
      <footer className="border-t border-slate-800/80 py-8 mt-12 bg-[#080c17]">
        <div className="max-w-6xl mx-auto px-4 text-center text-xs text-slate-400 space-y-2">
          <p>© {new Date().getFullYear()} Finquo Junior. All rights reserved.</p>
          <div className="flex justify-center gap-6 text-slate-400 font-medium">
            <Link href="/" className="hover:text-purple-400 transition-colors">
              Home
            </Link>
            <Link href="/demo-class" className="hover:text-purple-400 transition-colors">
              Book Demo
            </Link>
            <Link href="/privacy-policy" className="text-purple-400 font-bold">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
