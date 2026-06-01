import type { ReactNode } from "react";

import { Breadcrumb } from "@/components/breadcrumb";
import { Reveal } from "@/components/motion/reveal";

/** Shared shell for the static content pages (shipping, FAQ, legal, etc.). */
export function InfoPage({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: title }]} />
      <Reveal>
        <div className="mt-8">
          <h1 className="font-heading text-3xl text-foreground sm:text-4xl">
            {title}
          </h1>
          {intro && (
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              {intro}
            </p>
          )}
        </div>
      </Reveal>
      <div className="mt-10 space-y-10">{children}</div>
    </div>
  );
}

/** A titled prose block used inside InfoPage. */
export function InfoSection({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) {
  return (
    <Reveal>
      <section>
        <h2 className="font-heading text-xl text-foreground sm:text-2xl">
          {heading}
        </h2>
        <div className="mt-3 space-y-3 leading-relaxed text-foreground/80">
          {children}
        </div>
      </section>
    </Reveal>
  );
}
