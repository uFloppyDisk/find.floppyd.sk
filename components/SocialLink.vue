<template>
  <div class="
      group group/subtitle flex justify-between items-center
      h-10
      bg-black/80
      border border-red-500
      transition
      translate-y-0 hover:-translate-y-1
      shadow-md hover:shadow-sm shadow-red-500
      cursor-pointer
    "
    :class="{
      'hover:border-b-0': link.subtitle
    }"
    @click="$emit('click', link.href)"
  >
    <div class="flex basis-8 pl-1 md:basis-10 grow-0 shrink-0 h-full justify-center items-center">
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
        :class="{
          'group-hover/subtitle:-translate-y-1/3 transition-transform': link.subtitle
        }"
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
        absolute top-full 
        w-full mt-1 p-1 -translate-y-1
        text-sm text-center
        border border-t-0 border-red-500 bg-black/80
        opacity-0 group-hover/subtitle:opacity-100 transition-opacity
      "
    >
        {{ link.subtitle }}
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

<style scoped>
.subtitle {
  width: calc(100% + 2px);
  left: -1px;
}
</style>
