import { defineClientConfig } from 'vuepress/client'

async function setupMixpanel() {
  const mixpanel = await import('mixpanel-browser') // 动态 import 避免被拦截
  const token = import.meta.env.SP_MIXPANEL_TOKEN
  if (!token)
    return
  mixpanel.init(token, {
    debug: import.meta.env.DEV,
    persistence: 'localStorage',
    track_pageview: 'url-with-path',
  })
}

export default defineClientConfig({
  async enhance() {
    if (!__VUEPRESS_SSR__)
      setupMixpanel() // 异步初始化
  },
})
