<template>
  <div class="group/category flex flex-col">
    <div 
      class="flex cursor-pointer"
      @click="collapse = !collapse"
    >
      <div class="flex basis-4 shrink-0 opacity-50 justify-center items-center hover:opacity-100 transition-opacity">
        <font-awesome-icon 
          class="fa-1x transition-transform duration-100"
          :class="{
            '-rotate-90': collapse
          }"
          :icon="[
            'fas',
            'chevron-down'
          ]"
        />
      </div>
      <div 
        class="flex basis-full mx-2 border-dotted border-primary-500 font-bold text-sm capitalize opacity-75 group-hover/category:opacity-100 transition-opacity"
        :class="{
          'border-b': !collapse
        }"
      >
        <span 
          class="inline-flex w-full py-1 items-center"
          :class="{
            'animate-bounce': isPriority && collapse
          }"
        >
          <span class="flex basis-5 justify-center items-center">
            <font-awesome-icon
              v-if="isPriority"
              :icon="['fas', 'heart']"
            />
            <font-awesome-icon
              v-else-if="category[0] === 'content'"
              :icon="['fas', 'video']"
            />
            <font-awesome-icon
              v-else-if="category[0] === 'social'"
              :icon="['fas', 'user-group']"
            />
            <font-awesome-icon
              v-else-if="category[0] === 'software'"
              :icon="['fas', 'code']"
            />
            <font-awesome-icon
              v-else
              :icon="['fas', 'question']"
            />
          </span>
          <span class="h-4">
            {{ !(isPriority) ? category[0] : "Floppy's picks" }}
          </span>
        </span>
      </div>
    </div>
    <div 
      class="flex"
      :class="{
        'hidden': collapse
      }"
    >
      <div class="basis-1 shrink-0"></div>
      <div class="basis-3 shrink-0 mt-1 mb-1 border border-t-0 border-r-0 border-primary-500 opacity-50"></div>
      <div class="basis-full">
        <div 
          class="flex flex-wrap-reverse flex-row-reverse text-center m-1"
          :class="{
            'animate-[bgpulse_5s_ease-in-out_infinite]': isPriority
          }"
        >
          <div
            v-for="link in category[1].slice().reverse()"
            :key="link.href"
            class="basis-full md:basis-1/2 lg:basis-1/3 xl:basis-full grow shrink-0"
          >
            <ElementLink
              class="min-w-fit max-h-10 m-1 opacity-100 group-hover:opacity-75 hover:!opacity-100"
              :link="link"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Link } from '~/src/links'

const props = defineProps<{
  category: [string, Link[]];
}>();

const collapse = ref(false);
const isPriority = computed(() => props.category[0] === 'priority');

</script>
