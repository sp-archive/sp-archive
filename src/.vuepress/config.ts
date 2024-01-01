import { defineUserConfig } from "vuepress"
import { getDirname, path } from "@vuepress/utils"
import theme from "./theme.js"

const __dirname = getDirname(import.meta.url)

const resolveComponent = (name: string) => {
  return path.resolve(__dirname, `./components/${name}.vue`)
}

export default defineUserConfig({
  alias: {
    "@theme-hope/components/NormalPage": resolveComponent("NormalPage"),
  },
  description: "Spank 文章收录",
  lang: "zh-CN",
  title: "SP Archive",
  theme,
})
