<template>
  <div class="flex-col">
    <ElementHeading :cursor="true">Find me</ElementHeading>
    <div class="
      flex flex-col-reverse 
      xl:flex-row-reverse xl:flex-wrap-reverse 
      gap-y-2 select-none
    ">
      <div class="col-span-2" />
      <ElementCategory 
        v-for="category in categories"
        :key="category[0]"
        :category="category"
        class="xl:basis-1/4"
        :class="{
          'pb-2 xl:pb-0 border-b xl:border-b-0 border-primary-500 border-dashed xl:grow': category[0] === 'priority'
        }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Link } from '~/types/link';

const route = useRoute();
const select = route.params.slug instanceof Array ? route.params.slug : [];

type CategoryMap = Map<string, Link[]>;

const allCategories: Ref<CategoryMap> = ref(inject("categories") ?? new Map());
const categories: Ref<CategoryMap> = ref(new Map());

do {
  if (typeof select === 'undefined' || select.length <= 0) {
    categories.value = allCategories.value;
    break;
  }

  const selectAdd = ['priority', ...select];
  categories.value = new Map([...allCategories.value]
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
