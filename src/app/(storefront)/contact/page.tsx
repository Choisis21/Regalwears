import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

import { Breadcrumb } from "@/components/breadcrumb";
import { ContactForm } from "@/components/contact/contact-form";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Questions about an order, sizing, or styling? The Regal Wears team would love to help.",
};

const details = [
  { icon: Mail, label: "Email", value: "hello@regalwears.com", href: "mailto:hello@regalwears.com" },
  { icon: Phone, label: "Phone", value: "+1 (800) 734 2500", href: "tel:+18007342500" },
  { icon: MapPin, label: "Studio", value: "123 Fashion Avenue, New York, NY 10001" },
  { icon: Clock, label: "Hours", value: "Mon to Fri, 9am to 6pm EST" },
];

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Contact Us" }]} />

      <Reveal>
        <div className="mt-10 max-w-2xl">
          <p className="mb-3 text-xs tracking-[0.25em] text-rosegold uppercase">
            Get in touch
          </p>
          <h1 className="font-heading text-4xl text-foreground sm:text-5xl">
            We'd love to hear from you
          </h1>
          <p className="mt-4 text-muted-foreground">
            Whether it's a question about your order, a little styling advice, or
            help finding your size, our team is here and happy to help.
          </p>
        </div>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.4fr]">
        {/* Details */}
        <Reveal direction="right">
          <div className="space-y-7">
            {details.map((d) => (
              <div key={d.label} className="flex items-start gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-rosegold/15 text-rosegold">
                  <d.icon className="size-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{d.label}</p>
                  {d.href ? (
                    <a href={d.href} className="text-foreground transition-colors hover:text-burgundy">
                      {d.value}
                    </a>
                  ) : (
                    <p className="text-foreground">{d.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Form */}
        <Reveal direction="left">
          <ContactForm />
        </Reveal>
      </div>
    </div>
  );
}
