import { spawnSync } from "node:child_process"
import { randomBytes } from "node:crypto"
import { appendFileSync, writeFileSync } from "node:fs"
import path from "node:path"
import inquirer from "inquirer"
import consola from "consola"
import yaml from "yaml"
import { getDirname } from "./utils.js"

const __dirname = getDirname(import.meta.url)

const id = randomBytes(4).toString("hex").slice(0, 7) // 7 位随机十六进制
consola.info("文章 ID：%d", id)
const filePath = path.resolve(__dirname, `../src/archive/${id}.md`)

const filter = (content: string) => {
  content = content.trim()
  if (!content) return []
  return content.split(",").map((item) => item.trim())
}

consola.info("多个值请用“,”分隔")
const frontmatter = await inquirer.prompt([
  { type: "input", name: "category", message: "所属系列", filter },
  { type: "input", name: "tag", message: "文章标签", filter },
  { type: "input", name: "reference", message: "来源链接", filter },
])
const { title, content } = await inquirer.prompt([
  { type: "input", name: "title", message: "文章标题" },
  { type: "editor", name: "content", message: "输入文章内容" },
])

writeFileSync(
  filePath,
  "---\n" + yaml.stringify(frontmatter) + "---\n\n# " + title + "\n\n",
)
appendFileSync(filePath, content)
appendFileSync(filePath, "\n")
consola.success("文章已保存")

const check = spawnSync("pnpm", ["markdownlint-cli2", filePath, "--fix"])
if (check.status) consola.info("已修复部分排版问题，剩余错误需手动修复")
else consola.success("已修复排版问题")
