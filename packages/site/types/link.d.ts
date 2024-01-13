import type { Categories } from "./categories.d.ts";

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

    icon: string;
};

type Link = StandardLink | CustomLink;

export type { GenericLink, StandardLink, CustomLink, Link };

