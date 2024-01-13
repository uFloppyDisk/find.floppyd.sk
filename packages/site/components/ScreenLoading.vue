<template>
    <div 
      class="absolute w-screen h-screen bg-primary-950 z-50 transition-opacity delay-500 duration-500 select-none" 
      :class="{
        'opacity-0 pointer-events-none': done
      }"
    >
      <div class="container flex flex-col mx-auto h-full gap-y-2 justify-center items-center">
        <div class="flex basis-3/5 w-full grow-0 justify-center items-center">
          <Scene3DRotatingLogo class="basis-full md:basis-1/3 border-2 border-primary-700 border-dotted" :done="done" />
        </div>
        <div class="flex basis-auto grow-0 w-full justify-center">
          <div class="basis-full md:basis-1/3 grow-0 h-fit">
            <div class="flex mb-1 gap-2 text-2xl justify-center items-baseline">
              <div>FLOPPY OS</div>
              <div class="text-sm">v60.09</div>
            </div>
            <div class="px-4 py-3 bg-black/20 text-center">
              <div>{{ loadingStatusMsg }}</div>
              <div ref="dispLoading" class="flex h-7 p-1 border border-primary-500 text-start text-md font-mono whitespace-nowrap">
                <div
                  ref="dispLoadingSteps"
                  v-for="step in loadingSteps"
                  :key="step"
                  class="flex justify-center items-center"
                  :class="{
                    'bg-primary-500 text-black': stepDone > step,
                    'grow': loadingSteps > 1,
                    'invisible': loadingSteps <= 1
                  }"
                >{{ stepDone > step ? '#' : '.' }}</div>
              </div>
            </div>
          </div>
        </div>  
      </div>
    </div>
</template>

<script lang="ts" setup>
const dispLoading: Ref<HTMLDivElement | null> = ref(null);
const dispLoadingSteps: Ref<HTMLDivElement[] | null> = ref(null);

const loadingStatusMsg: Ref<string> = ref('Please wait...');
const loadingSteps = ref(1);

const progress = ref(-0.4);
const done = ref(false);

const stepDone = computed(() => {
  return loadingSteps.value * progress.value;
})

const makeProgress = () => {
  if (progress.value >= 1) { 
    done.value = true;
    return;
  }

  progress.value += 0.01;

  const multiplier = Math.min(Math.max(progress.value, 0.01), 0.80);
  setTimeout(makeProgress, (15 + ((Math.random() - 0.5) * 10)) * (1.2 - multiplier));
}

onMounted(() => {
  if (dispLoading.value == null) { return; }
  if (dispLoadingSteps.value == null) { return; }

  const sample = dispLoadingSteps.value.pop();
  if (typeof sample === 'undefined') { return; }

  const steps = Math.ceil(dispLoading.value.clientWidth / sample.clientWidth);
  loadingSteps.value = steps;

  dispLoading.value.style.width = dispLoading.value.clientWidth + 'px'
  loadingStatusMsg.value = "// Initializing //";

  watch(done, (value) => {
    if (!value) { return; }

    var doneMsg = "DONE";
    if (Math.random() >= 0.99) { doneMsg = "DAWN"; };
    loadingStatusMsg.value = doneMsg;
  })

  setTimeout(makeProgress, 0);
})
</script>
