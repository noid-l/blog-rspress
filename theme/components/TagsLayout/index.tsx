import React, { useMemo } from 'react'
import { posts } from '../../../src/data/posts'
import { PostCard } from '../PostCard'

/**
 * Ejected layout for `/tags`. Groups posts by tag, sorts tags alphabetically
 * (zh-CN collation), and renders a top-of-page tag chip navigator plus
 * per-tag sections.
 */
export const TagsLayout: React.FC = () => {
  const sections = useMemo(() => {
    const tagMap = new Map<string, typeof posts>()
    for (const post of posts) {
      for (const tag of post.tags ?? []) {
        if (!tagMap.has(tag)) tagMap.set(tag, [])
        tagMap.get(tag)!.push(post)
      }
    }
    return [...tagMap.entries()]
      .sort(([tagA], [tagB]) => tagA.localeCompare(tagB, 'zh-CN'))
      .map(([tag, items]) => ({
        tag,
        items,
        anchor: `tag-${encodeURIComponent(tag).toLowerCase()}`,
      }))
  }, [])

  return (
    <div className="blog-shell">
      <section className="blog-panel mt-6 md:mt-8">
        <div className="blog-panel__header">
          <div>
            <h2 className="blog-panel__title">全部标签</h2>
            <p className="blog-panel__copy">点击标签可快速跳转到对应分组。</p>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          {sections.map((section) => (
            <a
              key={section.tag}
              href={`#${section.anchor}`}
              className="blog-tag"
            >
              {section.tag}（{section.items.length}）
            </a>
          ))}
        </div>
      </section>

      <div className="blog-section-stack mt-8 md:mt-10">
        {sections.map((section) => (
          <section
            key={section.tag}
            id={section.anchor}
            className="blog-tag-section"
          >
            <div className="blog-tag-section__header">
              <h2
                className="text-xl font-bold"
                style={{ color: 'var(--text-1)' }}
              >
                # {section.tag}
              </h2>
              <span className="blog-tag-count">{section.items.length} 篇</span>
            </div>
            <div className="blog-grid mt-5">
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
    </div>
  )
}
