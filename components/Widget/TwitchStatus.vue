<template>
  <div class="px-1.5 py-0.5 text-xs">
    <ElementStatus 
      v-if="status?.live" 
      :icon="['fas', 'circle']" 
      :pulse="true" 
      :description="{ text: 'LIVE', condition: uptime < 0 || (uptime < 86400000)}"
    >
      <span v-if="uptimeString">{{ uptimeString }}</span>
    </ElementStatus>
    <ElementStatus 
      v-else
      :icon="['far', 'circle']"
      :description="{ text: 'OFFLINE', condition: true }"
    />
  </div>
</template>

<script setup lang="ts">
const { twitch: status } = useContentStatus();
const now = inject("now", ref(0));

const uptime = computed(() => {
  return getElapsed(status.value.started_at, now.value);
});

const uptimeString = computed(() => {
  return getElapsedString(uptime.value);
});
</script>
