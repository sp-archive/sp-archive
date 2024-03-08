import { navbar } from 'vuepress-theme-hope'

export default navbar([
  { text: '主页', icon: 'home', link: '/' },
  { text: '文章', icon: 'blog', link: '/article/' },
  { text: '分类', icon: 'categoryselected', link: '/category/' },
  { text: '标签', icon: 'tag', link: '/tag/' },
  {
    children: [
      '/archive/post.html',
      '/archive/edit.html',
      '/archive/remove.html',
    ],
    icon: 'creative',
    text: '贡献',
  },
  { text: '关于', icon: 'info', link: '/about.html' },
])
