<template>
  <div>
    <span class="text-red-500/80">
      <span>{{ $parent?.userName ?? 'unknown' }}</span>
      <span>@localhost: ~</span>
      <span class="font-bold">{{ $parent?.path ?? '/' }}</span>
      <span>$ </span> 
    </span>
    <span>
      <span class="inline-flex basis-0 grow shrink bg-transparent" role="textbox">{{ input }}</span>
      <span class="absolute animate-pulse -translate-x-0.5">
        <font-awesome-icon 
          class="scale-x-[.60] scale-y-95"
          :icon="['fas', 'square-full']"
        />
      </span>
    </span>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  input: String;
}>();
</script>

<style scoped>

</style>

