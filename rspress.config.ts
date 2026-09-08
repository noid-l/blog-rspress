import { defineConfig } from '@rspress/core'
import { pluginRss } from '@rspress/plugin-rss'
import dotenv from '@shikijs/langs/dotenv'
import { postsDataPlugin } from './plugins/posts-data'

const title = '不想起名字'

export default defineConfig({
  root: 'docs',
  themeDir: 'theme',
  plugins: [
    postsDataPlugin(),
    pluginRss({
      siteUrl: 'https://www.myls.top',
      feed: {
        id: 'feed',
        // 只收录 /posts/ 下的文章页，排除列表页本身和草稿
        test: (item) =>
          item.routePath.startsWith('/posts/') &&
          item.routePath !== '/posts/' &&
          !item.frontmatter.draft,
        title: '不想起名字',
        description: 'AI / Coding / Notes',
        language: 'zh',
        copyright: `Copyright ${new Date().getFullYear()} Shuo`,
        item: (item, page) => ({
          ...item,
          categories: (page.frontmatter.tags as string[]) ?? [],
        }),
        // 保持原有的 /feed.xml 输出路径和 RSS 2.0 格式
        output: { dir: '.', filename: 'feed.xml', type: 'rss' },
      },
    }),
  ],
  markdown: {
    shiki: {
      langs: [dotenv],
      langAlias: {
        env: 'dotenv',
      },
    },
  },
  title,
  description: 'AI / Coding / Notes',
  lang: 'zh',
  llms: true,
  icon: '/favicon.ico',
  logo: '/favicon.ico',
  logoText: title,

  themeConfig: {
    nav: [
      { text: '文章', link: '/posts/' },
      { text: '标签', link: '/tags' },
      { text: '关于', link: '/about' },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/noid-l', mode: 'link' },
    ],
    footer: {
      message: `
        <span style="display:inline-flex;align-items:center;gap:16px;flex-wrap:wrap;justify-content:center">
          <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer" style="color:var(--rp-c-text-2);text-decoration:none">鲁ICP备2025204885号-1</a>
          <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=37011202002577" target="_blank" rel="noopener noreferrer" style="color:var(--rp-c-text-2);text-decoration:none;display:inline-flex;align-items:center;gap:4px">
            <img src="/beian.png" alt="公安备案" style="width:14px;height:14px" />鲁公网安备37011202002577号
          </a>
        </span>
      `,
      copyright: `Copyright © ${new Date().getFullYear()} · Built with Rspress`,
    },
  },

  head: [
    ['meta', { name: 'theme-color', content: '#6366f1' }],
    ['meta', { property: 'og:type', content: 'website' }],
  ],
})
