// 格式：/article/xxxxxxx.{md,html}
export const ARCHIVE_PAGE_VALIDATOR = /^\/article\/\d{7}\.(md|html)$/

/**
 * 判断页面是否文章。
 * @param path 路径（以 `/` 开头）
 */
export function isArchive(path: string) {
  return ARCHIVE_PAGE_VALIDATOR.test(path)
}

export type WarningType = 'partial' | 'serializing'
