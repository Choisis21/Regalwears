import type { Metadata } from "next";

import { InfoPage, InfoSection } from "@/components/info-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Regal Wears collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <InfoPage
      title="Privacy Policy"
      intro="Your trust matters to us. Here's how we look after the information you share with Regal Wears."
    >
      <p className="text-sm text-muted-foreground">Last updated: May 2026</p>

      <InfoSection heading="What we collect">
        <p>
          When you shop with us or create an account, we collect the details you
          give us, such as your name, email, shipping address, and order
          history. We also gather basic usage data to help the site run smoothly
          and to improve your experience.
        </p>
      </InfoSection>

      <InfoSection heading="How we use it">
        <ul className="ml-5 list-disc space-y-1.5">
          <li>To process and deliver your orders</li>
          <li>To keep you updated on your order and account</li>
          <li>To offer support when you need it</li>
          <li>
            To send you news and offers, but only if you've asked us to, and you
            can opt out any time
          </li>
        </ul>
      </InfoSection>

      <InfoSection heading="Keeping your data safe">
        <p>
          We use secure, encrypted connections and trusted payment providers, so
          your card details are never stored on our servers. We only keep your
          information for as long as we need it to serve you well.
        </p>
      </InfoSection>

      <InfoSection heading="Sharing">
        <p>
          We never sell your data. We share it only with the partners who help
          us run the shop, such as our payment, shipping, and email providers,
          and only as far as they need it to do their job.
        </p>
      </InfoSection>

      <InfoSection heading="Your choices">
        <p>
          You can view and update your details from your account at any time, or
          ask us to delete your data entirely. Just reach out through our
          contact page and we'll take care of it.
        </p>
      </InfoSection>

      <p className="text-sm text-muted-foreground">
        This policy is provided as part of a demo storefront and should be
        reviewed by a professional before any real-world use.
      </p>
    </InfoPage>
  );
}
