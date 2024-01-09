import { hopeTheme } from "vuepress-theme-hope"
import navbar from "./navbar.js"
import { isArchive } from "./utils/archive.js"

export default hopeTheme({
  copyright: "GPL-3.0-or-later Licensed <br /> Copyright © 2024-present Super V 2038",
  displayFooter: true,
  docsDir: "src",
  footer: "收录内容仅供交流学习，本站不提供任何形式的明示或暗示的保证",
  iconAssets: "iconfont",
  navbar,
  pageInfo: ["Category", "Tag", "Word"],
  plugins: {
    blog: {
      article: "/archive/",
      filter({ filePathRelative }) {
        return isArchive("/" + filePathRelative)
      },
    },
    git: false,
  },
  repo: "sp-archive/sp-archive",
  sidebar: false,
}, { custom: true })
