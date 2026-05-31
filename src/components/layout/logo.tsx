import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * Brand logo. Uses the full logo image as-is. `src` lets callers pick a colour
 * variant: the white wordmark for dark backgrounds, and the black wordmark for
 * light/cream backgrounds.
 */
export function Logo({
  src = "/regal-white.webp",
  onClick,
  className,
}: {
  src?: string;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="Regal Wears home"
      className={cn("inline-flex items-center", className)}
    >
      <Image
        src={src}
        alt="Regal Wears"
        width={143}
        height={60}
        priority
        className="h-12 w-auto sm:h-14"
      />
    </Link>
  );
}
