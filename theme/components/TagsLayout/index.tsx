import React, { useMemo } from 'react'
import { usePosts, type PostItem } from '../../lib/usePosts'
import { PostCard } from '../PostCard'

/**
 * Tags page for `/tags`, rendered from `docs/tags.mdx` (`pageType: custom`).
 * Groups posts by tag, sorts tags with zh collation, and renders a
 * top-of-page chip navigator plus per-tag sections.
 */
export const TagsLayout: React.FC = () => {
  const posts = usePosts()

  const sections = useMemo(() => {
    const tagMap = new Map<string, PostItem[]>()
    for (const post of posts) {
      for (const tag of post.tags) {
        if (!tagMap.has(tag)) tagMap.set(tag, [])
        tagMap.get(tag)!.push(post)
      }
    }
    return [...tagMap.entries()]
      .sort(([tagA], [tagB]) => tagA.localeCompare(tagB, 'zh'))
      .map(([tag, items]) => ({
        tag,
        items,
        anchor: `tag-${encodeURIComponent(tag).toLowerCase()}`,
      }))
  }, [posts])

  return (
    <div className="bl-shell">
      <section className="bl-section">
        <div className="bl-section__head">
          <div>
            <h1 className="bl-section__title">全部标签</h1>
            <p className="bl-section__copy">点击标签可快速跳转到对应分组。</p>
          </div>
        </div>
        <div className="bl-tag-nav">
          {sections.map((section) => (
            <a key={section.tag} href={`#${section.anchor}`} className="bl-tag">
              {section.tag}（{section.items.length}）
            </a>
          ))}
        </div>
      </section>

      {sections.map((section) => (
        <section
          key={section.tag}
          id={section.anchor}
          className="bl-section bl-tag-section"
        >
          <div className="bl-tag-section__head">
            <h2 className="bl-tag-section__title"># {section.tag}</h2>
            <span className="bl-tag-count">{section.items.length} 篇</span>
          </div>
          <div className="bl-grid">
            {section.items.map((post) => (
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
      ))}
    </div>
  )
}
