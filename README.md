# blog-rspress

> 基于 Rspress 的博客（React 版本）

## 架构

```
content/          # git submodule → blog-content（Markdown 内容源）
docs/             # Rspress 页面和文章
src/theme/        # React 主题组件
src/lib/          # 内容加载器和工具
scripts/          # 构建脚本
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

内容源在 [blog-content](https://github.com/noid-l/blog-content) 仓库。
更新 submodule：

```bash
git submodule update --remote
```
