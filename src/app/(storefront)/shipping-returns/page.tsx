import type { Metadata } from "next";

import { InfoPage, InfoSection } from "@/components/info-page";

export const metadata: Metadata = {
  title: "Shipping & Returns",
  description:
    "Everything you need to know about how we ship your Regal Wears order and how easy returns are if something isn't quite right.",
};

export default function ShippingReturnsPage() {
  return (
    <InfoPage
      title="Shipping & Returns"
      intro="Getting your order to you should feel as lovely as opening it. Here's exactly how shipping and returns work."
    >
      <InfoSection heading="Shipping options">
        <p>
          We offer complimentary standard shipping on every order over $100.
          Below that, standard shipping is a flat $8.
        </p>
        <ul className="ml-5 list-disc space-y-1.5">
          <li>Standard (3 to 5 business days)</li>
          <li>Express (1 to 2 business days) at checkout for a small fee</li>
          <li>
            International shipping is available to most countries, with rates
            shown at checkout
          </li>
        </ul>
      </InfoSection>

      <InfoSection heading="When your order ships">
        <p>
          Orders placed before 2pm on a weekday are packed and sent the same
          day. Anything after that, or over the weekend, goes out the next
          business day. You'll get a tracking link by email the moment it's on
          its way.
        </p>
      </InfoSection>

      <InfoSection heading="Returns made easy">
        <p>
          Changed your mind? No problem at all. You have 30 days from delivery
          to send something back, as long as it's unworn, with tags on, and in
          its original condition.
        </p>
        <p>
          Start a return from your account or just reply to your order email,
          and we'll send you a prepaid label. Once it reaches us, your refund is
          processed within 5 business days to your original payment method.
        </p>
      </InfoSection>

      <InfoSection heading="Exchanges">
        <p>
          Want a different size or colour? The quickest way is to return the
          original and place a new order, so your preferred piece is reserved
          for you right away.
        </p>
      </InfoSection>

      <InfoSection heading="Still have a question?">
        <p>
          Our team is always happy to help. Pop over to our contact page and
          we'll get back to you quickly.
        </p>
      </InfoSection>
    </InfoPage>
  );
}
