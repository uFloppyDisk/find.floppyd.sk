<template>
  <div>
    <span class="text-red-500">
      <span>{{ vanity?.userName ?? 'user-unkwn' }}</span>
      <span>@localhost: ~</span>
      <span class="font-bold">{{ vanity?.path ?? '/' }}</span>
      <span>$ </span> 
    </span>
    <span>
      <span class="inline-flex basis-0 grow shrink bg-transparent whitespace-pre-wrap" role="textbox">{{ input }}</span>
      <span 
        class="absolute h-fit transition-opacity"
        :class="{
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
  input: string;
  focussed: Boolean;
}>();

const vanity: { userName: string, path: string} | undefined = inject("vanity");
</script>

<style scoped>
#cursor > rect {
  fill: rgb(239 68 68)
}
</style>

