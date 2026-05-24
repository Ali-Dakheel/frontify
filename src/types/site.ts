// Shared content types for the Frontify clone

export type NavItem = {
  label: string;
  href: string;
  hasMenu?: boolean;
};

export type FooterColumn = {
  title: string;
  links: { label: string; href: string }[];
};

export type CustomerStory = {
  name: string;
  role: string;
  posterSrc: string;
  videoSrc: string;
  brandLogo: string;
  brandName: string;
};

export type AssetCard = {
  src: string;
  alt: string;
};

export type PartnerLogo = {
  src: string;
  name: string;
};

export type IntegrationCard = {
  src: string;
  name: string;
};

export type Template = {
  title: string;
  format: string;
};
