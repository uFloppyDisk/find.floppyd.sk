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
          <div class="basis-full sm:basis-1/3 grow-0 h-fit">
            <div class="flex mb-1 gap-2 text-2xl justify-center items-baseline">
              <div>FLOPPY OS</div>
              <div class="text-sm">v60.09</div>
            </div>
            <div class="px-4 py-3 bg-black/20 text-center">
              <div ref="dispLoadingStatus">// Initializing //</div>
              <div ref="dispLoading" id="loading" class="flex h-7 p-1 border border-primary-500 text-start text-md font-mono whitespace-nowrap"></div>
            </div>
          </div>
        </div>  
      </div>
    </div>
</template>

<script lang="ts" setup>
const PROGRESS_MAX = 100;

const dispLoading: Ref<HTMLDivElement | null> = ref(null);
const dispLoadingStatus: Ref<HTMLDivElement | null> = ref(null);
const dispLoadingSteps = ref(0);

const progress = ref(-1);
const done = ref(false);
const makeProgress = () => {
  if (progress.value >= PROGRESS_MAX) { 
    done.value = true;
    return;
  }

  progress.value += 1;

  const multiplier = Math.min(Math.max((progress.value / PROGRESS_MAX), 0.01), 0.80);
  setTimeout(makeProgress, (15 + ((Math.random() - 0.5) * 10)) * (1.2 - multiplier));
}

onMounted(() => {
  if (dispLoading.value == null) { return; }

  const CHAR = '<div class="flex grow justify-center items-center"><span>.</span></div>'
  const MAXCHARS = 200

  const MAXWIDTH = dispLoading.value.clientWidth;
  for (let char = 0; char < MAXCHARS; char++) {
    dispLoading.value.innerHTML += CHAR;
    if (dispLoading.value.clientWidth > MAXWIDTH) {
      dispLoading.value.innerHTML = CHAR.repeat(char);
      break;
    }
  }

  dispLoadingSteps.value = dispLoading.value?.children.length;
  dispLoading.value.style.width = dispLoading.value.clientWidth + 'px'

  watch(progress, (value, old) => {
    const curProgressStep = Math.floor((value / PROGRESS_MAX) * dispLoadingSteps.value);
    
    if (dispLoading.value?.children[curProgressStep] == null) { return; }

    dispLoading.value.children[curProgressStep].classList.add('done');
    dispLoading.value.children[curProgressStep].innerHTML = "#";
  })

  watch(done, (value, old) => {
    if (!value) { return; }
    if (dispLoadingStatus.value == null) { return; }

    var donePhrase = "DONE";
    if (Math.random() >= 0.99) { donePhrase = "DAWN"; };
    dispLoadingStatus.value.innerHTML = donePhrase;
  })

  makeProgress();
})
</script>

<style>
#loading * {
  text-shadow: none !important;
}

#loading div.done {
  color: black;
  background-color: var(--color-primary-500);
}
</style>

