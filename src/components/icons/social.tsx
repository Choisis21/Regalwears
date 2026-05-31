import type { SVGProps } from "react";

/**
 * Inline brand marks. lucide-react dropped social/brand icons in its 1.x line,
 * so we keep small recognisable SVGs here to avoid pulling in another icon set.
 */

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export function PinterestIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M8 20c1 .5 1.9 1 3.4 1A8.5 8.5 0 0 0 20 11.6 8 8 0 1 0 6 17" />
      <path d="m9.3 21 2.6-10" />
      <path d="M9.5 11.1a2.6 2.6 0 0 1 2.6-2.7c1.5 0 2.6 1.1 2.6 2.7 0 1.9-1.2 3.3-2.7 3.3a1.9 1.9 0 0 1-2-2.3" />
    </svg>
  );
}
