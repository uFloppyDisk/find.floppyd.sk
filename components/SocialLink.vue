<template>
  <div 
    class="
      group flex justify-between items-center 
      border border-red-500
      transition
      translate-y-0 hover:-translate-y-1
      shadow-md hover:shadow-sm shadow-red-500
    ">
    <div class="basis-20 px-2 h-full">
      <slot name="icon" />
    </div>
    <div class="basis-full grow font-extrabold">
      <slot name="info" />
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style>

</style>
