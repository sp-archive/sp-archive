import { navbar } from 'vuepress-theme-hope'

export default navbar([
  { text: '主页', icon: 'home', link: '/' },
  { text: '文章', icon: 'blog', link: '/article/' },
  { text: '分类', icon: 'categoryselected', link: '/category/' },
  { text: '标签', icon: 'tag', link: '/tag/' },
  { text: '关于', icon: 'info', link: '/about.html' },
])
