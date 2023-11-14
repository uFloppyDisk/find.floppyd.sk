<template>
  <div>
    <span class="text-red-500">
      <span>{{ vanity?.userName ?? 'user-unkwn' }}</span>
      <span>@localhost: ~</span>
      <span class="font-bold">{{ vanity?.path ?? '/' }}</span>
      <span>$ </span> 
    </span>
    <span>{{ cmd }}</span>
    <div>
        <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
    defineProps<{
        cmd: string;
    }>();

    const vanity: { userName: string, path: string } | undefined = inject('vanity')
</script>

<style>

</style>

