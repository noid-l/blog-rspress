# 任务计划 (Todo) - 修复 Cloudflare 部署后 blog-rspress 首页样式不对的问题

## 目标
修复 `blog-rspress` 的 Tailwind CSS v4 编译问题，确保自定义样式类（如 `.home-shell`、`.post-card` 等）以及 Tailwind 的基础样式在 Cloudflare 部署后能够正常生效。

## 计划步骤

- [x] **Step 1: 验证当前构建产物的问题**
  - [x] 在本地打包并检查 `doc_build/static/css/styles.*.css` 是否确实丢失了 `.home-shell` 等关键样式（已确认，确实丢失，且没有经过 Tailwind 编译）。
- [x] **Step 2: 探索并配置 PostCSS 编译链**
  - [x] 在 `blog-rspress` 目录下创建 `postcss.config.cjs` 配置文件，并配置 `@tailwindcss/postcss` 插件。
  - [x] 确保依赖中的 `postcss` 和 `@tailwindcss/postcss` 版本匹配。
- [x] **Step 3: 配置 rspress.config.ts 并进行本地重新构建验证**
  - [x] 在 `rspress.config.ts` 中添加 `builderConfig.tools.postcss` 配置，显式注入 `@tailwindcss/postcss` 插件。
  - [x] 在 `rspress.config.ts` 中配置 `themeDir: path.join(process.cwd(), 'src/theme')` 指向正确的自定义主题目录。
  - [x] 执行 `npm run build`。
  - [x] 检查生成的新 CSS 文件中是否已成功包含 `.home-shell` 及其编译后的属性。
- [x] **Step 4: 本地启动预览 (preview) 验证**
  - [x] 启动本地预览服务器或开发服务器，使用 chrome-devtools 渲染页面并截图验证。
  - [x] 用 `evaluate_script` 检查 `.home-shell` 的 `max-width` 是否为 `1152px` (即 `72rem`，6xl) 而不再是 `none`。
- [/] **Step 5: 提交更改以确保 Cloudflare Pages 部署生效**
  - [ ] 提交修改的代码，并推送到远端仓库。
  - [ ] 观察 Cloudflare Pages 部署状态。
  - [ ] 验证线上 https://blog-rspress.myls.top/ 的首页排版。
