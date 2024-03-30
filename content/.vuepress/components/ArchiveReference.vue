<script setup lang="ts">
import { usePageData } from 'vuepress/client'
import HopeAutoLink from 'vuepress-theme-hope/components/AutoLink'
import { isArchive } from '../utils/archive'
import Alert from './Alert.vue'
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  link: string[]
  unknown?: boolean
}>(), {
  unknown: false,
})

function isLink(text: string) {
  return URL.canParse(text)
}

const isArchivePage = computed(() => {
  return isArchive(usePageData().value.path)
})
const title = computed(() => {
  return props.unknown ? '本文出处未知或已不可考' : '本文出处'
})
</script>

<template>
  <Alert v-if="isArchivePage" type="info" :title="title">
    <ul v-if="!unknown">
      <li v-for="(text, index) in link" :key="index">
        <HopeAutoLink v-if="isLink(text)" :config="{ link: text, text }" />
        <p v-else>
          {{ text }}
        </p>
      </li>
    </ul>
  </Alert>
</template>
