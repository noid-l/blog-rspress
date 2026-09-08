import type { RspressPlugin } from '@rspress/core'

function getReadingTime(content: string, charsPerMinute = 400): number {
  const text = content
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]+`/g, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/^[#>*_-]+\s*/gm, '')
    .replace(/\s+/g, '')
  return Math.max(1, Math.ceil(text.length / charsPerMinute))
}

/**
 * Injects `frontmatter.readingTime` for every post page at build time, so the
 * value ships inside the official `virtual-page-data` runtime module and can
 * be read on the client via `usePages()`.
 */
export function postsDataPlugin(): RspressPlugin {
  return {
    name: 'blog-posts-data',
    extendPageData(pageData) {
      const { routePath } = pageData
      if (!routePath.startsWith('/posts/') || routePath === '/posts/') return
      pageData.frontmatter.readingTime = getReadingTime(pageData.content)
      // 文章页不显示空 sidebar（官方博客做法），去掉左侧竖线
      pageData.frontmatter.sidebar = false
    },
  }
}
