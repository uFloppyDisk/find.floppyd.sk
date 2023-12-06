<template>
  <div class="flex-col">
    <ElementHeading :cursor="true">Find me</ElementHeading>
    <div class="flex flex-col-reverse select-none">
      <DisplayLinks  @click="goToLink" :select="selected" />
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const selected = route.params.slug instanceof Array ? route.params.slug : [];

const goToLink = (href: string) => {
  window.open(href, '_blank', 'noopener')
}
</script>
