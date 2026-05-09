import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import RSS from 'rss'
import { loadPosts } from '../src/lib/posts.js'

const SITE_URL = 'https://www.myls.top'
const SITE_TITLE = '不想起名字'
const SITE_DESCRIPTION = 'AI / Coding / Notes'

export function generateRSS(outDir) {
  const posts = loadPosts()

  const feed = new RSS({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site_url: SITE_URL,
    feed_url: `${SITE_URL}/feed.xml`,
    copyright: `Copyright ${new Date().getFullYear()} Shuo`,
    language: 'zh-CN'
  })

  for (const post of posts) {
    feed.item({
      title: post.title,
      url: `${SITE_URL}${post.url}`,
      date: new Date(post.date),
      description: post.description,
      categories: post.tags,
    })
  }

  writeFileSync(resolve(outDir, 'feed.xml'), feed.xml(), 'utf-8')
  console.log('✅ RSS feed generated')
}

// CLI
if (import.meta.url === `file://${process.argv[1]}`) {
  generateRSS('doc_build')
}
