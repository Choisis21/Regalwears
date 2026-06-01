"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
import { useSession } from "next-auth/react";

import { navLinks } from "@/lib/placeholder-data";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/layout/logo";
import { useCart } from "@/components/cart/cart-context";
import { useWishlist } from "@/components/wishlist/wishlist-context";
import { useCurrency } from "@/components/currency/currency-context";
import { SearchOverlay } from "@/components/search/search-overlay";

// Black wordmark for light/cream backgrounds (solid header, mobile drawer);
// white wordmark for the transparent header over a dark hero.
const LOGO_ON_LIGHT = "/regal-black.webp";
const LOGO_ON_DARK = "/regal-white.webp";

// Routes whose first section is a full-bleed image hero. The header sits
// transparently over these until the user scrolls.
function routeHasHero(pathname: string): boolean {
  if (pathname === "/") return true;
  if (pathname === "/about") return true;
  if (pathname === "/shop" || pathname.startsWith("/shop/")) return true;
  if (pathname.startsWith("/blog/")) return true; // blog posts, not the listing
  return false;
}

// Which nav item should read as "current" for a given path.
function isActiveLink(href: string, pathname: string): boolean {
  if (href === "/") return pathname === "/";
  if (href === "/shop") {
    return (
      pathname === "/shop" ||
      pathname.startsWith("/shop/") ||
      pathname.startsWith("/product/")
    );
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const overHero = routeHasHero(pathname);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const currencyRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const { count: cartCount, openCart } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { currency, currencies: currencyList, setCurrency } = useCurrency();
  const { status } = useSession();
  const authed = status === "authenticated";
  const accountHref = authed ? "/account" : "/sign-in";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the currency menu when clicking anywhere outside it.
  useEffect(() => {
    if (!currencyOpen) return;
    const onDown = (e: MouseEvent) => {
      if (currencyRef.current && !currencyRef.current.contains(e.target as Node)) {
        setCurrencyOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [currencyOpen]);

  // Transparent only while resting at the top of a hero page.
  const transparent = overHero && !scrolled;
  const fg = transparent ? "text-cream" : "text-burgundy";

  return (
    <header
      className={cn("z-50", overHero ? "fixed inset-x-0 top-0" : "sticky top-0")}
    >
      {/* Slim announcement bar (always visible, on every page) */}
      <div className="bg-burgundy text-center text-cream/90">
        <p className="px-4 py-2 text-xs tracking-wide">
          Complimentary shipping over $100 &nbsp;·&nbsp; Easy 30-day returns
        </p>
      </div>

      {/* Main bar */}
      <div
        className={cn(
          "relative border-b transition-colors duration-300",
          transparent
            ? "border-transparent bg-transparent"
            : "border-border bg-cream/90 backdrop-blur-md",
        )}
      >
        <div className="relative mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className={cn("transition-colors lg:hidden", fg)}
            aria-label="Open menu"
          >
            <Menu className="size-6" />
          </button>

          {/* Logo (light wordmark over the dark/transparent header, dark over cream) */}
          <Logo src={transparent ? LOGO_ON_DARK : LOGO_ON_LIGHT} />

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => {
              const active = isActiveLink(link.href, pathname);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "group relative text-sm font-medium transition-colors",
                    transparent
                      ? active
                        ? "text-cream"
                        : "text-cream/85 hover:text-cream"
                      : active
                        ? "text-burgundy"
                        : "text-burgundy/80 hover:text-burgundy",
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute -bottom-1 left-0 h-px bg-rosegold transition-all duration-300",
                      active ? "w-full" : "w-0 group-hover:w-full",
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className={cn("flex items-center gap-3 transition-colors sm:gap-4", fg)}>
            <div ref={currencyRef} className="relative hidden sm:block">
              <button
                type="button"
                onClick={() => setCurrencyOpen((v) => !v)}
                className={cn(
                  "flex items-center gap-1 text-sm transition-colors",
                  transparent ? "text-cream/85 hover:text-cream" : "text-burgundy/80 hover:text-burgundy",
                )}
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
                    {currencyList.map((c) => (
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
              onClick={() => setSearchOpen(true)}
              className="transition-colors hover:text-rosegold"
              aria-label="Search"
            >
              <Search className="size-5" />
            </button>
            <Link
              href={accountHref}
              className="hidden transition-colors hover:text-rosegold sm:block"
              aria-label={authed ? "My account" : "Sign in"}
            >
              <User className="size-5" />
            </Link>
            <Link
              href="/wishlist"
              className="relative transition-colors hover:text-rosegold"
              aria-label={`Wishlist${wishlistCount > 0 ? `, ${wishlistCount} saved` : ""}`}
            >
              <Heart className="size-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 flex size-4 items-center justify-center rounded-full bg-rosegold text-[10px] font-semibold text-burgundy">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <button
              type="button"
              onClick={openCart}
              className="relative transition-colors hover:text-rosegold"
              aria-label={`Bag${cartCount > 0 ? `, ${cartCount} item${cartCount === 1 ? "" : "s"}` : ""}`}
            >
              <ShoppingBag className="size-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 flex size-4 items-center justify-center rounded-full bg-rosegold text-[10px] font-semibold text-burgundy">
                  {cartCount}
                </span>
              )}
            </button>
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
                <Logo src={LOGO_ON_LIGHT} onClick={() => setMobileOpen(false)} />
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
                {navLinks.map((link) => {
                  const active = isActiveLink(link.href, pathname);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "rounded-lg px-3 py-3 text-base transition-colors",
                        active
                          ? "bg-secondary font-medium text-burgundy"
                          : "text-burgundy/90 hover:bg-secondary",
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
              <div className="mt-auto flex items-center gap-2 border-t border-border pt-6 text-sm text-burgundy/80">
                <User className="size-4" />
                <Link href={accountHref} onClick={() => setMobileOpen(false)}>
                  {authed ? "My account" : "Sign in"}
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
