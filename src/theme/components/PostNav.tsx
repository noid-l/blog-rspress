import React, { useMemo } from 'react'
import { loadPosts } from '../../lib/posts'

export const PostNav: React.FC<{ slug: string }> = ({ slug }) => {
  const posts = useMemo(() => loadPosts(), [])

  const currentIndex = useMemo(() => {
    return posts.findIndex((p) => p.url === `/posts/${slug}`)
  }, [posts, slug])

  const prevPost = currentIndex >= 0 ? posts[currentIndex + 1] : undefined
  const nextPost = currentIndex > 0 ? posts[currentIndex - 1] : undefined

  if (!prevPost && !nextPost) return null

  return (
    <nav className="post-nav">
      <div className="post-nav-grid">
        {prevPost ? (
          <a href={prevPost.url} className="post-nav-link prev">
            <span className="post-nav-label">← 上一篇</span>
            <span className="post-nav-title">{prevPost.title}</span>
          </a>
        ) : (
          <div />
        )}
        {nextPost ? (
          <a href={nextPost.url} className="post-nav-link next">
            <span className="post-nav-label">下一篇 →</span>
            <span className="post-nav-title">{nextPost.title}</span>
          </a>
        ) : (
          <div />
        )}
      </div>
    </nav>
  )
}
