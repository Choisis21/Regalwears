"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Heart,
  Menu,
  Search,
  ShoppingBag,
  User,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { navLinks, currencies } from "@/lib/placeholder-data";
import { cn } from "@/lib/utils";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [currency, setCurrency] = useState(currencies[0]);
  const [scrolled, setScrolled] = useState(false);
  const cartCount = 0; // wired to real state in the cart phase

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      {/* Slim announcement bar */}
      <div className="bg-burgundy text-center text-xs tracking-wide text-cream/90">
        <p className="px-4 py-2">
          Complimentary shipping over $100 &nbsp;·&nbsp; Easy 30-day returns
        </p>
      </div>

      {/* Main bar */}
      <div
        className={cn(
          "border-b transition-colors duration-300",
          scrolled
            ? "border-border bg-cream/90 backdrop-blur-md"
            : "border-transparent bg-cream",
        )}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="text-burgundy lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="size-6" />
          </button>

          {/* Logo */}
          <Link
            href="/"
            className="font-heading text-2xl tracking-tight text-burgundy sm:text-[1.7rem]"
          >
            Regal Wears
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative text-sm font-medium text-burgundy/80 transition-colors hover:text-burgundy"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-rosegold transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3 text-burgundy sm:gap-4">
            <div className="relative hidden sm:block">
              <button
                type="button"
                onClick={() => setCurrencyOpen((v) => !v)}
                className="flex items-center gap-1 text-sm text-burgundy/80 transition-colors hover:text-burgundy"
                aria-haspopup="listbox"
                aria-expanded={currencyOpen}
              >
                {currency.code}
                <ChevronDown className="size-3.5" />
              </button>
              <AnimatePresence>
                {currencyOpen && (
                  <motion.ul
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-0 mt-3 w-44 overflow-hidden rounded-xl border border-border bg-card py-1 shadow-xl shadow-burgundy/10"
                    role="listbox"
                  >
                    {currencies.map((c) => (
                      <li key={c.code}>
                        <button
                          type="button"
                          onClick={() => {
                            setCurrency(c);
                            setCurrencyOpen(false);
                          }}
                          className={cn(
                            "flex w-full items-center justify-between px-4 py-2 text-sm text-foreground/80 transition-colors hover:bg-secondary",
                            c.code === currency.code && "text-burgundy",
                          )}
                        >
                          <span>{c.label}</span>
                          <span className="text-muted-foreground">{c.symbol}</span>
                        </button>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            <button
              type="button"
              className="transition-colors hover:text-rosegold"
              aria-label="Search"
            >
              <Search className="size-5" />
            </button>
            <Link
              href="/account"
              className="hidden transition-colors hover:text-rosegold sm:block"
              aria-label="Account"
            >
              <User className="size-5" />
            </Link>
            <Link
              href="/wishlist"
              className="transition-colors hover:text-rosegold"
              aria-label="Wishlist"
            >
              <Heart className="size-5" />
            </Link>
            <Link
              href="/cart"
              className="relative transition-colors hover:text-rosegold"
              aria-label="Cart"
            >
              <ShoppingBag className="size-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 flex size-4 items-center justify-center rounded-full bg-rosegold text-[10px] font-semibold text-burgundy">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-50 bg-burgundy/40 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-cream p-6 lg:hidden"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="font-heading text-xl text-burgundy">
                  Regal Wears
                </span>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="text-burgundy"
                  aria-label="Close menu"
                >
                  <X className="size-6" />
                </button>
              </div>
              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-3 py-3 text-base text-burgundy/90 transition-colors hover:bg-secondary"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto flex items-center gap-2 border-t border-border pt-6 text-sm text-burgundy/80">
                <User className="size-4" />
                <Link href="/account" onClick={() => setMobileOpen(false)}>
                  Account
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
