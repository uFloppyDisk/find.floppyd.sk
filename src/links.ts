import type { Link } from "../types/link.d.ts";

export default <Link[]>[
  {
    platform: 'site',
    href: 'https://io.floppyd.sk',

    title: 'FD I/O',
    subtitle:
      'A custom-built web platform for hosting my own web applications.',

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

    priority: true,
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
    category: 'software',
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
  {
    platform: 'custom',
    href: 'https://steamcommunity.com/sharedfiles/filedetails/?id=2494170635',

    icon: 'bomb',
    title: 'Ordnance',
    subtitle: "A steam workshop mod for voxel-based game 'Teardown' with over 100k unique visitors and subscribers.",

    category: 'software',
  },
];
