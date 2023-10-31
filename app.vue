<template>
  <div class="relative flex flex-col w-screen h-screen text-red-500 bg-[#0f0c0c]/90 font-mono">
    <div id="mask-scanlines" class="absolute w-screen h-screen"></div>
    <ScreenLoading />
    <div class="relative basis-12 px-6 bg-black/80 border-b border-red-500">
      <div class="flex h-full justify-between items-center">
        <div>
          <span>Floppy OS</span>
          <span class="ml-1 text-xs">v60.09</span>
        </div>
        <div class="flex flex-row gap-x-1">
          <ElementButton @click="toggleLinks">
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
          <ElementButton @click="goToLink('https://floppyd.sk/repo-find-floppyd-sk')">
            <font-awesome-icon
              :icon="['far', 'square-full']"
            />
          </ElementButton>
          <ElementButton @click="goHome">
            <font-awesome-icon 
              :icon="['fas', 'xmark']"
            />
          </ElementButton>
        </div>
      </div>
      <div class="absolute top-full mt-2 text-sm md:text-md xl:text-lg">
        <ElementShellLine>find -name "FloppyDisk" -type gamer -not cringe</ElementShellLine>
        <ElementShellLine>
          <span class="animate-pulse">
            <font-awesome-icon 
              class="scale-x-[.60] scale-y-95"
              :icon="['fas', 'square-full']"
            />
          </span>
        </ElementShellLine>
      </div>
    </div>
    <DisplayLinks :showLinks="showLinks" @click="goToLink" />
  </div>
</template>

<script setup lang="ts">
const showLinks = ref(true);

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

const genRandomString = (length?: number, base?: number) => {
  return Math.random().toString(base || 36).substring(2, length || 7);
}

if (process.browser) {
  const vanityUserName = `user-${genRandomString()}`;
  const vanityPath = window.location.pathname;

  const vanityUserNameElements = document.getElementsByClassName("d-user");
  Array.prototype.forEach.call(vanityUserNameElements, function (element) {
    element.innerHTML = vanityUserName;
  })

  const vanityPathElements = document.getElementsByClassName("d-path");
  Array.prototype.forEach.call(vanityPathElements, function (element) {
    element.innerHTML = vanityPath;
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

body {
  position: fixed;
  background-color: var(--fd-bg-color);
}

div {
  text-shadow: 0px 0px 5px #f00;
}

#mask-scanlines {
  z-index: 1000;
  background: repeating-linear-gradient( 0, #aaa, #aaa var(--scanline-off), #fff var(--scanline-off), #fff calc(var(--scanline-off) + var(--scanline-on)) );
  mix-blend-mode: multiply;
  pointer-events: none;
}
</style>
