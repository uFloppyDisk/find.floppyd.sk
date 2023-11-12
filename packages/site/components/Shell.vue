<template>
  <div 
    ref="shell" tabindex="0"
    class="transition-opacity"
    :class="{
      'opacity-70': !focussed
    }"
  >
    <ElementShellHistory v-for="line in previous">{{ line }}</ElementShellHistory>
    <ElementShellInput :input="input" :focussed="focussed" @commit="commit" />
  </div>
</template>

<script lang="ts" setup>
import commands from '~/src/commands';
import { randomString } from '~/src/utils';

const shell: Ref<HTMLSpanElement | null> = ref(null);
const input: Ref<string> = ref('');

const history: string[] = [];
const previous: string[] = reactive(['find -name "FloppyDisk" -type gamer -not cringe'])

const focussed: Ref<Boolean> = ref(false);

const vanity = reactive({
  userName: '',
  path: '',
});

provide('vanity', vanity);

onMounted(() => {    
  vanity.userName = `user-${randomString()}`;
  vanity.path = window.location.pathname;
})

const commit = (text: string) => {
  history.push(text);

  const cmdKeyword = text.split(" ", 1)[0];
  const cmdArgs = text.slice(cmdKeyword.length).split(" ");

  previous.push(text);

  const command = commands.get(cmdKeyword);
  if (typeof command === 'undefined') { return; }

  command.do({ history, previous }, cmdArgs);
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
  if ((charCode >= 32 && charCode <= 126)) {
    input.value += event.key;
  }
}

if (process.browser) {
  watch(shell, (value, _) => {
    if (value == null) { return; }

    value.addEventListener('focusin', (event) => {
      focussed.value = true;
    })

    value.addEventListener('focusout', (event) => {
      focussed.value = false;
    })

    value.addEventListener("keydown", keyDownEvent);
  });
}

</script>

<style scoped>

</style>

