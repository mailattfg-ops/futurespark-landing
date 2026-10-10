import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Shipping & Delivery Policy",
  description: "How and when Finquo Junior printed worksheets, sticker packs and online access are delivered.",
};

export default function ShippingPolicyPage() {
  return (
    <LegalPage
      title="Shipping & Delivery"
      lastUpdated="30 September 2026"
      intro="Finquo Junior programmes include printed worksheets and sticker packs that we courier to your home. This policy explains how and when they arrive, and how online access is delivered."
      sections={[
        {
          heading: "Online access",
          blocks: [
            "Class links, schedules and recordings are sent to the WhatsApp number and email address you gave us, usually within 24 hours of payment. If you haven't received them, please contact us.",
          ],
        },
        {
          heading: "Where we deliver printed worksheets and sticker packs",
          blocks: [
            "We deliver free to India and the UAE. For other GCC countries, contact us before paying.",
          ],
        },
        {
          heading: "Delivery time and cost",
          blocks: [
            "Worksheets arrive in two parcels, each covering 10 sessions. Delivery takes about one week. Delivery is free in India and the UAE.",
            "Once a parcel is dispatched, we'll send the courier tracking details on WhatsApp or email.",
          ],
        },
        {
          heading: "Your delivery address",
          blocks: [
            "Please enter your full address and pincode correctly on the payment form. If you need to change it, tell us before the parcel is dispatched. If a parcel is returned to us because of an incorrect address or because nobody was available to receive it, we may charge the cost of sending it again.",
          ],
        },
        {
          heading: "Damaged or missing items",
          blocks: [
            "If your parcel arrives damaged or with items missing, please send us photos within 48 hours of delivery. We'll send a replacement for the damaged or missing items at no cost to you.",
          ],
        },
        {
          heading: "Refunds",
          blocks: [
            "For cancellations and refunds, including what happens to worksheets that have already been sent, see our [Refund & Cancellation Policy](/refund-policy).",
          ],
        },
      ]}
    />
  );
}
