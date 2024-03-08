import { spawn, spawnSync } from 'node:child_process'
import { randomInt } from 'node:crypto'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import autocorrect from 'autocorrect-node'
import consola from 'consola'
import { formatISO } from 'date-fns'
import inquirer from 'inquirer'
import yaml from 'yaml'
import { getDirname } from './utils.js'

const __dirname = getDirname(import.meta.url)

function resolveArticlePath(id: string) {
  return path.resolve(__dirname, `../content/article/${id}.md`)
}

/** 生成可用的文章 ID。 */
function generateId() {
  const id = randomInt(0, 9999999).toString().padStart(7, '0')
  if (existsSync(resolveArticlePath(id)))
    return generateId() // 冲突，重新生成
  return id
}

/**
 * 更新文章的 next 字段。
 * @param id 文章 ID
 * @param to 字段内容
 */
function linkArticleNext(id: string, to: string) {
  const filePath = resolveArticlePath(id)
  let content = readFileSync(filePath).toString()
  const matched = content.match(/---\n([\s\S]*?)\n---/)
  if (matched) { // 更新已有 frontmatter
    const frontmatter = yaml.parse(matched[1])
    frontmatter.next = to
    const text = yaml.stringify(frontmatter).slice(0, -1) // 删除最后的换行
    content = content.replace(matched[1], text)
  }
  else { // 添加 frontmatter
    content = `---\nnext: ${to}\n---\n\n${content}`
  }
  writeFileSync(filePath, content)
}

/** 询问文章信息，保存到文件。 */
async function askAndSave(id: string) {
  const filter = (content: string) => {
    content = content.trim()
    if (!content)
      return undefined // 空值
    return content.split(',').map(item => item.trim()).toSorted()
  }

  consola.info('以下字段可留空，多个值请用“,”分隔')
  const { title, ...frontmatter } = await inquirer.prompt([
    { type: 'input', name: 'category', message: '所属系列', filter },
    { type: 'input', name: 'tag', message: '文章标签', filter },
    { type: 'input', name: 'reference', message: '来源链接', filter },
    { type: 'input', name: 'title', message: '文章标题' },
    {
      type: 'input',
      name: 'prev',
      message: '关联上一篇文章 ID',
      validate(input) {
        if (!input)
          return true // 留空
        return existsSync(resolveArticlePath(input)) ? true : '无效的文章 ID'
      },
    },
  ])
  let { content } = await inquirer.prompt<{ content: string }>([
    { type: 'editor', name: 'content', message: '输入文章内容' },
  ])

  frontmatter.date = formatISO(new Date())
  if (frontmatter.prev) {
    linkArticleNext(frontmatter.prev, `/article/${id}.md`)
    frontmatter.prev = `/article/${frontmatter.prev}.md`
  }
  content = autocorrect.format(`---\n${yaml.stringify(frontmatter)}---\n\n# ${title}\n\n${content}`)
  writeFileSync(resolveArticlePath(id), content)
}

/** 检查并自动修复排版问题。 */
function checkAndFix(id: string) {
  const check = spawnSync('pnpm', ['eslint', resolveArticlePath(id), '--fix'])
  if (check.stderr)
    process.stderr.write(check.stderr) // 透传 stderr
  if (check.status)
    consola.info('已修复部分排版问题，剩余错误需手动修复')
  else consola.success('已修复排版问题')
}

const id = generateId()
consola.info('文章 ID：%s', id)
consola.info('文章路径：%s', resolveArticlePath(id))
await askAndSave(id)
checkAndFix(id)
