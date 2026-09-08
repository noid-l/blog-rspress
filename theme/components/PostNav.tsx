import React from 'react'
import { useCurrentPost, usePosts } from '../lib/usePosts'

/**
 * Prev/next post navigation, injected into the `afterDocContent` Layout slot.
 * Renders only on individual post pages.
 */
export const PostNav: React.FC = () => {
  const posts = usePosts()
  const current = useCurrentPost()
  if (!current) return null

  const prevPost = posts[current.index + 1]
  const nextPost = posts[current.index - 1]

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
