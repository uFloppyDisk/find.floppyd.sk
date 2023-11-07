<template>
  <div class="
      group group/subtitle flex justify-between items-center
      h-10
      bg-black/80
      border border-red-500
      transition
      translate-y-0 hover:-translate-y-1
      cursor-pointer
    "
    :class="{
      'hover:border-b-0': link.subtitle
    }"
  >
    <div class="flex basis-8 md:basis-10 pl-1 grow-0 shrink-0 h-full justify-center items-center">
      <font-awesome-icon 
        v-if="link.platform === 'site'"
        class="fa-1x scale-[1.5] md:scale-[1.7]"
        :icon="[
          'fas',
          'globe'
        ]"
      />
      <font-awesome-icon 
        v-else-if="(link.platform === 'custom')"
        class="fa-1x scale-[1.5] md:scale-[1.7]"
        :icon="[
          'fas',
          (link as CustomLink).icon,
        ]"
      />
      <font-awesome-icon 
        v-else
        class="fa-1x scale-[1.5] md:scale-[1.7]"
        :icon="[
          'fab',
          link.platform,
        ]"
      />
    </div>
    <div class="basis-full grow px-2">
      <div 
        class="relative"
      >
        <span class="capitalize font-bold">
          {{ link.title }}
        </span>
      </div>
    </div>
    <div
      v-if="link.subtitle"
      class="
        subtitle
        absolute flex 
        top-full w-full mt-1 -translate-y-1
        text-sm text-center
        opacity-0 group-hover/subtitle:opacity-100 transition-opacity
        pointer-events-none
      "
    >
      <div class="basis-8 md:basis-10 pl-1 grow-0 shrink-0 border-t border-red-500"></div>
      <div
        class="basis-full h-full px-1.5 border border-t-0 border-dashed border-red-500 bg-black/80 break-words"
      >
        <div class="-translate-y-1">
          {{ link.subtitle }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { CustomLink, Link } from '~/src/links';

defineProps<{
  link: Link;
}>();
</script>

<style scoped>
.subtitle {
  width: calc(100% + 1px);
}
</style>