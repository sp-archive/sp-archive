import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: ['LICENSE', '.vuepress'],
  rules: {
    'eol-last': [2, 'always'],
  },
})
