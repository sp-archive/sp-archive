import { spawnSync } from "node:child_process"
import consola from "consola"
import inquirer from "inquirer"
import { ARCHIVE_MESSAGE, git } from "./utils.js"

const status = await git.status()
const files = [ // 只检查修改的文章
  ...status.not_added,
  ...status.staged,
].filter((name) => name.startsWith("src/archive/") && name.endsWith(".md"))
if (!files.length) {
  consola.fatal("没有可以提交的文章")
  process.exit(1)
}
consola.info("将提交文章：%s", files.join(", "))

const check = spawnSync("pnpm", ["markdownlint-cli2", ...files])
if (!check.status) {
  consola.fatal("文章含有格式错误")
  process.exit(0)
} else {
  consola.success("文章无格式错误")
}

const { contributor } = await inquirer.prompt({
  name: "contributor",
  message: "投稿者邮箱",
}) as { contributor: string }

await git.add(".")
await git
  .env({
    GIT_AUTHOR_NAME: contributor.split("@")[0], // 取邮箱的用户标识符
    GIT_AUTHOR_EMAIL: contributor,
  })
  .commit(ARCHIVE_MESSAGE)
consola.success("已创建提交")

try {
  await git.push("origin", "main")
  consola.success("推送成功")
} catch (e) {
  consola.error("推送失败：%o", e)
}
