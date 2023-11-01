<template>
  <div class="absolute top-full">
    <ElementShellHistory>find -name "FloppyDisk" -type gamer -not cringe</ElementShellHistory>
    <ElementShellInput />
  </div>
</template>

<script lang="ts" setup>
import { randomString } from '~/src/utils';

const userName = ref('');
const path = ref('');

defineExpose<{
  userName: Ref<String>;
  path: Ref<String>;
}>({userName, path});

if (process.browser) {
  window.addEventListener('DOMContentLoaded', () => {
    userName.value = `user-${randomString()}`;
    path.value = window.location.pathname;
  })
}

</script>

<style scoped>

</style>

