import { defineClientConfig } from 'vuepress/client'
import mixpanel from 'mixpanel-browser'

function setupMixpanel() {
  const token = import.meta.env.SP_MIXPANEL_TOKEN
  if (!token)
    return
  mixpanel.init(token, {
    api_host: import.meta.env.SP_MIXPANEL_API_HOST,
    debug: import.meta.env.DEV,
    persistence: 'localStorage',
    track_pageview: 'url-with-path',
  })
}

export default defineClientConfig({
  enhance() {
    if (!__VUEPRESS_SSR__)
      setupMixpanel()
  },
})
