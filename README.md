# blog-rspress

> 基于 Rspress 的博客（React 版本）

## 架构

```
docs/             # Rspress 页面和文章（文章直接在 docs/posts/ 维护）
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

文章直接在 `docs/posts/` 下维护，新增/修改文章后 `predev`/`prebuild` 会自动重新生成文章数据（`src/data/posts.ts`）。
