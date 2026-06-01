import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Heart, MapPin, Package, User } from "lucide-react";

import { auth } from "@/auth";
import { Breadcrumb } from "@/components/breadcrumb";
import { SignOutButton } from "@/components/auth/sign-out-button";

export const metadata: Metadata = {
  title: "My Account",
};

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/sign-in?callbackUrl=/account");
  }

  const firstName = session.user.name?.split(" ")[0] ?? "there";

  const cards = [
    {
      icon: Package,
      title: "Orders",
      body: "Track your orders and look back over everything you've bought.",
      cta: { label: "View orders", href: "/account/orders" },
    },
    {
      icon: Heart,
      title: "Wishlist",
      body: "Save the pieces you love so they're easy to find when you're ready.",
      cta: { label: "View wishlist", href: "/wishlist" },
    },
    {
      icon: MapPin,
      title: "Addresses",
      body: "Add a delivery address to make checkout quicker next time.",
      cta: { label: "Manage addresses", href: "/account/addresses" },
    },
  ];

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "My Account" }]} />

      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-xs tracking-[0.25em] text-rosegold uppercase">
            Your account
          </p>
          <h1 className="font-heading text-3xl text-foreground sm:text-4xl">
            Hello, {firstName}
          </h1>
        </div>
        <SignOutButton />
      </div>

      {/* Profile summary */}
      <div className="mt-8 flex items-center gap-4 rounded-2xl border border-border bg-card p-6">
        <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-rosegold/15 text-rosegold">
          <User className="size-6" />
        </div>
        <div>
          <p className="font-medium text-foreground">
            {session.user.name || "Welcome"}
          </p>
          <p className="text-sm text-muted-foreground">{session.user.email}</p>
        </div>
      </div>

      {/* Quick cards */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.title}
            className="flex flex-col rounded-2xl border border-border bg-card p-6"
          >
            <div className="flex size-11 items-center justify-center rounded-full bg-secondary text-burgundy">
              <card.icon className="size-5" />
            </div>
            <h2 className="mt-4 font-heading text-xl text-foreground">
              {card.title}
            </h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
              {card.body}
            </p>
            <Link
              href={card.cta.href}
              className="mt-4 text-sm font-medium text-burgundy underline-offset-4 hover:underline"
            >
              {card.cta.label}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
