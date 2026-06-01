import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { getOrdersByEmail } from "@/lib/orders-store";
import { Breadcrumb } from "@/components/breadcrumb";
import { OrderHistory } from "@/components/account/order-history";

export const metadata: Metadata = {
  title: "My Orders",
};

export default async function OrdersPage() {
  const session = await auth();
  if (!session?.user?.email) {
    redirect("/sign-in?callbackUrl=/account/orders");
  }

  const orders = await getOrdersByEmail(session.user.email);

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "My Account", href: "/account" },
          { label: "Orders" },
        ]}
      />

      <div className="mt-8 mb-8">
        <p className="mb-2 text-xs tracking-[0.25em] text-rosegold uppercase">
          Your orders
        </p>
        <h1 className="font-heading text-3xl text-foreground sm:text-4xl">
          Order history
        </h1>
      </div>

      <OrderHistory orders={orders} />
    </div>
  );
}
