<template>
  <DisplayLinks  @click="goToLink" :select="selected" />
</template>

<script setup lang="ts">
const route = useRoute();
const selected = route.params.slug instanceof Array ? route.params.slug : [];

const goToLink = (href: string) => {
  window.open(href, '_blank', 'noopener')
}
</script>
