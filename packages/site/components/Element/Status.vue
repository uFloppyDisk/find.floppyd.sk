<template>
  <span class="flex gap-1">
    <span class="flex justify-center items-center" v-if="icon">
      <font-awesome-icon
        class="fa-1x"
        :class="{
          'animate-pulse': pulse
        }"
        :icon="icon"
      />
    </span>
    <span class="font-extrabold uppercase" v-if="description?.condition">{{ description?.text }}</span>
    <slot v-if="!slotEmpty" />
  </span>
</template>
  
<script lang="ts" setup>
defineProps<{
  icon?: string[];
  pulse?: boolean,
  description?: {
    text: string;
    condition: boolean;
  };
}>();

const slots = useSlots();

const slotEmpty: ComputedRef<boolean> = computed(() => {
  if (typeof slots?.default === 'function') {
    return slots.default().length <= 0;
  }

  return true;
})
</script>

<style scoped>

</style>
  
  