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
    },
    {
        platform: 'site',
        href: 'https://io.floppyd.sk',

        title: 'FloppyDisk I/O',
    },
    {
        platform: 'youtube',
        href: 'https://floppyd.sk/yt-prod',

        title: 'productions',
    },
    {
        platform: 'youtube',
        href: 'https://floppyd.sk/yt-gaming',

        title: 'gaming',
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
    },
];
