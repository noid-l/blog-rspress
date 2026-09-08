import { usePages } from '@rspress/core/runtime'

export interface PostItem {
  title: string
  url: string
  date: string
  tags: string[]
  description: string
  readingTime?: number
  category?: string
}

function formatDate(value: unknown): string {
  if (!value) return ''
  const date = value instanceof Date ? value : new Date(String(value))
  return Number.isNaN(+date) ? String(value) : date.toISOString().slice(0, 10)
}

/**
 * Reads the post list from Rspress's built-in runtime page data
 * (`virtual-page-data`) via the official `usePages()` hook. Posts are pages
 * under `/posts/`; the listing page itself and drafts are excluded.
 * `readingTime` is injected at build time by `plugins/posts-data.ts`.
 */
export function usePosts(): PostItem[] {
  const { pages } = usePages()

  return pages
    .filter(
      (page) =>
        page.routePath.startsWith('/posts/') &&
        page.routePath !== '/posts/' &&
        page.frontmatter.draft !== true,
    )
    .map((page) => ({
      title: page.title,
      url: page.routePath,
      date: formatDate(page.frontmatter.date),
      tags: (page.frontmatter.tags as string[] | undefined) ?? [],
      description: page.description ?? '',
      readingTime: page.frontmatter.readingTime as number | undefined,
      category: page.frontmatter.category as string | undefined,
    }))
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
}
