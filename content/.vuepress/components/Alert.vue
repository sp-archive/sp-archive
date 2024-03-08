<script setup lang="ts">
defineProps<{
  type: string
  title?: string
}>()
</script>

<template>
  <div class="hint-container" :class="[type]">
    <p v-if="title !== undefined" class="hint-container-title">
      {{ title }}
    </p>
    <slot />
  </div>
</template>
