<template>
  <div ref="shell" tabindex="0">
    <span class="text-red-500/80">
      <span>{{ $parent?.userName ?? 'unknown' }}</span>
      <span>@localhost: ~</span>
      <span class="font-bold">{{ $parent?.path ?? '/' }}</span>
      <span>$ </span> 
    </span>
    <span>
      <span ref="input" class="inline-flex basis-0 grow shrink bg-transparent" role="textbox"></span>
      <span class="absolute animate-pulse -translate-x-0.5">
        <font-awesome-icon 
          class="scale-x-[.60] scale-y-95"
          :icon="['fas', 'square-full']"
        />
      </span>
    </span>
  </div>
</template>

<script lang="ts" setup>
const shell: Ref<HTMLSpanElement | null> = ref(null);
const input: Ref<HTMLSpanElement | null> = ref(null);

if (process.browser) {
  watch(shell, (value, _) => {
    if (value == null) { return; }

    value.addEventListener("keyup", (event) => {
      if (input.value == null) { return; }

      const text = input.value.innerText;

      switch (event.key) {
        case 'Backspace':
          input.value.innerText = text.slice(0, -1);
          break;

        default:
          input.value.innerText += event.key;
      }
    });
  }) 
}
</script>

<style scoped>

</style>

