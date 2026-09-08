# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

基于 Rspress 的博客（React 版本）。文章直接在 `docs/posts/` 维护，`scripts/gen-posts-data.mjs` 从文章生成 `src/data/posts.ts` 数据文件。

技术栈：Rspress ^2.0.21 (`@rspress/core`) + React ^19.2.8 + Tailwind CSS 4.2.4 + TypeScript ^5.8.3。

## Commands

```bash
npm run dev          # 开发服务器（predev 自动生成文章数据）
npm run build        # 构建（prebuild 生成文章数据 → postbuild RSS）
npm run preview      # 预览构建产物
```

**注意**: Pagefind 搜索功能只在 `build` 后的 `preview` 中可用，`dev` 模式下不可用。

## Architecture

```
docs/
├── index.md                # 首页（pageType: custom，渲染 React HomePage 组件）
├── posts/                  # 博客文章（直接在此维护）
├── tags.md                 # 标签页
├── search.md               # 搜索页
├── about.md                # 关于页
└── public/                 # 静态资源
src/
├── lib/
│   └── posts.ts            # 文章加载器：读取 docs/posts/*.md，zod 验证 frontmatter
└── theme/
    ├── index.tsx           # 主题入口（导入 RspressLayout + 全局样式）
    ├── style.css           # Tailwind 导入 + CSS 变量（Warm Editorial 设计系统）
    └── components/         # React 组件
        ├── HomePage.tsx    # 首页（精选文章 + 最新文章列表）
        ├── PostsArchivePage.tsx  # 文章归档页
        ├── TagsPage.tsx    # 标签聚合页
        ├── SearchPage.tsx  # Pagefind 搜索页
        ├── PostCard.tsx    # 文章卡片
        ├── PostNav.tsx     # 文章上下篇导航
        ├── PostFooter.tsx  # 文章底部（分享按钮等）
        └── BackToTop.tsx   # 回到顶部
scripts/
├── gen-posts-data.mjs      # 从 docs/posts 生成 src/data/posts.ts
└── gen-pagefind.mjs        # Pagefind 搜索索引生成
```

### 数据流

1. `src/lib/posts.ts` 用 `readdirSync('docs/posts')` + `gray-matter` + `zod` 验证读取文章
2. 数据按日期降序排列，被 React 组件消费
3. 首页 `HomePage.tsx` 取第一篇为精选，前 6 篇为最新文章列表

### 构建流程

1. `prebuild`: `gen-posts-data` 从 `docs/posts/` 生成 `src/data/posts.ts`
2. `build`: Rspress 构建静态站点，输出到 `doc_build/`；RSS 由 `@rspress/plugin-rss` 在构建阶段生成（`doc_build/feed.xml`）

### 样式系统

- Tailwind CSS 4 通过 `@tailwindcss/postcss` 集成（在 `rspress.config.ts` 的 `builderConfig.tools.postcss` 中显式注册）
- CSS 变量定义在 `style.css` 的 `:root`（浅色）和 `.dark`（深色）中
- 与 `blog-vitepress` 共享 "Warm Editorial" 设计系统：`.post-card`、`.hero-box`、`.tag-chip` 等类名一致

## Key Dependencies

- **@rspress/core**: ^2.0.21 — 静态站点生成器
- **react** + **react-dom**: ^19.2.8
- **@tailwindcss/postcss**: ^4.2.4 — PostCSS 插件（Tailwind CSS 4 由其传递依赖）
- **pagefind**: ^1.5.2 — 静态全文搜索
- **rss**: ^1.2.2 — RSS feed
- **gray-matter**: frontmatter 解析
- **zod**: 运行时数据验证

## Content Source

文章直接在 `docs/posts/` 中维护。新增文章后在 `predev`/`prebuild` 阶段会自动运行 `gen-posts-data` 重新生成 `src/data/posts.ts`，也可手动执行 `npm run gen-posts-data`。
