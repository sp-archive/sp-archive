import * as path from 'node:path'
import { fileURLToPath } from 'node:url'
import { simpleGit } from 'simple-git'

export const ARCHIVE_MESSAGE = 'archive: 更新文章'

export const git = simpleGit()

export function getDirname(url: string) {
  return path.dirname(fileURLToPath(url))
}
