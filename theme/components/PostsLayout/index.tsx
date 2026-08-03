import React from 'react'
import { posts } from '../../../src/data/posts'
import { PostCard } from '../PostCard'

/**
 * Ejected layout for `/posts/`. Shows the latest post as a lead card,
 * then a grid of the remaining archive.
 */
export const PostsLayout: React.FC = () => {
  const featured = posts[0]
  const archivePosts = posts.slice(1)

  return (
    <div className="blog-shell">
      {featured && (
        <section className="blog-posts-lead">
          <div className="blog-panel__header">
            <h2 className="blog-panel__title">最近更新</h2>
            <span className="blog-tag-count">最新</span>
          </div>

          <a href={featured.url} className="blog-posts-lead__card mt-6">
            <div className="blog-posts-lead__copy">
              <p className="blog-posts-lead__meta">
                {featured.category || 'Latest'} · {featured.date}
                {featured.readingTime ? ` · ${featured.readingTime} 分钟` : ''}
              </p>
              <h2 className="blog-posts-lead__title">{featured.title}</h2>
              {featured.description && (
                <p className="blog-posts-lead__desc">{featured.description}</p>
              )}
            </div>

            <div className="blog-posts-lead__side">
              <p className="blog-posts-lead__label">阅读线索</p>
              <div className="blog-posts-lead__tags">
                {featured.tags?.map((tag) => (
                  <span key={tag} className="blog-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </a>
        </section>
      )}

      <section className="mt-10">
        <div className="blog-panel__header">
          <div>
            <h2 className="blog-panel__title">全部文章</h2>
            <p className="blog-panel__copy">从最近发布开始，按时间往下浏览。</p>
          </div>
        </div>

        <div className="blog-posts-grid mt-6">
          {archivePosts.map((post) => (
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
