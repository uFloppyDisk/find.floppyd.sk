<template>
  <div class="flex-col">
    <ElementHeading :cursor="true">Find me</ElementHeading>
    <div class="flex flex-col-reverse">
      <div class="
        flex pb-2 xl:pb-0 
        border-b xl:border-b-0 border-primary-500 border-dashed 
        order-last
      ">
        <ElementCategory 
          v-if="categories.has('priority')"
          :category="['priority', (categories.get('priority') as Link[])]"
          class="basis-full xl:basis-1/2"
        />
      </div>
      <div class="
        flex flex-col-reverse 
        xl:flex-row-reverse xl:flex-wrap-reverse
        gap-y-2 select-none
      ">
        <ElementCategory 
          v-for="category in categoriesMinusPriority"
          :key="category[0]"
          :category="category"
          class="xl:basis-1/3 grow"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Link } from '~/src/links';

const route = useRoute();
const select = route.params.slug instanceof Array ? route.params.slug : [];

type CategoryMap = Map<string, Link[]>;

const allCategories: Ref<CategoryMap> = ref(inject("categories") ?? new Map());
const categories: Ref<CategoryMap> = ref(new Map());
const categoriesMinusPriority: Ref<CategoryMap> = ref(new Map());

do {
  if (typeof select === 'undefined' || select.length <= 0) {
    categories.value = allCategories.value;
    break;
  }

  const selectAdd = ['priority', ...select];
  categories.value = new Map([...allCategories.value]
                        .filter(([k, _v]) => selectAdd.includes(k)));
} while (false);

categoriesMinusPriority.value = new Map(
  [...categories.value.entries()]
  .filter((cat) => cat[0] !== 'priority')
);
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
