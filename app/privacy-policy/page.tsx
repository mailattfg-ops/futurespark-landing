import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy | Finquo Junior",
  description:
    "What information FinQuo Versity And Edutech Private Limited collects when you use finquo.ai, register for a webinar or pay for a Finquo Junior programme, how it is used, and the choices you have.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      lastUpdated="30 September 2026"
      intro={
        'This policy explains what information FinQuo Versity And Edutech Private Limited ("we"), which runs the Finquo Junior programme, collects when you use this website, register for a webinar or pay for a programme, how we use it, and the choices you have. We collect children\'s details only from their parent or guardian.'
      }
      sections={[
        {
          heading: "Information you give us",
          blocks: [
            {
              bullets: [
                "When you register: parent's name, child's name and age, email address, WhatsApp number (with country code), and your choice about receiving reminders.",
                "When you pay for a programme: the details on the payment form, such as name, phone, email and, where a learning kit is sent, your delivery address. Card and bank details are handled by Cashfree Payments and are never seen or stored by us.",
                "When you join a live session: the name and email you enter in Zoom.",
                "When you contact us: whatever you choose to tell us by email or WhatsApp.",
              ],
            },
          ],
        },
        {
          heading: "Information collected automatically",
          blocks: [
            {
              bullets: [
                "Which pages you visit, the device type, the website that referred you, and ad-campaign tags in the link you used. We use a random visitor ID stored in your browser for this, not your name.",
                "Your IP address, briefly, to stop spam and repeated sign-ups on the registration form.",
                "Whether you opened your personal join link, so we know who joined the session.",
              ],
            },
          ],
        },
        {
          heading: "Cookies, analytics and advertising tools",
          blocks: [
            "This site uses:",
            {
              bullets: [
                "Meta Pixel and Conversions API: to measure how our Facebook and Instagram ads perform. When you register, we send Meta a scrambled (hashed) version of your email, phone and name, plus your IP address and browser type, so Meta can match the registration to an ad. Meta cannot read the scrambled details.",
                "Google Analytics / Google tag: to understand how visitors use the site.",
                "Microsoft Clarity: records anonymous interactions such as clicks and scrolling, to help us improve the pages.",
              ],
            },
            "You can block or delete cookies in your browser settings. Some features may not work as well if you do.",
          ],
        },
        {
          heading: "How we use your information",
          blocks: [
            {
              bullets: [
                "To register your child and send the class link, reminders and updates by WhatsApp and email.",
                "To run live sessions and know who attended.",
                "To follow up after a session about your child's learning and our programmes, including by phone.",
                "To process payments, deliver learning kits, and handle refunds.",
                "To measure and improve our website, sessions and advertising.",
                "To prevent spam and misuse, and to meet legal and accounting requirements.",
              ],
            },
          ],
        },
        {
          heading: "Who we share it with",
          blocks: [
            "We never sell your information. We share it only with service providers who help us run Finquo Junior, and only what they need:",
            {
              bullets: [
                "Supabase (secure database) and Vercel (website hosting)",
                "Meta (WhatsApp Business messages, Facebook/Instagram ad measurement)",
                "Resend (email delivery)",
                "Zoom (live sessions)",
                "Cashfree Payments (payment processing)",
                "Google and Microsoft (website analytics)",
                "Courier partners (to deliver learning kits)",
              ],
            },
            "We may also share information if the law requires it.",
          ],
        },
        {
          heading: "How long we keep it",
          blocks: [
            "We keep your registration details for as long as you're in touch with us, and payment records for as long as tax and accounting law requires. Anti-spam records of IP addresses are kept only briefly. You can ask us to delete your details at any time (see below).",
          ],
        },
        {
          heading: "Your choices and rights",
          blocks: [
            {
              bullets: [
                "Ask for a copy of the information we hold about you and your child.",
                "Ask us to correct or delete it.",
                "Stop reminders or promotional messages at any time — tell us on WhatsApp or by email.",
                "Withdraw consent you gave us. This won't affect anything we did before you withdrew it.",
              ],
            },
            "To do any of these, contact us using the details below. We'll respond within 30 days.",
          ],
        },
        {
          heading: "Keeping it safe",
          blocks: [
            "Your information is stored in secure, access-controlled systems, sent over encrypted connections, and available only to our team members who need it for their work.",
          ],
        },
        {
          heading: "Changes to this policy",
          blocks: ['We may update this policy from time to time. The "Last updated" date at the top shows when it last changed.'],
        },
      ]}
    />
  );
}
