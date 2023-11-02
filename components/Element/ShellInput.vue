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
      <span 
        class="absolute h-fit -translate-x-0.5 transition-opacity"
        :class="{
          'ml-0.5': input.length > 0,
          'opacity-0': !focussed
        }"
      >
        <svg id="cursor" width="0.7em" height="1.25em">
          <rect x="0" y="2" width="100%" height="100%" />
        </svg>
      </span>
    </span>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  input: String;
  focussed: Boolean;
}>();
</script>

<style scoped>
#cursor > rect {
  fill: rgb(239 68 68)
}
</style>

