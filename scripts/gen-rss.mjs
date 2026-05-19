import { readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { resolve, join } from 'node:path'
import matter from 'gray-matter'
import { z } from 'zod'
import RSS from 'rss'

const POSTS_DIR = resolve(process.cwd(), 'docs/posts')
const SITE_URL = 'https://www.myls.top'
const SITE_TITLE = '不想起名字'
const SITE_DESCRIPTION = 'AI / Coding / Notes'

const PostFrontmatterSchema = z.object({
  title: z.string().min(1, '标题不能为空'),
  date: z.union([z.string(), z.date()]).transform((val) => {
    if (val instanceof Date) return val.toISOString().slice(0, 10)
    return val
  }),
  tags: z.array(z.string()).default([]),
  description: z.string().optional(),
  cover: z.string().optional(),
  category: z.string().optional(),
  draft: z.boolean().optional().default(false),
})

function formatDate(date) {
  if (!date) return ''
  return new Date(date).toISOString().slice(0, 10)
}

function getReadingTime(content, wordsPerMinute = 400) {
  let text = content
  text = text.replace(/^---[\s\S]*?---/, '')
  text = text.replace(/```[\s\S]*?```/g, '')
  text = text.replace(/`[^`]+`/g, '')
  text = text.replace(/!\[[^\]]*\]\([^)]*\)/g, '')
  text = text.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
  text = text.replace(/<[^>]+>/g, '')
  text = text.replace(/^[#>*_-]+\s*/gm, '')
  text = text.replace(/\s+/g, '')
  return Math.max(1, Math.ceil(text.length / wordsPerMinute))
}

function loadPosts() {
  const files = readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.md') && f !== 'index.md')

  const posts = []

  for (const file of files) {
    const filepath = join(POSTS_DIR, file)
    const raw = readFileSync(filepath, 'utf-8')
    const { data, content } = matter(raw)

    if (!data.date) continue

    try {
      const validated = PostFrontmatterSchema.parse(data)
      if (validated.draft) continue

      const slug = file.replace(/\.md$/, '')
      posts.push({
        title: validated.title,
        url: `/posts/${slug}`,
        date: formatDate(validated.date),
        tags: validated.tags,
        description: validated.description ?? '',
        readingTime: getReadingTime(content),
        cover: validated.cover,
        category: validated.category,
        draft: validated.draft,
      })
    } catch (error) {
      console.warn(`Invalid frontmatter for post ${file}:`, error)
    }
  }

  return posts.sort((a, b) => +new Date(b.date) - +new Date(a.date))
}

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
