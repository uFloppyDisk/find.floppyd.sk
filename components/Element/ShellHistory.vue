<template>
  <div>
    <span class="text-red-500/80">
      <span>{{ ($parent as any)?.vanity?.userName ?? 'user-unkwn' }}</span>
      <span>@localhost: ~</span>
      <span class="font-bold">{{ ($parent as any).vanity.userName ?? '/' }}</span>
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

