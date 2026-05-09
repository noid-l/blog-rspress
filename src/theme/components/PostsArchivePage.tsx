import React, { useMemo } from 'react'
import { loadPosts } from '../../lib/posts'
import { PostCard } from './PostCard'

export const PostsArchivePage: React.FC = () => {
  const posts = useMemo(() => loadPosts(), [])
  const featured = posts[0]
  const archivePosts = posts.slice(1)

  return (
    <div className="home-shell page-posts-shell">
      {featured && (
        <section className="posts-lead-section">
          <div className="panel-header">
            <div>
              <h2 className="panel-title">最近更新</h2>
            </div>
            <span className="tag-count">最新</span>
          </div>

          <a href={featured.url} className="posts-lead-card mt-6">
            <div className="posts-lead-copy">
              <p className="posts-lead-meta">
                {featured.category || 'Latest'} · {featured.date}
                {featured.readingTime ? ` · ${featured.readingTime} 分钟` : ''}
              </p>
              <h2 className="posts-lead-title">{featured.title}</h2>
              {featured.description && (
                <p className="posts-lead-desc">{featured.description}</p>
              )}
            </div>

            <div className="posts-lead-side">
              <p className="posts-lead-label">阅读线索</p>
              <div className="posts-lead-tags">
                {featured.tags?.map((tag) => (
                  <span key={tag} className="tag-chip">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </a>
        </section>
      )}

      <section className="mt-10">
        <div className="panel-header posts-archive-header">
          <div>
            <h2 className="panel-title">全部文章</h2>
            <p className="panel-copy">从最近发布开始，按时间往下浏览。</p>
          </div>
        </div>

        <div className="posts-grid mt-6">
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
