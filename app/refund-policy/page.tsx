import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy | Finquo Junior",
  description: "How refunds and cancellations work when you pay for a Finquo Junior programme.",
};

export default function RefundPolicyPage() {
  return (
    <LegalPage
      title="Refund & Cancellation"
      lastUpdated="30 September 2026"
      intro="This policy explains how refunds and cancellations work when you pay for a Finquo Junior programme, including special offers made to families who attend our free webinars."
      sections={[
        {
          heading: "Free webinars",
          blocks: ["Our live webinars and masterclasses are free. No payment is taken, so there is nothing to refund."],
        },
        {
          heading: "Full refund within 7 days",
          blocks: [
            "You can cancel a paid programme and get a full refund if you ask within 7 days of payment and before your child's first class.",
          ],
        },
        {
          heading: "After classes have started",
          blocks: [
            "Once your child has attended their first class, or 7 days after payment (whichever comes first), the fee is not refundable. If something comes up, talk to us: we can usually move your child to a later batch or reschedule classes instead.",
          ],
        },
        {
          heading: "Learning kit and bonus sessions",
          blocks: [
            "Bonuses included with an offer (such as the learning kit, recorded sessions and bonus classes) come free with the programme and can't be refunded or exchanged for money separately.",
            "If you cancel within the 7-day refund window after the learning kit has already been dispatched, please return it unused. If it isn't returned, we may deduct its cost from your refund.",
          ],
        },
        {
          heading: "If we cancel",
          blocks: [
            "If Finquo Junior cancels a programme or batch and we can't offer you a suitable alternative, you'll receive a full refund.",
          ],
        },
        {
          heading: "Failed or duplicate payments",
          blocks: [
            "If money was deducted but the payment failed, or you were charged twice, the extra amount is refunded automatically to your original payment method, usually within 5–7 working days. If it doesn't arrive, contact us with your payment details.",
          ],
        },
        {
          heading: "How to ask for a refund",
          blocks: [
            "Email or WhatsApp us (details below) with:",
            {
              bullets: [
                "the parent's name and the phone number used for payment",
                "your child's name",
                "the payment or transaction ID (from your payment confirmation)",
              ],
            },
          ],
        },
        {
          heading: "When you'll get your money",
          blocks: [
            "Approved refunds are sent back to the original payment method (UPI, card, net banking or wallet) within 5–7 working days of approval. Your bank may take a few extra days to show it.",
          ],
        },
      ]}
    />
  );
}
