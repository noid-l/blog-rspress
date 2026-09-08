import React, { useMemo } from 'react'
import { useLocation } from '@rspress/core/runtime'
import { usePosts } from '../lib/usePosts'

/**
 * Prev/next post navigation, injected into the `afterDocContent` Layout slot.
 * Slots render outside the page context, so the current route is read via
 * `useLocation()`. Renders only on individual post pages.
 */
export const PostNav: React.FC = () => {
  const { pathname } = useLocation()
  const posts = usePosts()

  // 生产模式 pathname 带 `.html` 后缀（/posts/foo.html），routePath 不带
  const routePath = pathname.replace(/\.html$/, '').replace(/\/$/, '') || '/'
  const isPost = routePath.startsWith('/posts/') && routePath !== '/posts'

  const currentIndex = useMemo(
    () => (isPost ? posts.findIndex((p) => p.url.replace(/\/$/, '') === routePath) : -1),
    [isPost, posts, routePath],
  )

  if (!isPost || currentIndex < 0) return null

  const prevPost = posts[currentIndex + 1]
  const nextPost = posts[currentIndex - 1]

  if (!prevPost && !nextPost) return null

  return (
    <nav className="bl-post-nav">
      {prevPost ? (
        <a href={prevPost.url} className="bl-post-nav__item">
          <span className="bl-post-nav__label">← 上一篇</span>
          <span className="bl-post-nav__title">{prevPost.title}</span>
        </a>
      ) : (
        <span />
      )}
      {nextPost ? (
        <a href={nextPost.url} className="bl-post-nav__item bl-post-nav__item--next">
          <span className="bl-post-nav__label">下一篇 →</span>
          <span className="bl-post-nav__title">{nextPost.title}</span>
        </a>
      ) : (
        <span />
      )}
    </nav>
  )
}
