<template>
  <div ref="shell" tabindex="0">
    <ElementShellHistory v-for="line in previous">{{ line }}</ElementShellHistory>
    <ElementShellInput :input="input" @commit="commit" />
  </div>
</template>

<script lang="ts" setup>
import { randomString } from '~/src/utils';

const shell: Ref<HTMLSpanElement | null> = ref(null);
const input: Ref<String> = ref('');

const userName = ref('');
const path = ref('');

const history: String[] = [];
const previous: String[] = reactive(['find -name "FloppyDisk" -type gamer -not cringe'])

defineExpose<{
  userName: Ref<String>;
  path: Ref<String>;
}>({userName, path});

const commit = (text: String) => {
  history.push(text);

  if (text === 'clear') {
    previous.splice(0, previous.length)
    return;
  }

  previous.push(text);
}

const keyDownEvent = (event: KeyboardEvent) => {
  if (input.value == null) { return; }

  if (event.key.length > 1) {
    switch (event.key) {
      case 'Enter':
        commit(input.value);
        input.value = '';
        break;

      case 'Backspace':
        if (input.value.length <= 0) { break; }

        input.value = input.value.slice(0, -1);
        break;
    }

    return;
  }

  if (event.ctrlKey || event.altKey) { 
    if (event.ctrlKey && event.key === 'a') {
      event.preventDefault();
    }

    return;
  }

  const charCode = event.key.charCodeAt(0);
  if ((charCode >= 33 && charCode <= 126)) {
    input.value += event.key;
  }
}

if (process.browser) {
  window.addEventListener('DOMContentLoaded', () => {
    userName.value = `user-${randomString()}`;
    path.value = window.location.pathname;
  });

  watch(shell, (value, _) => {
    if (value == null) { return; }

    value.addEventListener("keydown", keyDownEvent);
  });
}

</script>

<style scoped>

</style>

