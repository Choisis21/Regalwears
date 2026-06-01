import Image from "next/image";
import Link from "next/link";
import { Package } from "lucide-react";

import type { StoredOrder } from "@/lib/orders-store";
import { Price } from "@/components/currency/currency-context";

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const STATUS_STYLES: Record<string, string> = {
  PROCESSING: "bg-rosegold/15 text-burgundy",
  SHIPPED: "bg-blue-100 text-blue-700",
  DELIVERED: "bg-green-100 text-green-700",
  CANCELLED: "bg-secondary text-muted-foreground",
};

function statusLabel(status: string): string {
  return status.charAt(0) + status.slice(1).toLowerCase();
}

export function OrderHistory({ orders }: { orders: StoredOrder[] }) {
  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-secondary text-burgundy">
          <Package className="size-7" />
        </div>
        <h2 className="mt-6 font-heading text-2xl text-foreground">
          No orders yet
        </h2>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          When you place an order, it'll show up here so you can keep track of
          it.
        </p>
        <Link
          href="/shop"
          className="mt-7 inline-flex items-center justify-center rounded-full bg-burgundy px-8 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-burgundy/90"
        >
          Start shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <div
          key={order.ref}
          className="rounded-2xl border border-border bg-card p-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
            <div>
              <p className="text-sm text-muted-foreground">
                Order{" "}
                <span className="font-medium text-burgundy">{order.ref}</span>
              </p>
              <p className="text-xs text-muted-foreground">
                Placed {formatDate(order.placedAt)}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  STATUS_STYLES[order.status] ?? STATUS_STYLES.PROCESSING
                }`}
              >
                {statusLabel(order.status)}
              </span>
              <span className="font-medium text-burgundy">
                <Price amount={order.total} />
              </span>
            </div>
          </div>

          <ul className="mt-4 space-y-3">
            {order.items.map((line) => (
              <li key={line.key} className="flex items-center gap-3">
                <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-secondary">
                  <Image
                    src={line.image}
                    alt={line.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <Link
                    href={`/product/${line.slug}`}
                    className="truncate text-sm font-medium text-foreground transition-colors hover:text-burgundy"
                  >
                    {line.name}
                  </Link>
                  <p className="text-xs text-muted-foreground">
                    Qty {line.quantity}
                    {line.size ? ` · Size ${line.size}` : ""}
                  </p>
                </div>
                <span className="text-sm text-muted-foreground">
                  <Price amount={line.price * line.quantity} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
