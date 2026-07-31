import path from 'path'
import { defineConfig } from '@rspress/core'
import tailwindcss from '@tailwindcss/postcss'
import dotenv from '@shikijs/langs/dotenv'

export default defineConfig({
  root: 'docs',
  themeDir: path.join(process.cwd(), 'src/theme'),
  builderConfig: {
    tools: {
      postcss: (config, { addPlugins }) => {
        console.log('====== PostCSS config function called! ======');
        addPlugins(tailwindcss())
      }
    }
  },
  markdown: {
    shiki: {
      langs: [dotenv],
      langAlias: {
        env: 'dotenv',
      },
    },
  },
  title: '不想起名字',
  description: 'AI / Coding / Notes',
  lang: 'zh-CN',
  i18nSource: (defaultI18n) => {
    // Rspress 默认只提供 `zh` 文案，但本站使用 `zh-CN`，将 zh 复制为 zh-CN
    const merged: Record<string, Record<string, string>> = {}
    for (const [key, value] of Object.entries(defaultI18n)) {
      merged[key] = { ...value, 'zh-CN': (value as Record<string, string>).zh }
    }
    return merged
  },
  icon: '/favicon.ico',
  logo: '/favicon.ico',

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '文章', link: '/posts/' },
      { text: '标签', link: '/tags' },
      { text: '搜索', link: '/search' },
      { text: '关于', link: '/about' },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/noid-l', mode: 'link' },
    ],
    footer: {
      message: `
        <span style="display:inline-flex;align-items:center;gap:16px;flex-wrap:wrap;justify-content:center">
          <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer" style="color:var(--text-2);text-decoration:none">鲁ICP备2025204885号-1</a>
          <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=37011202002577" target="_blank" rel="noopener noreferrer" style="color:var(--text-2);text-decoration:none;display:inline-flex;align-items:center;gap:4px">
            <img src="/beian.png" alt="公安备案" style="width:14px;height:14px" />鲁公网安备37011202002577号
          </a>
        </span>
      `,
      copyright: `Copyright © ${new Date().getFullYear()} · Built with Rspress + Tailwind`,
    },
  },

  head: [
    ['meta', { name: 'theme-color', content: '#1c1917' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['link', { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=JetBrains+Mono:wght@400;500&display=swap' }],
  ],
})
