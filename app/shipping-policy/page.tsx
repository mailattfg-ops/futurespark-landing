import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Shipping & Delivery Policy | Finquo Junior",
  description: "How and when Finquo Junior learning kits and online access are delivered.",
};

export default function ShippingPolicyPage() {
  return (
    <LegalPage
      title="Shipping & Delivery"
      lastUpdated="30 September 2026"
      intro="Some Finquo Junior programmes include a physical learning kit that we courier to your home. This policy explains how and when it arrives, and how online access is delivered."
      sections={[
        {
          heading: "Online access",
          blocks: [
            "Class links, schedules and recordings are sent to the WhatsApp number and email address you gave us, usually within 24 hours of payment. If you haven't received them, please contact us.",
          ],
        },
        {
          heading: "Where we deliver learning kits",
          blocks: [
            "We currently ship learning kits to addresses within India. If you live outside India (for example in the UAE or another Gulf country), please contact us before paying and we'll let you know whether delivery to your country is possible.",
          ],
        },
        {
          heading: "Delivery time and cost",
          blocks: [
            {
              bullets: [
                "Kits are dispatched within 7 working days of payment.",
                "Delivery usually takes a further 5–10 working days, depending on your location.",
                "Shipping within India is free.",
                "Once your kit is dispatched, we'll send the courier tracking details on WhatsApp or email.",
              ],
            },
          ],
        },
        {
          heading: "Your delivery address",
          blocks: [
            "Please enter your full address and pincode correctly on the payment form. If you need to change it, tell us before the kit is dispatched. If a kit is returned to us because of an incorrect address or because nobody was available to receive it, we may charge the cost of sending it again.",
          ],
        },
        {
          heading: "Damaged or missing items",
          blocks: [
            "If your kit arrives damaged or with items missing, please send us photos within 48 hours of delivery. We'll send a replacement for the damaged or missing items at no cost to you.",
          ],
        },
        {
          heading: "Refunds",
          blocks: [
            "For cancellations and refunds, including what happens to a kit that has already been sent, see our [Refund & Cancellation Policy](/refund-policy).",
          ],
        },
      ]}
    />
  );
}
