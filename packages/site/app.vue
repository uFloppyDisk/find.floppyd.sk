<template>
  <div class="relative flex flex-col w-screen h-screen text-red-500 bg-[#0f0c0c]/90 font-mono">
    <div id="mask-scanlines" class="absolute w-screen h-screen"></div>
    <ScreenLoading />
    <Shell class="absolute w-full h-full px-6 pt-14 text-sm md:text-base" />
    <div class="relative basis-12 shrink-0 px-6 bg-black/80 border-b border-red-500">
      <div class="flex h-full justify-between items-center select-none">
        <div class="inline-flex">
          <div class="inline-flex items-baseline">
            <span>Floppy OS</span>
            <span class="ml-1 text-xs">v60.09</span>
          </div>
          <span class="pl-3 pr-1">//</span>
          <div class="inline-flex">
            <NuxtLink 
              v-for="route in routes"
              :to="route.route"
            >
              <div class="px-2 hover:bg-red-500/50 transition-colors">{{ route.text}}</div>
            </NuxtLink>
          </div>
        </div>
        <div class="flex flex-row gap-x-1">
          <ElementButton 
            class="w-7 h-7"
            @click="toggleLinks"
          >
            <font-awesome-icon 
              class="absolute transition-opacity duration-75 delay-75"
              :class="{
                'opacity-0': !showLinks
              }"
              :icon="['fas', 'minus']"
            />
            <font-awesome-icon
              class="absolute transition-opacity duration-75 delay-75"
              :class="{
                'opacity-0': showLinks
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
      class="flex basis-auto grow px-4 sm:px-24 md:px-36 xl:px-48 2xl:px-96 items-start xl:items-center duration-300 transition select-none overflow-y-scroll"
      :class="{
        'opacity-0 pointer-events-none': !showLinks,
      }"
      >
      <div class="flex flex-col grow">
        <div class="xl:hidden pt-20"></div>
        <NuxtPage class="group flex grow py-2 pl-3 pr-2 gap-2 backdrop-blur-sm backdrop-brightness-50 border border-red-500/25" />
        <div class="xl:hidden pt-6"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type ContentStatus from './src/types/ContentStatus';

const routes = ref([
  { route: "/", text: "Find me" },
  { route: "/about", text: "About me" },
]);

const config = useRuntimeConfig()

const now = ref(Date.now());

const showLinks = ref(true);
const contentStatus = ref<ContentStatus>({
  twitch: {
    live: false,
    started_at: ''
  }
});

const contentTwitchUptimeSeconds: ComputedRef<number> = computed(() => {
    var dateStarted = null;
    try {
       dateStarted = new Date(contentStatus.value.twitch.started_at);
    } catch {
        return 0;
    }

    return now.value - (dateStarted.getTime());
})

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

const toggleLinks = () => {
  showLinks.value = !showLinks.value;
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
  --fd-bg-color: #8f0000;

  --scanline-off: 1px;
  --scanline-on: 1px;

  background-color: var(--fd-bg-color);
}

::selection {
  background: red;
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
  text-shadow: 0px 0px 5px #f00;
}

.router-link-exact-active {
  color: #000;
  background-color: #ef4444;
}

#mask-scanlines {
  z-index: 1000;
  background: repeating-linear-gradient( 0, #aaa, #aaa var(--scanline-off), #fff var(--scanline-off), #fff calc(var(--scanline-off) + var(--scanline-on)) );
  mix-blend-mode: multiply;
  pointer-events: none;
}
</style>
