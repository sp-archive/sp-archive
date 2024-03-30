import { getDirname, path } from 'vuepress/utils'
import theme from './theme.js'
import { defineUserConfig } from 'vuepress'
import vite from '@vuepress/bundler-vite'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'

const __dirname = getDirname(import.meta.url)
const PREFETCHES = ['giscus', 'mixpanel', 'photoswipe'] // 可以 prefetch 的产物前缀

function resolveComponent(name: string) {
  return path.resolve(__dirname, `./components/${name}.vue`)
}

export default defineUserConfig({
  alias: {
    '@theme-hope/components/NormalPage': resolveComponent('NormalPage'),
  },
  bundler: vite({
    viteOptions: {
      envPrefix: ['SP_'],
    },
  }),
  description: 'Spank 文章收录',
  lang: 'zh-CN',
  plugins: [
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, './components'),
    }),
  ],
  shouldPrefetch(file) {
    const name = file.replace('assets/', '')
    return PREFETCHES.some(item => name.startsWith(item))
  },
  title: 'SP Archive',
  theme,
})
