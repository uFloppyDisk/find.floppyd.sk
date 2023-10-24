<template>
  <div class="
      group flex justify-between items-center
      h-10
      bg-black/80
      border border-red-500
      transition
      translate-y-0 hover:-translate-y-1
      shadow-md hover:shadow-sm shadow-red-500
      cursor-pointer
    ">
    <div class="flex basis-10 grow-0 shrink-0 h-full justify-center items-center">
      <slot name="icon" />
    </div>
    <div class="basis-full grow px-2 capitalize font-bold">
      <slot name="info" />
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style></style>
