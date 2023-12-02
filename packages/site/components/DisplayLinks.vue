<template>
  <div 
    class="flex basis-auto grow px-4 sm:px-24 md:px-36 xl:px-48 2xl:px-96 items-start xl:items-center duration-300 transition select-none overflow-y-scroll"
    :class="{
        'opacity-0 pointer-events-none': !showLinks,
    }"
  >
  <div class="flex flex-col grow">
      <div class="xl:hidden pt-20"></div>
      <div class="group flex flex-col-reverse grow py-2 pl-3 pr-2 gap-2 backdrop-blur-sm backdrop-brightness-50 border border-red-500/25">
        <div class="flex text-lg order-last">
            <div class="basis-4 mr-2 text-center opacity-75">#</div>
            <h1 class="font-bold">Find me<span class="animate-pulse">_</span></h1>
        </div>
        <div
          v-for="category in categories" 
          :key="category[0]"
          class="group/category flex flex-col grow py-1"
          :class="{
            'mb-4': category[0] === 'priority',
          }"
        >
          <div 
            class="flex cursor-pointer"
            @click="collapse((category[0] as Categories))"
          >
            <div class="flex basis-4 shrink-0 opacity-50 justify-center items-center hover:opacity-100 transition-opacity">
              <font-awesome-icon 
                class="fa-1x transition-transform duration-100"
                :class="{
                  '-rotate-90': collapseCategory[category[0]]
                }"
                :icon="[
                  'fas',
                  'chevron-down'
                ]"
              />
            </div>
            <div 
              class="flex basis-full mx-2 border-dotted border-red-500 font-bold text-sm capitalize opacity-75 group-hover/category:opacity-100 transition-opacity"
              :class="{
                'border-b': !collapseCategory[category[0]]
              }"
            >
              <span 
                class="flex w-full"
                :class="{
                  'animate-bounce': category[0] === 'priority' && collapseCategory[category[0]]
                }"
              >
                <div class="flex basis-5 pr-1 justify-center items-center">
                  <font-awesome-icon
                    v-if="category[0] === 'priority'"
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
                    v-else
                    :icon="['fas', 'question']"
                  />
                </div>
                {{ !(category[0] === 'priority') ? category[0] : "Floppy's picks" }}
              </span>
            </div>
          </div>
          <div 
            class="flex"
            :class="{
              'hidden': collapseCategory[category[0]]
            }"
          >
            <div class="basis-1 shrink-0"></div>
            <div class="basis-3 shrink-0 mt-1 mb-1 border border-t-0 border-r-0 border-red-500 opacity-50"></div>
            <div class="basis-full">
              <div 
                class="flex flex-wrap-reverse flex-row-reverse text-center m-1"
                :class="{
                  'animate-[bgpulse_5s_ease-in-out_infinite]': category[0] === 'priority'
                }"
              >
                <div
                  v-for="link in category[1].slice().reverse()"
                  :key="link.href"
                  class="basis-1/2 md:basis-1/3 grow shrink-0 xl:basis-1/4 m-1"
                >
                  <ElementLink
                    class="min-w-fit max-h-10 opacity-100 group-hover:opacity-75 hover:!opacity-100"
                    :link="link"
                    @click="$emit('click', link.href)"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="xl:hidden pt-6"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Link } from '~/src/links'; 
import type { Categories } from '~/src/categories';
import categoryPriority from '~/src/categories';
import links from '~/src/links';

const collapseCategory: Ref<Record<string, boolean>> = ref({});

const collapse = (category: Categories) => {
  collapseCategory.value[category] = !collapseCategory.value[category];
}

defineProps<{
  showLinks: boolean;
}>();

defineEmits<{
  (event: 'click', href: string): void
}>();

var categories = new Map<string, Link[]>();

categoryPriority.forEach(category => {
  categories.set(category, [])
  collapseCategory.value[category] = false;
});

links.forEach(link => {
  var category = 'miscellaneous';
  if (link.category) { category = link.category };
  if (!categories.has(category)) { categories.set(category, [])}

  categories.get(category)?.push(link);
});

categories = new Map([...categories.entries()].filter((cat) => cat[1].length > 0).reverse())

</script>

<style>

@keyframes bgpulse {
  0% {
    background-color: #ff000080;
  }
  50% {
    background-color: #ff000022;
  }
  100% {
    background-color: #ff000080;
  }
}

</style>

