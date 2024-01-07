import * as path from "node:path"
import { fileURLToPath } from "node:url"
import { simpleGit } from "simple-git"

export const ARCHIVE_MESSAGE = "chore: 更新文章"

export const git = simpleGit()

export const getDirname = (url: string) => {
  return path.dirname(fileURLToPath(url))
}
