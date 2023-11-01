<template>
  <div>
    <span class="text-red-500/80">
      <span>{{ $parent?.userName ?? 'unknown' }}</span>
      <span>@localhost: ~</span>
      <span class="font-bold">{{ $parent?.path ?? '/' }}</span>
      <span>$ </span> 
    </span>
    <span>
      <slot />
    </span>
  </div>
</template>

<script lang="ts" setup>

</script>

<style>

</style>

