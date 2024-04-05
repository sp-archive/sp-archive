import { hopeTheme } from 'vuepress-theme-hope'
import navbar from './navbar.js'
import { isArchive } from './utils/archive.js'

export default hopeTheme({
  blog: {
    articleInfo: ['Category', 'Tag', 'Word'],
  },
  copyright: 'GPL-3.0-or-later Licensed <br/> Copyright © 2024 Super V 2038',
  displayFooter: true,
  editLink: false,
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
    components: {
      rootComponents: {
        notice: [
          {
            path: '/',
            key: 'closing-down',
            title: '停止运营公告',
            content: '<p>很遗憾，由于一些原因，SP Archive 自 2024/4/5 起停止运营。</p><p>届时请各位前往 <strong><a href="https://home.spankingcloud.org/">SP 圈内站点导航</a></strong>阅读小说，本站仅有的几篇小说在导航站都有收录。</p>',
            actions: [
              {
                text: '前往导航站',
                type: 'primary',
                link: 'https://home.spankingcloud.org/',
              },
              {
                text: '查看详情',
                type: 'default',
                link: '/closing-down.html',
              },
            ],
            fullscreen: true,
          },
        ],
      },
    },
    git: false,
    seo: false,
  },
  repo: 'https://github.com/orgs/sp-archive/discussions',
  sidebar: false,
  toc: false,
}, { custom: true })
