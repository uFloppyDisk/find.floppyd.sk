<template>
  <div 
    class="flex basis-auto grow px-6 sm:px-12 md:px-36 items-center duration-300 transition"
    :class="{
        'opacity-0 invisible': !showLinks,
    }"
  >
    <div class="group flex flex-col-reverse grow gap-2 p-2">
      <div
        v-for="category in categories" 
        :key="category[0]"
        class="flex flex-col grow"
      >
        <div class="ml-2 font-bold text-xl capitalize">
          {{ !(category[0] === 'priority') ? category[0] : "Floppy's picks" }}
        </div>
        <div class="flex flex-wrap-reverse flex-row-reverse text-center">
          <div
            v-for="link in category[1].slice().reverse()"
            :key="link.href"
            class="basis-1/2 md:basis-1/3 grow shrink-0 xl:basis-1/4 p-2"
          >
            <SocialLink
              class="min-w-fit max-h-10 opacity-100 group-hover:opacity-60 hover:!opacity-100"
              :link="link"
              @click="$emit('click', link.href)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import categoryPriority from '~/src/categories';
import type { Link } from '~/src/links'; 
import links from '~/src/links';

defineProps<{
  showLinks: boolean;
}>();

defineEmits<{
  (event: 'click', href: string): void
}>();

var categories = new Map<string, Link[]>();

categoryPriority.forEach(category => {
  categories.set(category, [])
});

links.forEach(link => {
  var category = 'misc';
  if (link.category) { category = link.category };
  if (!categories.has(category)) { categories.set(category, [])}

  categories.get(category)?.push(link);
});

categories = new Map([...categories.entries()].filter((cat) => cat[1].length > 0).reverse())

</script>

<style>

</style>

