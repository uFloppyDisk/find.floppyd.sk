<template>
  <div class="
      group flex justify-between items-center
      h-10
      bg-black/80
      border border-red-500
      transition
      translate-y-0 hover:-translate-y-1
      shadow-md hover:shadow-sm shadow-red-500
      cursor-pointer
    ">
    <div class="flex basis-8 md:basis-10 grow-0 shrink-0 h-full justify-center items-center">
      <font-awesome-icon 
        class="fa-1x scale-[1.5] md:scale-[1.7]"
        :icon="[
          'fab',
          link.icon ? link.icon : link.platform,
        ]"
      />
    </div>
    <div class="basis-full grow px-2 capitalize font-bold">
      {{ link.title }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import type links from '~/src/links';

defineProps<{
  link: typeof links[number];
}>();
</script>

<style></style>
