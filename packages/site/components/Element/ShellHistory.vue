<template>
  <div>
    <span class="text-red-500">
      <span>{{ vanity.userName }}</span>
      <span>@localhost: ~</span>
      <span class="font-bold">{{ vanity.path }}</span>
      <span>$ </span> 
    </span>
    <span>{{ command }}</span>
    <div 
        v-if="typeof output === 'string'"
        v-for="line in output.split('\n')"
    >
        {{ line }}
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
    command: string;
    output: any;
}>();

const vanity = JSON.parse(JSON.stringify(
  inject('vanity', {userName: 'user-unkwn', path: '/'})
));
</script>

<style>

</style>

