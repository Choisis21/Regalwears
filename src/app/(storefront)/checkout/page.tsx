"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { CreditCard, Loader2, Lock, MapPin, Pencil, ShoppingBag } from "lucide-react";

import { useCart } from "@/components/cart/cart-context";
import { useCurrency } from "@/components/currency/currency-context";
import { Breadcrumb } from "@/components/breadcrumb";
import {
  makeOrderRef,
  saveLastOrder,
  shippingFor,
  type PlacedOrder,
  type ShippingAddress,
} from "@/lib/checkout";
import { recordOrderAction } from "@/app/(storefront)/checkout/actions";
import {
  getDefaultAddress,
  type SavedAddress,
} from "@/app/(storefront)/account/addresses/actions";

const COUNTRIES = [
  "United States",
  "United Kingdom",
  "Canada",
  "Ireland",
  "Nigeria",
  "Australia",
];

const inputClass =
  "h-12 w-full rounded-lg border border-border bg-card px-4 text-base text-foreground placeholder:text-muted-foreground/60 focus:border-burgundy focus:ring-2 focus:ring-burgundy/30 focus:outline-none";
const labelClass = "mb-1.5 block text-sm font-medium text-foreground";

export default function CheckoutPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { lines, subtotal, ready, clear } = useCart();
  const { format } = useCurrency();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [city, setCity] = useState("");
  const [stateRegion, setStateRegion] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState(COUNTRIES[0]);
  const [payMethod, setPayMethod] = useState<"card" | "paypal">("card");
  const [placing, setPlacing] = useState(false);

  // Saved default address for signed-in users.
  const [saved, setSaved] = useState<SavedAddress | null>(null);
  const [useNewAddress, setUseNewAddress] = useState(false);

  // Prefill from the signed-in user.
  useEffect(() => {
    if (session?.user?.email) setEmail((e) => e || session.user.email!);
    if (session?.user?.name) setName((n) => n || session.user.name!);
  }, [session]);

  // Pull the default address once we know there's a session.
  useEffect(() => {
    if (!session?.user) return;
    let active = true;
    getDefaultAddress().then((addr) => {
      if (active) setSaved(addr);
    });
    return () => {
      active = false;
    };
  }, [session]);

  const usingSaved = Boolean(saved) && !useNewAddress;

  const shipping = shippingFor(subtotal);
  const total = subtotal + shipping;

  const placeOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (lines.length === 0) return;
    setPlacing(true);

    const address: ShippingAddress = usingSaved
      ? {
          line1: saved!.line1,
          line2: saved!.line2 || undefined,
          city: saved!.city,
          state: saved!.state || undefined,
          postalCode: saved!.postalCode,
          country: saved!.country,
        }
      : {
          line1,
          line2: line2 || undefined,
          city,
          state: stateRegion || undefined,
          postalCode,
          country,
        };

    const orderName = usingSaved ? saved!.fullName : name;

    // Mock order placement — no payment is taken yet. When Stripe/PayPal are
    // wired, this is where we'd create a payment intent and persist the order.
    await new Promise((r) => window.setTimeout(r, 700));

    const order: PlacedOrder = {
      ref: makeOrderRef(),
      email,
      name: orderName,
      address,
      items: lines,
      subtotal,
      shipping,
      total,
      placedAt: new Date().toISOString(),
    };

    saveLastOrder(order);
    await recordOrderAction(order);

    clear();
    router.push("/checkout/success");
  };

  // Wait for the cart to hydrate before deciding it's empty.
  if (!ready) {
    return (
      <div className="mx-auto flex w-full max-w-7xl items-center justify-center px-4 py-32 sm:px-6">
        <Loader2 className="size-6 animate-spin text-burgundy" />
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Checkout" }]} />
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-secondary text-burgundy">
            <ShoppingBag className="size-7" />
          </div>
          <h1 className="mt-6 font-heading text-2xl text-foreground sm:text-3xl">
            Your bag is empty
          </h1>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            Add a piece or two and they'll be ready for checkout here.
          </p>
          <Link
            href="/shop"
            className="mt-7 inline-flex items-center justify-center rounded-full bg-burgundy px-8 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-burgundy/90"
          >
            Start shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Checkout" }]} />

      <h1 className="mt-8 font-heading text-3xl text-foreground sm:text-4xl">
        Checkout
      </h1>

      <form
        onSubmit={placeOrder}
        className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14"
      >
        {/* Left: details */}
        <div className="space-y-10">
          {/* Contact */}
          <section>
            <h2 className="font-heading text-xl text-foreground">Contact</h2>
            <div className="mt-4">
              <label htmlFor="email" className={labelClass}>
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className={inputClass}
              />
              {!session && (
                <p className="mt-2 text-sm text-muted-foreground">
                  Have an account?{" "}
                  <Link
                    href="/sign-in?callbackUrl=/checkout"
                    className="font-medium text-burgundy underline-offset-4 hover:underline"
                  >
                    Sign in
                  </Link>{" "}
                  for faster checkout.
                </p>
              )}
            </div>
          </section>

          {/* Shipping */}
          <section>
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-heading text-xl text-foreground">
                Shipping address
              </h2>
              {saved && (
                <button
                  type="button"
                  onClick={() => setUseNewAddress((v) => !v)}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-burgundy underline-offset-4 hover:underline"
                >
                  {usingSaved ? (
                    <>
                      <Pencil className="size-3.5" /> Use a different address
                    </>
                  ) : (
                    "Use saved address"
                  )}
                </button>
              )}
            </div>
            {usingSaved ? (
              <div className="mt-4 rounded-2xl border border-border bg-card p-5">
                <div className="flex flex-wrap items-center gap-2 text-burgundy">
                  <MapPin className="size-4" />
                  <span className="font-medium text-foreground">
                    {saved!.fullName}
                  </span>
                  <span className="rounded-full bg-rosegold/20 px-2 py-0.5 text-xs font-medium text-burgundy">
                    Default
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {saved!.line1}
                  {saved!.line2 ? `, ${saved!.line2}` : ""}
                  <br />
                  {[saved!.city, saved!.state, saved!.postalCode]
                    .filter(Boolean)
                    .join(", ")}
                  <br />
                  {saved!.country}
                  {saved!.phone ? (
                    <>
                      <br />
                      {saved!.phone}
                    </>
                  ) : null}
                </p>
              </div>
            ) : (
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="name" className={labelClass}>
                    Full name
                  </label>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className={inputClass}
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="line1" className={labelClass}>
                  Address
                </label>
                <input
                  id="line1"
                  type="text"
                  autoComplete="address-line1"
                  required
                  value={line1}
                  onChange={(e) => setLine1(e.target.value)}
                  placeholder="Street address"
                  className={inputClass}
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="line2" className={labelClass}>
                  Apartment, suite, etc. <span className="text-muted-foreground">(optional)</span>
                </label>
                <input
                  id="line2"
                  type="text"
                  autoComplete="address-line2"
                  value={line2}
                  onChange={(e) => setLine2(e.target.value)}
                  placeholder="Apartment, suite, unit"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="city" className={labelClass}>
                  City
                </label>
                <input
                  id="city"
                  type="text"
                  autoComplete="address-level2"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="City"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="state" className={labelClass}>
                  State / Region <span className="text-muted-foreground">(optional)</span>
                </label>
                <input
                  id="state"
                  type="text"
                  autoComplete="address-level1"
                  value={stateRegion}
                  onChange={(e) => setStateRegion(e.target.value)}
                  placeholder="State or region"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="postal" className={labelClass}>
                  Postal code
                </label>
                <input
                  id="postal"
                  type="text"
                  autoComplete="postal-code"
                  required
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder="Postal code"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="country" className={labelClass}>
                  Country
                </label>
                <select
                  id="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className={inputClass}
                >
                  {COUNTRIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              </div>
            )}
          </section>

          {/* Payment (mock) */}
          <section>
            <h2 className="font-heading text-xl text-foreground">Payment</h2>
            <div className="mt-3 flex items-start gap-2 rounded-lg bg-secondary/60 px-4 py-3 text-sm text-foreground/80">
              <Lock className="mt-0.5 size-4 shrink-0 text-rosegold" />
              <p>
                This is a demo checkout. No card is charged yet. Card and PayPal
                payments switch on once the payment keys are added.
              </p>
            </div>
            <div className="mt-4 space-y-3">
              <label
                className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3.5 transition-colors ${
                  payMethod === "card"
                    ? "border-burgundy bg-burgundy/5"
                    : "border-border"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={payMethod === "card"}
                  onChange={() => setPayMethod("card")}
                  className="accent-burgundy"
                />
                <CreditCard className="size-5 text-burgundy" />
                <span className="text-sm font-medium text-foreground">
                  Credit / debit card
                </span>
              </label>
              <label
                className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3.5 transition-colors ${
                  payMethod === "paypal"
                    ? "border-burgundy bg-burgundy/5"
                    : "border-border"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={payMethod === "paypal"}
                  onChange={() => setPayMethod("paypal")}
                  className="accent-burgundy"
                />
                <span className="font-heading text-sm font-semibold text-[#003087]">
                  Pay<span className="text-[#0070ba]">Pal</span>
                </span>
              </label>
            </div>
          </section>
        </div>

        {/* Right: order summary */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="font-heading text-xl text-foreground">Order summary</h2>

            <ul className="mt-5 space-y-4">
              {lines.map((line) => (
                <li key={line.key} className="flex gap-3">
                  <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-secondary">
                    <Image
                      src={line.image}
                      alt={line.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                    <span className="absolute -top-2 -right-2 flex size-5 items-center justify-center rounded-full bg-burgundy text-[10px] font-semibold text-cream">
                      {line.quantity}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col">
                    <span className="text-sm font-medium text-foreground">
                      {line.name}
                    </span>
                    {(line.color || line.size) && (
                      <span className="text-xs text-muted-foreground">
                        {[line.color, line.size && `Size ${line.size}`]
                          .filter(Boolean)
                          .join(" · ")}
                      </span>
                    )}
                    <span className="mt-auto text-sm text-burgundy">
                      {format(line.price * line.quantity)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 space-y-2 border-t border-border pt-4 text-sm">
              <div className="flex justify-between text-foreground/80">
                <span>Subtotal</span>
                <span>{format(subtotal)}</span>
              </div>
              <div className="flex justify-between text-foreground/80">
                <span>Shipping</span>
                <span>
                  {shipping === 0 ? "Free" : format(shipping)}
                </span>
              </div>
              <div className="flex justify-between border-t border-border pt-3 text-base font-medium text-foreground">
                <span>Total</span>
                <span className="text-burgundy">{format(total)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={placing}
              className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-burgundy text-sm font-semibold text-cream transition-colors hover:bg-burgundy/90 disabled:opacity-70"
            >
              {placing && <Loader2 className="size-4 animate-spin" />}
              {placing ? "Placing your order" : `Place order · ${format(total)}`}
            </button>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
              <Lock className="size-3" />
              Secure checkout
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
