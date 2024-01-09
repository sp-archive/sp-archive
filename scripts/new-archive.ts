import { spawnSync } from "node:child_process"
import { randomBytes } from "node:crypto"
import { existsSync, mkdirSync, writeFileSync } from "node:fs"
import path from "node:path"
import autocorrect from "autocorrect-node"
import inquirer from "inquirer"
import consola from "consola"
import yaml from "yaml"
import { getDirname } from "./utils.js"

const __dirname = getDirname(import.meta.url)

const id = randomBytes(4).toString("hex").slice(0, 7) // 7 位随机十六进制
consola.info("文章 ID：%s", id)
const fileDir = path.resolve(__dirname, `../src/archive/${id.slice(0, 2)}`)
const filePath = path.resolve(fileDir, `./${id.slice(2)}.md`)

const filter = (content: string) => {
  content = content.trim()
  if (!content) return []
  return content.split(",").map((item) => item.trim())
}

consola.info("以下字段可留空，多个值请用“,”分隔")
const { title, ...frontmatter } = await inquirer.prompt([
  { type: "input", name: "category", message: "所属系列", filter },
  { type: "input", name: "tag", message: "文章标签", filter },
  { type: "input", name: "reference", message: "来源链接", filter },
  { type: "input", name: "title", message: "文章标题" },
])
let { content } = await inquirer.prompt<{ content: string }>([
  { type: "editor", name: "content", message: "输入文章内容" },
])

content = autocorrect.format(`---
${yaml.stringify(frontmatter)}
---

# ${title}

${content}
`) // 添加格式；中英文间加空格
if (!existsSync(fileDir)) mkdirSync(fileDir) // 先保证目录存在
writeFileSync(filePath, content) // 写入文件
consola.success("文章已保存")

const check = spawnSync("pnpm", [ // markdownlint
  "markdownlint-cli2",
  filePath,
  "--fix",
])
if (check.status) consola.info("已修复部分排版问题，剩余错误需手动修复")
else consola.success("已修复排版问题")
