type StandardLink = {
    platform: string | 'site';
    href: string;

    title: string;
    subtitle?: string;
};

type CustomLink = {
    platform: 'custom';
    href: string;

    title: string;
    subtitle?: string;

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
    },
    {
        platform: 'site',
        href: 'https://io.floppyd.sk',

        title: 'FD I/O',
        subtitle:
            'A custom-built web platform for hosting my own web applications.',
    },
    {
        platform: 'youtube',
        href: 'https://floppyd.sk/yt-prod',

        title: 'productions',
        subtitle: 'Professional video productions for clients or for fun!',
    },
    {
        platform: 'youtube',
        href: 'https://floppyd.sk/yt-gaming',

        title: 'gaming',
        subtitle: "Videos with goofs and gaffs, don't think too hard on it.",
    },
    {
        platform: 'twitch',
        href: 'https://floppyd.sk/twitch',

        title: 'twitch',
    },
    {
        platform: 'steam',
        href: 'https://floppyd.sk/steam',

        title: 'steam',
    },
    {
        platform: 'github',
        href: 'https://floppyd.sk/github',

        title: 'github',
        subtitle: "See what I'm working on!",
    },
    {
        platform: 'twitter',
        href: 'https://floppyd.sk/twitter',

        title: 'tweets',
    },
    {
        platform: 'instagram',
        href: 'https://floppyd.sk/instagram',

        title: 'images',
    },
    {
        platform: 'discord',
        href: 'https://floppyd.sk/discord',

        title: 'discord',
        subtitle: 'Official unofficial FloppyDisk hangout.',
    },
];
