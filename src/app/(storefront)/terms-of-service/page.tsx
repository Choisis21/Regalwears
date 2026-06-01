import type { Metadata } from "next";

import { InfoPage, InfoSection } from "@/components/info-page";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that apply when you browse and shop with Regal Wears.",
};

export default function TermsOfServicePage() {
  return (
    <InfoPage
      title="Terms of Service"
      intro="These are the simple terms that apply when you use the Regal Wears site and place an order with us."
    >
      <p className="text-sm text-muted-foreground">Last updated: May 2026</p>

      <InfoSection heading="Using our site">
        <p>
          By browsing and shopping with Regal Wears, you agree to use the site
          fairly and lawfully. Please don't misuse it, attempt to disrupt it, or
          use our content without permission.
        </p>
      </InfoSection>

      <InfoSection heading="Orders and pricing">
        <p>
          We do our best to keep prices, descriptions, and availability
          accurate. If we spot an error on an order you've placed, we'll let you
          know and give you the choice to continue at the correct price or
          cancel for a full refund.
        </p>
      </InfoSection>

      <InfoSection heading="Payment">
        <p>
          Payment is taken securely at checkout through our trusted providers.
          Your order is confirmed once payment is successful and you receive a
          confirmation email.
        </p>
      </InfoSection>

      <InfoSection heading="Returns and refunds">
        <p>
          Our returns are covered in detail on the shipping and returns page.
          In short, you have 30 days to return unworn items with their tags for
          a refund.
        </p>
      </InfoSection>

      <InfoSection heading="Our content">
        <p>
          All imagery, text, and designs on this site belong to Regal Wears and
          may not be copied or reused without our written permission.
        </p>
      </InfoSection>

      <InfoSection heading="Changes">
        <p>
          We may update these terms from time to time. The latest version will
          always live on this page, with the date it was last updated.
        </p>
      </InfoSection>

      <p className="text-sm text-muted-foreground">
        These terms are provided as part of a demo storefront and should be
        reviewed by a professional before any real-world use.
      </p>
    </InfoPage>
  );
}
