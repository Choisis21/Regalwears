import Link from "next/link";
import {
  AlertTriangle,
  DollarSign,
  MessageSquare,
  Package,
  ShoppingCart,
} from "lucide-react";

import { getAllProducts } from "@/lib/catalog-store";
import { getAllOrders } from "@/lib/orders-store";
import { getPendingReviews } from "@/lib/reviews-store";
import { formatPrice } from "@/lib/format";
import {
  RevenueChart,
  TopProductsChart,
  type RevenuePoint,
  type TopProduct,
} from "@/components/admin/admin-charts";

const LOW_STOCK_THRESHOLD = 3;

function lastDays(n: number): { key: string; label: string }[] {
  const out: { key: string; label: string }[] = [];
  const now = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    const label = d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    out.push({ key, label });
  }
  return out;
}

export default async function AdminDashboard() {
  const [products, orders, pendingReviews] = await Promise.all([
    getAllProducts(),
    getAllOrders(),
    getPendingReviews(),
  ]);

  const revenue = orders.reduce((sum, o) => sum + o.total, 0);
  const aov = orders.length ? revenue / orders.length : 0;
  const lowStock = products.filter(
    (p) => (p.stock ?? 0) <= LOW_STOCK_THRESHOLD,
  );

  // Revenue across the last 14 days.
  const days = lastDays(14);
  const byDay = new Map<string, number>(days.map((d) => [d.key, 0]));
  for (const o of orders) {
    const key = o.placedAt.slice(0, 10);
    if (byDay.has(key)) byDay.set(key, (byDay.get(key) ?? 0) + o.total);
  }
  const revenueSeries: RevenuePoint[] = days.map((d) => ({
    label: d.label,
    revenue: Math.round((byDay.get(d.key) ?? 0) * 100) / 100,
  }));

  // Top products by units sold.
  const units = new Map<string, number>();
  for (const o of orders) {
    for (const line of o.items) {
      units.set(line.name, (units.get(line.name) ?? 0) + line.quantity);
    }
  }
  const topProducts: TopProduct[] = [...units.entries()]
    .map(([name, u]) => ({ name, units: u }))
    .sort((a, b) => b.units - a.units)
    .slice(0, 5);

  const stats = [
    {
      label: "Revenue",
      value: formatPrice(revenue),
      icon: DollarSign,
      href: "/admin/orders",
    },
    {
      label: "Orders",
      value: String(orders.length),
      icon: ShoppingCart,
      href: "/admin/orders",
    },
    {
      label: "Avg. order",
      value: formatPrice(aov),
      icon: DollarSign,
      href: "/admin/orders",
    },
    {
      label: "Products",
      value: String(products.length),
      icon: Package,
      href: "/admin/products",
    },
  ];

  return (
    <div>
      <h1 className="font-heading text-3xl text-foreground">Dashboard</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        A quick look at how the shop is doing.
      </p>

      {/* Stat cards */}
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="rounded-2xl border border-border bg-card p-5 transition-colors hover:border-burgundy/40"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{s.label}</span>
              <s.icon className="size-4 text-rosegold" />
            </div>
            <p className="mt-2 font-heading text-2xl text-foreground">
              {s.value}
            </p>
          </Link>
        ))}
      </div>

      {/* Alerts */}
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Link
          href="/admin/reviews"
          className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-burgundy/40"
        >
          <div className="flex size-10 items-center justify-center rounded-full bg-secondary text-burgundy">
            <MessageSquare className="size-5" />
          </div>
          <div>
            <p className="font-medium text-foreground">
              {pendingReviews.length} review
              {pendingReviews.length === 1 ? "" : "s"} awaiting approval
            </p>
            <p className="text-sm text-muted-foreground">
              Moderate what goes live on the storefront.
            </p>
          </div>
        </Link>
        <Link
          href="/admin/products"
          className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-burgundy/40"
        >
          <div className="flex size-10 items-center justify-center rounded-full bg-secondary text-burgundy">
            <AlertTriangle className="size-5" />
          </div>
          <div>
            <p className="font-medium text-foreground">
              {lowStock.length} product{lowStock.length === 1 ? "" : "s"} low on
              stock
            </p>
            <p className="text-sm text-muted-foreground">
              At or below {LOW_STOCK_THRESHOLD} in stock.
            </p>
          </div>
        </Link>
      </div>

      {/* Charts */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-heading text-lg text-foreground">
            Revenue, last 14 days
          </h2>
          <div className="mt-4">
            <RevenueChart data={revenueSeries} />
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-heading text-lg text-foreground">
            Top sellers by units
          </h2>
          <div className="mt-4">
            <TopProductsChart data={topProducts} />
          </div>
        </div>
      </div>
    </div>
  );
}
