<script setup lang="ts">
import { computed } from 'vue'
import HopeNormalPage from 'vuepress-theme-hope/components/NormalPage'
import { usePageFrontmatter } from 'vuepress/client'
import ArchiveReference from './ArchiveReference.vue'

const frontmatter = usePageFrontmatter()
const reference = computed(() => { // reference 转为数组
  const pure = frontmatter.value.reference as string | string[] | undefined
  return typeof pure === 'string' ? [pure] : (pure ?? [])
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
      </div>
    </template>
  </HopeNormalPage>
</template>
