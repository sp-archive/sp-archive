# 贡献指南

## 参与开发

感谢您抽出宝贵的时间来完善 SP Archive！

SP Archive 主要使用 Vuepress 和 Vuepress Theme Hope，你只需要 fork 本仓库并下载到本地，安装依赖即可开始开发。

常用命令（确保已安装 [Node.js](https://nodejs.org/) 和 [pnpm](https://pnpm.io/)）：

- 安装依赖：`pnpm install`
- 启动开发服务器：`pnpm dev`
- 清除缓存，启动开发服务器：`pnpm clean-dev`
- 构建：`pnpm build`
- 检查代码风格：`pnpm lint`

写好代码，在 commit 之前，请运行 `pnpm lint` 确保代码风格一致。

Commit 遵循 [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/#summary)，提交时会自动检查 commit message。

注：收录内容相关请查看[关于本站](https://www.sp-archive.top/about.html)。

## 审核与发布文章

> [!NOTE]
> 在 @sp-archive/archive-reviewers 中的用户有权限执行此操作。

创建文章前，请先确保工作区没有未提交的文件。

在项目根目录运行 `pnpm new-archive` 创建一篇文章，若提示“剩余错误需手动修复”，可运行 `markdownlint-cli2 "src/archive/**/*.md"` 查看错误信息，并使用编辑器手动修复格式。

格式修复完成后，运行 `pnpm push-archive` 提交并推送文章。
