import React, { useMemo } from 'react'
import { loadPosts } from '../../lib/posts'
import { PostCard } from './PostCard'

export const TagsPage: React.FC = () => {
  const posts = useMemo(() => loadPosts(), [])

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
  }, [posts])

  const totalPosts = posts.length

  return (
    <div className="home-shell">
      <section className="feature-panel mt-6 md:mt-8">
        <div className="panel-header">
          <div>
            <h2 className="panel-title">全部标签</h2>
            <p className="panel-copy">点击标签可快速跳转到对应分组。</p>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          {sections.map((section) => (
            <a
              key={section.tag}
              href={`#${section.anchor}`}
              className="tag-chip hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {section.tag}（{section.items.length}）
            </a>
          ))}
        </div>
      </section>

      <div className="section-stack mt-8 md:mt-10">
        {sections.map((section) => (
          <section key={section.tag} id={section.anchor} className="tag-section">
            <div className="tag-section-header">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                # {section.tag}
              </h2>
              <span className="tag-count">{section.items.length} 篇</span>
            </div>
            <div className="home-grid mt-5">
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
