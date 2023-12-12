<template>
  <div id="mask-scanlines" class="absolute w-screen h-screen"></div>
  <div class="fixed flex flex-col w-full h-full text-primary-500 bg-[var(--fd-bg-color)] font-mono">
    <ScreenLoading />
    <Shell class="absolute w-full h-full pt-12 text-sm md:text-base" />
    <div class="relative basis-12 shrink-0 px-6 bg-black/80 border-b border-primary-500">
      <div class="flex h-full justify-between items-center select-none">
        <div class="inline-flex grow">
          <div class="inline-flex pr-3">
            <div id="logo" class="w-5 h-full bg-primary-500"></div>
          </div>
          <span class="hidden sm:inline-block">//</span>
          <div class="inline-flex pl-1">
            <NuxtLink 
              v-for="route in routes"
              :to="route.route"
            >
              <div class="px-2 hover:bg-primary-500 hover:text-black transition-colors">{{ route.text }}</div>
            </NuxtLink>
          </div>
        </div>
        <div class="flex flex-row gap-x-1">
          <ElementButton 
            class="w-7 h-7"
            @click="toggleContent"
          >
            <font-awesome-icon 
              class="absolute transition-opacity duration-75 delay-75"
              :class="{
                'opacity-0': !showContent
              }"
              :icon="['fas', 'minus']"
            />
            <font-awesome-icon
              class="absolute transition-opacity duration-75 delay-75"
              :class="{
                'opacity-0': showContent
              }"
              :icon="['fas', 'plus']"
            />
          </ElementButton>
          <ElementButton 
            class="w-7 h-7"
            @click="goToLink('https://floppyd.sk/repo-find-floppyd-sk')"
          >
            <font-awesome-icon
              :icon="['far', 'square-full']"
            />
          </ElementButton>
          <ElementButton
            class="w-7 h-7"
            @click="goHome"
          >
            <font-awesome-icon 
              :icon="['fas', 'xmark']"
            />
          </ElementButton>
        </div>
      </div>
    </div>
    <div 
      class="flex basis-auto grow px-4 sm:px-24 md:px-36 xl:px-48 2xl:px-96 items-start xl:items-center duration-300 transition overflow-y-scroll"
      :class="{
        'opacity-0 pointer-events-none': !showContent,
      }"
      >
      <div class="flex flex-col grow">
        <div class="xl:hidden pt-10 sm:pt-14 md:pt-20"></div>
        <NuxtPage class="group flex grow py-2 pl-3 pr-2 gap-2 backdrop-blur-sm backdrop-brightness-50 border border-primary-500" />
        <div class="xl:hidden pt-10"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type ContentStatus from './src/types/ContentStatus';
import links from './src/links.ts';
import { generateLinkCategories } from './src/categories.ts';

const routes = ref([
  { route: "/", text: "Find me" },
  { route: "/about", text: "About me" },
]);

const config = useRuntimeConfig();
const now = ref(Date.now());
const showContent = ref(true);

const categories = ref(generateLinkCategories(links));

const contentStatus = ref<ContentStatus>({
  twitch: {
    live: false,
    started_at: ''
  }
});

const contentTwitchUptimeSeconds: ComputedRef<number> = computed(() => {
    try {
      const dateStarted = new Date(contentStatus.value.twitch.started_at);
      return now.value - dateStarted.getTime();
    } catch {
      return 0;
    }
})

provide("now", readonly(now));
provide("categories", readonly(categories));
provide("contentStatus", readonly(contentStatus));
provide("contentTwitchUptimeSeconds", contentTwitchUptimeSeconds);

useSeoMeta({
  title: 'Find FloppyDisk',
  ogTitle: 'Find FloppyDisk Everywhere',
  description: 'Find FloppyDisk in all corners of the internet.',
  ogDescription: 'Find FloppyDisk (Pawel Bartusiak) in all corners of the internet.',
  ogImage: 'https://cdn.floppydiskprod.com/assets/logo.png',
  twitterCard: 'app',
})

const goToLink = (href: string) => {
  window.open(href, '_blank', 'noopener')
}

const goHome = () => {
  const ua = navigator.userAgent;
  const info = {
    browser: /Edge\/\d+/.test(ua) ? 'ed' : /MSIE 9/.test(ua) ? 'ie9' : /MSIE 10/.test(ua) ? 'ie10' : /MSIE 11/.test(ua) ? 'ie11' : /MSIE\s\d/.test(ua) ? 'ie?' : /rv\:11/.test(ua) ? 'ie11' : /Firefox\W\d/.test(ua) ? 'ff' : /Chrom(e|ium)\W\d|CriOS\W\d/.test(ua) ? 'gc' : /\bSafari\W\d/.test(ua) ? 'sa' : /\bOpera\W\d/.test(ua) ? 'op' : /\bOPR\W\d/i.test(ua) ? 'op' : typeof PointerEvent !== 'undefined' ? 'ie?' : '',
  };

  let home = 'about:blank';
  switch (info.browser) {
    case ('gc'):
      home = 'https://www.google.com/_/chrome/newtab';
      break;
    
    case ('op'):
      home = 'about:speeddial';
      break;

    case ('sa'):
      home = 'http://livepage.apple.com';
      break;
  }

  window.location.href = home;
};

const toggleContent = () => {
  showContent.value = !showContent.value;
}

const updateNow = () => {
    now.value = Date.now();
}

if (process.browser) {
  const {data} = await useFetch(config.public.CFWorkerTwitchGetStatus, { })

  setInterval(updateNow, 1000);

  watch(data, (value, _) => {
    contentStatus.value = { twitch: (value as ContentStatus['twitch']) };
  })
}

</script>

<style>
:root {
  --scanline-off: 1px;
  --scanline-on: 1px;

  --fd-bg-color: var(--color-primary-950);
  /* --fd-bg-color: #8f0000; */

  --color-primary-50:  theme('colors.red.50');
  --color-primary-100: theme('colors.red.100');
  --color-primary-200: theme('colors.red.200');
  --color-primary-300: theme('colors.red.300');
  --color-primary-400: theme('colors.red.400');
  --color-primary-500: theme('colors.red.500');
  --color-primary-600: theme('colors.red.600');
  --color-primary-700: theme('colors.red.700');
  --color-primary-800: theme('colors.red.800');
  --color-primary-900: theme('colors.red.900');
  --color-primary-950: theme('colors.red.950');
}

::selection {
  background: var(--color-primary-500);
  color: black;
}

::-webkit-scrollbar {
  width: 0;
  height: 0;
}

body {
  position: fixed;
  background-color: var(--fd-bg-color);
}

div {
  text-shadow: 0px 0px 0.5px var(--color-primary-500);
}

.router-link-exact-active {
  color: #000;
  background-color: var(--color-primary-500) !important;
}

#mask-scanlines {
  z-index: 1000;
  background: repeating-linear-gradient( 0, #bbb, #bbb var(--scanline-off), #fff var(--scanline-off), #fff calc(var(--scanline-off) + var(--scanline-on)) );
  mix-blend-mode: multiply;
  pointer-events: none;
}

#logo {
  mask-image: url("/svg/logo_simple.svg");
  mask-repeat: no-repeat;
  mask-position: 50%;
}
</style>
