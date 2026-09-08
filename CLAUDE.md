# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

基于 Rspress 的博客（React 版本）。文章直接在 `docs/blog/` 维护，文章数据完全由 Rspress 官方运行时 API（`usePages()`）驱动，无任何生成脚本。

技术栈：Rspress ^2.0.21 (`@rspress/core`) + React ^19.2.8 + TypeScript ^5.8.3（纯 CSS 变量定制主题，无 Tailwind）。

## Commands

```bash
npm run dev          # 开发服务器
npm run build        # 构建（Rspress 构建 + RSS 由 plugin-rss 生成）
npm run preview      # 预览构建产物（Pagefind 搜索仅在 preview 可用）
```

## Architecture

```
docs/
├── index.mdx               # 首页（pageType: home，hero 文案在 frontmatter）
├── blog/                   # 博客文章（直接在此维护，命名 YYYY-MM-DD-slug.md）
│   └── index.mdx           # 博客列表页（doc-wide + <BlogList />，rspress-plugin-blog-list）
├── about.mdx               # 关于页（pageType: custom → AboutLayout）
└── public/                 # 静态资源
plugins/
└── posts-data.ts           # 本地 Rspress 插件：extendPageData 注入 readingTime + sidebar: false
theme/
├── index.tsx               # 主题入口：export * theme-original + Layout/DocLayout slot 覆盖
├── index.css               # 纯 CSS 变量覆盖（--rp-c-*/--rp-radius/--rp-shadow-*）+ bl-* 组件类
├── lib/
│   └── usePosts.ts         # 文章数据 hook：usePosts() 列表 + useCurrentPost() 当前文章
└── components/             # React 组件
    ├── HomeLayout/         # 首页（hero frontmatter + 最新 6 篇，pageType: home 自动拾取）
    ├── AboutLayout/        # 关于页
    ├── PostCard.tsx        # 文章卡片（仅首页使用）
    ├── PostHeader.tsx      # 文章页头：返回链接 + 日期/时长/标签（DocLayout beforeDocContent slot）
    └── PostNav.tsx         # 文章上下篇导航（Layout afterDocContent slot 注入）
```

### 数据流

1. Rspress 构建期生成内置 `virtual-page-data` 模块，包含所有页面的 routePath/title/description/frontmatter
2. `plugins/posts-data.ts` 的 `extendPageData` 钩子在构建期为文章页注入 `frontmatter.readingTime` 和 `sidebar: false`（隐藏空 sidebar 竖线）
3. 客户端组件通过 `theme/lib/usePosts.ts`（封装官方 `usePages()`）获取文章列表：过滤 `/blog/`、排除草稿、按日期降序
4. 首页 `HomeLayout` 取前 6 篇为最新文章列表；`/blog/` 列表页由 `rspress-plugin-blog-list` 的 `<BlogList />` 渲染

### 主题定制约定

- 只通过 CSS 变量（`--rp-c-brand` 等）和 BEM 类覆盖定制官方主题，不 eject 内置组件
- 自定义组件类统一 `bl-` 前缀，纯 CSS 书写（无 Tailwind、无构建期 CSS 框架）
- `theme/index.tsx` 保持 `export * from '@rspress/core/theme-original'`，仅覆盖 `Layout` 和 `HomeLayout`

### 样式系统

- 亮色/暗色双套 token 分别在 `:where(html:not(.rp-dark))` 和 `:where(html.rp-dark)` 下覆盖 `--rp-c-*` 变量
- 品牌色：靛蓝系（light `#6366f1` / dark `#818cf8`）
- 字体：系统字体栈（`--rp-font-family-base` / `--rp-font-family-mono`）

## Key Dependencies

- **@rspress/core**: ^2.0.21 — 静态站点生成器
- **@rspress/plugin-rss**: ^2.0.21 — RSS feed（`doc_build/feed.xml`）
- **rspress-plugin-blog-list**: ^1.2.0 — 博客列表页 `<BlogList />` 组件
- **react** + **react-dom**: ^19.2.8

## Content Source

文章直接在 `docs/blog/` 中维护，frontmatter 字段：`title` / `date` / `tags` / `description` / 可选 `category` / 可选 `draft: true`（草稿不出现在列表和 RSS）。新增文章无需任何额外步骤，dev/build 自动生效。

## Notes

- 站点语言为 `zh`（Rspress 内置中文文案直接使用，无需 i18nSource）
- 生产模式 `location.pathname` 带 `.html` 后缀，PostNav 匹配路由时需先剥离
