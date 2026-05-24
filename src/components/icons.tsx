import type { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement>;

export const FrontifyLogo = ({ className = "h-7 w-auto", ...rest }: Props) => (
  // Trefoil-style mark approximating Frontify's identity.
  <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2.5"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden
       className={className} {...rest}>
    <path d="M20 4 L34 12 L20 20 L6 12 Z" />
    <path d="M20 20 L34 28 L20 36 L6 28 Z" />
    <path d="M6 12 V28" />
    <path d="M34 12 V28" />
  </svg>
);

export const PlayTriangle = ({ className = "h-3 w-3", ...rest }: Props) => (
  <svg viewBox="0 0 12 12" fill="currentColor" aria-hidden className={className} {...rest}>
    <path d="M3 1.5 L10 6 L3 10.5 Z" />
  </svg>
);

export const ChevronDown = ({ className = "h-4 w-4", ...rest }: Props) => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className} {...rest}>
    <path d="M4 6l4 4 4-4" />
  </svg>
);

export const ChevronRight = ({ className = "h-4 w-4", ...rest }: Props) => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className} {...rest}>
    <path d="M6 4l4 4-4 4" />
  </svg>
);

export const ArrowRight = ({ className = "h-4 w-4", ...rest }: Props) => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className} {...rest}>
    <path d="M3 8h10M9 4l4 4-4 4" />
  </svg>
);

export const SearchIcon = ({ className = "h-4 w-4", ...rest }: Props) => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className} {...rest}>
    <circle cx="7" cy="7" r="5" />
    <path d="M14 14l-3-3" />
  </svg>
);

export const HamburgerIcon = ({ className = "h-5 w-5", ...rest }: Props) => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75"
       strokeLinecap="round" aria-hidden className={className} {...rest}>
    <path d="M3 7h14M3 13h14" />
  </svg>
);

export const SendIcon = ({ className = "h-4 w-4", ...rest }: Props) => (
  <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden className={className} {...rest}>
    <path d="M2 2 L14 8 L2 14 L4 8 Z" />
  </svg>
);

export const SparkleIcon = ({ className = "h-4 w-4", ...rest }: Props) => (
  <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden className={className} {...rest}>
    <path d="M8 1l1.4 4.2L13 6l-3.6 1.5L8 12l-1.4-4.5L3 6l3.6-0.8z" />
  </svg>
);

export const PlusIcon = ({ className = "h-4 w-4", ...rest }: Props) => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"
       strokeLinecap="round" aria-hidden className={className} {...rest}>
    <path d="M8 3v10M3 8h10" />
  </svg>
);

export const TagIcon = ({ className = "h-3.5 w-3.5", ...rest }: Props) => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className} {...rest}>
    <path d="M2 2h6l6 6-6 6-6-6z" />
    <circle cx="5" cy="5" r="1" fill="currentColor" />
  </svg>
);

export const LinkedInIcon = ({ className = "h-4 w-4", ...rest }: Props) => (
  <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden className={className} {...rest}>
    <path d="M2 2h12v12H2z M4.5 6h1.5v6H4.5z M4.5 4.5a1 1 0 1 1 1.6 0 1 1 0 0 1-1.6 0z M7.5 6h1.5v0.8c0.4-0.6 1-0.9 1.8-0.9 1.4 0 2.2 0.9 2.2 2.5V12h-1.5V8.7c0-0.9-0.4-1.4-1.1-1.4-0.8 0-1.4 0.6-1.4 1.5V12H7.5z" fillRule="evenodd" />
  </svg>
);

export const InstagramIcon = ({ className = "h-4 w-4", ...rest }: Props) => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden className={className} {...rest}>
    <rect x="2" y="2" width="12" height="12" rx="3" />
    <circle cx="8" cy="8" r="2.75" />
    <circle cx="11.5" cy="4.5" r="0.5" fill="currentColor" />
  </svg>
);

export const FacebookIcon = ({ className = "h-4 w-4", ...rest }: Props) => (
  <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden className={className} {...rest}>
    <path d="M9 14V8.5h1.8l0.3-2H9V5.3c0-0.6 0.2-1 1-1h1V2.5C10.7 2.4 10.1 2.4 9.5 2.4 7.9 2.4 7 3.3 7 4.9V6.5H5.2v2H7V14z" />
  </svg>
);

export const ArrowUpRight = ({ className = "h-4 w-4", ...rest }: Props) => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className} {...rest}>
    <path d="M5 11L11 5M6 5h5v5" />
  </svg>
);
