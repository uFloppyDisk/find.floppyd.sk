<template>
  <div>
    <div 
      class="absolute bottom-0 flex w-full h-6 z-10 justify-between
      bg-black/50 backdrop-blur-sm backdrop-brightness-75 text-sm select-none"
    >
      <div class="flex h-full place-items-center gap-x-2">
        <div class="hidden md:inline-flex items-baseline mx-1 gap-x-1">
            <span class="font-bold">Floppy OS</span>
            <span class="hidden lg:inline-block text-xs">v60.09</span>
        </div>
        <div class="inline-flex h-full px-1 items-center gap-x-1 bg-primary-500">
          <span class="text-black font-bold">
            <span>{{ vanity.userName }}</span>
            <span class="hidden sm:inline-block">@localhost</span>
          </span>
        </div>
        <div>: ~{{ vanity.path }}</div>
      </div>
      <div class="flex h-full place-items-center">
        <div class="hidden sm:inline-flex h-full px-1 items-center gap-x-1 bg-primary-700">
          <span class="text-black font-bold">{{ shellDateTime[0] }}</span>
        </div>
        <div class="inline-flex h-full px-1 items-center gap-x-1 bg-primary-500">
          <span class="text-black font-bold">{{ shellDateTime[1] }}</span>
        </div>
      </div>
    </div>
    <div 
      ref="shell" tabindex="0"
      class="w-full h-full overflow-y-scroll"
      @focusin="focussed = true;"
      @focusout="focussed = false;"
      @keydown.prevent="keyDownEvent"
    >
      <div 
        ref="scrollToElement"
        class="mt-2 pb-8 px-6 transition-opacity"
        :class="{
          'opacity-70': !focussed
        }"
      >
        <ElementShellHistory 
          v-for="line in previous"
          :vanity="line.vanity"
          :command="line.command"
          :output="line.output"
        />
        <ElementShellInput 
          :key="inputCounter" 
          :input="input" 
          :focussed="focussed" 
          @commit="commit"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import commands, { getCommand, initCommand } from '~/src/commands';
import { NullCommand, Command } from '~/src/classes/command';
import type { ShellPrevious } from '~/src/types/shell';
import { randomString } from '~/src/utils';

const root: Ref<Document | null> = ref(null);
const router = reactive(useRouter());

const shell: Ref<HTMLDivElement | null> = ref(null);
const scrollToElement: Ref<HTMLDivElement | null> = ref(null);

const input: Ref<string> = ref('');
const inputCounter: Ref<number> = ref(0);
const historyPointer: Ref<number> = ref(0);

const history: string[] = [];
const previous: ShellPrevious[] = reactive([]);

const focussed: Ref<boolean> = ref(false);

const vanity = reactive({
  userName: '',
  path: '',
});

let vanityStatic = {
  userName: '',
  path: '',
};

const now: Ref<number> = inject('now', ref(0));
provide('vanity', vanity);

const shellDateTime = computed(() => {
  if (now.value <= 0) { return ['', '']; }
  const date = new Date(now.value);

  const pad = (value: number) => {
    return value.toString().padStart(2, '0');
  }

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());

  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());
  
  const zone = date.toLocaleTimeString(undefined,{timeZoneName:'short'}).split(' ')[2]

  return [`${year}-${month}-${day}`, `${hours}:${minutes}:${seconds} ${zone}`];
})

onMounted(() => {    
  root.value = window.document;

  vanity.userName = vanityStatic.userName = `user-${randomString()}`;
  vanity.path = vanityStatic.path = window.location.pathname;

  previous.push({
    vanity: vanityStatic,
    command: 'find -name "FloppyDisk" -type gamer -not cringe',
    output: null,
  });

  inputCounter.value += 1;
});

const commit = (input: string) => {
  const data: ShellPrevious = { 
    vanity: vanityStatic,
    command: input,
    output: null
  };

  inputCounter.value += 1;

  const keyword = input.split(" ", 1)[0];
  if (keyword.trim().length <= 0) {
    previous.push(data);
    return;
  }

  history.push(input);

  try {
    const def = getCommand(commands, keyword);
    if (def === NullCommand) {
      throw new Error(`${keyword}: command not found`);
    }

    const args = input.slice(keyword.length).split(" ");
    const command = initCommand((def as typeof Command), args);

    data.output = command.execute({ 
      root: root.value, commands,
      history, previous, 
    });

    if (command.shouldPush) {
      previous.push(data);
    }
  } catch(err) {
    data.output = (err as Error).message;
    previous.push(data);
  }
}

const keyDownEvent = (event: KeyboardEvent) => {
  if (input.value === null) { return; }

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

      case 'ArrowUp':
        if (historyPointer.value <= 0) { break; }

        historyPointer.value -= 1; 
        break;

      case 'ArrowDown':
        if (historyPointer.value >= history.length) { break; }

        historyPointer.value += 1;
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

onMounted(() => {
  watch(router, (value) => {
    vanity.path = value.currentRoute.path;
  });
  
  watch(previous, () => {
    setTimeout(() => {
      scrollToElement.value?.scrollIntoView(false);
    }, 0.1)
  });

  watch(inputCounter, () => {
    vanityStatic = {
      userName: vanity.userName,
      path: vanity.path,
    }

    historyPointer.value = history.length;
  });

  watch(historyPointer, (value) => {
    if (value >= history.length || value < 0) { 
      input.value = ''; 
      return;
    }

    input.value = history[value];
  })
});

</script>

<style scoped>

</style>

