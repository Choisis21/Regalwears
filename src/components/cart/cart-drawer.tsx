"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";

import { useCart } from "@/components/cart/cart-context";
import { useCurrency } from "@/components/currency/currency-context";

const FREE_SHIPPING_THRESHOLD = 100;

export function CartDrawer() {
  const { isOpen, closeCart, lines, count, subtotal, setQuantity, removeItem } =
    useCart();
  const { format } = useCurrency();

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-[60] bg-burgundy/40 backdrop-blur-sm"
            aria-hidden
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-y-0 right-0 z-[60] flex w-full max-w-md flex-col bg-cream shadow-2xl"
            role="dialog"
            aria-label="Shopping bag"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <h2 className="flex items-center gap-2 font-heading text-xl text-foreground">
                <ShoppingBag className="size-5 text-burgundy" />
                Your bag
                {count > 0 && (
                  <span className="text-sm font-normal text-muted-foreground">
                    ({count})
                  </span>
                )}
              </h2>
              <button
                type="button"
                onClick={closeCart}
                aria-label="Close bag"
                className="text-foreground transition-colors hover:text-burgundy"
              >
                <X className="size-6" />
              </button>
            </div>

            {lines.length === 0 ? (
              /* Empty state */
              <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
                <div className="flex size-16 items-center justify-center rounded-full bg-secondary text-burgundy">
                  <ShoppingBag className="size-7" />
                </div>
                <p className="mt-5 font-heading text-lg text-foreground">
                  Your bag is empty
                </p>
                <p className="mt-2 max-w-xs text-sm text-muted-foreground">
                  Once you add a piece or two, they'll show up here ready for
                  checkout.
                </p>
                <Link
                  href="/shop"
                  onClick={closeCart}
                  className="mt-7 inline-flex items-center justify-center rounded-full bg-burgundy px-8 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-burgundy/90"
                >
                  Start shopping
                </Link>
              </div>
            ) : (
              <>
                {/* Free-shipping nudge */}
                <div className="border-b border-border bg-secondary/50 px-6 py-3 text-center text-xs text-foreground/80">
                  {remaining > 0 ? (
                    <>
                      You're {format(remaining)} away from{" "}
                      <span className="font-medium text-burgundy">
                        free shipping
                      </span>
                    </>
                  ) : (
                    <span className="font-medium text-burgundy">
                      You've unlocked free shipping
                    </span>
                  )}
                </div>

                {/* Lines */}
                <ul className="flex-1 divide-y divide-border overflow-y-auto px-6">
                  {lines.map((line) => (
                    <li key={line.key} className="flex gap-4 py-5">
                      <Link
                        href={`/product/${line.slug}`}
                        onClick={closeCart}
                        className="relative size-24 shrink-0 overflow-hidden rounded-lg bg-secondary"
                      >
                        <Image
                          src={line.image}
                          alt={line.name}
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                      </Link>

                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between gap-3">
                          <Link
                            href={`/product/${line.slug}`}
                            onClick={closeCart}
                            className="font-medium text-foreground transition-colors hover:text-burgundy"
                          >
                            {line.name}
                          </Link>
                          <button
                            type="button"
                            onClick={() => removeItem(line.key)}
                            aria-label={`Remove ${line.name}`}
                            className="text-muted-foreground transition-colors hover:text-destructive"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>

                        {(line.color || line.size) && (
                          <p className="mt-1 text-sm text-muted-foreground">
                            {[line.color, line.size && `Size ${line.size}`]
                              .filter(Boolean)
                              .join(" · ")}
                          </p>
                        )}

                        <div className="mt-auto flex items-center justify-between pt-3">
                          <div className="flex items-center rounded-full border border-border">
                            <button
                              type="button"
                              onClick={() =>
                                setQuantity(line.key, line.quantity - 1)
                              }
                              disabled={line.quantity <= 1}
                              aria-label="Decrease quantity"
                              className="flex size-8 items-center justify-center text-foreground transition-colors hover:text-burgundy disabled:opacity-40"
                            >
                              <Minus className="size-3.5" />
                            </button>
                            <span className="w-7 text-center text-sm font-medium">
                              {line.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                setQuantity(line.key, line.quantity + 1)
                              }
                              aria-label="Increase quantity"
                              className="flex size-8 items-center justify-center text-foreground transition-colors hover:text-burgundy"
                            >
                              <Plus className="size-3.5" />
                            </button>
                          </div>
                          <span className="font-medium text-burgundy">
                            {format(line.price * line.quantity)}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Footer */}
                <div className="border-t border-border px-6 py-5">
                  <div className="flex items-center justify-between text-base">
                    <span className="text-foreground">Subtotal</span>
                    <span className="font-medium text-burgundy">
                      {format(subtotal)}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Shipping and taxes are calculated at checkout.
                  </p>
                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="mt-4 flex h-12 items-center justify-center rounded-full bg-burgundy text-sm font-semibold text-cream transition-colors hover:bg-burgundy/90"
                  >
                    Checkout
                  </Link>
                  <button
                    type="button"
                    onClick={closeCart}
                    className="mt-3 w-full text-center text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-burgundy hover:underline"
                  >
                    Continue shopping
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
