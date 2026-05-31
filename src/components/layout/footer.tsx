"use client";

import { useState } from "react";
import Link from "next/link";
import { Send } from "lucide-react";

import {
  FacebookIcon,
  InstagramIcon,
  PinterestIcon,
} from "@/components/icons/social";
import { Logo } from "@/components/layout/logo";

const columns = [
  {
    heading: "Shop",
    links: [
      { label: "New In", href: "/shop/new" },
      { label: "Dresses", href: "/shop/dresses" },
      { label: "Tops & Blouses", href: "/shop/tops" },
      { label: "Occasion", href: "/shop/occasion" },
    ],
  },
  {
    heading: "Help",
    links: [
      { label: "Contact us", href: "/contact" },
      { label: "Shipping & returns", href: "/shipping-returns" },
      { label: "Size guide", href: "/size-guide" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    heading: "About",
    links: [
      { label: "Our story", href: "/about" },
      { label: "Style Stories", href: "/blog" },
      { label: "Privacy policy", href: "/privacy-policy" },
      { label: "Terms of service", href: "/terms-of-service" },
    ],
  },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <footer className="bg-burgundy text-cream">
      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
          {/* Brand + newsletter */}
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 max-w-sm text-sm text-cream/70">
              Beautifully made ladies' wear for the moments worth dressing up
              for. Join us and be first to see what's new.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email) setSubmitted(true);
              }}
              className="mt-6 flex max-w-sm items-center gap-2"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
                className="h-11 w-full min-w-0 flex-1 rounded-full border border-cream/20 bg-cream/10 px-4 text-base text-cream placeholder:text-cream/50 focus:border-rosegold focus:ring-2 focus:ring-rosegold/40 focus:outline-none"
              />
              <button
                type="submit"
                className="flex size-11 shrink-0 items-center justify-center rounded-full bg-rosegold text-burgundy transition-opacity hover:opacity-90"
                aria-label="Subscribe"
              >
                <Send className="size-4" />
              </button>
            </form>
            {submitted && (
              <p className="mt-3 text-sm text-rosegold">
                You're on the list. Welcome to the family.
              </p>
            )}
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.heading}>
              <h3 className="font-heading text-lg text-cream">{col.heading}</h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-cream/70 transition-colors hover:text-rosegold"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-cream/15 pt-8 sm:flex-row">
          <p className="text-sm text-cream/60">
            © {new Date().getFullYear()} Regal Wears. Made with love.
          </p>
          <div className="flex items-center gap-4 text-cream/80">
            <Link href="https://instagram.com" aria-label="Instagram" className="transition-colors hover:text-rosegold">
              <InstagramIcon className="size-5" />
            </Link>
            <Link href="https://facebook.com" aria-label="Facebook" className="transition-colors hover:text-rosegold">
              <FacebookIcon className="size-5" />
            </Link>
            <Link href="https://pinterest.com" aria-label="Pinterest" className="transition-colors hover:text-rosegold">
              <PinterestIcon className="size-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
