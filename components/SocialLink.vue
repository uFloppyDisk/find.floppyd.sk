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
    "
    @click="$emit('click', link.href)"
  >
    <div class="flex basis-8 md:basis-10 grow-0 shrink-0 h-full justify-center items-center">
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
    <div class="basis-full grow px-2 capitalize font-bold">
      {{ link.title }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { CustomLink, Link } from '~/src/links';

defineProps<{
  link: Link;
}>();

defineEmits<{
  (event: 'click', href: string): void
}>();
</script>

<style></style>
