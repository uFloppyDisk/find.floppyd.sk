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
    <slot />
  </span>
</template>
  
<script lang="ts" setup>
defineProps<{
  icon?: String[];
  pulse?: Boolean,
  description?: {
    text: String;
    condition: Boolean;
  };
}>();
</script>

<style scoped>

</style>
  
  