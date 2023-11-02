<template>
  <div>
    <span class="text-red-500/80">
      <span>{{ $parent?.vanity.userName ?? 'user-unkwn' }}</span>
      <span>@localhost: ~</span>
      <span class="font-bold">{{ $parent?.vanity.path ?? '/' }}</span>
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

