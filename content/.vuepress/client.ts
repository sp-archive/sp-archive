import { defineClientConfig } from 'vuepress/client'

async function setupMixpanel() {
  const mixpanel = await import('mixpanel-browser')
  const token = import.meta.env.SP_MIXPANEL_TOKEN
  mixpanel.init(token, {
    debug: import.meta.env.DEV,
    track_pageview: true,
  })
}

export default defineClientConfig({
  async enhance() {
    if (!__VUEPRESS_SSR__)
      setupMixpanel() // 异步初始化
  },
})
