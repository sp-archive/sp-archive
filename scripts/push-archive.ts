import { spawnSync } from 'node:child_process'
import process from 'node:process'
import consola from 'consola'
import inquirer from 'inquirer'
import { ARCHIVE_MESSAGE, git } from './utils.js'

const status = await git.status()
const files = [ // 只检查修改的文章
  ...status.not_added,
  ...status.staged,
].filter(name => name.startsWith('content/article/') && name.endsWith('.md'))
if (!files.length) {
  consola.fatal('没有可以提交的文章')
  process.exit(1)
}
consola.info('将提交文章：%s', files.join(', '))

const check = spawnSync('pnpm', ['eslint', ...files, '--fix'])
if (check.status) {
  consola.fatal('文章含有格式错误')
  process.exit(0)
}
else {
  consola.success('文章无格式错误或已自动修复')
}

consola.info('投稿者邮箱可不填，默认为自己')
const { contributor } = await inquirer.prompt({
  name: 'contributor',
  message: '投稿者邮箱',
}) as { contributor: string }
const env = {
  GIT_AUTHOR_NAME: contributor.split('@')[0], // 取邮箱的用户标识符
  GIT_AUTHOR_EMAIL: contributor,
}

await git.add('.')
await (contributor ? git.env(env) : git).commit(ARCHIVE_MESSAGE) // 需要设置环境变量的，先设置环境变量
consola.success('已创建提交')

try {
  await git.push()
  consola.success('推送成功')
}
catch (e) {
  consola.error('推送失败：%o', e)
}
