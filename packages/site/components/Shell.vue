<template>
  <div ref="shell" tabindex="0">
    <div 
      class="absolute bottom-0 flex w-full h-6 z-50
      justify-between bg-black/50 text-sm"
    >
      <div class="flex h-full place-items-center gap-x-2">
        <div class="mx-1">Floppy OS</div>
        <div class="inline-flex h-full px-1 items-center gap-x-1 bg-red-500">
          <span class="text-black font-bold">
            {{ vanity.userName }}@localhost
          </span>
        </div>
        <div>: ~{{ vanity.path }}</div>
      </div>
      <div class="flex h-full place-items-center">
        <div class="inline-flex h-full px-1 items-center gap-x-1 bg-red-700">
          <span class="text-black font-bold">{{ shellDate }}</span>
        </div>
        <div class="inline-flex h-full px-1 items-center gap-x-1 bg-red-500">
          <span class="text-black font-bold">{{ shellTime }}</span>
        </div>
      </div>
    </div>
    <div 
      class="px-6 transition-opacity"
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
  </div>
</template>

<script setup lang="ts">
import commands, { getCommand, initCommand } from '~/src/commands';
import { NullCommand, Command } from '~/src/classes/command';
import type { ShellPrevious } from '~/src/types/shell';
import { randomString } from '~/src/utils';

const shell: Ref<HTMLDivElement | null> = ref(null);
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

const now: Ref<number> = inject('now', ref(0));
provide('vanity', vanity);

const shellDate = computed(() => {
  const date = new Date(now.value);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  
  return `${year}-${month}-${day}`;
})

const shellTime = computed(() => {
  const date = new Date(now.value);

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  
  return `${hours}:${minutes}:${seconds}`;
})

onMounted(() => {    
  vanity.userName = `user-${randomString()}`;
  vanity.path = window.location.pathname;
});

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

    value.addEventListener('focusin', (_event) => {
      focussed.value = true;
    })

    value.addEventListener('focusout', (_event) => {
      focussed.value = false;
    })

    value.addEventListener("keydown", keyDownEvent);
  });
}

</script>

<style scoped>

</style>

