# blog-rspress

> 基于 Rspress 的博客（React 版本）

## 架构

```
docs/             # Rspress 页面和文章（文章直接在 docs/blog/ 维护）
theme/            # 主题入口、样式与 React 组件
theme/lib/        # usePosts() —— 基于官方 usePages() 的文章数据 hook
plugins/          # 本地 Rspress 插件（构建期注入阅读时长）
```

## 开发

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```

## 内容更新

文章直接在 `docs/blog/` 下维护。无需任何生成脚本——文章列表由 Rspress 内置的
运行时页面数据（`usePages()`）驱动，新增文章后 dev/build 自动生效。
