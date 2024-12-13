<template>
  <div class="flex">
    <div class="basis-4 mr-2 text-center text-lg opacity-75 select-none">
      <div v-if="heading === 3">/</div>
      <div v-else-if="heading === 2">&</div>
      <div v-else>#</div>
    </div>
    <component
      class="self-center font-bold whitespace-pre"
      :class="{
        'text-lg': !heading,
        'text-base': heading === 2,
        'text-sm': heading === 3,
      }"
      :is="tag"
    >
      <slot />
      <span v-if="cursor" class="animate-pulse select-none">_</span>
    </component>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    heading?: number;
    cursor?: boolean;
  }>();

  const tag = ref('h1');
  switch(props.heading) {
    case 2:
      tag.value = 'h2';
      break;
    case 3:
      tag.value = 'h3';
      break;
    default:
      break;
  }
</script>
