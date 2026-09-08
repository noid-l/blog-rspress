import React from 'react'
import { useFrontmatter } from '@rspress/core/runtime'
import { HomeFooter } from '@rspress/core/theme-original'
import { usePosts } from '../../lib/usePosts'
import { PostCard } from '../PostCard'

/**
 * Home page layout, picked up automatically for `pageType: home` via the
 * named export in `theme/index.tsx`. The hero copy comes from the official
 * `hero` frontmatter schema in `docs/index.mdx`; the post list comes from
 * the built-in runtime page data via `usePosts()`.
 */
export const HomeLayout: React.FC = () => {
  const { frontmatter } = useFrontmatter()
  const hero = frontmatter.hero
  const posts = usePosts()
  const latestPosts = posts.slice(0, 6)

  return (
    <div className="bl-shell">
      <section className="bl-hero">
        <h1 className="bl-hero__name">{hero?.name ?? ''}</h1>
        {hero?.tagline && <p className="bl-hero__tagline">{hero.tagline}</p>}
      </section>

      <section className="bl-section">
        <div className="bl-section__head">
          <div>
            <h2 className="bl-section__title">最新文章</h2>
            <p className="bl-section__copy">记录 AI、开发、工具链和项目实践</p>
          </div>
          <a href="/blog/" className="bl-link-more">
            查看全部 →
          </a>
        </div>

        <div className="bl-grid">
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

      <HomeFooter />
    </div>
  )
}
