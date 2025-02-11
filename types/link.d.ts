import type { Categories } from "./categories.d.ts";
import type { IconName } from "@fortawesome/fontawesome-common-types";

type GenericLink = {
  platform: string;
  href: string;

  title: string;
  subtitle?: string;

  priority?: boolean;
  category?: Categories;
};

type StandardLink = GenericLink & {
  platform: string | 'site';
};

type CustomLink = GenericLink & {
  platform: 'custom';

  icon: IconName;
};

type Link = StandardLink | CustomLink;

export type { GenericLink, StandardLink, CustomLink, Link };

