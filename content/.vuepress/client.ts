import { defineClientConfig } from 'vuepress/client'
import mixpanel from 'mixpanel-browser'

function setupMixpanel() {
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
  setup() {
    if (!__VUEPRESS_SSR__)
      setupMixpanel()
  },
})
