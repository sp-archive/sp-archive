import type { UserConfig } from '@commitlint/types'

export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [2, 'always', ['deps', 'deps-dev']],
    'type-enum': [2, 'always', [
      'archive',
      'build',
      'chore',
      'ci',
      'docs',
      'feat',
      'fix',
      'perf',
      'refactor',
      'revert',
      'style',
      'test',
    ]],
  },
} satisfies UserConfig
