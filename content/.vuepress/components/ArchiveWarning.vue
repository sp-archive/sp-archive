<script setup lang="ts">
import type { WarningType } from '../utils/archive.ts'
import Alert from './Alert.vue'

defineProps<{
  category?: string
  types: string[]
}>()

const WarningText: Record<WarningType, string> = {
  partial: '本系列有部分内容丢失',
  serializing: '本系列正在连载中',
}
</script>

<template>
  <Alert type="warning" title="注意">
    <ul>
      <li v-for="item in types" :key="item">
        <p v-if="Object.hasOwn(WarningText, item)">
          {{ WarningText[item] }}
        </p>
      </li>
    </ul>
  </Alert>
</template>
