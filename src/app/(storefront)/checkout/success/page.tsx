"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Loader2, Mail } from "lucide-react";

import { useCurrency } from "@/components/currency/currency-context";
import { readLastOrder, type PlacedOrder } from "@/lib/checkout";

export default function CheckoutSuccessPage() {
  const { format } = useCurrency();
  const [order, setOrder] = useState<PlacedOrder | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setOrder(readLastOrder());
    setReady(true);
  }, []);

  if (!ready) {
    return (
      <div className="mx-auto flex w-full max-w-7xl items-center justify-center px-4 py-32 sm:px-6">
        <Loader2 className="size-6 animate-spin text-burgundy" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="mx-auto w-full max-w-2xl px-4 py-24 text-center sm:px-6">
        <h1 className="font-heading text-3xl text-foreground">
          Nothing to show here
        </h1>
        <p className="mt-3 text-muted-foreground">
          We couldn't find a recent order. If you just placed one, your
          confirmation was sent to your email.
        </p>
        <Link
          href="/shop"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-burgundy px-8 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-burgundy/90"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-rosegold/15 text-rosegold">
          <CheckCircle2 className="size-8" />
        </div>
        <p className="mt-6 text-xs tracking-[0.25em] text-rosegold uppercase">
          Order confirmed
        </p>
        <h1 className="mt-3 font-heading text-3xl text-foreground sm:text-4xl">
          Thank you{order.name ? `, ${order.name.split(" ")[0]}` : ""}
        </h1>
        <p className="mt-3 text-muted-foreground">
          Your order is in. We're getting it ready with care.
        </p>
        <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-medium text-foreground">
          Order reference
          <span className="text-burgundy">{order.ref}</span>
        </p>
      </div>

      <div className="mt-10 rounded-2xl border border-border bg-card p-6">
        <ul className="space-y-4">
          {order.items.map((line) => (
            <li key={line.key} className="flex gap-4">
              <div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-secondary">
                <Image
                  src={line.image}
                  alt={line.name}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col">
                <span className="font-medium text-foreground">{line.name}</span>
                {(line.color || line.size) && (
                  <span className="text-sm text-muted-foreground">
                    {[line.color, line.size && `Size ${line.size}`]
                      .filter(Boolean)
                      .join(" · ")}
                  </span>
                )}
                <span className="text-sm text-muted-foreground">
                  Qty {line.quantity}
                </span>
              </div>
              <span className="font-medium text-burgundy">
                {format(line.price * line.quantity)}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-6 space-y-2 border-t border-border pt-4 text-sm">
          <div className="flex justify-between text-foreground/80">
            <span>Subtotal</span>
            <span>{format(order.subtotal)}</span>
          </div>
          <div className="flex justify-between text-foreground/80">
            <span>Shipping</span>
            <span>
              {order.shipping === 0 ? "Free" : format(order.shipping)}
            </span>
          </div>
          <div className="flex justify-between border-t border-border pt-3 text-base font-medium text-foreground">
            <span>Total</span>
            <span className="text-burgundy">{format(order.total)}</span>
          </div>
        </div>
      </div>

      {/* Shipping + contact */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-sm font-medium text-foreground">Shipping to</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {order.name}
            <br />
            {order.address.line1}
            {order.address.line2 ? (
              <>
                <br />
                {order.address.line2}
              </>
            ) : null}
            <br />
            {[order.address.city, order.address.state, order.address.postalCode]
              .filter(Boolean)
              .join(", ")}
            <br />
            {order.address.country}
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Mail className="size-4 text-rosegold" /> Confirmation sent to
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">{order.email}</p>
          <p className="mt-3 text-xs text-muted-foreground">
            A receipt and shipping updates will be emailed to you once order
            emails are switched on.
          </p>
        </div>
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/shop"
          className="inline-flex items-center justify-center rounded-full bg-burgundy px-8 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-burgundy/90"
        >
          Continue shopping
        </Link>
      </div>
    </div>
  );
}
