"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";

import { formatPrice } from "@/lib/format";
import {
  deleteProductAction,
  setStockAction,
} from "@/app/admin/products/actions";

export type AdminProductRow = {
  id: string;
  name: string;
  slug: string;
  image: string;
  categorySlug: string;
  price: number;
  stock: number;
};

export function ProductsTable({ products }: { products: AdminProductRow[] }) {
  const [pending, startTransition] = useTransition();
  const [busyId, setBusyId] = useState<string | null>(null);

  const saveStock = (id: string, value: string) => {
    const stock = Number(value);
    if (Number.isNaN(stock)) return;
    setBusyId(id);
    startTransition(async () => {
      await setStockAction(id, stock);
      setBusyId(null);
    });
  };

  const remove = (id: string, name: string) => {
    if (!window.confirm(`Delete "${name}"? This can't be undone.`)) return;
    setBusyId(id);
    startTransition(async () => {
      await deleteProductAction(id);
      setBusyId(null);
    });
  };

  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-card">
      <table className="w-full min-w-[640px] text-sm">
        <thead>
          <tr className="border-b border-border text-left text-muted-foreground">
            <th className="px-4 py-3 font-medium">Product</th>
            <th className="px-4 py-3 font-medium">Category</th>
            <th className="px-4 py-3 font-medium">Price</th>
            <th className="px-4 py-3 font-medium">Stock</th>
            <th className="px-4 py-3 font-medium" />
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-b border-border/70 last:border-0">
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-secondary">
                    {p.image && (
                      <Image src={p.image} alt="" fill sizes="48px" className="object-cover" />
                    )}
                  </div>
                  <Link
                    href={`/product/${p.slug}`}
                    className="font-medium text-foreground transition-colors hover:text-burgundy"
                  >
                    {p.name}
                  </Link>
                </div>
              </td>
              <td className="px-4 py-3 capitalize text-muted-foreground">
                {p.categorySlug}
              </td>
              <td className="px-4 py-3 text-foreground">{formatPrice(p.price)}</td>
              <td className="px-4 py-3">
                <input
                  type="number"
                  min="0"
                  defaultValue={p.stock}
                  disabled={pending && busyId === p.id}
                  onBlur={(e) => {
                    if (Number(e.target.value) !== p.stock) {
                      saveStock(p.id, e.target.value);
                    }
                  }}
                  className={`h-9 w-20 rounded-lg border bg-card px-3 text-sm focus:border-burgundy focus:ring-2 focus:ring-burgundy/30 focus:outline-none ${
                    p.stock <= 3 ? "border-destructive/50 text-destructive" : "border-border text-foreground"
                  }`}
                />
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-1">
                  <Link
                    href={`/admin/products/${p.id}/edit`}
                    aria-label={`Edit ${p.name}`}
                    className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-burgundy"
                  >
                    <Pencil className="size-4" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => remove(p.id, p.name)}
                    disabled={pending && busyId === p.id}
                    aria-label={`Delete ${p.name}`}
                    className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-destructive disabled:opacity-50"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
