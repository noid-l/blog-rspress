import React, { useMemo } from 'react'
import { posts } from '../../src/data/posts'

/**
 * Prev/next post navigation. Renders only when at least one neighbor exists.
 * The slot container in `Layout` (`blog-after-doc`) provides spacing.
 * Uses the client-safe auto-generated `src/data/posts.ts` (NOT `src/lib/posts.ts`
 * which reads from disk and would break the browser bundle).
 */
export const PostNav: React.FC<{ slug: string }> = ({ slug }) => {
  const currentIndex = useMemo(() => {
    return posts.findIndex((p) => p.url === `/posts/${slug}`)
  }, [slug])

  const prevPost = currentIndex >= 0 ? posts[currentIndex + 1] : undefined
  const nextPost = currentIndex > 0 ? posts[currentIndex - 1] : undefined

  if (!prevPost && !nextPost) return null

  return (
    <nav className="blog-post-nav">
      {prevPost ? (
        <a href={prevPost.url} className="blog-post-nav__item">
          <span className="blog-post-nav__label">← 上一篇</span>
          <span className="blog-post-nav__title">{prevPost.title}</span>
        </a>
      ) : (
        <div className="blog-post-nav__item blog-post-nav__item--placeholder" aria-hidden="true" />
      )}
      {nextPost ? (
        <a href={nextPost.url} className="blog-post-nav__item">
          <span className="blog-post-nav__label">下一篇 →</span>
          <span className="blog-post-nav__title">{nextPost.title}</span>
        </a>
      ) : (
        <div className="blog-post-nav__item blog-post-nav__item--placeholder" aria-hidden="true" />
      )}
    </nav>
  )
}
