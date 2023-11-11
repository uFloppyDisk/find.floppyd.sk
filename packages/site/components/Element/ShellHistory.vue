<template>
  <div>
    <span class="text-red-500">
      <span>{{ vanity?.userName ?? 'user-unkwn' }}</span>
      <span>@localhost: ~</span>
      <span class="font-bold">{{ vanity?.path ?? '/' }}</span>
      <span>$ </span> 
    </span>
    <span>
      <slot />
    </span>
  </div>
</template>

<script lang="ts" setup>
    const vanity: { userName: string, path: string } | undefined = inject('vanity')
</script>

<style>

</style>

