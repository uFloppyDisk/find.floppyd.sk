<template>
  <div class="flex flex-col h-screen text-red-500 bg-[#0f0c0c]/90 font-mono">
    <div class="basis-12 px-6 bg-black border border-red-500">
      <div class="flex h-full justify-between items-center">
        <div>
          $ find 'FloppyDisk'
        </div>
        <div class="flex flex-row gap-x-1">
          <div class="flex w-7 h-7 border border-red-500 justify-center items-center">
            <font-awesome-icon 
              :icon="['fas', 'minus']"
            />
          </div>
          <div class="flex w-7 h-7 border border-red-500 justify-center items-center">
            <font-awesome-icon
              :icon="['far', 'square-full']"
            />
          </div>
          <div class="flex w-7 h-7 border border-red-500 justify-center items-center">
            <font-awesome-icon 
              :icon="['fas', 'xmark']"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="flex basis-auto grow px-6 sm:px-12 md:px-36 items-center">
      <div class="grow flex flex-wrap text-center">
        <div
          v-for="link in links"
          :key="link.href"
          class="basis-1/3 xl:basis-1/4 p-2"
        >
          <SocialLink
            class="p-1 max-h-10"
            @click="goToLink(link.href)"
          >
            <template #icon>
              <font-awesome-icon 
                class="text-3xl"
                :icon="[
                  'fab',
                  link.icon ? link.icon : link.platform,
                ]"
              />
            </template>
            <template #info>{{ link.title }}</template>
          </SocialLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import links from '~/src/links';

const goToLink = (href: string) => {
  location.href = href;
}

</script>

<style>
body {
  background: repeating-linear-gradient( 0, #000, #000 2px, #f00 2px, #f00 4px );
}

div {
  text-shadow: 0px 0px 5px #f00;
}
</style>
