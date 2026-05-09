import React, { useMemo } from 'react'
import { loadPosts } from '../../lib/posts'
import { PostCard } from './PostCard'

export const HomePage: React.FC = () => {
  const posts = useMemo(() => loadPosts(), [])
  const featured = posts[0]
  const latestPosts = posts.slice(0, 6)

  return (
    <div className="vp-doc">
      <div className="home-shell -mt-2">
        {featured && (
          <a href={featured.url} className="block no-underline">
            <div className="hero-box group cursor-pointer">
              <div className="max-w-3xl">
                <span className="page-kicker">{featured.category || 'Latest'}</span>
                <h1 className="post-card-title mt-4 text-2xl md:text-3xl group-hover:!text-[var(--accent)]">
                  {featured.title}
                </h1>
                <div className="post-card-meta mt-3">
                  {featured.date}
                  {featured.readingTime ? ` · ${featured.readingTime} 分钟` : ''}
                </div>
                {featured.description && (
                  <p className="post-card-desc mt-4 text-base md:text-lg leading-8">
                    {featured.description}
                  </p>
                )}
                {featured.tags && featured.tags.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {featured.tags.map((tag) => (
                      <span key={tag} className="tag-chip">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <span className="mt-6 inline-block text-sm font-medium" style={{ color: 'var(--accent)' }}>
                  阅读全文 →
                </span>
              </div>
            </div>
          </a>
        )}
      </div>

      <section className="home-shell mt-14">
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-1)' }}>
              最新文章
            </h2>
            <p className="mt-2 text-sm" style={{ color: 'var(--text-3)' }}>
              记录 AI、开发、工具链和项目实践
            </p>
          </div>
          <a href="/posts/" className="text-sm font-medium no-underline" style={{ color: 'var(--accent)' }}>
            查看全部 →
          </a>
        </div>

        <div className="home-grid">
          {latestPosts.map((post) => (
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
