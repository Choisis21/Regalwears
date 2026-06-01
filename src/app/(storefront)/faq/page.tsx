import type { Metadata } from "next";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

import { InfoPage } from "@/components/info-page";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to the questions we hear most often about orders, shipping, sizing, returns, and looking after your Regal Wears pieces.",
};

const faqs = [
  {
    q: "How long will my order take to arrive?",
    a: "Standard shipping takes 3 to 5 business days, and express is 1 to 2. You'll get a tracking link by email as soon as your order is on its way.",
  },
  {
    q: "What's your return policy?",
    a: "You have 30 days from delivery to return anything unworn with its tags on. We'll send you a prepaid label and refund you within 5 business days of it reaching us.",
  },
  {
    q: "How do I know what size to order?",
    a: "Our size guide has a full measurement chart and tips for measuring at home. Each product page also flags if a piece runs small or large.",
  },
  {
    q: "Do you ship internationally?",
    a: "Yes, we ship to most countries. Your shipping rate and any duties are shown at checkout before you pay.",
  },
  {
    q: "Can I change or cancel my order?",
    a: "If your order hasn't shipped yet, get in touch quickly and we'll do our best to update or cancel it. Once it's on its way, you can use our easy returns instead.",
  },
  {
    q: "How should I care for my pieces?",
    a: "Care instructions are on the label of every piece and noted on its product page. As a rule of thumb, gentle washing and air drying keeps your favourites looking beautiful for longer.",
  },
];

export default function FaqPage() {
  return (
    <InfoPage
      title="Frequently asked questions"
      intro="Everything we get asked most, all in one place. Can't find what you need? We're only a message away."
    >
      <div className="space-y-3">
        {faqs.map((item) => (
          <details
            key={item.q}
            className="group rounded-2xl border border-border bg-card p-5 [&_summary::-webkit-details-marker]:hidden"
          >
            <summary className="flex cursor-pointer items-center justify-between gap-4 font-medium text-foreground">
              {item.q}
              <ChevronDown className="size-5 shrink-0 text-burgundy transition-transform group-open:rotate-180" />
            </summary>
            <p className="mt-3 leading-relaxed text-foreground/80">{item.a}</p>
          </details>
        ))}
      </div>

      <p className="text-foreground/80">
        Still have a question?{" "}
        <Link
          href="/contact"
          className="font-medium text-burgundy underline-offset-4 hover:underline"
        >
          Get in touch
        </Link>{" "}
        and we'll be glad to help.
      </p>
    </InfoPage>
  );
}
