<script setup lang="ts">
import { computed } from 'vue'
import HopeNormalPage from 'vuepress-theme-hope/components/NormalPage.js'
import { usePageFrontmatter } from 'vuepress/client'
import CategoriesData from '../categories.json'
import ArchiveWarning from './ArchiveWarning.vue'
import ArchiveReference from './ArchiveReference.vue'

const frontmatter = usePageFrontmatter()
const reference = computed(() => { // reference 转为数组
  const pure = frontmatter.value.reference as string | string[] | undefined
  return typeof pure === 'string' ? [pure] : (pure ?? [])
})
const warning = computed(() => {
  const ret = new Set(frontmatter.warning) // Set 帮助去重
  const categories = frontmatter.value.category as string[] ?? []
  for (const category of categories) {
    if (category.startsWith('$')) // $schema
      continue
    for (const item of CategoriesData[category]?.warning as string[] ?? [])
      ret.add(item)
  }
  return Array.from(ret)
})
</script>

<template>
  <HopeNormalPage>
    <template #contentBefore>
      <div class="theme-hope-content" style="padding-bottom: 0;">
        <ArchiveReference
          v-if="!frontmatter.original"
          :link="reference"
          :unknown="!reference.length"
        />
        <ArchiveWarning v-if="warning.length" :types="warning" />
      </div>
    </template>
  </HopeNormalPage>
</template>
