<template>
    <div 
      class="absolute w-screen h-screen bg-[#2f0c0c] z-50 transition-opacity delay-500 duration-500" 
      :class="{
        'opacity-0 pointer-events-none': done
      }"
    >
      <div class="container flex flex-col mx-auto h-full gap-y-2 justify-center items-center">
        <div class="flex basis-3/5 grow-0 w-full justify-center">
          <Scene3DBackgroundLogo class="border border-[#ff000077] border-dotted" :done="done" />
        </div>
        <div class="flex basis-auto grow-0 w-full justify-center">
          <div class="basis-1/3 grow-0 h-fit">
            <div class="flex mb-1 gap-2 text-2xl justify-center">
              <div>FLOPPY OS</div>
              <div>v60.09</div>
            </div>
            <div class="px-4 py-3 bg-black/20 text-center">
              <div ref="dispLoading" id="loading" class="flex h-6 border border-[#ff000077] text-start text-md font-mono whitespace-nowrap"></div>
              <div ref="dispLoadingStatus">// Initializing //</div>
            </div>
          </div>
        </div>  
      </div>
    </div>
</template>

<script lang="ts" setup>
const dispLoading: Ref<HTMLDivElement | null> = ref(null);
const dispLoadingStatus: Ref<HTMLDivElement | null> = ref(null);
const dispLoadingSteps = ref(0);

const progress = ref(-1);
const done = ref(false);
const makeProgress = () => {
  if (progress.value >= dispLoadingSteps.value) { 
    done.value = true;
    return;
  }

  progress.value += 1;

  const completenessRatio = (progress.value / dispLoadingSteps.value);
  const multiplier = Math.min(Math.max(completenessRatio, 0.01), 0.80);

  setTimeout(makeProgress, (50 + ((Math.random() - 0.5) * 40)) * (1.2 - multiplier));
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
  dispLoading.value.style.width = dispLoading.value.innerHTML.clientWidth + 'px'

  watch(progress, (value, old) => {
    if (dispLoading.value?.children[value] == null) { return; }

    dispLoading.value.children[value].classList.add('done');
    dispLoading.value.children[value].innerHTML = "#";
  })

  watch(done, (value, old) => {
    if (!value) { return; }
    if (dispLoadingStatus.value == null) { return; }

    dispLoadingStatus.value.innerHTML = "Welcome";
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
  background-color: red;
}
</style>

