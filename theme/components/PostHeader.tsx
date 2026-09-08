import React from 'react'
import { Link } from '@rspress/core/theme-original'
import { useCurrentPost } from '../lib/usePosts'

/**
 * Post header injected into the `beforeDocContent` DocLayout slot. Renders a
 * back link plus the post meta line (date, reading time, tags) above the
 * article title, following the official Rspress blog pattern.
 */
export const PostHeader: React.FC = () => {
  const current = useCurrentPost()
  if (!current) return null

  const { post } = current

  return (
    <div className="bl-post-header">
      <Link href="/blog/" className="bl-post-header__back">
        ← 返回博客列表
      </Link>
      <div className="bl-post-header__meta">
        {post.category && <span className="bl-category">{post.category}</span>}
        <span>{post.date}</span>
        {post.readingTime ? <span>· {post.readingTime} 分钟</span> : null}
        {post.tags.length > 0 && (
          <span className="bl-post-header__tags">
            {post.tags.map((tag) => (
              <span key={tag} className="bl-tag">
                {tag}
              </span>
            ))}
          </span>
        )}
      </div>
    </div>
  )
}
