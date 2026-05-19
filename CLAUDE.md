# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

基于 Rspress 的博客（React 版本）。文章源来自 `blog-content/` git submodule，通过 `scripts/copy-content.mjs` 同步到 `docs/posts/`。

技术栈：Rspress ^1.47.1 + React ^18.3.1 + Tailwind CSS 4.2.4 + TypeScript 5.8.3。

## Commands

```bash
npm run dev          # 开发服务器（predev 自动 sync-content）
npm run build        # 构建（prebuild sync-content → postbuild OG/RSS/Pagefind）
npm run preview      # 预览构建产物
```

**注意**: Pagefind 搜索功能只在 `build` 后的 `preview` 中可用，`dev` 模式下不可用。

## Architecture

```
docs/
├── index.md                # 首页（pageType: custom，渲染 React HomePage 组件）
├── posts/                  # 从 blog-content 同步的文章（不要直接编辑）
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
├── copy-content.mjs        # 从 content/ 复制到 docs/
├── gen-og.mjs              # OG 图片生成（satori + @resvg/resvg-js）
├── gen-rss.mjs             # RSS feed 生成
└── gen-pagefind.mjs        # Pagefind 搜索索引生成
```

### 数据流

1. `src/lib/posts.ts` 用 `readdirSync('docs/posts')` + `gray-matter` + `zod` 验证读取文章
2. 数据按日期降序排列，被 React 组件消费
3. 首页 `HomePage.tsx` 取第一篇为精选，前 6 篇为最新文章列表

### 构建流程

1. `prebuild`: `sync-content` 执行 `git submodule update --init --recursive` + `copy-content.mjs`
2. `build`: Rspress 构建静态站点，输出到 `doc_build/`
3. `postbuild`: 生成 OG 图片 → 生成 RSS feed → 生成 Pagefind 搜索索引

### 样式系统

- Tailwind CSS 4 通过 `@tailwindcss/vite` 集成
- CSS 变量定义在 `style.css` 的 `:root`（浅色）和 `.dark`（深色）中
- 与 `blog-vitepress` 共享 "Warm Editorial" 设计系统：`.post-card`、`.hero-box`、`.tag-chip` 等类名一致

## Key Dependencies

- **rspress**: ^1.47.1 — 静态站点生成器
- **react** + **react-dom**: ^18.3.1
- **tailwindcss** + **@tailwindcss/vite**: ^4.2.4
- **pagefind**: ^1.5.2 — 静态全文搜索
- **rss**: ^1.2.2 — RSS feed
- **satori** + **@resvg/resvg-js**: OG 图片生成
- **gray-matter**: frontmatter 解析
- **zod**: 运行时数据验证

## Content Source

文章在 `blog-content/` git submodule 中管理。**不要直接编辑 `docs/posts/`**。修改流程：

1. 在 `content/posts/` 下创建/修改文章
2. 提交到 `blog-content` 仓库
3. 运行 `npm run sync-content` 拉取最新内容
