import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";

export function SectionHeading({
  eyebrow,
  title,
  link,
}: {
  eyebrow?: string;
  title: string;
  link?: { label: string; href: string };
}) {
  return (
    <Reveal direction="up">
      <div className="flex items-end justify-between gap-4">
        <div>
          {eyebrow && (
            <p className="mb-2.5 text-xs tracking-[0.25em] text-rosegold uppercase">
              {eyebrow}
            </p>
          )}
          <h2 className="font-heading text-3xl text-foreground sm:text-4xl">
            {title}
          </h2>
        </div>
        {link && (
          <Link
            href={link.href}
            className="group hidden shrink-0 items-center gap-1.5 border-b border-burgundy/30 pb-0.5 text-sm font-medium text-burgundy transition-colors hover:border-burgundy sm:flex"
          >
            {link.label}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        )}
      </div>
    </Reveal>
  );
}
