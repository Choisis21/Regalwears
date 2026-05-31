import { RefreshCw, ShieldCheck, Truck } from "lucide-react";

import { Stagger, StaggerItem } from "@/components/motion/reveal";

const badges = [
  {
    icon: Truck,
    title: "Free shipping",
    copy: "On every order over $100, sent with care.",
  },
  {
    icon: RefreshCw,
    title: "Easy returns",
    copy: "Changed your mind? You have 30 days, no fuss.",
  },
  {
    icon: ShieldCheck,
    title: "Secure payment",
    copy: "Checkout is encrypted and completely safe.",
  },
];

export function TrustBadges() {
  return (
    <section className="border-y border-border">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6">
        <Stagger className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          {badges.map((badge) => (
            <StaggerItem key={badge.title}>
              <div className="flex items-start gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-rosegold/15 text-rosegold">
                  <badge.icon className="size-6" />
                </div>
                <div>
                  <h3 className="font-heading text-lg text-foreground">
                    {badge.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {badge.copy}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
