import { getAllOrders } from "@/lib/orders-store";
import { OrdersTable } from "@/components/admin/orders-table";

export default async function AdminOrdersPage() {
  const orders = await getAllOrders();

  const rows = orders.map((o) => ({
    ref: o.ref,
    name: o.name,
    email: o.email,
    placedAt: o.placedAt,
    total: o.total,
    itemCount: o.items.reduce((n, l) => n + l.quantity, 0),
    status: o.status,
  }));

  return (
    <div>
      <h1 className="font-heading text-3xl text-foreground">Orders</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {orders.length} order{orders.length === 1 ? "" : "s"} so far.
      </p>
      <div className="mt-6">
        <OrdersTable orders={rows} />
      </div>
    </div>
  );
}
