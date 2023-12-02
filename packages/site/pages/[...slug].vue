<template>
    <DisplayLinks  @click="goToLink" />
</template>

<script setup lang="ts">
const goToLink = (href: string) => {
  window.open(href, '_blank', 'noopener')
}
</script>
