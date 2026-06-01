import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Breadcrumb } from "@/components/breadcrumb";
import { AddressManager } from "@/components/account/address-manager";

export const metadata: Metadata = {
  title: "My Addresses",
};

export default async function AddressesPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/sign-in?callbackUrl=/account/addresses");
  }

  const addresses = await prisma.address.findMany({
    where: { userId: session.user.id },
    orderBy: [{ isDefault: "desc" }, { id: "desc" }],
  });

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "My Account", href: "/account" },
          { label: "Addresses" },
        ]}
      />

      <div className="mt-8 mb-8">
        <p className="mb-2 text-xs tracking-[0.25em] text-rosegold uppercase">
          Your details
        </p>
        <h1 className="font-heading text-3xl text-foreground sm:text-4xl">
          Saved addresses
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Save where you'd like your orders sent so checkout is quicker next
          time.
        </p>
      </div>

      <AddressManager addresses={addresses} />
    </div>
  );
}
