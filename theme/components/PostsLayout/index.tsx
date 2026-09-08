import React from 'react'
import { usePosts } from '../../lib/usePosts'
import { PostCard } from '../PostCard'

/**
 * Archive page for `/posts/`, rendered from `docs/posts/index.mdx`
 * (`pageType: custom`). Lists every post newest-first.
 */
export const PostsLayout: React.FC = () => {
  const posts = usePosts()

  return (
    <div className="bl-shell">
      <section className="bl-section">
        <div className="bl-section__head">
          <div>
            <h1 className="bl-section__title">全部文章</h1>
            <p className="bl-section__copy">
              共 {posts.length} 篇，从最近发布开始，按时间往下浏览。
            </p>
          </div>
        </div>

        <div className="bl-grid">
          {posts.map((post) => (
            <PostCard
              key={post.url}
              title={post.title}
              url={post.url}
              date={post.date}
              description={post.description}
              tags={post.tags}
              readingTime={post.readingTime}
              category={post.category}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
