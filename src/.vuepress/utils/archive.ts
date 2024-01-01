export const ARCHIVE_PAGE_VALIDATOR = /^\/archive\/.{1,}$/ // 在 archive 目录下

/**
 * 判断页面是否文章。
 * @param path 路径（以 `/` 开头）
 * @returns 是否文章
 */
export const isArchive = (path: string) => {
  return ARCHIVE_PAGE_VALIDATOR.test(path)
}
