"use client";

import { useTransition } from "react";

import { ORDER_STATUSES, type OrderStatus } from "@/lib/order-status";
import { formatPrice } from "@/lib/format";
import { updateOrderStatusAction } from "@/app/admin/orders/actions";

export type AdminOrderRow = {
  ref: string;
  name: string;
  email: string;
  placedAt: string;
  total: number;
  itemCount: number;
  status: OrderStatus;
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function OrdersTable({ orders }: { orders: AdminOrderRow[] }) {
  const [pending, startTransition] = useTransition();

  const change = (ref: string, status: OrderStatus) => {
    startTransition(async () => {
      await updateOrderStatusAction(ref, status);
    });
  };

  if (orders.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-card p-12 text-center text-sm text-muted-foreground">
        No orders yet. They'll appear here as customers check out.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-card">
      <table className="w-full min-w-[720px] text-sm">
        <thead>
          <tr className="border-b border-border text-left text-muted-foreground">
            <th className="px-4 py-3 font-medium">Order</th>
            <th className="px-4 py-3 font-medium">Customer</th>
            <th className="px-4 py-3 font-medium">Date</th>
            <th className="px-4 py-3 font-medium">Items</th>
            <th className="px-4 py-3 font-medium">Total</th>
            <th className="px-4 py-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.ref} className="border-b border-border/70 last:border-0">
              <td className="px-4 py-3 font-medium text-burgundy">{o.ref}</td>
              <td className="px-4 py-3">
                <div className="text-foreground">{o.name}</div>
                <div className="text-xs text-muted-foreground">{o.email}</div>
              </td>
              <td className="px-4 py-3 text-muted-foreground">
                {formatDate(o.placedAt)}
              </td>
              <td className="px-4 py-3 text-muted-foreground">{o.itemCount}</td>
              <td className="px-4 py-3 text-foreground">
                {formatPrice(o.total)}
              </td>
              <td className="px-4 py-3">
                <select
                  value={o.status}
                  disabled={pending}
                  onChange={(e) => change(o.ref, e.target.value as OrderStatus)}
                  className="h-9 rounded-lg border border-border bg-card px-3 text-sm focus:border-burgundy focus:ring-2 focus:ring-burgundy/30 focus:outline-none"
                >
                  {ORDER_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s.charAt(0) + s.slice(1).toLowerCase()}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
