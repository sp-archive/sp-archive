import { hopeTheme } from 'vuepress-theme-hope'
import navbar from './navbar.js'
import { isArchive } from './utils/archive.js'

export default hopeTheme({
  blog: {
    articleInfo: ['Category', 'Tag', 'Word'],
  },
  copyright: 'GPL-3.0-or-later Licensed <br/> Copyright © 2024-present Super V 2038',
  displayFooter: true,
  editLinkPattern: '/archive/edit.html',
  footer: '收录内容仅供交流学习，本站不提供任何形式的明示或暗示的保证',
  hostname: 'www.sp-archive.top',
  iconAssets: 'iconfont',
  navbar,
  pageInfo: ['Category', 'Tag', 'Word'],
  plugins: {
    blog: {
      filter({ filePathRelative }) {
        return isArchive(`/${filePathRelative}`)
      },
    },
    comment: {
      provider: 'Giscus',
      repo: 'sp-archive/.github',
      repoId: 'R_kgDOK-4XBQ',
      category: '文章评论',
      categoryId: 'DIC_kwDOK-4XBc4Cci_I',
      mapping: 'og:title',
    },
    git: false,
    seo: {
      restrictions: '18+',
    },
  },
  repo: 'https://github.com/orgs/sp-archive/discussions',
  sidebar: false,
  toc: false,
}, { custom: true })
