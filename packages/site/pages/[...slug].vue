<template>
  <div class="flex-col">
    <ElementHeading :cursor="true">Find me</ElementHeading>
    <div class="flex flex-col-reverse xl:flex-row-reverse xl:flex-wrap-reverse select-none">
      <div
        v-for="category in categories" 
        :key="category[0]"
        class="group/category flex flex-col xl:basis-1/2 grow py-1"
        :class="{
          'mb-4 lg:mb-0': category[0] === 'priority',
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
                '-rotate-90': categoryCollapsed[category[0]]
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
              'border-b': !categoryCollapsed[category[0]]
            }"
          >
            <span 
              class="flex w-full"
              :class="{
                'animate-bounce': category[0] === 'priority' && categoryCollapsed[category[0]]
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
            'hidden': categoryCollapsed[category[0]]
          }"
        >
          <div class="basis-1 shrink-0"></div>
          <div class="basis-3 shrink-0 mt-1 mb-1 border border-t-0 border-r-0 border-primary-500 opacity-50"></div>
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
                class="basis-1/2 md:basis-1/3 grow shrink-0 m-1"
              >
                <ElementLink
                  class="min-w-fit max-h-10 opacity-100 group-hover:opacity-75 hover:!opacity-100"
                  :link="link"
                  @click="goToLink(link.href)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Categories } from '~/src/categories';
import type { Link } from '~/src/links';

const route = useRoute();
const select = route.params.slug instanceof Array ? route.params.slug : [];

type CategoryMap = Map<string, Link[]>;

const allCategories: Ref<CategoryMap> = ref(inject("categories") ?? new Map());
const categories: Ref<CategoryMap> = ref(new Map());
const categoryCollapsed: Ref<Record<string, boolean>> = ref({});

const collapse = (category: Categories) => {
  categoryCollapsed.value[category] = !categoryCollapsed.value[category];
}

const goToLink = (href: string) => {
  window.open(href, '_blank', 'noopener')
}

if (typeof select !== 'undefined' && select.length > 0) {
  const selectAdd = ['priority', ...select];
  categories.value = new Map([...allCategories.value]
                        .filter(([k, _v]) => selectAdd.includes(k)));
} else {
  categories.value = allCategories.value;
}

</script>

<style>

@keyframes bgpulse {
  0% {
    background-color: var(--color-primary-950);
  }
  50% {
    background-color: var(--color-primary-500);
  }
  100% {
    background-color: var(--color-primary-950);
  }
}

</style>
