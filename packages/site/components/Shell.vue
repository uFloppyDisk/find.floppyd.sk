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
          <span class="text-black font-bold">{{ shellDateTime.split(" ")[0] }}</span>
        </div>
        <div class="inline-flex h-full px-1 items-center gap-x-1 bg-primary-500">
          <span class="text-black font-bold">{{ shellDateTime.split(" ")[1] }} UTC</span>
        </div>
      </div>
    </div>
    <div 
      ref="shell" tabindex="0"
      class="w-full h-full overflow-y-scroll"
    >
      <div 
        ref="scrollToElement"
        class="mt-2 pb-10 px-6 transition-opacity"
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
  const date = new Date(now.value);

  const year = date.getUTCFullYear();
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const day = date.getUTCDate().toString().padStart(2, '0');

  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  const seconds = date.getUTCSeconds().toString().padStart(2, '0');
  
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
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

  history.push(input);
  inputCounter.value += 1;

  const keyword = input.split(" ", 1)[0];
  if (keyword.trim().length <= 0) {
    previous.push(data);
    return;
  }

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
  watch(router, (value, _) => {
    vanity.path = value.currentRoute.path;
  });

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

  watch(previous, () => {
    scrollToElement.value?.scrollIntoView(false);
  });

  watch(inputCounter, (_value, _) => {
    vanityStatic = {
      userName: vanity.userName,
      path: vanity.path,
    }
  });
}

</script>

<style scoped>

</style>

