import type { Categories } from './categories.ts';

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

export type { StandardLink, CustomLink, Link };

export default <Link[]>[
    {
        platform: 'site',
        href: 'https://floppydiskprod.com',

        title: 'FloppyDiskProd',
        subtitle:
            'Business-oriented and client-facing portfolio and marketplace.',

        priority: true,
        category: 'software',
    },
    {
        platform: 'site',
        href: 'https://io.floppyd.sk',

        title: 'FD I/O',
        subtitle:
            'A custom-built web platform for hosting my own web applications.',

        priority: true,
        category: 'software',
    },
    {
        platform: 'youtube',
        href: 'https://floppyd.sk/yt-prod',

        title: 'productions',
        subtitle: 'Professional video productions for clients or for fun!',

        category: 'content',
    },
    {
        platform: 'youtube',
        href: 'https://floppyd.sk/yt-gaming',

        title: 'gaming',
        subtitle: 'Laid-back videos with goofs and gaffs.',

        category: 'content',
    },
    {
        platform: 'twitch',
        href: 'https://floppyd.sk/twitch',

        title: 'twitch',

        category: 'content',
    },
    {
        platform: 'discord',
        href: 'https://floppyd.sk/discord',

        title: 'discord',
        subtitle: 'Official unofficial FloppyDisk hangout.',

        category: 'social',
    },
    {
        platform: 'steam',
        href: 'https://floppyd.sk/steam',

        title: 'steam',

        category: 'social',
    },
    {
        platform: 'github',
        href: 'https://floppyd.sk/github',

        title: 'github',
        subtitle: "See what I'm working on!",

        priority: true,
        category: 'social',
    },
    {
        platform: 'twitter',
        href: 'https://floppyd.sk/twitter',

        title: 'tweets',

        category: 'social',
    },
    {
        platform: 'instagram',
        href: 'https://floppyd.sk/instagram',

        title: 'images',

        category: 'social',
    },
];
