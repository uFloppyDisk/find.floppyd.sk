<template>
  <div 
    ref="shell" tabindex="0"
    class="transition-opacity"
    :class="{
      'opacity-70': !focussed
    }"
  >
    <ElementShellHistory 
        v-for="line in previous"
        :command="line.command"
        :output="line.output"
    />
    <ElementShellInput :input="input" :focussed="focussed" @commit="commit" />
  </div>
</template>

<script lang="ts" setup>
import commands, { getCommand, initCommand } from '~/src/commands';
import { NullCommand, Command } from '~/src/classes/command';
import type { ShellPrevious } from '~/src/types/shell';
import { randomString } from '~/src/utils';

const shell: Ref<HTMLSpanElement | null> = ref(null);
const input: Ref<string> = ref('');

const history: string[] = [];
const previous: ShellPrevious[] = reactive([{
    command: 'find -name "FloppyDisk" -type gamer -not cringe',
    output: null,
}]);

const focussed: Ref<boolean> = ref(false);

const vanity = reactive({
  userName: '',
  path: '',
});

provide('vanity', vanity);

onMounted(() => {    
  vanity.userName = `user-${randomString()}`;
  vanity.path = window.location.pathname;
})

const commit = (input: string) => {
  history.push(input);

  const keyword = input.split(" ", 1)[0];
  if (keyword.trim().length <= 0) {
    previous.push({ command: input, output: null });
    return;
  }

  try {
    const def = getCommand(commands, keyword);
    if (def === NullCommand) {
      throw new Error(`${keyword}: command not found`);
    }

    const args = input.slice(keyword.length).split(" ");
    const command = initCommand((def as typeof Command), args);

    const output = command.execute({ history, previous, commands });

    if (command.shouldPush) {
      previous.push({ command: input, output: output });
    }
  } catch(err) {
    previous.push({ command: input, output: (err as Error).message});
  }
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

