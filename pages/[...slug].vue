<template>
  <div class="flex-col">
    <ElementHeading :cursor="true">Find me</ElementHeading>
    <div class="
      flex flex-col-reverse 
      xl:flex-row-reverse xl:flex-wrap-reverse 
      gap-y-2 select-none
    ">
      <div class="col-span-2" />
      <ElementCategory v-for="category in categoryMap" :key="category[0]" :category="getCategoryByName(category[0])"
        :links="category[1]" class="xl:basis-1/4" :class="{
          'pb-2 xl:pb-0 border-b xl:border-b-0 border-primary-500 border-dashed xl:grow': category[0] === 'priority'
        }" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CategoriesCollectionItem } from '@nuxt/content';
import type { CategoryMap } from '~/utils/generateLinkCategories.ts';
import generateLinkCategories from '~/utils/generateLinkCategories.ts';

const route = useRoute();
const select = route.params.slug instanceof Array ? route.params.slug : [];

const { data: categories } = await useAsyncData(() => queryCollection("categories").all());
const { data: links } = await useAsyncData(() => queryCollection("links").all());
const allCategories: Ref<CategoryMap> = computed(() => generateLinkCategories(links.value, categories.value?.map(c => c.name) ?? []));
const categoryMap: Ref<CategoryMap> = ref(new Map());

const getCategoryByName = (name: string): CategoriesCollectionItem | undefined => {
  return categories.value?.find(c => c.name === name);
}

do {
  if (typeof select === 'undefined' || select.length <= 0) {
    categoryMap.value = allCategories.value;
    break;
  }

  const selectAdd = ['priority', ...select];
  categoryMap.value = new Map([...allCategories.value]
    .filter(([k, _v]) => selectAdd.includes(k)));
} while (false);
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
