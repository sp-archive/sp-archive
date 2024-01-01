<script setup lang="ts">
import { usePageData } from "@vuepress/client"
import { computed } from "vue"
import { isArchive } from "../utils/archive"

withDefaults(defineProps<{
  link: string[]
  unknown?: boolean
}>(), {
  unknown: false,
})

const isArchivePage = computed(() => {
  return isArchive(usePageData().value.path)
})
</script>

<template>
  <div v-if="isArchivePage" class="hint-container note">
    <p class="hint-container-title">
      {{ unknown ? "本文出处未知或已不可考" : "本文原出处：" }}
    </p>
    <ul v-if="!unknown">
      <li v-for="(item, index) in link" :key="index">
        <a :href="item" target="_blank" rel="noopener noreferrer">
          {{ item }}
          <ExternalLinkIcon />
        </a>
      </li>
    </ul>
  </div>
</template>
