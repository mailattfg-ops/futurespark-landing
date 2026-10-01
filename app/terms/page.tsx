import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Terms & Conditions | Finquo Junior",
  description:
    "Terms that apply when you use finquo.ai, register for a free Finquo Junior webinar, or pay for a Finquo Junior programme.",
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      lastUpdated="30 September 2026"
      intro='These terms apply when you use this website, register for a free Finquo Junior webinar, or pay for a Finquo Junior programme. By registering or paying, you agree to them. Finquo Junior is a programme run by **FinQuo Versity And Edutech Private Limited**. "We" and "us" mean FinQuo Versity And Edutech Private Limited; "you" means the parent or guardian using our services.'
      sections={[
        {
          heading: "What we offer",
          blocks: [
            "Finquo Junior runs live, mentor-led financial-literacy sessions for children aged 8 to 18. This includes free webinars and paid programmes. What a paid programme includes (number of sessions, schedule and any bonuses) is described in the offer or payment form at the time you pay.",
          ],
        },
        {
          heading: "Parents and children",
          blocks: [
            {
              bullets: [
                "Registrations and payments must be made by a parent or legal guardian.",
                "You're responsible for the details you give us being accurate, including the WhatsApp number and email we use for class links and reminders.",
                "Parents are welcome to sit in on sessions. Children who join on their own should do so with a parent's permission.",
              ],
            },
          ],
        },
        {
          heading: "Payments and offers",
          blocks: [
            {
              bullets: [
                "Payments are processed securely by our payment partner, Cashfree Payments. We never see or store your card or bank details.",
                "Prices are in Indian Rupees (₹). Any GST or other tax is shown before you pay.",
                "Special offers are valid only for the period stated in the offer. After that, the regular price applies.",
                "Bonuses included with an offer are provided as described in that offer and have no separate cash value.",
              ],
            },
          ],
        },
        {
          heading: "Refunds and cancellations",
          blocks: ["Refunds and cancellations are covered by our [Refund & Cancellation Policy](/refund-policy)."],
        },
        {
          heading: "Live sessions",
          blocks: [
            {
              bullets: [
                "Sessions are held online on Zoom. You'll need a stable internet connection and a phone, tablet or laptop.",
                "Personal join links are for your family only. Please don't share them.",
                "We expect respectful behaviour from everyone in a session. We may remove anyone who disrupts a class.",
                "We may reschedule a session if a mentor is unavailable or for technical reasons. We'll tell you in advance whenever we can.",
                "Sessions may be recorded to improve teaching quality and to provide recordings to enrolled families. Recordings we share with you are for your family's personal use only.",
              ],
            },
          ],
        },
        {
          heading: "Educational content only — not financial advice",
          blocks: [
            "Our sessions teach money concepts to children and families. They are **for education only** and are not investment, tax or financial advice. Examples, returns and figures used in sessions are illustrations, not promises. Investments such as mutual funds are subject to market risks, and past returns do not guarantee future returns. Please speak to a qualified adviser before making investment decisions.",
          ],
        },
        {
          heading: "Messages we send",
          blocks: [
            "When you register, we send class links, reminders and updates about your registration by WhatsApp and email, based on the choices you make on the form. We may also contact you about your child's learning and our programmes. You can stop promotional messages at any time — just tell us on WhatsApp or by email and we'll stop them.",
          ],
        },
        {
          heading: "Our content",
          blocks: [
            "Session materials, worksheets, recordings and other content belong to Finquo Junior. You may use them for your family's personal learning, but please don't copy, resell or publish them.",
          ],
        },
        {
          heading: "Liability",
          blocks: [
            "We work hard to run every session smoothly, but we can't guarantee the website or live sessions will always be available or free of interruptions (for example, internet or Zoom outages). To the extent the law allows, our total liability to you for any claim is limited to the amount you paid us for the programme concerned.",
          ],
        },
        {
          heading: "Privacy",
          blocks: ["How we collect and use your family's information is explained in our [Privacy Policy](/privacy-policy)."],
        },
        {
          heading: "Changes to these terms",
          blocks: [
            'We may update these terms from time to time. The "Last updated" date at the top shows when they last changed. Changes don\'t affect programmes you\'ve already paid for.',
          ],
        },
        {
          heading: "Governing law",
          blocks: ["These terms are governed by the laws of India. Any dispute will be subject to the courts of Kozhikode, Kerala."],
        },
      ]}
    />
  );
}
